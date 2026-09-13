import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { StoreProvider } from '@/app/StoreProvider'
import { Bree_Serif, DM_Sans } from 'next/font/google'
import '@/App.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const breeSerif = Bree_Serif({
  subsets: ['latin'],
  variable: '--font-bree-serif',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Barraca de Frutas',
  description: 'Cadastro e gerenciamento de frutas',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${breeSerif.variable}`}>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
