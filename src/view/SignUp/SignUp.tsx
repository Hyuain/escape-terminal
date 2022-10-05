import { defineComponent, ref } from 'vue'
import { Header } from '../../components/Header/Header'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { Input } from '../../components/Input/Input'
import { NextButton } from '../../components/NextButton/NextButton'
import { InputTheme } from '../../components/Input/Input.interface'
import s from './SingUp.module.scss'
import { SignUpStep } from './SignUp.interface'
import { ValidationCode } from '../../components/ValidationCode/ValidationCode'
import { useRouter } from 'vue-router'

const VALIDATION_CODE_DIGITS = 4

export const SignUp = defineComponent({
  setup() {
    const stepRef = ref(SignUpStep.VALIDATION)
    const router = useRouter()

    const handleClickNext = () => {
      if (stepRef.value === SignUpStep.ENTER_EMAIL) {
        stepRef.value = SignUpStep.VALIDATION
      } else if (stepRef.value === SignUpStep.SET_PASSWORD) {
      }
      console.log('click!')
    }

    const handleClickBack = () => {
      if (stepRef.value === SignUpStep.ENTER_EMAIL) {
        router.replace('/sign_in')
      } else if (stepRef.value === SignUpStep.VALIDATION) {
        stepRef.value = SignUpStep.ENTER_EMAIL
      } else if (stepRef.value === SignUpStep.SET_PASSWORD) {
        stepRef.value = SignUpStep.VALIDATION
      }
    }

    const handleInputValidationCode = (validationCodeArray: string[]) => {
      const validationCode = validationCodeArray.join('')
      if (validationCode.length < VALIDATION_CODE_DIGITS) { return }
      stepRef.value = SignUpStep.SET_PASSWORD
    }

    const CONTENT_MAP = {
      [SignUpStep.ENTER_EMAIL]: {
        guide: '请输入邮箱',
        child: () => <>
          <Input theme={InputTheme.WELCOME} inputProps={{ placeholder: '邮箱' }}/>
        </>,
        isShowNextButton: true,
      },
      [SignUpStep.VALIDATION]: {
        guide: '请输入验证码',
        child: () => <>
          <ValidationCode digits={VALIDATION_CODE_DIGITS} onInput={handleInputValidationCode}></ValidationCode>
        </>,
        isShowNextButton: false,
      },
      [SignUpStep.SET_PASSWORD]: {
        guide: '为你的账号设置密码',
        child: () => <>
          <Input theme={InputTheme.WELCOME} inputProps={{ placeholder: '邮箱' }}/>
          <Input theme={InputTheme.WELCOME} inputProps={{ placeholder: '密码', type: 'password' }}/>
        </>,
        isShowNextButton: true,
      }
    }

    // TODO: if not use function, there are something wrong with the rendering, is it about ref?
    const getNextButton = () => {
      return CONTENT_MAP[stepRef.value].isShowNextButton ? <NextButton onClick={handleClickNext} /> : null
    }

    return () => <PageWrapper>
      <Header onClickBack={handleClickBack}></Header>
      <div class={s.content}>
        <div>
          <div class={s.guide}>{CONTENT_MAP[stepRef.value].guide}</div>
          {CONTENT_MAP[stepRef.value].child()}
        </div>
        {getNextButton()}
      </div>
    </PageWrapper>
  },
})
