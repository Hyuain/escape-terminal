import { defineComponent } from 'vue'
import './App.scss'

export const App = defineComponent({
  setup() {
    return () => <>
      <router-view></router-view>
    </>
  }
})

