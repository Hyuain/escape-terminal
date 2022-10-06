import { defineComponent, ref } from 'vue'
import { RapidAPI } from '../../../apikey.private'
import s from './Weather.module.scss'
import { IWeather, IWeatherbitRes } from './Weather.interface'

const getLocation = (): Promise<GeolocationPosition> => {
  const Geolocation = navigator.geolocation
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (res) => resolve(res),
      (err) => reject(err),
    )
  })
}

const getWeather = (longitude: number, latitude: number): Promise<IWeatherbitRes> => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': RapidAPI.weatherbit.key,
      'X-RapidAPI-Host': RapidAPI.weatherbit.host,
    },
  }
  // const options = {}
  return fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${longitude}&lat=${latitude}`, options)
    .then(response => response.json())
}

export const Weather = defineComponent({
  setup() {
    const weatherRef = ref<IWeather>()
    const dateRef = ref<string[]>([])

    getLocation()
      .then((res) => getWeather(res.coords.longitude, res.coords.latitude))
      .then((res) => {
        const data = res.data[0]
        weatherRef.value = {
          longitude: data.lon,
          latitude: data.lat,
          cityName: data.city_name,
          temperature: data.temp,
          weather: data.weather,
        }
      })

    const today = new Date()
    dateRef.value = [today.getHours().toString().padStart(2, '0'), today.getMinutes().toString().padStart(2, '0')]

    return () => <div class={s.cardWrapper}>
      <div class={s.left}>
        <div class={s.time}>{dateRef.value[0]}:{dateRef.value[1]}</div>
        <div>{weatherRef.value?.cityName}</div>
      </div>
      <div class={s.right}>
        <div>ICON</div>
        <div class={s.weather}>
          <div class={s.description}>{weatherRef.value?.weather.description}</div>
          <div class={s.temperature}>{weatherRef.value?.temperature}℃</div>
        </div>
      </div>
    </div>
  },
})
