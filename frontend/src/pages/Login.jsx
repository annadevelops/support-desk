import { useState, useEffect } from "react"
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isError, isLoading, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(user) {
            dispatch(reset())
            navigate('/')
        }
    }, [user, isError, message, isLoading, isSuccess, dispatch, navigate])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }
    
    return (
      <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Please log in to get support</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" value={email} placeholder='Enter your email' onChange={onChange} required />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="password" value={password} placeholder='Enter your password' onChange={onChange} required />
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Login</button>
                </div>
            </form>
        </section>
      </>
    )
  }
  export default Login