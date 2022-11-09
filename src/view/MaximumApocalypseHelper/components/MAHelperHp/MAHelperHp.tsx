import { defineComponent } from 'vue'
import { Progress } from '@/components/Progress/Progress'
import PlusSVG from '../../../../assets/plus.svg'
import MinusSVG from '../../../../assets/minus.svg'
import s from './MAHelperHp.module.scss'

export const MAHelperHp = defineComponent({
  props: {
    hp: Number,
    maxHp: {
      type: Number,
      required: true,
    },
  },
  emits: ['editHp'],
  setup(props, context) {
    return () => <div class={s.hpWrapper}>
      <Progress percentage={(props.hp === undefined ? props.maxHp : props.hp) / props.maxHp}/>
      <div class={s.hpText}>{props.hp}/{props.maxHp}</div>
      <div class={s.hpIcons}>
        <div onClick={() => context.emit('editHp', -1)}>
          <MinusSVG width={32} height={32}/>
        </div>
        <div onClick={() => context.emit('editHp', +1)}>
          <PlusSVG width={32} height={32}/>
        </div>
      </div>
    </div>
  },
})
