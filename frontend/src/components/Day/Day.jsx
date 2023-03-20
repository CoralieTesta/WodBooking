import s from "./style.module.css"
import { EventArray } from "../EventArray/EventArray"
import { DayEventsAPI } from "../../api/dayEvents-api";
import { useContext, useEffect, useState } from "react";
import { DayAPI } from "../../api/day-api";
import { useSearchParams } from "react-router-dom";
import UserContext from "../../store/user-context";

export function Day() {
    const [dayEventArray, setDayEventArray] = useState()
    const [completeDay, setCompleteDay] = useState()
    const [wait, setWait] = useState(false)

    const [searchParams] = useSearchParams();
    
    const weekdayParams= searchParams.get("weekday")
    const dayParams= searchParams.get("day")
    const monthParams= searchParams.get("month")
    const yearParams= searchParams.get("year")
    const dateParams = dayParams+"/"+monthParams+"/"+yearParams
    const userCtx = useContext(UserContext)
    console.log("book array", userCtx.bookingArray)

    const registeredHours =userCtx.bookingArray.reduce(
        (accumulator, currentValue) => {
            if(currentValue.date === dateParams){
                return([
                    ...accumulator, currentValue.startingHour])
            }
            else {
                return(accumulator)
            }
        },
        []
    )
    console.log("hours",registeredHours)


    async function getDayEvents() {
        const events = await DayEventsAPI.get(weekdayParams)
        setDayEventArray(events.eventArray)
    }

    async function getDay() {
        const dayr = await DayAPI.get(userCtx.token,dateParams)
        setCompleteDay(dayr)
        localStorage.setItem('day-info', JSON.stringify(dayr));
    }

    async function createDay() {
        setWait(true)
        const newDay = await DayAPI.create(userCtx.token,{
            date:dateParams, 
            day:weekdayParams, 
            eventArray:dayEventArray
        })
        if(newDay) {
            setCompleteDay(newDay)
            window.location.reload(false);
            setWait(false)
            
        }
        else {
            setWait(false)
            console.log("Erreur de création")
        }
    }

    useEffect(() => {
        getDayEvents()
        getDay()
    },[dateParams])

    useEffect(() => {//garder les infos si on rafraichit la page
        const data = localStorage.getItem('day-info')
        const parseData = JSON.parse(data)
        if(parseData) {
           setCompleteDay(parseData)
        }
    },[])

    if(!dayEventArray || wait) {
        return(
            <div>
                WAIT...
            </div>
        )
    }

    if(dayEventArray && !completeDay) {
        createDay()
    }

    return(
        <div className={s.container}>
            <h2>{weekdayParams} {dateParams}</h2>
            <div className={s.array}>
                {completeDay &&
                <EventArray 
                    date={dateParams} 
                    dayArray={completeDay.eventArray} 
                    registeredHours={registeredHours}
                />
                }
            </div>
        </div>
    )
}