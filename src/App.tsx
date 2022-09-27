import { defineComponent, ref } from 'vue'

export const App = defineComponent({
  setup() {
    const count = ref(0)
    const onClick = () => {
      count.value ++
    }
    return () => (<div onClick={onClick}>{count.value}</div>)
  }
})

