import { defineComponent, ref } from 'vue'
import { SignIn } from './view/SignIn/SignIn'
import './App.scss'

export const App = defineComponent({
  setup() {
    return () => <>
      <router-view></router-view>
    </>
  }
})

