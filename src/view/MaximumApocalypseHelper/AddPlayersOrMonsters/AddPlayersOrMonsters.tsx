import { defineComponent, reactive, ref } from 'vue'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { Header } from '../../../components/Header/Header'
import { PlayerItem } from '../PlayerList/components/PlayerItem/PlayerItem'
import { useMADataStore } from '../tools/dataManager'
import { IMonster, IPlayer } from '../tools/dataManager.interface'
import { useRoute, useRouter } from 'vue-router'
import { AddPlayersOrMonstersPageType, SelectionType } from './AddPlayersOrMonsters.interface'
import { MonsterItem } from '../MonsterList/MonsterItem/MonsterItem'

export const AddPlayersOrMonsters = defineComponent({
  setup(props) {

    const dataStore = useMADataStore()
    const router = useRouter()
    const route = useRoute()
    const type: AddPlayersOrMonstersPageType = route.query.type as AddPlayersOrMonstersPageType

    const defaultListRef = ref<IPlayer[] | IMonster[]>([])
    const addType = ref<SelectionType>('new')
    const selectedIds = reactive<Set<string>>(new Set())
    const newItem = reactive<IPlayer | IMonster>({} as any)

    if (type === 'players') {
      dataStore.getDefaultPlayers().then((players) => {
        defaultListRef.value = players
      })
    } else {
      dataStore.getDefaultMonsters().then((players) => {
        defaultListRef.value = players
      })
    }

    const handleSelect = (id: string) => {
      if (selectedIds.has(id)) {
        selectedIds.delete(id)
      } else {
        selectedIds.add(id)
      }
    }

    const handleChangeAddType = (type: SelectionType) => {
      addType.value = type
    }

    const handleInputProperty = (e: any, key: keyof IPlayer | keyof IMonster) => {
      let value = e.target.value
      if (key === 'maxHp') {
        value = Number(value)
      }
      ;(newItem as any)[key] = value
    }

    const validateNew = (): string => {
      if (!newItem.maxHp) {
        return 'please enter maxHp'
      }
      if (!newItem.name) {
        return 'please enter name'
      }
      if (type === 'monsters' && !(newItem as any).atk) {
        return 'please enter name'
      }
      return ''
    }

    const handleConfirm = () => {
      if (addType.value === 'new') {
        const errMsg = validateNew()
        if (errMsg) { return alert(errMsg) }
        dataStore.add(type, { ...newItem })
      } else {
        dataStore.addMany(type, (defaultListRef.value as any).filter((item: any) => selectedIds.has(item.id)))
      }
      router.back()
    }

    const form = type === 'players'
      ? [{ key: 'name', label: 'Name' },
        { key: 'maxHp', label: 'MaxHp' },
        { key: 'description', label: 'Description' }]
      : [{ key: 'name', label: 'Name' },
        { key: 'maxHp', label: 'MaxHp' },
        { key: 'atk', label: 'ATK' },
        { key: 'description', label: 'Description' }]

    return () => <PageWrapper>
      <Header title="Add Players" onClickBack={() => router.back()}></Header>
      <div onClick={() => handleChangeAddType('new')}>
        {addType.value === 'new' ? '●' : '○'}
        Add new {type === 'players' ? 'player' : 'monster'}
      </div>
      {addType.value === 'new'
        ? <div>
          {form.map((item) => <div>
            <div>{item.label}</div>
            <input onInput={(e) => handleInputProperty(e, item.key as any)}></input>
          </div>)}
        </div>
        : null}
      <div onClick={() => handleChangeAddType('exist')}>
        {addType.value === 'exist' ? '●' : '○'}
        Or select default players
      </div>
      {addType.value === 'exist'
        ? defaultListRef.value.map((item) => {
          return type === 'players'
            ? <PlayerItem
              isSelected={selectedIds.has(item.id)}
              onClickPlayer={() => handleSelect(item.id)}
              player={item}
            />
            : <MonsterItem
              monster={item as IMonster}
              isSelected={selectedIds.has(item.id)}
              onClickMonster={() => handleSelect(item.id)}
            />
        })
        : null}
      <div onClick={handleConfirm}>Confirm!</div>
    </PageWrapper>
  },
})
