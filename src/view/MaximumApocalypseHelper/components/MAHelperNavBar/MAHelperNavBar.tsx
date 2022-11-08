import { defineComponent, PropType } from 'vue'
import s from './MAHelperNavBar.module.scss'
import { IAction, MAHelperNavBarLabel } from './MAHelperNavBar.interface'
import { useRouter } from 'vue-router'
import MapSVG from '../../../../assets/map.svg'
import PlayerSVG from '../../../../assets/player.svg'
import MonsterSVG from '../../../../assets/monster.svg'

const ICON_SIZE = 32

const ACTIONS: IAction[] = [
  { label: MAHelperNavBarLabel.MAP, icon: <MapSVG width={ICON_SIZE} height={ICON_SIZE} />, path: 'map' },
  { label: MAHelperNavBarLabel.PLAYERS, icon: <PlayerSVG width={ICON_SIZE} height={ICON_SIZE} />, path: 'player_list' },
  { label: MAHelperNavBarLabel.MONSTERS, icon: <MonsterSVG width={ICON_SIZE} height={ICON_SIZE} />, path: 'monster_list' }
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
          <div class={s.icon}>{action.icon}</div>
          <div class={s.label}>{action.label}</div>
        </div>
      })}
    </div>
  }
})
