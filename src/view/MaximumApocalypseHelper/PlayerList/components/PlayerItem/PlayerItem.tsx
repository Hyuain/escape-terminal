import { defineComponent, PropType } from 'vue'
import { IPlayer } from '../../../tools/dataManager.interface'
import { MAHelperAvatar } from '../../../components/MAHelperAvatar/MAHelperAvatar'
import { useMADataStore } from '../../../tools/dataManager'
import { PlayerItemTheme } from '@/view/MaximumApocalypseHelper/PlayerList/components/PlayerItem/PlayerItem.interface'
import { Card } from '@/components/Card/Card'
import s from './PlayerItem.module.scss'

export const PlayerItem = defineComponent({
  props: {
    player: Object as PropType<IPlayer>,
    isSelected: Boolean,
    theme: {
      type: Number as PropType<PlayerItemTheme>,
      default: PlayerItemTheme.PLAYER_LIST,
    },
  },
  emits: ['addPlayer', 'clickPlayer', 'deletePlayer', 'addMonster', 'clickMonster'],
  setup(props, context) {
    const dataStore = useMADataStore()

    return () => <Card
      class={{
      [`${s.monsterDetailWrapper}`]: props.theme === PlayerItemTheme.MONSTER_DETAIL,
      [`${s.playerListWrapper}`]: props.theme === PlayerItemTheme.PLAYER_LIST,
      [`${s.addPlayersWrapper}`]: props.theme === PlayerItemTheme.ADD_PLAYERS,
      [`${s.card}`]: true,
      [`${s.selected}`]: props.isSelected,
    }}
      addNewItem={props.player ? undefined : { text: 'Add Player' }}
      isShowCancel={!!props.player && props.theme === PlayerItemTheme.PLAYER_LIST}
      onClickAdd={() => context.emit('addPlayer')}
      onClickCancel={() => context.emit('deletePlayer')}
    >
      {props.player
        ? <div>
          <div onClick={() => context.emit('clickPlayer', props.player)} class={s.name}>{props.player.name}</div>
          {props.theme === PlayerItemTheme.PLAYER_LIST
            ? <div class={s.monstersWrapper}>
              {props.player.monsters?.map((monsterId) => <MAHelperAvatar
                type="monsters"
                onClick={() => context.emit('clickMonster', monsterId)}
                id={monsterId}/>)}
              <MAHelperAvatar type="monsters" onClick={() => context.emit('addMonster')}/>
            </div>
            : null}
        </div>
        : null}
    </Card>
  },
})
