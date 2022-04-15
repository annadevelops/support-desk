import  axios from 'axios'

const API_URL = '/api/tickets'


const createTicket = async (ticket, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
        const response = await axios.post(API_URL, ticket, config)
        localStorage.setItem('ticket', JSON.stringify(response.data))
        return response.data
}

const ticketsService = {
    createTicket,
}

export default ticketsService