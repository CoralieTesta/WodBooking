import axios from "axios"
const BASE_URL = "https://wodbooking.onrender.com/api/dayEvents"//http://localhost:3000


export class DayEventsAPI{
    static async get(day) {
        const response = await axios.get(`${BASE_URL}/${day}`)
        console.log("dayEvents response", response.data)
        return (
            response.data
        )
    }
}