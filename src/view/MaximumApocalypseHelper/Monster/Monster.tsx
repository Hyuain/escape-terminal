import { defineComponent } from 'vue'
import { Header } from '../../../components/Header/Header'
import { useRoute, useRouter } from 'vue-router'
import { useMADataStore } from '../tools/dataManager'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { MonsterItem } from '../MonsterList/MonsterItem/MonsterItem'
import { PlayerItem } from '../PlayerList/components/PlayerItem/PlayerItem'

export const Monster = defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const dataStore = useMADataStore()
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
      dataStore.destroyMonster(monsterId)
      router.back()
    }

    return () => <PageWrapper>
      <Header title={monster?.name || ''} onClickBack={() => router.back()}/>
      {monster
        ? <div>
          <div>{monster.name}</div>
          <div>
            <div>HP: {monster.hp}</div>
            <div onClick={() => editMonsterHp(-1)}>-</div>
            <div onClick={() => editMonsterHp(+1)}>+</div>
          </div>
          <div>MaxHp: {monster.maxHp}</div>
          <div>Position: {hostPlayerMap?.name}</div>
          <div>ATK: {monster.atk}</div>
          <div>HostPlayer: </div>
          <div>
            <PlayerItem player={hostPlayer}/>
          </div>
          <div>AllPlayers:</div>
          <div>
            {allPlayers.map((player) => <PlayerItem
              player={player}
            />)}
          </div>
          <div onClick={() => handleDestroyMonster()}>Destroy Monster</div>
        </div>
        : <div>No Data</div>
      }
    </PageWrapper>
  },
})
