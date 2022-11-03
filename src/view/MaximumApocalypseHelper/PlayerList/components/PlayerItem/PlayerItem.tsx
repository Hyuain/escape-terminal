import { defineComponent, PropType } from 'vue'
import { IPlayer } from '../../../tools/dataManager.interface'
import s from './PlayerItem.module.scss'

export const PlayerItem = defineComponent({
  props: {
    player: Object as PropType<IPlayer>,
    isSelected: Boolean,
  },
  emits: ['addPlayer', 'clickPlayer'],
  setup(props, context) {
    return () => <div class={{ [`${s.item}`]: true, [`${s.selected}`]: props.isSelected }}>
      {props.player
        ? <div onClick={() => context.emit('clickPlayer', props.player)}>{props.player.name}</div>
        : <div onClick={() => context.emit('addPlayer')}>+</div>
      }
    </div>
  }
})
