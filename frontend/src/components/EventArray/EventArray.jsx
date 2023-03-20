import { EventItem } from "../EventItem/EventItem"
import s from "./style.module.css"

export function EventArray({date, dayArray, registeredHours}) {

    return(
        <div className={s.container}>
            <ul className={s.ul}>            
                {dayArray?.map(
                    event => {
                        if(registeredHours.includes(event.startingHour)){
                            return(
                                <li key= {event._id}>
                                    <EventItem 
                                        date={date} 
                                        startingHour={event.startingHour} 
                                        title={event.title} 
                                        registeredNb={event.registeredNb}
                                        alreadyRegistered={true}
                                    />
                                </li>
                            )
                        }
                        else{
                            return(
                                <li key= {event._id}>
                                    <EventItem 
                                        date={date} 
                                        startingHour={event.startingHour} 
                                        title={event.title} 
                                        registeredNb={event.registeredNb}
                                        alreadyRegistered={false}
                                    />
                                </li>
                            )
                        }
                    }
                )}
            </ul>
        </div>
    )
}