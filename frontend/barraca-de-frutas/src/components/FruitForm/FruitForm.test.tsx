import { FruitForm } from '@/components/FruitForm/FruitForm'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

describe('FruitForm', () => {
  it('bloqueia números no nome e letras no preço e no estoque', async () => {
    const user = userEvent.setup()

    render(
      <FruitForm
        onSubmit={vi.fn((event) => event.preventDefault())}
        submitLabel="Salvar"
      />,
    )

    const name = screen.getByPlaceholderText('Nome da fruta')
    const price = screen.getByPlaceholderText('Preço do Kilo')
    const quantity = screen.getByPlaceholderText('Quantidade no estoque')

    await user.type(name, 'Maçã123')
    await user.type(price, 'ssd10x,5a0')
    await user.type(quantity, '1abc00')

    expect(name).toHaveValue('Maçã')
    expect(price).toHaveValue('10,50')
    expect(quantity).toHaveValue('100')
  })

  it('preserva letras acentuadas digitadas por composição do teclado', () => {
    render(
      <FruitForm
        onSubmit={vi.fn((event) => event.preventDefault())}
        submitLabel="Salvar"
      />,
    )

    const name = screen.getByPlaceholderText('Nome da fruta')

    fireEvent.compositionStart(name)
    fireEvent.change(name, { target: { value: 'Mac\u0327a\u0303' } })
    fireEvent.compositionEnd(name, { data: 'ã' })

    expect(name).toHaveValue('Maçã')
  })
})
