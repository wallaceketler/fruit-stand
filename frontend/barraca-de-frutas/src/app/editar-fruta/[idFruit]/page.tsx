import { PageTransition } from '@/components/PageTransition/PageTransition'
import { EditFruit } from '@/screens/editFruit/EditFruit'

interface EditFruitPageProps {
  params: Promise<{ idFruit: string }>
}

export default async function EditFruitPage({ params }: EditFruitPageProps) {
  const { idFruit } = await params
  return (
    <PageTransition>
      <EditFruit idFruit={idFruit} />
    </PageTransition>
  )
}
