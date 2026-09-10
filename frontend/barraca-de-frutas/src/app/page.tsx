import { PageTransition } from '@/components/PageTransition/PageTransition'
import { HomePage } from '@/screens/homePage/HomePage'

export default function Home() {
  return (
    <PageTransition>
      <HomePage />
    </PageTransition>
  )
}
