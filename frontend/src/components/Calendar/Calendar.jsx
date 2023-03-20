import s from "./style.module.css"
import { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from "react-router-dom";


export function CalendarComp() {
    const navigate = useNavigate()
    const [date, setDate] = useState(new Date());
    const [month, day, year] = [
        date.getMonth()+1,
        date.getDate(),
        date.getFullYear(),
      ];
    const weekDays=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
    const weekday = weekDays[date.getDay()]
    const dateInNb = day+"/"+month+"/"+year
    const max_date = new Date()
    addWeeks(max_date,2)
    const current_date = new Date()

    function addWeeks(date, weeks) {
        date.setDate(date.getDate() + 7 * weeks);
        return date;
    }

    function onBtnClickHandler() {
        const link="/day?day="+day+"&month="+month+"&year="+year+"&weekday="+weekday
        navigate(link)
    }

    return(
        <div className={s.container}>
            <h1 className='text-center'>Réserver</h1>
            <Calendar 
                onChange={setDate}
                minDate={current_date}
                maxDate={max_date}
                className={s.calendar}
            />
            <div className={s.btnContainer}>
                <button 
                    onClick={onBtnClickHandler}
                    className={s.btn}
                >
                    Réserver le {dateInNb}
                </button>
            </div>
        </div>
    )
}