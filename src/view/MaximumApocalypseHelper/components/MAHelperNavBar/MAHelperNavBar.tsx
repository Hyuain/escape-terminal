import { defineComponent, PropType } from 'vue'
import s from './MAHelperNavBar.module.scss'
import { IAction, MAHelperNavBarLabel } from './MAHelperNavBar.interface'
import { useRouter } from 'vue-router'

const ACTIONS: IAction[] = [
  { label: MAHelperNavBarLabel.MAP, icon: 'ICON', path: 'map' },
  { label: MAHelperNavBarLabel.PLAYERS, icon: 'ICON', path: 'player_list' },
  { label: MAHelperNavBarLabel.MONSTERS, icon: 'ICON', path: 'monster_list' }
]

export const MAHelperNavBar = defineComponent({
  props: {
    selectedLabel: {
      type: String as PropType<MAHelperNavBarLabel>,
      default: MAHelperNavBarLabel.MAP,
    }
  },
  setup(props) {
    const router = useRouter()

    const handleChangeLabel = (action: IAction) => {
      router.replace(`/ma_helper/${action.path}`)
    }

    return () => <div class={s.navBar}>
      {ACTIONS.map((action) => {
        return <div onClick={() => handleChangeLabel(action)} class={{ [`${s.item}`]: true, [`${s.selected}`]: props.selectedLabel === action.label }}>
          <div>{action.icon}</div>
          <div>{action.label}</div>
        </div>
      })}
    </div>
  }
})
