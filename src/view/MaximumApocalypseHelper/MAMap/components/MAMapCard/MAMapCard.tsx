import { defineComponent, PropType, ref } from 'vue'
import s from './MAMapCard.module.scss'
import { MAHelperAvatar } from '../../../components/MAHelperAvatar/MAHelperAvatar'
import { IMap } from '../../../tools/dataManager.interface'
import { useMADataStore } from '../../../tools/dataManager'

export const MAMapCard = defineComponent({
  props: {
    map: Object as PropType<IMap>,
    // id: {
    //   type: String,
    // },
  },
  emits: ['addMap', 'addPlayer', 'clickPlayer'],
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

    return () => <div class={s.card}>
      {
        props.map
          ? <div>
            <div>
              {isEditingName.value
                ? <input value={editingName.value} onInput={handleInputEditingName}></input>
                : <div>{props.map.name || 'Default Name'}</div>
              }
              {isEditingName.value
                ? <div>
                  <div onClick={() => handleFinishEditing(true)}>√</div>
                  <div onClick={() => handleFinishEditing(false)}>×</div>
                </div>
                : <div onClick={handleStartEditing}>PENCIL ICON</div>}
            </div>
            <div>
              {props.map.players.map((playerId) => <MAHelperAvatar
                type='players'
                onClick={() => context.emit('clickPlayer', playerId)}
                id={playerId}/>)}
              <MAHelperAvatar onClick={() => context.emit('addPlayer')}/>
            </div>
          </div>
          : <div onClick={() => context.emit('addMap')}>+</div>
      }
    </div>
  },
})
