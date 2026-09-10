import { cn } from '@/lib/utils'
import { Apple, LayoutGrid, Plus, Store } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface AppShellProps {
  active?: 'estoque' | 'cadastro'
  children: ReactNode
}

const navigation = [
  { href: '/', icon: LayoutGrid, id: 'estoque' as const, label: 'Estoque' },
  {
    href: '/cadastrar-fruta',
    icon: Plus,
    id: 'cadastro' as const,
    label: 'Cadastrar fruta',
  },
]

function Brand() {
  return (
    <Link aria-label="Ir para o início" className="flex items-center gap-3" href="/">
      <span className="grid size-11 place-items-center rounded-xl border-2 border-foreground bg-primary text-primary-foreground shadow-[3px_3px_0_var(--foreground)]">
        <Store aria-hidden="true" className="size-6" strokeWidth={2.6} />
      </span>
      <span>
        <span className="block font-heading text-2xl leading-none">Barraca.</span>
        <span className="mt-1 block text-[0.65rem] font-black tracking-[0.18em] uppercase">
          Frutas frescas
        </span>
      </span>
    </Link>
  )
}

export function AppShell({ active = 'estoque', children }: AppShellProps) {
  const MobileActionIcon = active === 'cadastro' ? LayoutGrid : Plus
  const mobileActionLabel = active === 'cadastro' ? 'Voltar ao estoque' : 'Cadastrar fruta'
  const mobileActionHref = active === 'cadastro' ? '/' : '/cadastrar-fruta'

  return (
    <main className="relative min-h-svh overflow-hidden px-3 py-3 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div
        aria-hidden="true"
        className="absolute -top-28 -right-16 size-52 rotate-12 rounded-[3rem] border-[3px] border-foreground bg-secondary sm:size-72"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-16 size-44 -rotate-12 rounded-full border-[3px] border-foreground bg-accent sm:size-64"
      />

      <section className="relative mx-auto min-h-[calc(100svh-1.5rem)] max-w-[1240px] overflow-hidden rounded-[1.6rem] border-[3px] border-foreground bg-card shadow-[7px_7px_0_var(--foreground)] sm:min-h-[calc(100svh-3rem)] lg:grid lg:grid-cols-[238px_minmax(0,1fr)] lg:shadow-[10px_10px_0_var(--foreground)]">
        <aside className="hidden border-r-[3px] border-foreground bg-[#fffdf8] p-5 lg:flex lg:flex-col">
          <Brand />

          <nav aria-label="Navegação principal" className="mt-12 space-y-3">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = item.id === active

              return (
                <Link
                  className={cn(
                    'flex h-12 items-center gap-3 rounded-xl border-2 px-3 text-sm font-black transition-transform',
                    isActive
                      ? 'border-foreground bg-muted shadow-[3px_3px_0_var(--foreground)]'
                      : 'border-transparent hover:translate-x-1 hover:border-foreground hover:bg-muted',
                  )}
                  href={item.href}
                  key={item.id}
                >
                  <Icon aria-hidden="true" className="size-5" strokeWidth={2.6} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto overflow-hidden rounded-2xl border-2 border-foreground bg-secondary p-4 shadow-[4px_4px_0_var(--foreground)]">
            <div className="flex items-start justify-between gap-2">
              <span className="rounded-full border-2 border-foreground bg-card px-2 py-1 text-[0.65rem] font-black uppercase">
                Dica
              </span>
              <Apple
                aria-hidden="true"
                className="size-14 rotate-6 text-foreground"
                fill="var(--primary)"
                strokeWidth={2.4}
              />
            </div>
            <p className="mt-5 font-heading text-xl leading-tight">
              Mantenha sua barraca sempre abastecida.
            </p>
            <Link
              className="mt-4 flex h-10 items-center justify-center rounded-xl border-2 border-foreground bg-card text-sm font-black shadow-[3px_3px_0_var(--foreground)] transition-transform hover:-translate-y-0.5"
              href="/cadastrar-fruta"
            >
              Nova fruta
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col bg-card">
          <header className="flex min-h-20 items-center justify-between gap-3 border-b-[3px] border-foreground bg-[#fffdf8] px-4 py-3 lg:hidden">
            <Brand />
            <Link
              aria-label={mobileActionLabel}
              className={cn(
                'grid size-11 place-items-center rounded-xl border-2 border-foreground shadow-[3px_3px_0_var(--foreground)]',
                active === 'cadastro' ? 'bg-accent' : 'bg-secondary',
              )}
              href={mobileActionHref}
            >
              <MobileActionIcon aria-hidden="true" className="size-6" strokeWidth={3} />
            </Link>
          </header>
          {children}
        </div>
      </section>
    </main>
  )
}
