import { defineComponent } from 'vue'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { Header } from '../../../components/Header/Header'
import { useRoute, useRouter } from 'vue-router'
import { useMADataStore } from '../tools/dataManager'
import { MonsterItem } from '../MonsterList/MonsterItem/MonsterItem'
import { useModal } from '../../../stores/modal'

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
        }
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
      {player
        ? <div>
          <div>{player.name}</div>
          <div>
            <div>HP: {player.hp}</div>
            <div onClick={() => editPlayerHp(-1)}>-</div>
            <div onClick={() => editPlayerHp(+1)}>+</div>
          </div>
          <div>MaxHp: {player.maxHp}</div>
          <div>Monsters:</div>
          <div>
            {player.monsters?.map((monsterId) => <MonsterItem
              onClickMonster={() => handleClickMonster(monsterId)}
              monsterId={monsterId}
            />)}
            <MonsterItem onAddMonster={() => handleAddMonster()} />
          </div>
        </div>
        : <div>No Data</div>
      }
    </PageWrapper>
  },
})
