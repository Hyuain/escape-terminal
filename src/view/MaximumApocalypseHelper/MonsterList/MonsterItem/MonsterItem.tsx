import { defineComponent, PropType } from 'vue'
import { IMonster } from '../../tools/dataManager.interface'
import { Card } from '@/components/Card/Card'
import s from './MonsterItem.module.scss'
import { useMADataStore } from '../../tools/dataManager'
import { MonsterItemTheme } from '@/view/MaximumApocalypseHelper/MonsterList/MonsterItem/MonsterItem.interface'

export const MonsterItem = defineComponent({
  props: {
    monsterId: {
      type: String,
    },
    monster: {
      type: Object as PropType<IMonster>,
    },
    isSelected: Boolean,
    theme: {
      type: Number as PropType<MonsterItemTheme>,
      default: MonsterItemTheme.MONSTER_LIST,
    },
  },
  emits: ['addMonster', 'clickMonster'],
  setup(props, context) {
    const dataStore = useMADataStore()
    const monster = props.monster || dataStore.getOne('monsters', props.monsterId)
    const hostPlayer = dataStore.getMonsterAttachedPlayer(monster?.id)
    const hostPlayerMap = dataStore.getPlayerPosition(hostPlayer?.id)
    const allPlayers = dataStore.getPlayersUsingMap(hostPlayerMap?.id)
    console.log('xxx', props.theme === MonsterItemTheme.PLAYER_DETAIL)

    return () => <Card
      class={{
        [`${s.playerDetailWrapper}`]: props.theme === MonsterItemTheme.PLAYER_DETAIL,
        [`${s.monsterListWrapper}`]: props.theme === MonsterItemTheme.MONSTER_LIST,
        [`${s.addMonstersWrapper}`]: props.theme === MonsterItemTheme.ADD_MONSTERS,
        [`${s.wrapper}`]: true,
        [`${s.selected}`]: props.isSelected,
      }}
      addNewItem={monster ? undefined : { text: 'Add Monster' }}
      onClickAdd={() => context.emit('addMonster')}
    >
      {monster
        ? <div onClick={() => context.emit('clickMonster')}>
          <div class={s.name}>{monster.name}</div>
          <div>HP {monster.hp}/{monster.maxHp},
            ATK {monster.atk}{hostPlayer?.name ? `, with ${hostPlayer?.name}` : ''}{hostPlayerMap?.name ? `, @${hostPlayerMap?.name}` : ''}</div>
        </div>
        : null}
    </Card>
  },
})
