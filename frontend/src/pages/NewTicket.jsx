import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createTicket } from "../features/tickets/ticketsSlice"
import BackButton from "../components/BackButton"
import { useNavigate } from "react-router-dom"

function NewTicket() {
    const [ticketData, setTicketData] = useState({
        subject: '',
        body: ''
    })

    const { subject, body } = ticketData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        const newTicket = {
            subject,
            body
        }
        dispatch(createTicket(newTicket))
        navigate('/tickets')
    }

    const onChange = (e) => {
        setTicketData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
  return (
      <>
      <BackButton url='/' />
      <section className='heading'>
          <h1>New Ticket</h1>
          <p>Please fill out the form below</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input required type="text"  name="subject" id="subject" value={subject} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="body">Description of the issue</label>
                    <textarea required className='form-control' name="body" id="body" cols="30" rows="10" value={body} onChange={onChange}></textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-block">
                        Submit ticket
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}
export default NewTicket