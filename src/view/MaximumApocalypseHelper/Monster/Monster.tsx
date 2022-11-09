import { defineComponent } from 'vue'
import { Header } from '@/components/Header/Header'
import { useRoute, useRouter } from 'vue-router'
import { useMADataStore } from '../tools/dataManager'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { PlayerItem } from '../PlayerList/components/PlayerItem/PlayerItem'
import { Card } from '@/components/Card/Card'
import s from './Monster.module.scss'
import { MAHelperHp } from '@/view/MaximumApocalypseHelper/components/MAHelperHp/MAHelperHp'
import { PlayerItemTheme } from '@/view/MaximumApocalypseHelper/PlayerList/components/PlayerItem/PlayerItem.interface'
import { NoData } from '@/components/NoData/NoData'
import { NoDataTheme } from '@/components/NoData/NoData.interface'
import { useModal } from '@/stores/modal'
import { IMonster } from '@/view/MaximumApocalypseHelper/tools/dataManager.interface'

export const Monster = defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const dataStore = useMADataStore()
    const modal = useModal()
    const maDataWrapper = dataStore.getWrapper()
    const monsterId: string = route.query.id as string
    const monster = dataStore.getOne('monsters', monsterId)
    const hostPlayer = dataStore.getMonsterAttachedPlayer(monster?.id)
    const hostPlayerMap = dataStore.getPlayerPosition(hostPlayer?.id)
    const allPlayers = dataStore.getPlayersUsingMap(hostPlayerMap?.id)

    const editMonsterHp = (delta: number) => {
      if (!monster) { return }
      if (monster.hp === undefined) {
        monster.hp = monster.maxHp
      }
      monster.hp = monster.hp + delta
      dataStore.update('monsters', monster)
    }

    const handleDestroyMonster = () => {
      modal.showModal({
        title: 'Confirm Action?',
        content: `${monster!.name} will be killed, and be removed from the current monster list. This action can NOT be revoked!`,
        onConfirm: () => {
          dataStore.destroyMonster(monsterId)
          modal.closeModal()
          router.back()
        },
        onCancel: () => {
          modal.closeModal()
        }
      })
    }

    const handleClickPlayer = (playerId: string) => {
      router.push({
        path: '/ma_helper/player',
        query: {
          id: playerId,
        },
      })
    }

    return () => <PageWrapper>
      <Header title={monster?.name || ''} onClickBack={() => router.back()}/>
      <Card class={s.card}>
        {monster
          ? <div>
            <div class={s.name}>{monster.name}</div>
            <MAHelperHp hp={monster.hp} maxHp={monster.maxHp} onEditHp={editMonsterHp}/>
            <div>ATK: <span class={s.propValue}>{monster.atk}</span></div>
            <div>Position: <span class={s.propValue}>{hostPlayerMap?.name}</span></div>
            <div>HostPlayer:</div>
            <div>
              {hostPlayer
                ? <PlayerItem
                  theme={PlayerItemTheme.MONSTER_DETAIL}
                  onClickPlayer={() => handleClickPlayer(hostPlayer.id)}
                  player={hostPlayer}/>
                : <NoData theme={NoDataTheme.DARK}/>
              }
            </div>
            <div>AllPlayers:</div>
            <div>
              {allPlayers.map((player) => <PlayerItem
                theme={PlayerItemTheme.MONSTER_DETAIL}
                player={player}
              />) || <NoData theme={NoDataTheme.DARK} />}
            </div>
            <div class={s.destroy} onClick={() => handleDestroyMonster()}>Destroy Monster</div>
          </div>
          : <NoData />
        }
      </Card>

    </PageWrapper>
  },
})
