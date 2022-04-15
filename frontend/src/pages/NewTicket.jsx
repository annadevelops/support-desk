import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function NewTicket() {
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()

    useEffect(() => {
        !user && navigate('/login')
    }, [user])

  return (
      <>
      { user ? 
        (<div>NewTicket</div>) 
        : (<div>No user</div>) }
    </>
  )
}
export default NewTicket