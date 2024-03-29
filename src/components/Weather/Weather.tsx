import { defineComponent, ref } from 'vue'
import s from './Weather.module.scss'
import { IWeather, IWeatherbitRes } from './Weather.interface'
import axios from 'axios'

// const getLocation = (): Promise<GeolocationPosition> => {
const getLocation = (): Promise<any> => {
  return Promise.resolve({
    coords: {
      longitude: 114.17935748324054,
      latitude: 22.303446310055925,
    },
  })
  // const Geolocation = navigator.geolocation
  // return new Promise((resolve, reject) => {
  //   Geolocation.getCurrentPosition(
  //     (res) => resolve(res),
  //     (err) => reject(err),
  //   )
  // })
}

const getWeather = async (longitude: number, latitude: number): Promise<IWeatherbitRes> => {
  const res = await axios.get(`/api/v1/externals/weather?lon=${longitude}&lat=${latitude}`)
  return res.data
}

const getWeatherIcon = (code?: number) => {
  if (!code) {
    return '/weather/clear.svg'
  }
  if (code >= 200 && code < 300) {
    return '/weather/lightning.svg'
  } else if (code >= 300 && code < 400 || code >= 600 && code < 700) {
    if (code === 611 || code === 612) {
      return '/weather/wind.svg'
    }
    return '/weather/snow.svg'
  } else if (code >= 500 && code < 600 || code === 900) {
    return '/weather/rain.svg'
  } else if (code >= 700 && code < 800) {
    return '/weather/fog.svg'
  } else {
    return '/weather/clear.svg'
  }
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
      <div class={s.cardContent}>
        <div class={s.left}>
          <div class={s.time}>{dateRef.value[0]}:{dateRef.value[1]}</div>
          <div class={s.weather}>
            <div class={s.description}>{weatherRef.value?.weather.description}</div>
            <div class={s.temperature}>
            {
              weatherRef.value?.temperature === undefined
                ? null
                : `${weatherRef.value?.temperature}℃`
            }
            </div>
            <div class={s.city}>{weatherRef.value?.cityName}</div>
          </div>
        </div>

        <div class={s.right}>
          <img src={getWeatherIcon(weatherRef.value?.weather.code)}/>
        </div>
      </div>
    </div>
  },
})
