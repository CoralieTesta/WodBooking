import { useContext, useEffect } from "react";
import { Bookings } from "../../components/Bookings/Bookings";
import { LoginAdvice } from "../../components/Login/LoginAdvice/LoginAdvice";
import UserContext from "../../store/user-context";

export function MyBookings() {
    const userCtx = useContext(UserContext)
    useEffect(() => {//garder les infos si on rafraichit la page
        const userData = localStorage.getItem('booking-info')
        const parseData = JSON.parse(userData)
        console.log('parse',parseData)
        if(parseData) {
            userCtx.setBookingArray(parseData)
        }
    },[])

    if(!userCtx.token){
        return(
            <div>
                <LoginAdvice />
            </div>
        )
    }
    return(
        <div>
            <h1>Mes réservations</h1>
            <Bookings />
        </div>
    )
}