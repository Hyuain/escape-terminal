import { defineComponent } from 'vue'
import { Header } from '../../../components/Header/Header'
import { MAHelperContent } from '../components/MAHelperContent/MAHelperContent'
import { MAHelperNavBar } from '../components/MAHelperNavBar/MAHelperNavBar'
import { MAHelperNavBarLabel } from '../components/MAHelperNavBar/MAHelperNavBar.interface'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { useMADataStore } from '../tools/dataManager'
import { useModal } from '../../../stores/modal'
import { PlayerItem } from './components/PlayerItem/PlayerItem'
import { useRouter } from 'vue-router'
import { IPlayer } from '../tools/dataManager.interface'
import { useActionSheet } from '../../../stores/actionSheet'

export const PlayerList = defineComponent({
  setup() {
    const dataStore = useMADataStore()
    const router = useRouter()
    const modal = useModal()
    const actionSheet = useActionSheet()

    const maDataWrapper = dataStore.getWrapper()

    const handleAddPlayers = () => {
      router.push({
        path: '/ma_helper/add_pom',
        query: {
          type: 'players',
        }
      })
    }

    const handleClickMonster = (monsterId: string, playerId: string) => {
      actionSheet.showActionSheet([
        { text: 'Show Monster Detail' },
        { text: 'Detach Monster' },
        { text: 'Destroy Monster' },
      ]).then((index) => {
        if (index === 0) {
          router.push({
            path: '/ma_helper/monster',
            query: {
              id: monsterId,
            }
          })
        } else if (index === 1) {
          dataStore.detachMonster(monsterId, playerId)
        } else if (index === 2) {
          dataStore.destroyMonster(monsterId)
        }
      })
    }

    const handleAddMonster = (player: IPlayer) => {
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

    return () => <PageWrapper>
      <Header title='Maximum Apocalypse Helper'></Header>
      <MAHelperContent>
        {maDataWrapper.data.players.map((player) => <PlayerItem
          player={player}
          isShowMonsters
          onAddMonster={() => handleAddMonster(player)}
          onClickMonster={(monsterId) => handleClickMonster(monsterId, player.id)}
        />)}
        <PlayerItem onAddPlayer={handleAddPlayers} />
      </MAHelperContent>
      <MAHelperNavBar selectedLabel={MAHelperNavBarLabel.PLAYERS} />
    </PageWrapper>
  }
})
