import { defineComponent, PropType } from 'vue'
import { IMonster } from '../../tools/dataManager.interface'
import s from './MonsterItem.module.scss'
import { useMADataStore } from '../../tools/dataManager'

export const MonsterItem = defineComponent({
  props: {
    monster: {
      type: Object as PropType<IMonster>,
    },
    isSelected: Boolean,
  },
  emits: ['addMonster', 'clickMonster'],
  setup(props, context) {
    const dataStore = useMADataStore()
    const hostPlayer = dataStore.getMonsterAttachedPlayer(props.monster?.id)
    const hostPlayerMap = dataStore.getPlayerPosition(hostPlayer?.id)
    const allPlayers = dataStore.getPlayersUsingMap(hostPlayerMap?.id)

    return () => <div
      class={{ [`${s.item}`]: true, [`${s.selected}`]: props.isSelected }}
    >
      {props.monster
        ? <div onClick={() => context.emit('clickMonster')}>
          <div>{props.monster.name}</div>
          <div>HP: {props.monster.hp}/{props.monster.maxHp}</div>
          <div>ATK: {props.monster.atk}</div>
          <div>Host Player: {hostPlayer?.name}</div>
          <div>Position: {hostPlayerMap?.name}</div>
          <div>All Players: {allPlayers?.map((item) => <span>{item.name}</span>)}</div>
        </div>
        : <div onClick={() => context.emit('addMonster')}>+</div>}
    </div>
  },
})
