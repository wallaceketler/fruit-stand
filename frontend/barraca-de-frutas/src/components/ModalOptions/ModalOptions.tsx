'use client'

import deleteIcon from '@/assets/delete.png'
import editIcon from '@/assets/edit.png'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { imageSrc } from '@/lib/image-src'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { ModalDelete } from '../ModalDelete/ModalDelete'

interface ModalOptionsProps {
  idFruit: string
  isOpen: boolean
  onDeleted: (id: string) => void
  setOpen: (isOpen: boolean) => void
}

export function ModalOptions({
  idFruit,
  isOpen,
  onDeleted,
  setOpen,
}: ModalOptionsProps) {
  const [modalDelete, setModalDelete] = useState(false)

  const openDeleteModal = () => {
    setOpen(false)
    setModalDelete(true)
  }

  return (
    <>
      <Dialog onOpenChange={setOpen} open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">O que deseja fazer?</DialogTitle>
            <DialogDescription className="font-semibold">
              Escolha uma ação para a fruta selecionada.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 grid gap-3">
            <Link
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'h-16 justify-start gap-4 px-3 text-base',
              )}
              href={`/editar-fruta/${idFruit}`}
            >
              <span className="grid size-10 place-items-center overflow-hidden rounded-lg border-2 border-foreground bg-[#f0f4f7]">
                <img alt="" aria-hidden="true" className="size-8 object-contain" src={imageSrc(editIcon)} />
              </span>
              Editar fruta
            </Link>
            <Button
              className="h-16 justify-start gap-4 px-3 text-base"
              onClick={openDeleteModal}
              type="button"
              variant="destructive"
            >
              <span className="grid size-10 place-items-center overflow-hidden rounded-lg border-2 border-foreground bg-[#f0f4f7]">
                <img alt="" aria-hidden="true" className="size-8 object-contain" src={imageSrc(deleteIcon)} />
              </span>
              Excluir fruta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ModalDelete
        idFruit={idFruit}
        isOpen={modalDelete}
        onDeleted={onDeleted}
        setOpen={setModalDelete}
      />
    </>
  )
}
