import { defineComponent } from 'vue'
import { Header } from '@/components/Header/Header'
import { MAHelperContent } from '../components/MAHelperContent/MAHelperContent'
import { MAHelperNavBar } from '../components/MAHelperNavBar/MAHelperNavBar'
import { MAHelperNavBarLabel } from '../components/MAHelperNavBar/MAHelperNavBar.interface'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { useMADataStore } from '../tools/dataManager'
import { useModal } from '@/stores/modal'
import { PlayerItem } from './components/PlayerItem/PlayerItem'
import { useRouter } from 'vue-router'
import { IPlayer } from '../tools/dataManager.interface'
import { useActionSheet } from '@/stores/actionSheet'

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

    const handleClickPlayer = (player: IPlayer) => {
      router.push({
        path:'/ma_helper/player',
        query: {
          id: player.id,
        },
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
          modal.showModal({
            title: 'Confirm Action?',
            content: `Monster will be killed, and be removed from the current monster list. This action can NOT be revoked!`,
            onConfirm: () => {
              dataStore.destroyMonster(monsterId)
              modal.closeModal()
            },
            onCancel: () => {
              modal.closeModal()
            }
          })
        }
      })
    }

    const handleAddMonster = (player: IPlayer) => {
      const monstersSetWithThisPlayer = new Set(player.monsters)
      const monsters = maDataWrapper.data.monsters.filter((monster) => !monstersSetWithThisPlayer.has(monster.id))
      modal.showModal({
        list: monsters.map((item) => item.name) as string[],
        onClickListItem: (index) => attachMonster(monsters[index].id, player.id),
      })
    }

    const handleShowDeletePlayerModal = (player: IPlayer) => {
      modal.showModal({
        title: 'Confirm Deletion?',
        content: '* Monsters will NOT be removed from the monster list.',
        onConfirm: () => handleDeletePlayer(player.id),
        onCancel: () => modal.closeModal(),
      })
    }

    const handleDeletePlayer = (playerId: string) => {
      dataStore.removePlayer(playerId)
      modal.closeModal()
    }

    const attachMonster = (monsterId: string, playerId: string) => {
      dataStore.attachMonster(monsterId, playerId)
      modal.closeModal()
    }

    return () => <PageWrapper>
      <Header onClickBack={() => router.replace('/home')} title='MA Helper'></Header>
      <MAHelperContent>
        {maDataWrapper.data.players.map((player) => <PlayerItem
          player={player}
          onClickPlayer={() => handleClickPlayer(player)}
          onDeletePlayer={() => handleShowDeletePlayerModal(player)}
          onAddMonster={() => handleAddMonster(player)}
          onClickMonster={(monsterId) => handleClickMonster(monsterId, player.id)}
        />)}
        <PlayerItem onAddPlayer={handleAddPlayers} />
      </MAHelperContent>
      <MAHelperNavBar selectedLabel={MAHelperNavBarLabel.PLAYERS} />
    </PageWrapper>
  }
})
