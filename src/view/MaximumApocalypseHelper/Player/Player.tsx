import { defineComponent } from 'vue'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { Header } from '@/components/Header/Header'
import { useRoute, useRouter } from 'vue-router'
import { useMADataStore } from '../tools/dataManager'
import { MonsterItem } from '../MonsterList/MonsterItem/MonsterItem'
import { useModal } from '@/stores/modal'
import { Card } from '@/components/Card/Card'
import s from './Player.module.scss'
import { Progress } from '@/components/Progress/Progress'
import PlusSVG from '../../../assets/plus.svg'
import MinusSVG from '../../../assets/minus.svg'
import { MonsterItemTheme } from '@/view/MaximumApocalypseHelper/MonsterList/MonsterItem/MonsterItem.interface'
import { MAHelperHp } from '@/view/MaximumApocalypseHelper/components/MAHelperHp/MAHelperHp'

export const Player = defineComponent({
  setup() {
    const modal = useModal()
    const router = useRouter()
    const route = useRoute()
    const dataStore = useMADataStore()
    const maDataWrapper = dataStore.getWrapper()
    const playerId: string = route.query.id as string
    const player = dataStore.getOne('players', playerId)

    const handleClickMonster = (monsterId: string) => {
      router.push({
        path: '/ma_helper/monster',
        query: {
          id: monsterId,
        },
      })
    }

    const handleAddMonster = () => {
      if (!player) { return }
      const monstersSetWithThisPlayer = new Set(player.monsters)
      modal.showModal({
        render: () => <div>
          {maDataWrapper.data.monsters.filter((monster) => !monstersSetWithThisPlayer.has(monster.id))
            .map((monster) => <div onClick={() => attachMonster(monster.id, player.id)}>
              {monster.name}
            </div>)}
        </div>,
      })
    }

    const attachMonster = (monsterId: string, playerId: string) => {
      dataStore.attachMonster(monsterId, playerId)
      modal.closeModal()
    }

    const editPlayerHp = (delta: number) => {
      if (!player) { return }
      if (player.hp === undefined) {
        player.hp = player.maxHp
      }
      player.hp = player.hp + delta
      dataStore.update('players', player)
    }

    return () => <PageWrapper>
      <Header title={player?.name || ''} onClickBack={() => router.back()}/>
      <Card class={s.card}>
        {player
          ? <div>
            <div class={s.name}>{player.name}</div>
            <MAHelperHp hp={player.hp} maxHp={player.maxHp} onEditHp={editPlayerHp} />
            <div class={s.monsterTitle}>Monster(s):</div>
            <div>
              {player.monsters?.map((monsterId) => <MonsterItem
                theme={MonsterItemTheme.PLAYER_DETAIL}
                onClickMonster={() => handleClickMonster(monsterId)}
                monsterId={monsterId}
              />)}
              <MonsterItem theme={MonsterItemTheme.PLAYER_DETAIL} onAddMonster={() => handleAddMonster()}/>
            </div>
          </div>
          : <div>No Data</div>
        }
      </Card>
    </PageWrapper>
  },
})
