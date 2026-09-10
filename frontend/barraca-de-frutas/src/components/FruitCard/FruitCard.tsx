import moneyIcon from '@/assets/money.png'
import optionsIcon from '@/assets/options-transparent.png'
import quantityIcon from '@/assets/quantity.png'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { Fruit } from '@/features/fruits/fruit'
import { imageSrc } from '@/lib/image-src'
import { cn } from '@/lib/utils'
import type { CSSProperties } from 'react'

interface FruitCardProps {
  fruit: Fruit
  index: number
  isDeleting?: boolean
  onOpenOptions: (id: string) => void
}

const tones = ['bg-blue', 'bg-[#ffd4b8]', 'bg-accent', 'bg-pink']

export function FruitCard({
  fruit,
  index,
  isDeleting = false,
  onOpenOptions,
}: FruitCardProps) {
  const initial = fruit.name.trim().charAt(0).toUpperCase() || 'F'

  return (
    <Card
      className={cn(
        'card-in gap-0 py-0 transition-transform hover:-translate-y-1',
        isDeleting && 'fruit-card-exit',
      )}
      style={{ '--card-delay': `${Math.min(index * 55, 275)}ms` } as CSSProperties}
    >
      <CardHeader
        className={cn(
          'min-h-31 grid-cols-[1fr_auto] border-b-2 border-foreground px-4 py-4',
          tones[index % tones.length],
        )}
      >
        <div>
          <Badge className="bg-card text-foreground" variant="outline">
            EM ESTOQUE
          </Badge>
          <div className="mt-4 flex items-end gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-foreground bg-card font-heading text-2xl">
              {initial}
            </span>
            <h2 className="min-w-0 truncate font-heading text-2xl leading-none sm:text-[1.7rem]">
              {fruit.name}
            </h2>
          </div>
        </div>
        <button
          aria-label={`Opções de ${fruit.name}`}
          className="grid size-10 place-items-center overflow-hidden rounded-xl border-0 bg-transparent p-1.5 shadow-none transition-transform hover:scale-110 focus-visible:ring-3 focus-visible:ring-secondary"
          onClick={() => onOpenOptions(fruit.id)}
          type="button"
        >
          <img
            alt=""
            aria-hidden="true"
            className="size-full object-contain"
            src={imageSrc(optionsIcon)}
          />
        </button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 bg-[#fffdf8] p-4">
        <div className="rounded-xl border-2 border-foreground bg-card p-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-muted-foreground">
            <span className="grid size-7 place-items-center overflow-hidden rounded-md bg-[#f0f4f7]">
              <img
                alt=""
                aria-hidden="true"
                className="size-6 object-contain"
                src={imageSrc(moneyIcon)}
              />
            </span>
            Preço/kg
          </div>
          <p className="mt-2 text-lg font-black">R$ {fruit.price}</p>
        </div>
        <div className="rounded-xl border-2 border-foreground bg-card p-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-muted-foreground">
            <span className="grid size-7 place-items-center overflow-hidden rounded-md bg-[#fffdf8]">
              <img
                alt=""
                aria-hidden="true"
                className="asset-blend size-6 object-contain"
                src={imageSrc(quantityIcon)}
              />
            </span>
            Unidades
          </div>
          <p className="mt-2 text-lg font-black">{fruit.quantity}</p>
        </div>
      </CardContent>
    </Card>
  )
}
