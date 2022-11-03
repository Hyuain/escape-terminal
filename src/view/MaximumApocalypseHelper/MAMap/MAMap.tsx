import { defineComponent } from 'vue'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { MAHelperContent } from '../components/MAHelperContent/MAHelperContent'
import { MAHelperNavBar } from '../components/MAHelperNavBar/MAHelperNavBar'
import { Header } from '../../../components/Header/Header'
import { MAHelperNavBarLabel } from '../components/MAHelperNavBar/MAHelperNavBar.interface'
import { MAMapCard } from './components/MAMapCard'
import { useMADataStore } from '../tools/dataManager'
import { useActionSheet } from '../../../stores/actionSheet'
import { useModal } from '../../../stores/modal'
import { IMap, IPlayer } from '../tools/dataManager.interface'

export const MAMap = defineComponent({
  setup() {
    const dataStore = useMADataStore()
    const actionSheet = useActionSheet()
    const modal = useModal()

    const maps = dataStore.getAll('maps')
    const players = dataStore.getAll('players')

    const handleAddMap = () => {
      dataStore.add('maps')
    }

    const handleClickPlayer = (map: IMap, player: IPlayer) => {
      actionSheet.showActionSheet([
        { text: 'Show Player Detail' },
        { text: 'Move Player' },
      ]).then((index) => {
        if (index === 1) {
          modal.showModal({
            render: () => <div>
              {maps
                .filter((item) => item.id !== map.id)
                .map((item) => <div>
                  <div onClick={() => handleMovePlayer(player, map.id, item.id)}>
                    {item.name}
                  </div>
                  <div onClick={() => handleMovePlayer(player, map.id)}>Add New Map</div>
                </div>)}
            </div>,
          })
        }
      })
    }

    const handleAddPlayer = (map: IMap) => {
      const playersSetInThisMap = new Set(map.players)
      modal.showModal({
        render: () => <div>
          {players.filter((player) => playersSetInThisMap.has(player.id))
            .map((player) => <div onClick={() => handleMovePlayer(player, undefined, map.id)}>
              {player.name}
            </div>)}
        </div>,
      })
    }

    const handleMovePlayer = (player: IPlayer, fromMapId?: string, toMapId?: string) => {
      dataStore.movePlayer(player.id, fromMapId, toMapId)
      modal.closeModal()
    }

    return () => <PageWrapper>
      <Header title="Maximum Apocalypse Helper"></Header>
      <MAHelperContent>
        <div>
          {maps.map((map) => <MAMapCard
            map={map}
            onClickPlayer={(player) => handleClickPlayer(map, player)}
            onAddPlayer={() => handleAddPlayer(map)}
          />)}
          <MAMapCard onAddMap={handleAddMap}/>
        </div>
      </MAHelperContent>
      <MAHelperNavBar selectedLabel={MAHelperNavBarLabel.MAP}/>
    </PageWrapper>
  },
})
