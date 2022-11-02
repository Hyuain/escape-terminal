import { defineComponent, PropType } from 'vue'
import s from './MAMapCard.module.scss'
import { useMADataStore } from '../../tools/dataManager'
import { MAHelperAvatar } from '../../components/MAHelperAvatar/MAHelperAvatar'
import { IMap } from '../../tools/dataManager.interface'

export const MAMapCard = defineComponent({
  props: {
    map: Object as PropType<IMap>,
    // id: {
    //   type: String,
    // },
  },
  emits: ['click'],
  setup(props, context) {
    // const dataStore = useMADataStore()
    const handleClick = () => {
      context.emit('click')
    }

    return () => <div onClick={handleClick} class={s.card}>
      {
        props.map
          ? <div>
            <div>{props.map.name || 'Default Name'}</div>
            <div>
              {props.map.players.map((player) => <MAHelperAvatar id={player}/>)}
              <MAHelperAvatar />
            </div>
          </div>
          : <div>+</div>
      }
    </div>
  },
})
