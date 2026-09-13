import { ModalDelete } from '@/components/ModalDelete/ModalDelete'
import { EditFruit } from '@/screens/editFruit/EditFruit'
import { HomePage } from '@/screens/homePage/HomePage'
import { RegisterFruit } from '@/screens/registerFruit/RegisterFruit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { AnchorHTMLAttributes, ReactElement, ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeStore } from '@/lib/store'
import { Provider } from 'react-redux'

const router = vi.hoisted(() => ({
  push: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => router,
}))

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode
    href: string
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

function renderWithStore(component: ReactElement) {
  return render(<Provider store={makeStore()}>{component}</Provider>)
}

describe('fluxos de frutas', () => {
  beforeEach(() => {
    router.push.mockReset()
  })

  it('cadastra uma fruta no localStorage', async () => {
    const user = userEvent.setup()
    renderWithStore(<RegisterFruit />)

    await user.type(screen.getByPlaceholderText('Nome da fruta'), 'Banana')
    await user.type(screen.getByPlaceholderText('Preço do Kilo'), '5,50')
    await user.type(
      screen.getByPlaceholderText('Quantidade no estoque'),
      '12',
    )
    await user.click(screen.getByRole('button', { name: 'Cadastrar Fruta' }))

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem('1') ?? '{}')).toEqual({
        name: 'Banana',
        price: '5,50',
        quantity: '12',
      })
    })
    expect(localStorage.getItem('lastIndex')).toBe('1')
    expect(router.push).toHaveBeenCalledWith('/sucesso-cadastro/Banana')
  })

  it('lista as frutas e filtra a pesquisa pelo nome', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      '1',
      JSON.stringify({ name: 'Banana', price: '5,50', quantity: '12' }),
    )
    localStorage.setItem(
      '2',
      JSON.stringify({ name: 'Laranja', price: '4,00', quantity: '8' }),
    )
    localStorage.setItem('lastIndex', '2')

    renderWithStore(<HomePage />)

    expect(await screen.findByText('Banana')).toBeInTheDocument()
    expect(screen.getByText('Laranja')).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText('Pesquisar Fruta'), 'Ban')
    await user.click(screen.getByRole('button', { name: 'search' }))

    expect(screen.getByText('Banana')).toBeInTheDocument()
    expect(screen.queryByText('Laranja')).not.toBeInTheDocument()
  })

  it('edita uma fruta existente no localStorage', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      '1',
      JSON.stringify({ name: 'Banana', price: '5,50', quantity: '12' }),
    )
    localStorage.setItem('lastIndex', '1')

    renderWithStore(<EditFruit idFruit="1" />)

    const nameInput = await screen.findByPlaceholderText('Nome da fruta')
    const priceInput = screen.getByPlaceholderText('Preço do Kilo')
    const quantityInput = screen.getByPlaceholderText('Quantidade no estoque')

    await user.clear(nameInput)
    await user.type(nameInput, 'Banana prata')
    await user.clear(priceInput)
    await user.type(priceInput, '6,00')
    await user.clear(quantityInput)
    await user.type(quantityInput, '10')
    await user.click(screen.getByRole('button', { name: 'Atualizar Fruta' }))

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem('1') ?? '{}')).toEqual({
        name: 'Banana prata',
        price: '6,00',
        quantity: '10',
      })
    })
    expect(router.push).toHaveBeenCalledWith('/')
  })


  it('exclui uma fruta após confirmar no modal', async () => {
    const user = userEvent.setup()
    const onDeletingIdChange = vi.fn()
    localStorage.setItem(
      '1',
      JSON.stringify({ name: 'Banana', price: '5,50', quantity: '12' }),
    )
    localStorage.setItem('lastIndex', '1')
    renderWithStore(
      <ModalDelete
        idFruit="1"
        isOpen={true}
        onDeletingIdChange={onDeletingIdChange}
        setOpen={() => {}}
      />,
    )
    await user.click(
      screen.getByRole('button', { name: 'Sim, Excluir' }),
    )

    expect(onDeletingIdChange).toHaveBeenCalledWith('1')

    await waitFor(() => {
      expect(localStorage.getItem('1')).toBeNull()
    })
    expect(onDeletingIdChange).toHaveBeenLastCalledWith(null)
  })
})
