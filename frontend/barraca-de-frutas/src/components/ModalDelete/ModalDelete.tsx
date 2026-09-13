'use client'

import { RedButton } from '@/components/RedButton/RedButton'
import { WhiteButton } from '@/components/WhiteButton/WhiteButton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { deleteFruit } from '@/features/fruits/fruits-slice'
import { useAppDispatch } from '@/lib/redux-hooks'
import { Trash2 } from 'lucide-react'

interface ModalDeleteProps {
  idFruit: string
  isOpen: boolean
  onDeletingIdChange: (id: string | null) => void
  setOpen: (isOpen: boolean) => void
}

export function ModalDelete({
  idFruit,
  isOpen,
  onDeletingIdChange,
  setOpen,
}: ModalDeleteProps) {
  const dispatch = useAppDispatch()

  const removeFruit = async () => {
    setOpen(false)
    onDeletingIdChange(idFruit)

    const reduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, reduceMotion ? 0 : 240)
    })

    try {
      await dispatch(deleteFruit(idFruit)).unwrap()
    } finally {
      onDeletingIdChange(null)
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogContent className="overflow-hidden p-5" showCloseButton={false}>
        <DialogHeader className="items-center text-center sm:items-start sm:text-left">
          <span className="grid size-14 place-items-center rounded-2xl border-2 border-foreground bg-primary text-primary-foreground shadow-[3px_3px_0_var(--foreground)]">
            <Trash2 aria-hidden="true" className="size-7" strokeWidth={2.7} />
          </span>
          <DialogTitle className="mt-3 text-3xl">Excluir fruta?</DialogTitle>
          <DialogDescription className="max-w-sm text-sm font-semibold leading-relaxed">
            Você perderá todas as informações cadastradas sobre ela. Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-1 sm:grid-cols-2">
          <WhiteButton onClick={() => setOpen(false)} type="button">
            Não, manter
          </WhiteButton>
          <RedButton id="ModalDelete-delete" onClick={removeFruit} type="button">
            Sim, Excluir
          </RedButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
