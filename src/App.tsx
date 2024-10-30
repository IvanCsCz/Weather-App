import style from './App.module.css'
import Form from './components/Form'

function App() {

  return (
    <>
      <h1 className={style.title}>Weather App</h1>

      <div className={style.container}>
        <Form />
        <p>2</p>
      </div>
    </>
  )
}

export default App
