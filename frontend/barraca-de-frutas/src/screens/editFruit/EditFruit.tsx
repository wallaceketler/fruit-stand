'use client'

import editIcon from '@/assets/edit.png'
import xIcon from '@/assets/x.png'
import { AppShell } from '@/components/AppShell/AppShell'
import { FruitForm } from '@/components/FruitForm/FruitForm'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Fruit, FruitInput } from '@/features/fruits/fruit'
import { fruitRepository } from '@/features/fruits/local-storage-fruit-repository'
import { imageSrc } from '@/lib/image-src'
import { PackageOpen, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'

interface EditFruitProps {
  idFruit: string
}

export function EditFruit({ idFruit }: EditFruitProps) {
  const router = useRouter()
  const [fruit, setFruit] = useState<Fruit | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let active = true

    fruitRepository.findById(idFruit).then((storedFruit) => {
      if (active) {
        setFruit(storedFruit)
        setLoaded(true)
      }
    })

    return () => {
      active = false
    }
  }, [idFruit])

  const saveOnLocalStorage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const updatedFruit: FruitInput = {
      name: String(formData.get('name') ?? ''),
      price: String(formData.get('price') ?? ''),
      quantity: String(formData.get('quantity') ?? ''),
    }

    try {
      await fruitRepository.update(idFruit, updatedFruit)
      router.push('/')
    } catch (error) {
      setIsSubmitting(false)
      throw error
    }
  }

  if (!loaded) {
    return (
      <AppShell>
        <div className="grid min-h-[60svh] place-items-center p-6 font-black">Carregando fruta...</div>
      </AppShell>
    )
  }

  if (!fruit) {
    return (
      <AppShell>
        <div className="grid min-h-[60svh] place-items-center p-6 text-center">
          <div>
            <h1 className="font-heading text-4xl">Fruta não encontrada.</h1>
            <Link className="mt-5 inline-block font-black underline" href="/">
              Voltar ao estoque
            </Link>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell active="estoque">
      <div className="p-4 sm:p-6 lg:p-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <Badge className="bg-accent text-foreground" variant="outline">
              EDITANDO ITEM
            </Badge>
            <h1 className="mt-3 font-heading text-4xl leading-none sm:text-5xl">Editar fruta</h1>
            <p className="mt-3 max-w-xl text-sm font-semibold text-muted-foreground sm:text-base">
              Atualize os dados de <strong className="text-foreground">{fruit.name}</strong>.
            </p>
          </div>
          <Link
            aria-label="Fechar edição"
            className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border-2 border-foreground bg-[#f0f4f7] shadow-[3px_3px_0_var(--foreground)] transition-transform hover:-translate-y-0.5"
            href="/"
          >
            <img alt="" aria-hidden="true" className="size-7 object-contain" src={imageSrc(xIcon)} />
          </Link>
        </header>

        <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(420px,1.2fr)]">
          <aside className="order-last relative overflow-hidden rounded-2xl border-[3px] border-foreground bg-accent p-6 shadow-[5px_5px_0_var(--foreground)] xl:order-first">
            <div className="absolute -right-6 -top-6 grid size-28 rotate-6 place-items-center overflow-hidden rounded-2xl border-[3px] border-foreground bg-[#f0f4f7]">
              <img alt="" aria-hidden="true" className="size-20 object-contain" src={imageSrc(editIcon)} />
            </div>
            <p className="text-xs font-black tracking-[0.16em] uppercase">Ajuste fino</p>
            <h2 className="mt-3 max-w-xs font-heading text-3xl leading-tight sm:text-4xl">
              Mantenha as informações atualizadas.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-xl border-2 border-foreground bg-card p-4 shadow-[3px_3px_0_var(--foreground)]">
                <RefreshCw aria-hidden="true" className="size-6" strokeWidth={2.6} />
                <p className="mt-3 text-sm font-bold">Revise preço e quantidade sempre que necessário.</p>
              </div>
              <div className="rounded-xl border-2 border-foreground bg-blue p-4 shadow-[3px_3px_0_var(--foreground)]">
                <PackageOpen aria-hidden="true" className="size-6" strokeWidth={2.6} />
                <p className="mt-3 text-sm font-bold">As alterações ficam salvas neste navegador.</p>
              </div>
            </div>
          </aside>

          <Card className="order-first bg-[#fffdf8] xl:order-last">
            <CardHeader className="border-b-2 border-foreground px-5 pb-5 sm:px-6">
              <CardTitle className="text-2xl">Informações atuais</CardTitle>
              <p className="text-sm font-semibold text-muted-foreground">
                Edite somente o que precisar.
              </p>
            </CardHeader>
            <CardContent className="px-5 pb-2 sm:px-6">
              <FruitForm
                initialValues={fruit}
                isSubmitting={isSubmitting}
                onSubmit={saveOnLocalStorage}
                submitLabel="Atualizar Fruta"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
