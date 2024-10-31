import { ReactNode } from "react"
import style from './Alert.module.css'

function Alert({children}: {children: ReactNode}) {
  return (
    <p className={style.alert}>{children}</p>
  )
}

export default Alert