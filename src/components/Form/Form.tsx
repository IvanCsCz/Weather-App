import { ChangeEvent, FormEvent, useState } from "react"
import { countries } from "../../data/countries"
import { SearchType } from "../../types"
import Alert from "../Alert/Alert"
import style from './Form.module.css'

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>
}

function Form({fetchWeather}: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })
  const [alert, setAlert] = useState('')

  const handleChange = (ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearch({
      ...search,
      [ev.target.name]: ev.target.value
    })
  }

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const searchValues = Object.values(search)

    for(const search of searchValues){
      if(search.trim() === ''){
        setAlert('Todos los campos son obligatorios')
        return
      }
    }

    setAlert('')
    fetchWeather(search)
    
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.field}>
        <label htmlFor="city">City:</label>
        <input 
          type="text" 
          name="city" 
          id="city" 
          placeholder="City" 
          value={search.city}
          onChange={handleChange}
        />
      </div>

      <div className={style.field}>
        <label htmlFor="country">Country:</label>
        <select id="country" name="country" value={search.country} onChange={handleChange}>
          <option value="">-- Select a Country --</option>
          {countries.map(country => (
            <option 
              key={country.code} 
              value={country.code}
            >{country.name}</option>
          ))}
        </select>
      </div>

      {alert && <Alert>{alert}</Alert>}

      <input className={style.submit} type="submit" value='Check the weather' />
    </form>
  )
}

export default Form