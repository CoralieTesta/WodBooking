import { useContext } from "react"
import { BiCalendar } from "react-icons/bi"
import { BsClock } from "react-icons/bs"
import { DayAPI } from "../../api/day-api"
import { UserAPI } from "../../api/user-api"
import UserContext from "../../store/user-context"
import s from "./style.module.css"

export function BookingItem({date, startingHour, title}) {
    const userCtx = useContext(UserContext)

    async function removeParticipant() {
        console.log("remove", date, startingHour,userCtx.token)
        await DayAPI.removeParticipant(userCtx.token,{
            date:date, 
            startingHour:startingHour
        })
    }

    async function quitEvent() {
        console.log("quit in detailed")
        await UserAPI.quitEvent({
            email:userCtx.email,
            date:date, 
            startingHour:startingHour
        })
    }

    async function onQuitClick() {
        if(userCtx.token){
            removeParticipant()
            quitEvent()

            const modifiedBookingArray= userCtx.bookingArray.filter((event) =>
                event.date !== date ||
                event.startingHour !== startingHour
            )
            console.log("modified",modifiedBookingArray)
            userCtx.setBookingArray(modifiedBookingArray)
            localStorage.setItem('booking-info', JSON.stringify(modifiedBookingArray));
        }
        else {
            alert("Connectez-vous !")
        }
    }

    return(          
        <div 
            className={s.liContainer}>
            <div className={s.liItem}>
                <BiCalendar size={22} className={s.icon} />
                {date} 
            </div>
            <div className={s.liItem}>
                <BsClock size={22} className={s.icon} />
                {startingHour}:00-{startingHour+1}:00 
            </div>
            <div className={s.liItem}>
                {title}
            </div>
            <button 
                className={s.btn}
                onClick={onQuitClick}
            >
                Quitter
            </button>
        </div>
    )
}