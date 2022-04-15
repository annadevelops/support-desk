import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import BackButton from "../components/BackButton"
import { fetchTickets } from "../features/tickets/ticketsSlice"
import TicketItem from "../components/TicketItem"

function MyTickets() {
    const dispatch = useDispatch()
    const { tickets } = useSelector(state => state.tickets)

    useEffect(() => {
        dispatch(fetchTickets())

    }, [dispatch])

  return (
      <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className="tickets">
          <div className="ticket-headings">
              <div>Date</div>
              <div>Issue</div>
              <div>Status</div>
              <div></div>
          </div>
          {tickets.map(ticket => (
              <TicketItem key={ticket._id} ticket={ticket}  />
         ))}
      </div>
     
      </>
  )
}
export default MyTickets