import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { fetchTicket } from "../features/tickets/ticketsSlice"
import BackButton from '../components/BackButton'

function Ticket() {
  
  const {ticket} = useSelector(state => state.tickets)
  const dispatch = useDispatch()
  const params = useParams()


  useEffect(() => {
    dispatch(fetchTicket(params.id))
  }, [dispatch, params.id])
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submited: {new Date(ticket.createdAt).toLocaleString('en-US') } </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of the issue</h3>
          <p>{ticket.body}</p>
        </div>
      </header>
    </div>
  )
}
export default Ticket