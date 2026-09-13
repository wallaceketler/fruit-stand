'use client'

import plusIcon from '@/assets/plus.png'
import xIcon from '@/assets/x.png'
import { AppShell } from '@/components/AppShell/AppShell'
import { FruitForm } from '@/components/FruitForm/FruitForm'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { FruitInput } from '@/features/fruits/fruit'
import { createFruit } from '@/features/fruits/fruits-slice'
import { useAppDispatch } from '@/lib/redux-hooks'
import { imageSrc } from '@/lib/image-src'
import { Check, PackageCheck, Tag } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

const steps = [
  { icon: Tag, text: 'Dê um nome claro para encontrar depois.' },
  { icon: Check, text: 'Informe o preço atual por quilo.' },
  { icon: PackageCheck, text: 'Registre quantas unidades estão disponíveis.' },
]

export function RegisterFruit() {
  const dispatch = useAppDispatch()

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const saveOnLocalStorage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const fruit: FruitInput = {
      name: String(formData.get('name') ?? ''),
      price: String(formData.get('price') ?? ''),
      quantity: String(formData.get('quantity') ?? ''),
    }

    try {
      const createdFruit = await dispatch(createFruit(fruit)).unwrap()
      router.push(`/sucesso-cadastro/${encodeURIComponent(createdFruit.name)}`)
    } catch (error) {
      setIsSubmitting(false)
      throw error
    }
  }

  return (
    <AppShell active="cadastro">
      <div className="p-4 sm:p-6 lg:p-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <Badge className="bg-secondary text-foreground" variant="outline">
              NOVA ENTRADA
            </Badge>
            <h1 className="mt-3 font-heading text-4xl leading-none sm:text-5xl">
              Cadastrar fruta
            </h1>
            <p className="mt-3 max-w-xl text-sm font-semibold text-muted-foreground sm:text-base">
              Preencha os dados para adicionar um novo item ao estoque.
            </p>
          </div>
          <Link
            aria-label="Fechar cadastro"
            className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border-2 border-foreground bg-[#f0f4f7] shadow-[3px_3px_0_var(--foreground)] transition-transform hover:-translate-y-0.5"
            href="/"
          >
            <img alt="" aria-hidden="true" className="size-7 object-contain" src={imageSrc(xIcon)} />
          </Link>
        </header>

        <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(420px,1.2fr)]">
          <aside className="order-last relative overflow-hidden rounded-2xl border-[3px] border-foreground bg-secondary p-5 shadow-[5px_5px_0_var(--foreground)] sm:p-6 xl:order-first">
            <img
              alt=""
              aria-hidden="true"
              className="absolute -right-3 -top-3 size-20 rotate-12 rounded-2xl border-[3px] border-foreground object-cover sm:size-24"
              src={imageSrc(plusIcon)}
            />
            <div className="relative max-w-sm">
              <p className="text-xs font-black tracking-[0.16em] uppercase">Cadastro rápido</p>
              <h2 className="mt-3 max-w-[220px] font-heading text-3xl leading-tight sm:max-w-xs sm:text-4xl xl:max-w-[230px]">
                Três informações e pronto!
              </h2>
            </div>
            <ol className="relative mt-8 space-y-3">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <li
                    className="flex items-center gap-3 rounded-xl border-2 border-foreground bg-card p-3 shadow-[3px_3px_0_var(--foreground)]"
                    key={step.text}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border-2 border-foreground bg-accent font-black">
                      {index + 1}
                    </span>
                    <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.5} />
                    <span className="text-sm font-bold">{step.text}</span>
                  </li>
                )
              })}
            </ol>
          </aside>

          <Card className="order-first bg-[#fffdf8] xl:order-last">
            <CardHeader className="border-b-2 border-foreground px-5 pb-5 sm:px-6">
              <CardTitle className="text-2xl">Dados da fruta</CardTitle>
              <p className="text-sm font-semibold text-muted-foreground">
                Todos os campos são obrigatórios.
              </p>
            </CardHeader>
            <CardContent className="px-5 pb-2 sm:px-6">
              <FruitForm
                isSubmitting={isSubmitting}
                onSubmit={saveOnLocalStorage}
                submitLabel="Cadastrar Fruta"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
