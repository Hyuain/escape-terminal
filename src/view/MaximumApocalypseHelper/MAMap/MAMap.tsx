import { defineComponent } from 'vue'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { MAHelperContent } from '../components/MAHelperContent/MAHelperContent'
import { MAHelperNavBar } from '../components/MAHelperNavBar/MAHelperNavBar'
import { Header } from '@/components/Header/Header'
import { MAHelperNavBarLabel } from '../components/MAHelperNavBar/MAHelperNavBar.interface'
import { useMADataStore } from '../tools/dataManager'
import { useActionSheet } from '@/stores/actionSheet'
import { useModal } from '@/stores/modal'
import { IMap } from '../tools/dataManager.interface'
import { MAMapCard } from './components/MAMapCard/MAMapCard'
import { useRouter } from 'vue-router'
import s from './MAMap.module.scss'

export const MAMap = defineComponent({
  setup() {
    const dataStore = useMADataStore()
    const actionSheet = useActionSheet()
    const router = useRouter()
    const modal = useModal()
    const maDataWrapper = dataStore.getWrapper()

    const handleAddMap = () => {
      dataStore.add('maps')
    }

    const handleClickPlayer = (map: IMap, playerId: string) => {
      actionSheet.showActionSheet([
        { text: 'Show Player Detail' },
        { text: 'Move Player' },
      ]).then((index) => {
        if (index === 0) {
          console.log('xxxxPlayer', playerId)
          router.push({
            path: '/ma_helper/player',
            query: {
              id: playerId,
            },
          })
        } else if (index === 1) {
          modal.showModal({
            render: () => <div class={s.listModal}>
              {maDataWrapper.data.maps
                .filter((item) => item.id !== map.id)
                .map((item) => <div class={s.listModalItem} onClick={() => handleMovePlayer(playerId, map.id, item.id)}>
                  {item.name}
                </div>)}
              <div class={s.listModalItem} onClick={() => handleMovePlayer(playerId, map.id)}>Add New Map</div>
            </div>,
          })
        }
      })
    }

    const handleAddPlayer = (map: IMap) => {
      const playersSetInThisMap = new Set(map.players)
      modal.showModal({
        render: () => <div class={s.listModal}>
          {maDataWrapper.data.players.filter((player) => !playersSetInThisMap.has(player.id))
            .map((player) => <div class={s.listModalItem} onClick={() => handleMovePlayer(player.id, undefined, map.id)}>
              {player.name}
            </div>)}
        </div>,
      })
    }

    const handleMovePlayer = (playerId: string, fromMapId?: string, toMapId?: string) => {
      dataStore.movePlayer(playerId, fromMapId, toMapId)
      modal.closeModal()
    }

    const handleShowDeleteMapModal = (mapId: string) => {
      modal.showModal({
        title: 'Confirm Deletion?',
        content: '* Players will NOT be removed from player list.',
        onConfirm: () => handleDeleteMap(mapId),
        onCancel: () => modal.closeModal(),
      })
    }

    const handleDeleteMap = (mapId: string) => {
      dataStore.remove('maps', mapId)
      modal.closeModal()
    }

    return () => <PageWrapper>
      <Header onClickBack={() => router.replace('/home')} title="Maximum Apocalypse Helper"></Header>
      <MAHelperContent>
        <div>
          {maDataWrapper.data.maps.map((map) => <MAMapCard
            map={map}
            onClickPlayer={(playerId) => handleClickPlayer(map, playerId)}
            onAddPlayer={() => handleAddPlayer(map)}
            onDeleteMap={handleShowDeleteMapModal}
          />)}
          <MAMapCard onAddMap={handleAddMap}/>
        </div>
      </MAHelperContent>
      <MAHelperNavBar selectedLabel={MAHelperNavBarLabel.MAP}/>
    </PageWrapper>
  },
})
