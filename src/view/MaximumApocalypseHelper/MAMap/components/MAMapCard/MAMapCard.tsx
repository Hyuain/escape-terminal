import { defineComponent, PropType } from 'vue'
import s from './MAMapCard.module.scss'
import { MAHelperAvatar } from '../../../components/MAHelperAvatar/MAHelperAvatar'
import { IMap } from '../../../tools/dataManager.interface'

export const MAMapCard = defineComponent({
  props: {
    map: Object as PropType<IMap>,
    // id: {
    //   type: String,
    // },
  },
  emits: ['addMap', 'addPlayer', 'clickPlayer'],
  setup(props, context) {
    // const dataStore = useMADataStore()

    return () => <div class={s.card}>
      {
        props.map
          ? <div>
            <div>{props.map.name || 'Default Name'}</div>
            <div>
              {props.map.players.map((player) => <MAHelperAvatar onClick={() => context.emit('clickPlayer', player)} id={player}/>)}
              <MAHelperAvatar onClick={() => context.emit('addPlayer')} />
            </div>
          </div>
          : <div onClick={() => context.emit('addMap')}>+</div>
      }
    </div>
  },
})
