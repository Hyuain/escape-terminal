import { defineComponent } from 'vue'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { MAHelperContent } from '../components/MAHelperContent/MAHelperContent'
import { MAHelperNavBar } from '../components/MAHelperNavBar/MAHelperNavBar'
import { Header } from '../../../components/Header/Header'
import { MAHelperNavBarLabel } from '../components/MAHelperNavBar/MAHelperNavBar.interface'
import { MAMapCard } from './components/MAMapCard'
import { useMADataStore } from '../tools/dataManager'
import { useActionSheet } from '../../../stores/actionSheet'

export const MAMap = defineComponent({
  setup() {
    const dataStore = useMADataStore()
    const actionSheet = useActionSheet()
    const maps = dataStore.getAll('maps')
    console.log('xxxMaps', maps)
    const handleAddMap = () => {
      dataStore.add('maps')
    }

    const handleShowActionSheet = () => {
      actionSheet.showActionSheet([
        { text: 'Show Player Detail' },
        { text: 'Move Player' },
      ]).then((res) => {
        console.log('xxxT', res)
      }).catch(() => {
        console.log('xxxC')
      })
    }

    return () => <PageWrapper>
      <Header title="Maximum Apocalypse Helper"></Header>
      <MAHelperContent>
        <div>
          {maps.map((map) => <MAMapCard onClick={handleShowActionSheet} map={map}/>)}
          <MAMapCard onClick={handleAddMap}/>
        </div>
      </MAHelperContent>
      <MAHelperNavBar selectedLabel={MAHelperNavBarLabel.MAP}/>
    </PageWrapper>
  },
})
