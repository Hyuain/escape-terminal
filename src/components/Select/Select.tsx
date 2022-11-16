import { defineComponent, PropType, ref } from 'vue'
import { ISelection } from '@/components/Select/Select.interface'
import s from './Select.module.scss'
import DownSVG from '../../assets/down.svg'
import { useActionSheet } from '@/stores/actionSheet'

export const Select = defineComponent({
  props: {
    selections: {
      type: Array as PropType<ISelection[]>,
    },
    selectedKey: {
      type: String,
    },
  },
  emits: ['select'],
  setup(props, context) {
    const isShowSelectionsRef = ref(false)
    const actionSheet = useActionSheet()

    const handleClickSelection = (e: Event) => {
      actionSheet.showActionSheet(
        (props.selections || []).map((selection) => {
          return {
            text: selection.label,
          }
        }),
      ).then((index) => {
        context.emit('select', props.selections?.[index].key)
      })
      // e.stopPropagation()
      // toggleSelections(!isShowSelectionsRef.value)
    }

    // const handleClickSelection = (e: Event, electionKey: string) => {
    //   e.stopPropagation()
    //   toggleSelections(false)
    //   context.emit('select', electionKey)
    // }

    // const toggleSelections = (isShow: boolean) => {
    //   isShowSelectionsRef.value = isShow
    //   console.log('xxT', isShow)
    //   if (isShow) {
    //     const clickHandler = () => {
    //       toggleSelections(false)
    //       document.removeEventListener('click', clickHandler)
    //     }
    //     document.addEventListener('click', clickHandler)
    //   }
    // }

    return () => <div class={s.wrapper}>
      <div
        onClick={handleClickSelection}
        class={s.host}>{props.selections?.find((selection) => selection.key === props.selectedKey)?.label}</div>
      {/*{*/}
      {/*  isShowSelectionsRef.value*/}
      {/*    ? <div class={s.selections}>*/}
      {/*      {props.selections?.map((selection) => <div onClick={(e) => handleClickSelection(e, selection.key)} class={s.item}>*/}
      {/*        {selection.label}*/}
      {/*      </div>)}*/}
      {/*    </div>*/}
      {/*    : null*/}
      {/*}*/}
      <div class={s.icon}>
        <DownSVG width={16} height={16}/>
      </div>
    </div>
  },
})
