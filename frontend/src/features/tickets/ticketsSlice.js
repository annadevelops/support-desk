import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketsService from "./ticketsService";

const initialState = {
    isSuccess: false,
    isError: false,
    tickets: [],
    ticket: {},
    message: ''
}

export const createTicket = createAsyncThunk('tickets/createTicket', async (ticket, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketsService.createTicket(ticket, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketsService.fetchTickets(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const fetchTicket = createAsyncThunk('tickets/fetchTicket', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketsService.fetchTicket(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(createTicket.fulfilled, (state, action) => {
            state.isSuccess = true
            state.ticket = action.payload
        })
        .addCase(createTicket.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(fetchTickets.fulfilled, (state, action) => {
            state.isSuccess = true
            state.tickets = action.payload
        })
        .addCase(fetchTickets.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(fetchTicket.fulfilled, (state, action) => {
            state.isSuccess = true
            state.ticket = action.payload
        })
        .addCase(fetchTicket.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
    }
})

export default ticketsSlice.reducer