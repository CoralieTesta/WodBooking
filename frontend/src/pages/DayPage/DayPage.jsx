import { useContext, useEffect } from "react";
import { Day } from "../../components/Day/Day"
import { LoginAdvice } from "../../components/Login/LoginAdvice/LoginAdvice";
import UserContext from "../../store/user-context";

export function DayPage() {
  const date = new Date(2023,3-1,7);
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
        <>    
            <Day date={date} />
        </>
    )
}