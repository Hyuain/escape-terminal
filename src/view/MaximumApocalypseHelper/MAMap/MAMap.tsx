import { defineComponent } from 'vue'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { MAHelperContent } from '../components/MAHelperContent/MAHelperContent'
import { MAHelperNavBar } from '../components/MAHelperNavBar/MAHelperNavBar'
import { Header } from '../../../components/Header/Header'
import { MAHelperNavBarLabel } from '../components/MAHelperNavBar/MAHelperNavBar.interface'

export const MAMap = defineComponent({
  setup() {
    return () => <PageWrapper>
      <Header title='Maximum Apocalypse Helper'></Header>
      <MAHelperContent>

      </MAHelperContent>
      <MAHelperNavBar selectedLabel={MAHelperNavBarLabel.MAP} />
    </PageWrapper>
  }
})
