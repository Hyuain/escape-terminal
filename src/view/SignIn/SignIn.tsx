import { defineComponent, ref } from 'vue'
import { Input } from '../../components/Input/Input'
import { NextButton } from '../../components/NextButton/NextButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { InputTheme } from '../../components/Input/Input.interface'
import { useRouter } from 'vue-router'
import s from './SignIn.module.scss'
import { WelcomeStep } from './SignIn.interface'
import { ValidationCode } from '../../components/ValidationCode/ValidationCode'

const VALIDATION_CODE_DIGITS = 4

export const SignIn = defineComponent({
  setup(props) {
    const errorMsgRef = ref('')
    const stepRef = ref(WelcomeStep.VALIDATION)

    const router = useRouter()

    const handleClickNext = () => {
      router.replace('/home')
    }

    const handleInputValidationCode = (validationCodeArray: string[]) => {
      const validationCode = validationCodeArray.join('')
      if (validationCode.length < VALIDATION_CODE_DIGITS) { return }
      stepRef.value = WelcomeStep.SET_PASSWORD
    }

    const CONTENT_MAP = {
      [WelcomeStep.ENTER_EMAIL]: {
        child: () => <>
          <Input
            theme={InputTheme.WELCOME}
            inputProps={{ placeholder: 'Email' }}
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
          <Input
            theme={InputTheme.WELCOME}
            inputProps={{ placeholder: 'Email' }}
          />
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
