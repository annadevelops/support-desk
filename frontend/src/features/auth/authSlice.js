import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register new user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    console.log(user)
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: state => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.user = null
            state.isError = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.user = action.payload
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.message = ''
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer