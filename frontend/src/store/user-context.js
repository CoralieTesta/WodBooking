import { createContext, useState } from "react";

const UserContext = createContext({
    email:"",
    setEmail: (email) => {},
    token:"",
    setToken: (token) => {},
    isLogIn:false,
    setIsLogIn: (isLogIn) => {},
    bookingArray: [],
    setBookingArray: (bookingArray) => {}

})

export function UserContextProvider({children}) {
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    const [isLogIn, setIsLogIn] = useState(false)
    const [bookingArray, setBookingArray] = useState([])

    const context = {
        email: email,
        setEmail: setEmail,
        token: token,
        setToken: setToken,
        isLogIn: isLogIn,
        setIsLogIn: setIsLogIn,
        bookingArray,
        setBookingArray
    }
    return(
        <UserContext.Provider value={context} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext