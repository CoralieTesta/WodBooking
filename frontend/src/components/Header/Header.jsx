import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../../store/user-context"
import { Logo } from "../Logo"
import { TbLogout, TbLogin } from "react-icons/tb"
import { BiCalendar } from "react-icons/bi"
import { GiMuscleUp } from "react-icons/gi"
import { HiOutlineClipboardList } from "react-icons/hi"
import s from "./style.module.css"

export function Header() {
    const navigate = useNavigate()
    const userCtx = useContext(UserContext)

    useEffect(() => { //garder les infos si on rafraichit la page
        const userData = localStorage.getItem('token-info')
        const parseData = JSON.parse(userData)
        if(parseData) {
            userCtx.setEmail(parseData.email)
            userCtx.setToken(parseData.token)
        }
    },[])

    function logoutHandler() {
        localStorage.removeItem('token-info')
        localStorage.removeItem('day-info')
        localStorage.removeItem('quantityProtein-info')
        window.location.reload(false);
    }

    return(
        <header>
            <div className={s.upperContainer}>
                <Logo 
                    title="WodBooking" 
                    subtitle="Training doesn't wait" 
                    image= <GiMuscleUp size={35} />
                    onClick={() => navigate("/calendar")} 
                />
                <div className={s.helloContainer}>
                <div className={s.hello}>
                        Bonjour {userCtx.email}
                    </div>
                    <div onClick={logoutHandler} className={s.logout}>
                        LOGOUT <div className={s.logoutIcon}><TbLogout size={20}/></div>
                    </div>
                </div>
            </div>
            <div className={s.buttons}>
                <button onClick={() => navigate("/bookings")} className={s.button}>
                    <div>
                        <HiOutlineClipboardList size={22} />
                    </div>
                    <div className={s.res}>
                        Mes réservations
                    </div>
                </button>
                <button onClick={() => navigate("/calendar")} className={s.button}>
                    <div>
                        <BiCalendar size={22} />
                    </div>
                    Réserver
                </button>
                <button onClick={() => navigate("/")} className={s.button}>
                    <div>
                        <TbLogin size={22} />
                    </div>
                    Login
                </button>
            </div>
        </header>
    )
}