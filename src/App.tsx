import { defineComponent, ref } from 'vue'
import { SignIn } from './view/SignIn/SignIn'
import './App.scss'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export const App = defineComponent({
  setup() {
    return () => <>
      <router-view></router-view>
    </>
  }
})

