import { countries } from "../data/countries"
import style from './Form.module.css'

function Form() {
  return (
    <form className={style.form}>
      <div className={style.field}>
        <label htmlFor="city">City:</label>
        <input type="text" name="city" id="city" placeholder="City" />
      </div>

      <div className={style.field}>
        <label htmlFor="country">Country:</label>
        <select>
          <option value="">-- Select a Country --</option>
          {countries.map(country => (
            <option 
              key={country.code} 
              value={country.code}
            >{country.name}</option>
          ))}
        </select>
      </div>

      <input className={style.submit} type="submit" value='Check the weather' />
    </form>
  )
}

export default Form