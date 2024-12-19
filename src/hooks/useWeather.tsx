import axios from "axios"
import { useMemo, useState } from "react"
import { z } from "zod"
import { SearchType } from "../types"

//TYPE GUARD O ASSERTION
// function isWeatherResponse(weather : unknown): weather is Weather {
//   return(
//     Boolean(weather) && 
//     typeof weather === 'object' &&
//     typeof (weather as Weather).name === 'string' &&
//     typeof (weather as Weather).main.temp === 'string' &&
//     typeof (weather as Weather).main.temp_max === 'string' &&
//     typeof (weather as Weather).main.temp_min === 'string'
//   )
// }

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0
  }
}

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  })
})

type Weather = z.infer<typeof Weather>

export default function useWeather() {
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState<Weather>(initialState)

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY
    setLoading(true)
    setWeather(initialState)
    setNotFound(false)

    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

      const {data} = await axios(geoUrl)

      if(!data[0]){
        setNotFound(true)
        return
      }

      const lat = data[0].lat
      const lon = data[0].lon

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

      //Zod
      const {data: weatherData} = await axios(weatherUrl)
      const result = Weather.safeParse(weatherData)
      console.log(result)
      if(result.success){
        console.log(result.data.name)
        console.log(result.data.main.temp)
        setWeather(result.data)
      } else {
        console.log('Respuesta mal formada')
      }

      //Castear el type
      // const {data: weatherData} = await axios<Weather>(weatherUrl)
      // console.log(weatherData.name)
      // console.log(weatherData.main)

      //Type guards
      // const {data: weatherData} = await axios(weatherUrl)
      // const result = isWeatherResponse(weatherData)
      // if(result){
      //   console.log(weatherData.name)
      // }else{
      //   console.log('Respuesta mal formada')
      // }

    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  const hasWeatherData = useMemo(() => weather.name, [weather])

  return{
    weather,
    loading,
    notFound,
    hasWeatherData,
    fetchWeather
  }
}