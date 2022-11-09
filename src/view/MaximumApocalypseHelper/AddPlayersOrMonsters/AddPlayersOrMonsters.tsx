import { defineComponent, reactive, ref } from 'vue'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { Header } from '@/components/Header/Header'
import { PlayerItem } from '../PlayerList/components/PlayerItem/PlayerItem'
import { useMADataStore } from '../tools/dataManager'
import { IMonster, IPlayer } from '../tools/dataManager.interface'
import { useRoute, useRouter } from 'vue-router'
import { AddPlayersOrMonstersPageType, SelectionType } from './AddPlayersOrMonsters.interface'
import { MonsterItem } from '../MonsterList/MonsterItem/MonsterItem'
import { Card } from '@/components/Card/Card'
import SelectedSVG from '../../../assets/selected.svg'
import UnselectedSVG from '../../../assets/unselected.svg'
import s from './AddPlayers.module.scss'
import { PlayerItemTheme } from '@/view/MaximumApocalypseHelper/PlayerList/components/PlayerItem/PlayerItem.interface'
import { MonsterItemTheme } from '@/view/MaximumApocalypseHelper/MonsterList/MonsterItem/MonsterItem.interface'
import { ScrollList } from '@/components/ScrollList/ScrollList'
import { Bottom } from '@/components/Bottom/Bottom'

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
        return 'MaxHp is Required'
      }
      if (!newItem.name) {
        return 'Name is Required'
      }
      if (type === 'monsters' && !(newItem as any).atk) {
        return 'ATK is Required'
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

    const getIcon = (selected: boolean) => {
      return selected ? <SelectedSVG width={20} height={20} />
        : <UnselectedSVG width={20} height={20} />
    }

    return () => <PageWrapper>
      <Header title={`Add ${type === 'players' ? 'Players' : 'Monsters'}`} onClickBack={() => router.back()}></Header>
      <ScrollList>
        <Card class={s.card}>
          <div class={s.title} onClick={() => handleChangeAddType('new')}>
            <div class={s.titleIcon}>
              {getIcon(addType.value === 'new')}
            </div>
            <div class={s.titleText}>
              Add new {type === 'players' ? 'player' : 'monster'}
            </div>
          </div>
          {addType.value === 'new'
            ? <div>
              {form.map((item) => <div>
                <div class={s.titleIcon}>{item.label}</div>
                <input class={s.input} onInput={(e) => handleInputProperty(e, item.key as any)}></input>
              </div>)}
            </div>
            : null}
        </Card>
        <Card class={s.card}>
          <div class={s.title} onClick={() => handleChangeAddType('exist')}>
            <div class={s.titleIcon}>
              {getIcon(addType.value === 'exist')}
            </div>
            <div class={s.titleText}>
              Or select default {type}
            </div>
          </div>
          {addType.value === 'exist'
            ? defaultListRef.value.map((item) => {
              return type === 'players'
                ? <PlayerItem
                  theme={PlayerItemTheme.ADD_PLAYERS}
                  isSelected={selectedIds.has(item.id)}
                  onClickPlayer={() => handleSelect(item.id)}
                  player={item}
                />
                : <MonsterItem
                  theme={MonsterItemTheme.ADD_MONSTERS}
                  monster={item as IMonster}
                  isSelected={selectedIds.has(item.id)}
                  onClickMonster={() => handleSelect(item.id)}
                />
            })
            : null}
        </Card>
      </ScrollList>
      <Bottom onClick={handleConfirm} text='Confirm' />
    </PageWrapper>
  },
})
