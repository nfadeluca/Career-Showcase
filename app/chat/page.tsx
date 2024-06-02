import { genPageMetadata } from 'app/seo'
import ChatComponent from '@/components/ChatComponent'
import PageTitle from '@/components/PageTitle'

export const metadata = genPageMetadata({ title: 'Chat' })

export default function Page() {
  return (
    <div>
      <PageTitle>Chat with Nick</PageTitle>
      <ChatComponent />
    </div>
  )
}
