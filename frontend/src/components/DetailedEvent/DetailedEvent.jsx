import s from "./style.module.css"
import { BsClock } from "react-icons/bs"
import { IoPersonOutline } from "react-icons/io5"
import { IoCloseSharp } from "react-icons/io5"
import { useContext, useState } from "react"
import UserContext from "../../store/user-context"
import { DayAPI } from "../../api/day-api"
import { useNavigate } from "react-router-dom"
import { ModalValidate } from "../ModalValidate/ModalValidate"
import { UserAPI } from "../../api/user-api"

export function DetailedEvent({
        date, 
        startingHour, 
        title, 
        registeredNb, 
        setShowDetails,
        alreadyRegistered
    }) {

    const userCtx = useContext(UserContext)
    const [validate, setValidate] = useState(false)
    const [modalText, setModalText] = useState("")
    const navigate = useNavigate()
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function closeHandler() {
        setShowDetails(false)
    }

    async function addParticipant() {
        await DayAPI.addParticipant(userCtx.token,{
            date:date, 
            startingHour:startingHour
        })
    }

    async function removeParticipant() {
        await DayAPI.removeParticipant(userCtx.token,{
            date:date, 
            startingHour:startingHour
        })
    }

    async function bookEvent() {
        console.log("book in detailed")
        await UserAPI.bookEvent({
            email:userCtx.email,
            date:date, 
            startingHour:startingHour,
            title:title
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

    async function onJoinClick() {
        if(userCtx.token){
            addParticipant()
            bookEvent()
            
            const modifiedBookingArray=userCtx.bookingArray
            modifiedBookingArray.push({
                date:date, 
                startingHour:startingHour, 
                title:title
            })
            
            console.log("modified",modifiedBookingArray)
            userCtx.setBookingArray(modifiedBookingArray)
            localStorage.setItem('booking-info', JSON.stringify(modifiedBookingArray));

            console.log("wait")
            setModalText("Inscription validée")
            setValidate(true)
            await sleep(2000)
            setValidate(false)
            navigate("/calendar")
        }
        else {
            alert("Connectez-vous !")
        }
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
            console.log("wait")
            setModalText("Désinscription validée")
            setValidate(true)
            await sleep(2000)
            setValidate(false)
            navigate("/calendar")
        }
        else {
            alert("Connectez-vous !")
        }
    }
    if(validate) {
        return(
            <>
                <ModalValidate modalText={modalText} />
            </>
        )
    }
    return(
        <div className={s.container}>
            <IoCloseSharp 
                size={20} 
                className={s.closeIcon} 
                onClick={closeHandler}
            />
            <div className={s.title}>
                <h3>{title}</h3>
            </div>
            <div className={s.subContainer}>
                <BsClock size={22} className={s.icon}/>
                <div className={s.subSubContainer}>
                    <div>
                        Heure
                    </div>
                    <div className={s.data}>
                        {startingHour}:00-{startingHour+1}:00
                    </div>
                </div>
            </div>
            <div className={s.subContainer}>
                <IoPersonOutline size={24} />
                <div className={s.subSubContainer}>
                    <div>
                        Occupation
                    </div>
                    <div className={s.data}>
                        {registeredNb}/16
                    </div>
                </div>
            </div>
            <div className={s.btnContainer}>
                {registeredNb === 16 && !alreadyRegistered &&
                       
                        <button
                            disabled>
                            Rejoindre
                        </button>
                    
                }
                {registeredNb < 16 && !alreadyRegistered &&
                    
                        <button 
                            onClick={onJoinClick}
                            className={s.registerBtn}
                        >
                            Rejoindre
                        </button>
                    
                }
                {console.log("already",alreadyRegistered)}
                {registeredNb <= 16 && alreadyRegistered &&
                    
                    <button 
                        onClick={onQuitClick}
                        className={s.registerBtn}
                    >
                        Quitter
                    </button>
                
            }
            </div>
        </div>
    )
}