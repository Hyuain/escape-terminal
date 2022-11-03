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
  emits: ['click'],
  setup(props, context) {
    const dataStore = useMADataStore()
    return () => <div onClick={(e) => context.emit('click', e)} class={s.avatar}>
      {
        props.id
          ? dataStore.getOne(props.type, props.id)?.name
          : <div>+</div>
      }
    </div>
  }
})
