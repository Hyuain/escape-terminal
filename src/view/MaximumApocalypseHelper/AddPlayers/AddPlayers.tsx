import { defineComponent, reactive, ref } from 'vue'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { Header } from '../../../components/Header/Header'
import { PlayerItem } from '../PlayerList/components/PlayerItem/PlayerItem'
import { useMADataStore } from '../tools/dataManager'
import { IPlayer } from '../tools/dataManager.interface'
import { AddPlayersType } from './AddPlayers.interface'
import { useRouter } from 'vue-router'

export const AddPlayers = defineComponent({
  setup(props) {

    const dataStore = useMADataStore()
    const router = useRouter()

    const defaultPlayersRef = ref<IPlayer[]>([])
    const addPlayersType = ref<AddPlayersType>('new')
    const selectedPlayerIds = reactive<Set<string>>(new Set())
    const newPlayer = reactive<IPlayer>({} as any)

    dataStore.getDefaultPlayers().then((players) => {
      defaultPlayersRef.value = players
    })

    const handleSelectPlayer = (player: IPlayer) => {
      if (selectedPlayerIds.has(player.id)) {
        selectedPlayerIds.delete(player.id)
      } else {
        selectedPlayerIds.add(player.id)
      }
    }

    const handleChangeAddPlayersType = (type: AddPlayersType) => {
      addPlayersType.value = type
    }

    const handleInputPlayerProperty = (e: any, key: keyof IPlayer) => {
      let value = e.target.value
      if (key === 'maxHp') {
        value = Number(value)
      }
      ;(newPlayer[key] as any) = value
    }

    const validateNewPlayer = (): string => {
      if (!newPlayer.maxHp) {
        return 'please enter maxHp'
      }
      if (!newPlayer.name) {
        return 'please enter name'
      }
      return ''
    }

    const handleConfirmAddPlayers = () => {
      if (addPlayersType.value === 'new') {
        const errMsg = validateNewPlayer()
        if (errMsg) { return alert(errMsg) }
        dataStore.add('players', { ...newPlayer })
      } else {
        dataStore.addMany('players', defaultPlayersRef.value.filter((player) => selectedPlayerIds.has(player.id)))
      }
      router.back()
    }

    return () => <PageWrapper>
      <Header title="Add Players" onClickBack={() => router.back()}></Header>
      <div onClick={() => handleChangeAddPlayersType('new')}>
        {addPlayersType.value === 'new' ? '●' : '○'}
        Add new player
      </div>
      {addPlayersType.value === 'new'
        ? <div>
          <div>
            <div>Name</div>
            <input onInput={(e) => handleInputPlayerProperty(e, 'name')}></input>
          </div>
          <div>
            <div>MaxHp</div>
            <input onInput={(e) => handleInputPlayerProperty(e, 'maxHp')}></input>
          </div>
          <div>
            <div>Description</div>
            <input onInput={(e) => handleInputPlayerProperty(e, 'description')}></input>
          </div>
        </div>
        : null
      }
      <div onClick={() => handleChangeAddPlayersType('exist')}>
        {addPlayersType.value === 'exist' ? '●' : '○'}
        Or select default players
      </div>
      {addPlayersType.value === 'exist'
        ? defaultPlayersRef.value.map((player) => <PlayerItem isSelected={selectedPlayerIds.has(player.id)}
                                                              onClickPlayer={handleSelectPlayer} player={player}/>)
        : null}
      <div onClick={handleConfirmAddPlayers}>Confirm!</div>
    </PageWrapper>
  },
})
