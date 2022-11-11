import { defineComponent } from 'vue'
import { Header } from '@/components/Header/Header'
import { MAHelperContent } from '../components/MAHelperContent/MAHelperContent'
import { MAHelperNavBar } from '../components/MAHelperNavBar/MAHelperNavBar'
import { MAHelperNavBarLabel } from '../components/MAHelperNavBar/MAHelperNavBar.interface'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
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

    const handleClickMonster = (monsterId: string) => {
      router.push({
        path: '/ma_helper/monster',
        query: {
          id: monsterId,
        },
      })
    }

    return () => <PageWrapper>
      <Header onClickBack={() => router.replace('/home')} title='MA Helper'></Header>
      <MAHelperContent>
        {maDataWrapper.data.monsters.map((monster) => {
          return <MonsterItem onClickMonster={() => handleClickMonster(monster.id)} monster={monster} />
        })}
        <MonsterItem onAddMonster={handleAddMonster} />
      </MAHelperContent>
      <MAHelperNavBar selectedLabel={MAHelperNavBarLabel.MONSTERS} />
    </PageWrapper>
  }
})
