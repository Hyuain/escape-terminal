import { defineComponent } from 'vue'
import { Header } from '../../../components/Header/Header'
import { MAHelperContent } from '../components/MAHelperContent/MAHelperContent'
import { MAHelperNavBar } from '../components/MAHelperNavBar/MAHelperNavBar'
import { MAHelperNavBarLabel } from '../components/MAHelperNavBar/MAHelperNavBar.interface'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'

export const PlayerList = defineComponent({
  setup() {
    return () => <PageWrapper>
      <Header title='Maximum Apocalypse Helper'></Header>
      <MAHelperContent>Players</MAHelperContent>
      <MAHelperNavBar selectedLabel={MAHelperNavBarLabel.PLAYERS} />
    </PageWrapper>
  }
})
