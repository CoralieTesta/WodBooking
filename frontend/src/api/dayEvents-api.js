import axios from "axios"
const BASE_URL = "http://localhost:3000/api/dayEvents"


export class DayEventsAPI{
    static async get(day) {
        const response = await axios.get(`${BASE_URL}/${day}`)
        console.log("dayEvents response", response.data)
        return (
            response.data
        )
    }
}