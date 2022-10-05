import { defineComponent, onMounted } from 'vue'
import s from './Input.module.scss'

export const Input = defineComponent({
  props:{
    errorText: String,
    inputProps: Object,
  },
  setup(props) {
    return () => <>
      <div class={{ [`${s.inputWrapper}`]: true, [`${s.errorInput}`]: props.errorText }}>
        <input class={s.input} {...props.inputProps}/>
        {/*<div class={s.suffix}>eye</div>*/}
      </div>
      <div v-show={props.errorText} class={s.error}>{props.errorText}</div>
    </>
  }
})
