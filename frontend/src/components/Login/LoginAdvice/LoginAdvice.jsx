import s from "./style.module.css"
import { Link } from "react-router-dom"

export function LoginAdvice() {
    return(
        <div className={s.container}>
            <Link to="/">Connectez-vous</Link> 
        </div>
    )
}