import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(true)

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if(!user) {
            setLoggedIn(false)
        }
    }, [user])

  return loggedIn 
}
