import { defineComponent, PropType } from 'vue'
import { IPlayer } from '../../../tools/dataManager.interface'
import s from './PlayerItem.module.scss'
import { MAHelperAvatar } from '../../../components/MAHelperAvatar/MAHelperAvatar'
import { useMADataStore } from '../../../tools/dataManager'

export const PlayerItem = defineComponent({
  props: {
    player: Object as PropType<IPlayer>,
    playerId: String,
    isSelected: Boolean,
    isShowMonsters: Boolean,
  },
  emits: ['addPlayer', 'clickPlayer', 'addMonster', 'clickMonster'],
  setup(props, context) {
    const dataStore = useMADataStore()

    const player: IPlayer = props.player || dataStore.getOne('monsters', props.playerId) as IPlayer

    return () => <div class={{ [`${s.item}`]: true, [`${s.selected}`]: props.isSelected }}>
      {player
        ? <div onClick={() => context.emit('clickPlayer', props.player)}>
          <div>{player.name}</div>
          {props.isShowMonsters
            ? <div>
              {player.monsters?.map((monsterId) => <MAHelperAvatar
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
