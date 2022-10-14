import { createSlice } from '@reduxjs/toolkit'

// export const getTickets = createAsyncThunk

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    value: [],
    loading: false,
    error: null,
    ticketsCount: 5,
  },
  reducers: {
    // eslint-disable-next-line no-void,no-return-assign,no-param-reassign
    setTicketsCount: (state) => void (state.ticketsCount += 5),
  },
})

export const { setTicketsCount } = ticketsSlice.actions
export default ticketsSlice.reducer
