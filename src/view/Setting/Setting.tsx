import { defineComponent } from 'vue'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { Header } from '@/components/Header/Header'
import s from './Setting.module.scss'
import { useRouter } from 'vue-router'

export const Setting = defineComponent({
  setup() {
    const router = useRouter()

    return () => <PageWrapper>
      <Header title='Setting' onClickBack={() => router.replace('/home')}></Header>
    </PageWrapper>
  }
})
