import axios from "axios"
const BASE_URL = "https://wodbooking.onrender.com/api/day"


export class DayAPI{
    static async get(token,date) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${BASE_URL}/${date}`)
        console.log("day response", response.data)
        return (
            response.data
        )
    }
    static async create(token,data) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return(
            await axios.post(`${BASE_URL}/create`, data)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            })
        )
    }
    static async addParticipant(token,data) {//date = date, starting hour
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("data",data)
        return(
            await axios.put(`${BASE_URL}/addParticipant`, data)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            })
        )
    }

    static async removeParticipant(token, data) {//date = date, starting hour
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("data",data)
        return(
            await axios.put(`${BASE_URL}/removeParticipant`, data)
            .catch(function(error) {
                if (error.response) {
                    console.log("error status",error.response.status);
                    return false
                }
            })
        )
    }
}