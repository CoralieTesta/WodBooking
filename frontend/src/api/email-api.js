import axios from "axios"
const BASE_URL = "https://wodbooking.onrender.com/api/email"


export class EmailAPI{
    static async send(email, date, startingHour) {
        console.log("EmailAPI")
        return(
            await axios.post(`${BASE_URL}/send`,
            {email:email, date:date, startingHour:startingHour})
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            })
        )
    }
}