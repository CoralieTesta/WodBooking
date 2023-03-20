import { useState } from "react"
import { DetailedEvent } from "../DetailedEvent/DetailedEvent"
import s from "./style.module.css"


export function EventItem({date, startingHour, title, registeredNb,alreadyRegistered}) {
    const [showDetails, setShowDetails ] = useState(false)
    function onClickHandler() {
        setShowDetails(true)
    }
    return(
        <>
        {showDetails?
                (
                <DetailedEvent 
                    date={date}
                    startingHour={startingHour} 
                    title={title} 
                    registeredNb={registeredNb} 
                    setShowDetails={setShowDetails}
                    alreadyRegistered={alreadyRegistered}
                />
                )
                :
                (<div 
                    className={s.container}
                    onClick={onClickHandler}
                >
                    <div className={s.hours}>
                        {startingHour}:00-{startingHour+1}:00
                    </div>
                    <div className={s.title}>
                        {title}
                    </div>
                    {alreadyRegistered?
                        (<div className={s.registeredNb}>
                            Inscrit
                        </div>
                        )
                        :
                        (<div className={s.registeredNb}>
                            {registeredNb}/16
                        </div>)
                    }
                </div>
                )
            }
        </>  
    )
}