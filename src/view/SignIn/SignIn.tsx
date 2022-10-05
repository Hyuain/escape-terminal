import { defineComponent, ref } from 'vue'
import s from './SignIn.module.scss'
import { Input } from '../../components/Input/Input'
import { NextButton } from '../../components/NextButton/NextButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'

export const SignIn = defineComponent({
  setup(props) {
    const emailErrorRef = ref('')
    const passwordErrorRef = ref('')
    return () => <PageWrapper>
      <div class={s.welcome}>Welcome</div>
      <div class={s.input}>
        <Input
          errorText={emailErrorRef.value}
          inputProps={{ placeholder: '邮箱' }}
        />
      </div>
      <div class={s.input}>
        <Input
          errorText={passwordErrorRef.value}
          inputProps={{ type: 'password', placeholder: '密码' }} />
      </div>
      <NextButton class={s.button} />
      <div class={s.bottom}>
        <router-link class={s.signInLink} to='/sign-up'>哈哈哈</router-link>
      </div>
    </PageWrapper>
  }
})
