import { defineComponent, PropType } from 'vue'
import { useMADataStore } from '../../tools/dataManager'
import s from './MAHelperAvatar.module.scss'

export const MAHelperAvatar = defineComponent({
  props: {
    id: {
      type: String,
    },
    type: {
      type: String as PropType<'monsters' | 'players'>,
      default: 'players',
    },
  },
  setup(props) {
    const dataStore = useMADataStore()
    return () => <div class={s.avatar}>
      {
        props.id
          ? dataStore.getOne(props.type, props.id)?.name
          : <div>+</div>
      }
    </div>
  }
})
