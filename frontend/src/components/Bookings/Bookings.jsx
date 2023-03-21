import { useContext } from "react"
import UserContext from "../../store/user-context"
import s from "./style.module.css"
import { BookingItem } from "../BookingItem/BookingItem"

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
                    <li key={booking._id} className={s.li} >
                        <div>
                            <BookingItem 
                            date={booking.date}
                            startingHour={booking.startingHour}
                            title={booking.title}
                        />
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}