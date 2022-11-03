import { defineComponent } from 'vue'
import { Header } from '../../../components/Header/Header'
import { MAHelperContent } from '../components/MAHelperContent/MAHelperContent'
import { MAHelperNavBar } from '../components/MAHelperNavBar/MAHelperNavBar'
import { MAHelperNavBarLabel } from '../components/MAHelperNavBar/MAHelperNavBar.interface'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { useMADataStore } from '../tools/dataManager'
import { MonsterItem } from './MonsterItem/MonsterItem'
import { useRouter } from 'vue-router'

export const MonsterList = defineComponent({
  setup() {
    const router = useRouter()

    const dataStore = useMADataStore()
    const maDataWrapper = dataStore.getWrapper()

    const handleAddMonster = () => {
      router.push({
        path: '/ma_helper/add_pom',
        query: {
          type: 'monsters',
        }
      })
    }

    return () => <PageWrapper>
      <Header title='Maximum Apocalypse Helper'></Header>
      <MAHelperContent>
        {maDataWrapper.data.monsters.map((monster) => {
          return <MonsterItem monster={monster} />
        })}
        <MonsterItem onAddMonster={handleAddMonster} />
      </MAHelperContent>
      <MAHelperNavBar selectedLabel={MAHelperNavBarLabel.MONSTERS} />
    </PageWrapper>
  }
})
