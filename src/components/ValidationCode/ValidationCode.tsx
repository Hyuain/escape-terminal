import { defineComponent, Ref, ref, VNodeRef } from 'vue'
import s from './ValidationCode.module.scss'

export const ValidationCode = defineComponent({
  props: {
    digits: {
      default: 4,
      type: Number,
    },
  },
  emits: ['input'],
  setup(props, context) {
    const validationCodeRef = ref<string[]>([])
    const inputRefs: Ref[] = []
    const createRef = (i: number): Ref => {
      inputRefs[i] = ref()
      return inputRefs[i]
    }

    const handleInputDigit = (e: InputEvent, i: number) => {
      console.log(e.data, inputRefs)
      validationCodeRef.value[i] = ''
      // force update ref when enter same digit several times
      validationCodeRef.value[i] = (e.data || '')[0]
      if (i < props.digits - 1 && validationCodeRef.value[i]) {
        inputRefs[i + 1].value.focus()
      }
      context.emit('input', validationCodeRef.value)
    }

    return () => <div class={s.validationCodeWrapper}>
      {new Array(props.digits).fill(1).map((_, i) => {
        return <input
          ref={createRef(i)}
          type='number'
          value={validationCodeRef.value[i]}
          onInput={(e) => handleInputDigit(e as InputEvent, i)}
          class={s.digit} />
      })}
    </div>
  }
})
