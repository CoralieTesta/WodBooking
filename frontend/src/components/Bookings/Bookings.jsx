import { useContext } from "react"
import UserContext from "../../store/user-context"
import s from "./style.module.css"
import { BiCalendar } from "react-icons/bi"
import { BsClock } from "react-icons/bs"

export function Bookings() {
    const userCtx = useContext(UserContext)
    const bookingArray = userCtx.bookingArray
    console.log("array before",bookingArray)
    function getFirstPart(str) {
        return str.split('/')[0];
    }
    function getSecondPart(str) {
        return str.split('/')[1];
    }
    function getThirdPart(str) {
        return str.split('/')[2];
    }
    bookingArray.sort((a,b) => {
        const aDateFormat= getSecondPart(a.date)+"/"+getFirstPart(a.date)+"/"+getThirdPart(a.date)
        const bDateFormat= getSecondPart(b.date)+"/"+getFirstPart(b.date)+"/"+getThirdPart(b.date)
        const aDate=new Date(aDateFormat)
        const bDate=new Date(bDateFormat)
        return aDate.getTime()-bDate.getTime()
    })
    bookingArray.reverse()
    console.log("array after",bookingArray)

    if(bookingArray.length === 0) {
        return(
            <div className={s.noBooking}>
                Vous n'avez pas encore de réservation.
            </div>
        )
    }
    return(
        <div className={s.container}>
            <ul className={s.ul}>
                {bookingArray.map(booking =>
                    <li className={s.li}>
                        <div className={s.liContainer}>
                        <div className={s.liItem}>
                            <BiCalendar size={22} className={s.icon} />
                            {booking.date} 
                        </div>
                        <div className={s.liItem}>
                            <BsClock size={22} className={s.icon} />
                            {booking.startingHour}:00-{booking.startingHour+1}:00 
                        </div>
                        <div className={s.liItem}>
                            {booking.title}
                        </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}