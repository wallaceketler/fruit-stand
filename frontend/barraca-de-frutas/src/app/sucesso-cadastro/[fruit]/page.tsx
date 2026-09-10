import { PageTransition } from '@/components/PageTransition/PageTransition'
import { RegisterSuccess } from '@/screens/registerSuccess/RegisterSuccess'

interface RegisterSuccessPageProps {
  params: Promise<{ fruit: string }>
}

export default async function RegisterSuccessPage({ params }: RegisterSuccessPageProps) {
  const { fruit } = await params
  return (
    <PageTransition>
      <RegisterSuccess fruit={fruit} />
    </PageTransition>
  )
}
