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

export const PlayerList = defineComponent({
  setup() {
    const dataStore = useMADataStore()
    const router = useRouter()

    const players = dataStore.getAll('players')

    const handleAddPlayers = () => {
      router.push('/ma_helper/add_players')
    }

    return () => <PageWrapper>
      <Header title='Maximum Apocalypse Helper'></Header>
      <MAHelperContent>
        {players.map((player) => <PlayerItem player={player} />)}
        <PlayerItem onAddPlayer={handleAddPlayers} />
      </MAHelperContent>
      <MAHelperNavBar selectedLabel={MAHelperNavBarLabel.PLAYERS} />
    </PageWrapper>
  }
})
