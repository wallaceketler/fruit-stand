import registerSuccessImage from '@/assets/registersuccess-transparent.png'
import { AppShell } from '@/components/AppShell/AppShell'
import { RedButton } from '@/components/RedButton/RedButton'
import { Badge } from '@/components/ui/badge'
import { imageSrc } from '@/lib/image-src'
import { ArrowLeft, PartyPopper } from 'lucide-react'

interface RegisterSuccessProps {
  fruit: string
}

function decodeFruitName(fruit: string) {
  try {
    return decodeURIComponent(fruit)
  } catch {
    return fruit
  }
}

export function RegisterSuccess({ fruit }: RegisterSuccessProps) {
  const fruitName = decodeFruitName(fruit)

  return (
    <AppShell active="cadastro">
      <div className="grid min-h-[calc(100svh-7rem)] place-items-center p-4 sm:p-7 lg:min-h-[calc(100svh-4rem)]">
        <section className="grid w-full max-w-4xl overflow-hidden rounded-2xl border-[3px] border-foreground bg-[#fffdf8] shadow-[7px_7px_0_var(--foreground)] md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden border-b-[3px] border-foreground bg-[#fff0d7] p-5 md:border-r-[3px] md:border-b-0">
            <span className="absolute top-5 left-5 grid size-12 place-items-center rounded-full border-2 border-foreground bg-secondary shadow-[3px_3px_0_var(--foreground)]">
              <PartyPopper aria-hidden="true" className="size-6" strokeWidth={2.5} />
            </span>
            <img
              alt="Pessoa comemorando o cadastro da fruta"
              className="mx-auto aspect-[4/3] w-full max-w-sm object-cover object-top md:aspect-auto md:h-full md:min-h-105"
              src={imageSrc(registerSuccessImage)}
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9">
            <Badge className="bg-accent text-foreground" variant="outline">
              TUDO CERTO!
            </Badge>
            <h1 className="mt-5 font-heading text-4xl leading-[1.02] sm:text-5xl">
              Fruta cadastrada com sucesso.
            </h1>
            <p className="mt-5 text-base font-semibold text-muted-foreground sm:text-lg">
              <strong className="text-foreground">{fruitName}</strong> já está disponível no estoque da sua barraca.
            </p>
            <RedButton className="mt-8 sm:w-fit" id="registerSucess-link" link href="/">
              <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={3} />
              Voltar ao início
            </RedButton>
          </div>
        </section>
      </div>
    </AppShell>
  )
}
