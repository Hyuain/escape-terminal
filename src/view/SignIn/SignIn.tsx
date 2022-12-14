import { defineComponent, ref } from 'vue'
import { Input } from '@/components/Input/Input'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { InputTheme } from '@/components/Input/Input.interface'
import { useRouter } from 'vue-router'
import s from './SignIn.module.scss'
import { WelcomeStep } from './SignIn.interface'
import { ValidationCode } from '@/components/ValidationCode/ValidationCode'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const VALIDATION_CODE_DIGITS = 4

export const SignIn = defineComponent({
  setup(props) {
    const errorMsgRef = ref('')
    const userStore = useUserStore()
    const router = useRouter()

    const stepRef = ref(WelcomeStep.ENTER_EMAIL)
    const formRef = ref({
      email: '',
      validationCode: '',
    })

    const handleClickNext = () => {
      if (stepRef.value === WelcomeStep.ENTER_EMAIL) {
        const error = getEmailError()
        if (error) { return alert(error) }
        sendVerificationCode()
      } else if (stepRef.value === WelcomeStep.VALIDATION) {
        const error = getValidationCodeError()
        if (error) { return alert(error) }
        signIn()
      }
    }

    const getEmailError = () => {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formRef.value.email)
        ? ''
        : 'Please enter valid email address'
    }

    const getValidationCodeError = () => {
      return formRef.value.validationCode.length === VALIDATION_CODE_DIGITS
        ? ''
        : `Please enter ${VALIDATION_CODE_DIGITS} digits validation code`
    }

    const handleInputValidationCode = (validationCodeArray: string[]) => {
      const validationCode = validationCodeArray.join('')
      formRef.value.validationCode = validationCode
      if (validationCode.length < VALIDATION_CODE_DIGITS) { return }
      signIn()
    }

    const handleInputEmail = (e: any) => {
      formRef.value.email = e.target!.value
    }

    const sendVerificationCode = () => {
      axios.post('/api/v1/validation_codes', {
        email: formRef.value.email,
      }).then(() => {
        stepRef.value = WelcomeStep.VALIDATION
      })
    }

    const signIn = () => {
      axios.post('/api/v1/sessions', {
        email: formRef.value.email,
        code: formRef.value.validationCode,
      }).then((res) => {
        const jwt = res.data.jwt
        localStorage.setItem('jwt', jwt)
        router.replace('/home')
      }).catch((e) => {
        alert('Improper validation code')
      })
    }

    const CONTENT_MAP = {
      [WelcomeStep.ENTER_EMAIL]: {
        child: () => <>
          <Input
            theme={InputTheme.WELCOME}
            inputProps={{ placeholder: 'Email', onInput: handleInputEmail}}
          />
        </>,
      },
      [WelcomeStep.ENTER_PASSWORD]: {
        child: () => <>
          <Input
            theme={InputTheme.WELCOME}
            inputProps={{ placeholder: 'Authentication Code' }}
          />
        </>
      },
      [WelcomeStep.VALIDATION]: {
        child: () => <>
          <ValidationCode digits={VALIDATION_CODE_DIGITS} onInput={handleInputValidationCode}></ValidationCode>
        </>,
      },
      [WelcomeStep.SET_PASSWORD]: {
        child: () => <>
          <Input theme={InputTheme.WELCOME} inputProps={{ placeholder: 'Authentication Code', type: 'password' }}/>
          <Input theme={InputTheme.WELCOME} inputProps={{ placeholder: 'Confirm Authentication Code', type: 'password' }}/>
        </>,
      }
    }

    return () => <PageWrapper class={s.pageWrapper}>
      <div class={s.inputGroup}>
        {CONTENT_MAP[stepRef.value].child()}
      </div>
      <img onClick={handleClickNext} class={s.link} src='/link.svg' />
      <div class={s.welcome}>Welcome</div>
    </PageWrapper>
  },
})
