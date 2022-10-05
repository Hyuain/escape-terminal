import { defineComponent, ref } from 'vue'
import s from './SignIn.module.scss'
import { Input } from '../../components/Input/Input'
import { NextButton } from '../../components/NextButton/NextButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { InputTheme } from '../../components/Input/Input.interface'

export const SignIn = defineComponent({
  setup(props) {
    const emailErrorRef = ref('')
    const passwordErrorRef = ref('')
    return () => <PageWrapper>
      <div class={s.welcome}>Welcome</div>
      <Input
        errorText={emailErrorRef.value}
        theme={InputTheme.WELCOME}
        inputProps={{ placeholder: '邮箱' }}
      />
      <Input
        errorText={passwordErrorRef.value}
        theme={InputTheme.WELCOME}
        inputProps={{ type: 'password', placeholder: '密码' }} />
      <NextButton class={s.button} />
      <div class={s.bottom}>
        <router-link class={s.signInLink} to='/sign_up'>立即注册</router-link>
      </div>
    </PageWrapper>
  }
})
