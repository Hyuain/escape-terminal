import { defineComponent } from 'vue'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { Header } from '@/components/Header/Header'
import s from './Setting.module.scss'
import { useRouter } from 'vue-router'
import { Card } from '@/components/Card/Card'
import NextSVG from '../../assets/next.svg'
import { ISetting } from '@/view/Setting/Setting.interface'
import { useUserStore } from '@/stores/user'
import { useModal } from '@/stores/modal'

export const Setting = defineComponent({
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const modal = useModal()

    const SETTINGS: Array<ISetting[]> = [
      [
        { name: 'Profile', path: '/profile' },
        {
          name: 'Language',
          path: '',
          callback: () => {
            modal.showModal({
              title: 'Coming Soon!',
              content: 'Multiple languages are still in development...',
            })
          },
        },
      ],
      [
        {
          name: 'Sign out',
          path: '',
          textStyle: { color: 'orangered', textAlign: 'center' },
          hideIcon: true,
          callback: () => {
            signOut()
          }
        },
      ],
    ]

    const handleClickSetting = (setting: ISetting) => {
      if (setting.path) {
        return router.push(setting.path)
      }
      setting.callback?.()
    }

    const signOut = () => {
      modal.showModal({
        title: 'Sign Out?',
        onConfirm: () => {
          userStore.signOut()
        },
        onCancel: () => {
          modal.closeModal()
        }
      })
    }

    return () => <PageWrapper>
      <Header title="Setting" onClickBack={() => router.replace('/home')}></Header>
      {SETTINGS.map((settingGroup) => {
        return <Card class={s.card}>
          {settingGroup.map((setting) => {
            return <div class={s.cardItem} onClick={() => handleClickSetting(setting)}>
              <div class={s.text} style={{ ...(setting.textStyle || {}) }}>
                {setting.name}
              </div>
              {setting.hideIcon
                ? null
                : <div class={s.icon}>
                  <NextSVG width={20} height={20}/>
                </div>
              }
            </div>
          })}
        </Card>
      })}
    </PageWrapper>
  },
})
