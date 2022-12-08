import { defineComponent, reactive, ref } from 'vue'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { Header } from '@/components/Header/Header'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { IProfileFormItem, IProfileInfo } from '@/view/Profile/Profile.interface'
import axios from 'axios'
import { Card } from '@/components/Card/Card'
import s from './Profile.module.scss'
import { chooseAndUploadImage, getImageUrl, getOSSUploadParams } from '@/shared/tools'
import EditSVG from '../../assets/edit.svg'
import NextSVG from '../../assets/next.svg'
import { useModal } from '@/stores/modal'
import { Input } from '@/components/Input/Input'

export const Profile = defineComponent({
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const modal = useModal()
    const info = reactive<Partial<IProfileInfo>>({})
    const formRef = ref<IProfileFormItem[]>([])
    const newNameRef = ref<string>('')
    const id = route.query.id
    const isMe = !id

    const initInfo = async (forceRefresh?: boolean) => {
      if (isMe) {
        const res = await userStore.getUser(forceRefresh)
        info.id = res.userId
        info.name = res.nickname
        info.avatar = res.avatar
        info.email = res.email
      } else {
        const res = await axios.get(`/api/v1/robots/${id}`)
        const data = res.data
        info.id = data.id
        info.name = data.name
        info.avatar = data.avatar
      }
      initForm()
    }

    const initForm = () => {
      if (isMe) {
        formRef.value = [
          { key: 'email', label: 'Email', content: info.email, isEditable: false },
        ]
      }
    }

    initInfo().then()

    const uploadImage = () => {
      chooseAndUploadImage().then(({ path }) => {
        updateUserInfo({ avatar: path })
      })
    }

    const updateUserInfo = (data: any) => {
      axios.put('/api/v1/me', data).then(() => {
        initInfo(true)
      })
    }

    const handleClickImage = () => {
      if (!isMe) { return }
      uploadImage()
    }

    const handleClickName = () => {
      modal.showModal({
        title: 'Enter New Nickname',
        contentRender: () => <input
          placeholder={info.name} class={s.modalInput} value={newNameRef.value}
          onInput={(e) => {newNameRef.value = (e.target as any).value}}/>,
        onConfirm: () => {
          updateUserInfo({ nickname: newNameRef.value })
          modal.closeModal()
        },
        onCancel: () => modal.closeModal(),
      })
    }

    return () => <PageWrapper>
      <Header title="Profile" onClickBack={() => router.back()}/>
      <Card class={s.card}>
        <div class={s.avatarWrapper}>
          <img onClick={handleClickImage} src={getImageUrl(info.avatar!)} alt=""/>
          {isMe ? <div class={s.editAvatar}>
            <EditSVG width={16} height={16}/>
          </div> : null}
        </div>
        <div class={s.nameWrapper} onClick={handleClickName}>
          <div class={s.name}>{info.name}</div>
          {isMe ? <EditSVG width={16} height={16}/> : null}
        </div>
        <div class={s.idWrapper}>
          ID: {info.id}
        </div>
        <div class={s.formWrapper}>
          {formRef.value.map((item) => {
            return <div class={s.formItem}>
              <div class={s.formItemLabel}>{item.label}</div>
              <div class={s.formItemContent}>{item.content}</div>
              {item.isEditable ? <div class={s.formItemIcon}><NextSVG width={12} height={12}/></div> : null}
            </div>
          })}
        </div>
      </Card>
    </PageWrapper>
  },
})
