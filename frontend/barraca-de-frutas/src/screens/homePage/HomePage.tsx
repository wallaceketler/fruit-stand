'use client'

import plusIcon from '@/assets/plus.png'
import registerSuccessImage from '@/assets/registersuccess-transparent.png'
import searchIcon from '@/assets/search.png'
import { AppShell } from '@/components/AppShell/AppShell'
import { FruitCard } from '@/components/FruitCard/FruitCard'
import { ModalOptions } from '@/components/ModalOptions/ModalOptions'
import { RedButton } from '@/components/RedButton/RedButton'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import type { Fruit } from '@/features/fruits/fruit'
import { fruitRepository } from '@/features/fruits/local-storage-fruit-repository'
import { imageSrc } from '@/lib/image-src'
import { PackageOpen, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState, type FormEvent } from 'react'

export function HomePage() {
  const [fruits, setFruits] = useState<Fruit[] | null>(null)
  const [listFruits, setListFruits] = useState<Fruit[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [idFruit, setIdFruit] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const deletionTimer = useRef<number | null>(null)

  useEffect(() => {
    let active = true

    fruitRepository.list().then((storedFruits) => {
      if (active) {
        setFruits(storedFruits)
        setListFruits(storedFruits)
      }
    })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    return () => {
      if (deletionTimer.current !== null) {
        window.clearTimeout(deletionTimer.current)
      }
    }
  }, [])

  const openOptions = (id: string) => {
    setIdFruit(id)
    setOpenModal(true)
  }

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const searchData = String(formData.get('searchData') ?? '')
      .trim()
      .toLocaleLowerCase('pt-BR')
    const availableFruits = fruits ?? []

    setListFruits(
      searchData === ''
        ? availableFruits
        : availableFruits.filter((fruit) =>
            fruit.name.toLocaleLowerCase('pt-BR').includes(searchData),
          ),
    )
  }

  const handleDeleted = (deletedId: string) => {
    setOpenModal(false)
    setDeletingId(deletedId)

    const reduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    deletionTimer.current = window.setTimeout(() => {
      setFruits((currentFruits) =>
        currentFruits?.filter((fruit) => fruit.id !== deletedId) ?? [],
      )
      setListFruits((currentFruits) =>
        currentFruits.filter((fruit) => fruit.id !== deletedId),
      )
      setDeletingId(null)
      deletionTimer.current = null
    }, reduceMotion ? 0 : 240)
  }

  if (fruits === null) {
    return (
      <AppShell>
        <div className="grid min-h-[60svh] place-items-center p-6">
          <div className="rounded-2xl border-2 border-foreground bg-secondary px-6 py-4 font-black shadow-[4px_4px_0_var(--foreground)]">
            Abrindo a barraca...
          </div>
        </div>
      </AppShell>
    )
  }

  const totalUnits = fruits.reduce((total, fruit) => {
    const quantity = Number.parseInt(fruit.quantity, 10)
    return total + (Number.isNaN(quantity) ? 0 : quantity)
  }, 0)

  return (
    <AppShell>
      <div className="flex min-h-0 flex-1 flex-col p-4 pb-8 sm:p-6 lg:p-7 xl:p-8">
        <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="relative overflow-hidden rounded-2xl border-[3px] border-foreground bg-secondary p-5 shadow-[5px_5px_0_var(--foreground)] sm:p-7">
            <div
              aria-hidden="true"
              className="absolute -right-6 -bottom-10 size-32 rotate-12 rounded-[2rem] border-[3px] border-foreground bg-primary sm:size-40"
            />
            <Badge className="bg-card text-foreground" variant="outline">
              PAINEL DA BARRACA
            </Badge>
            <h1 className="relative mt-4 max-w-xl font-heading text-4xl leading-[0.98] sm:text-5xl">
              Estoque fresco, organização simples.
            </h1>
            <p className="relative mt-4 max-w-lg text-sm font-semibold sm:text-base">
              Cadastre, encontre e atualize suas frutas em poucos passos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 xl:grid-cols-1">
            <div className="rounded-2xl border-2 border-foreground bg-blue p-4 shadow-[4px_4px_0_var(--foreground)]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black tracking-wide uppercase">Variedades</span>
                <Sparkles aria-hidden="true" className="size-5" strokeWidth={2.6} />
              </div>
              <p className="mt-4 font-heading text-4xl">{fruits.length}</p>
              <p className="mt-1 text-xs font-bold text-muted-foreground">frutas cadastradas</p>
            </div>
            <div className="rounded-2xl border-2 border-foreground bg-accent p-4 shadow-[4px_4px_0_var(--foreground)]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black tracking-wide uppercase">Estoque total</span>
                <PackageOpen aria-hidden="true" className="size-5" strokeWidth={2.6} />
              </div>
              <p className="mt-4 font-heading text-4xl">{totalUnits}</p>
              <p className="mt-1 text-xs font-bold text-muted-foreground">unidades disponíveis</p>
            </div>
          </div>
        </section>

        {fruits.length === 0 ? (
          <section className="mt-8 grid items-center gap-5 rounded-2xl border-[3px] border-foreground bg-[#fffdf8] p-5 shadow-[6px_6px_0_var(--foreground)] sm:grid-cols-[220px_1fr] sm:p-7 lg:flex-1">
            <div className="overflow-hidden rounded-2xl border-2 border-foreground bg-[#fff0d7]">
              <img
                alt="Ilustração de cadastro concluído"
                className="mx-auto aspect-square w-full max-w-56 object-cover object-top"
                src={imageSrc(registerSuccessImage)}
              />
            </div>
            <div>
              <Badge className="bg-secondary text-foreground">COMECE AQUI</Badge>
              <h2 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl">
                Sua primeira fruta está a um clique.
              </h2>
              <p className="mt-3 font-semibold text-muted-foreground">
                Adicione nome, preço por quilo e quantidade em estoque.
              </p>
              <RedButton className="mt-5 sm:w-auto" link href="/cadastrar-fruta">
                <img
                  alt=""
                  aria-hidden="true"
                  className="size-7 rounded-md border border-foreground object-cover"
                  src={imageSrc(plusIcon)}
                />
                Cadastrar Fruta
              </RedButton>
            </div>
          </section>
        ) : (
          <section className="mt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <Badge className="bg-pink text-foreground" variant="outline">
                  INVENTÁRIO
                </Badge>
                <h2 className="mt-3 font-heading text-3xl sm:text-4xl">Frutas da barraca</h2>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  Consulte os itens disponíveis no seu estoque.
                </p>
              </div>
              <Link
                className="hidden h-12 items-center gap-2 rounded-xl border-2 border-foreground bg-primary px-5 font-black text-primary-foreground shadow-[3px_3px_0_var(--foreground)] transition-transform hover:-translate-y-0.5 sm:flex"
                href="/cadastrar-fruta"
              >
                <img
                  alt=""
                  aria-hidden="true"
                  className="size-7 rounded-md border border-foreground object-cover"
                  src={imageSrc(plusIcon)}
                />
                Cadastrar fruta
              </Link>
            </div>

            <form className="relative mt-5 flex gap-2" onSubmit={search}>
              <Input
                className="h-13 bg-[#fffdf8] pr-15 sm:text-base"
                name="searchData"
                placeholder="Pesquisar Fruta"
              />
              <button
                aria-label="search"
                className="absolute top-1/2 right-1.5 grid size-10 -translate-y-1/2 place-items-center overflow-hidden rounded-lg border-2 border-foreground bg-[#f0f4f7] transition-colors hover:bg-secondary"
                type="submit"
              >
                <img
                  alt=""
                  aria-hidden="true"
                  className="size-7 object-contain"
                  src={imageSrc(searchIcon)}
                />
              </button>
            </form>

            {listFruits.length > 0 ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {listFruits.map((fruit, index) => (
                  <FruitCard
                    fruit={fruit}
                    index={index}
                    isDeleting={deletingId === fruit.id}
                    key={fruit.id}
                    onOpenOptions={openOptions}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border-2 border-dashed border-foreground bg-muted p-8 text-center">
                <p className="font-heading text-2xl">Nenhuma fruta encontrada.</p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">
                  Tente pesquisar usando outro nome.
                </p>
              </div>
            )}
          </section>
        )}
      </div>

      <ModalOptions
        idFruit={idFruit}
        isOpen={openModal}
        onDeleted={handleDeleted}
        setOpen={setOpenModal}
      />
    </AppShell>
  )
}
