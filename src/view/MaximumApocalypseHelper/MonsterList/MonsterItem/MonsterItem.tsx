import { defineComponent, PropType } from 'vue'
import { IMonster } from '../../tools/dataManager.interface'
import s from './MonsterItem.module.scss'

export const MonsterItem = defineComponent({
  props: {
    monster: {
      type: Object as PropType<IMonster>,
    },
    isSelected: Boolean,
  },
  emits: ['addMonster', 'clickMonster'],
  setup(props, context) {
    return () => <div
      class={{ [`${s.item}`]: true, [`${s.selected}`]: props.isSelected }}
    >
      {props.monster
        ? <div onClick={() => context.emit('clickMonster')}>
          <div>{props.monster.name}</div>
          <div>HP: {props.monster.hp}/{props.monster.maxHp}</div>
          <div>ATK: {props.monster.atk}</div>
        </div>
        : <div onClick={() => context.emit('addMonster')}>+</div>}
    </div>
  },
})
