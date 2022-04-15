import { useAuthStatus } from "../hooks/useAuthStatus"
import { Navigate, Outlet } from "react-router-dom"

function PrivateRoute() {
    const loggedIn = useAuthStatus()

  return loggedIn ? <Outlet /> : <Navigate to='/login' />
}
export default PrivateRoute