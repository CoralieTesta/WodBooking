import { useContext } from "react";
import { CalendarComp } from "../../components/Calendar/Calendar";
import { LoginAdvice } from "../../components/Login/LoginAdvice/LoginAdvice";
import UserContext from "../../store/user-context";


export function CalendarPage() {
    const userCtx = useContext(UserContext)
    if(!userCtx.token){
        return(
            <div>
                <LoginAdvice />
            </div>
        )
    }
    return(
        <>
            <CalendarComp />
        </>
    )
}