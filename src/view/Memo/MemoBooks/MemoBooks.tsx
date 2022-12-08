import { defineComponent } from 'vue'
import s from './MemoBooks.module.scss'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { Header } from '@/components/Header/Header'
import { useRouter } from 'vue-router'

export const MemoBooks = defineComponent({
  setup() {
    const router = useRouter()

    return () => <PageWrapper>
      <Header onClickBack={() => router.replace('/home')} title='Memo' />
    </PageWrapper>
  }
})
