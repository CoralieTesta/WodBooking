import axios from "axios"
const BASE_URL = "https://wodbooking.onrender.com/api/auth/"


export class UserAPI{
    static async create(user) {
        console.log("user",user)
        return (
            await axios.post(`${BASE_URL}/signup`, user)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            }
        ))
    }

    static async connect(user) {
        return (
            await axios.post(`${BASE_URL}/login`, user)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            }
        ))
    }

    static async bookEvent(data){//data=email, date, startingHour, title
        console.log("book", data)
        return(
            await axios.put(`${BASE_URL}/bookEvent`, data)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            })
        )
    }
    static async get(email) {
        const response = await axios.get(`${BASE_URL}/${email}`)
        console.log("user response", response.data)
        return (
            response.data
        )
    }

    static async quitEvent(data){//data=email, date, startingHour
        console.log("quit", data)
        return(
            await axios.put(`${BASE_URL}/quitEvent`, data)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            })
        )
    }
}
