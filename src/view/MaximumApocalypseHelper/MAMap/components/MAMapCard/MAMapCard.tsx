import { defineComponent, PropType, ref } from 'vue'
import s from './MAMapCard.module.scss'
import { MAHelperAvatar } from '../../../components/MAHelperAvatar/MAHelperAvatar'
import { IMap } from '../../../tools/dataManager.interface'
import { useMADataStore } from '../../../tools/dataManager'
import EditSVG from '../../../../../assets/edit.svg'
import CorrectSVG from '../../../../../assets/correct.svg'
import WrongSVG from '../../../../../assets/wrong.svg'
import PlusSVG from '../../../../../assets/plus.svg'
import { Card } from '@/components/Card/Card'

export const MAMapCard = defineComponent({
  props: {
    map: Object as PropType<IMap>,
    // id: {
    //   type: String,
    // },
  },
  emits: ['addMap', 'addPlayer', 'clickPlayer', 'deleteMap'],
  setup(props, context) {
    const dataStore = useMADataStore()
    const isEditingName = ref(false)
    const editingName = ref('')

    const handleStartEditing = () => {
      isEditingName.value = true
      editingName.value = props.map!.name || ''
    }

    const handleFinishEditing = (isConfirm: boolean) => {
      if (isConfirm) {
        dataStore.update('maps', {
          ...props.map!,
          name: editingName.value,
        })
      }
      isEditingName.value = false
      editingName.value = ''
    }

    const handleInputEditingName = (e: any) => {
      editingName.value = e.target.value
    }

    return () => <Card
      isShowCancel={!!props.map}
      addNewItem={props.map ? undefined : { text: 'Add New Map' }}
      onClickAdd={() => context.emit('addMap')}
      onClickCancel={() => context.emit('deleteMap', props.map?.id)}
    >
      {
        props.map
          ? <div>
            <div class={s.titleWrapper}>
              <div class={s.title}>
                {isEditingName.value
                  ? <input value={editingName.value} onInput={handleInputEditingName}></input>
                  : <div>{props.map.name || 'New Map'}</div>
                }
              </div>
              {isEditingName.value
                ? <div class={s.icon}>
                  <div onClick={() => handleFinishEditing(true)}>
                    <CorrectSVG width={20} height={20}/>
                  </div>
                  <div onClick={() => handleFinishEditing(false)}>
                    <WrongSVG width={20} height={20}/>
                  </div>
                </div>
                : <div class={s.icon} onClick={handleStartEditing}>
                  <EditSVG width={20} height={20}/>
                </div>}
            </div>
            <div class={s.playersWrapper}>
              {props.map.players.map((playerId) => <MAHelperAvatar
                type="players"
                onClick={() => context.emit('clickPlayer', playerId)}
                id={playerId}/>)}
              <MAHelperAvatar onClick={() => context.emit('addPlayer')}/>
            </div>
          </div>
          : null
      }
    </Card>
  },
})
