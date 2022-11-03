import { defineComponent, PropType } from 'vue'
import { IPlayer } from '../../../tools/dataManager.interface'
import s from './PlayerItem.module.scss'
import { MAHelperAvatar } from '../../../components/MAHelperAvatar/MAHelperAvatar'

export const PlayerItem = defineComponent({
  props: {
    player: Object as PropType<IPlayer>,
    isSelected: Boolean,
    isShowMonsters: Boolean,
  },
  emits: ['addPlayer', 'clickPlayer', 'addMonster', 'clickMonster'],
  setup(props, context) {
    return () => <div class={{ [`${s.item}`]: true, [`${s.selected}`]: props.isSelected }}>
      {props.player
        ? <div onClick={() => context.emit('clickPlayer', props.player)}>
          <div>{props.player.name}</div>
          {props.isShowMonsters
            ? <div>
              {props.player.monsters?.map((monsterId) => <MAHelperAvatar
                type="monsters"
                onClick={() => context.emit('clickMonster', monsterId)}
                id={monsterId}/>)}
              <MAHelperAvatar type="monsters" onClick={() => context.emit('addMonster')}/>
            </div>
            : null}
        </div>
        : <div onClick={() => context.emit('addPlayer')}>+</div>}
    </div>
  },
})
