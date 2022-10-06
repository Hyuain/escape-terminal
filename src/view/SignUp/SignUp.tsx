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


export const SignUp = defineComponent({
  setup() {
    const router = useRouter()
    //
    //
    // // TODO: if not use function, there are something wrong with the rendering, is it about ref?
    // const getNextButton = () => {
    //   return CONTENT_MAP[stepRef.value].isShowNextButton ? <NextButton onClick={handleClickNext} /> : null
    // }
    //
    // return () => <PageWrapper class={s.pageWrapper}>
    //   <div class={s.content}>
    //     <div>
    //       {CONTENT_MAP[stepRef.value].child()}
    //     </div>
    //     {getNextButton()}
    //   </div>
    // </PageWrapper>
  },
})
