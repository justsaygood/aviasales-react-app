import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { myRequest } from '../utils'

export const fetchTickets = createAsyncThunk('fetchTickets', async (_, { dispatch, getState, signal }) => {
  dispatch(clear())
  if (!getState().filters.checkedItems.length) return

  const id = await myRequest('https://aviasales-test-api.kata.academy/search', { signal })
  let stop = false
  while (!stop) {
    if (signal.aborted) throw new Error('Request has been aborted')
    const filters = getState().filters.checkedItems
    // eslint-disable-next-line no-await-in-loop
    const packetTickets = await myRequest(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${id.searchId}`,
      { signal },
      5
    )
    if (packetTickets.stop || signal.aborted || !filters.length) stop = true

    if (signal.aborted) throw new Error('Request has been aborted')
    dispatch(supplyTickets(packetTickets.tickets))
  }
})

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    value: [],
    loading: false,
    error: '',
    ticketsCount: 5,
  },
  reducers: {
    setTicketsCount(state) {
      state.ticketsCount += 5
    },
    supplyTickets: (state, action) => {
      state.value = [...state.value, ...action.payload]
    },
    sortTickets: (state, action) => {
      state.value = state.value.sort((a, b) => {
        let f1 = 0
        let f2 = 0
        switch (action.payload) {
          case 'optimal':
          /* falls through */
          case 'cheap':
            f1 = a.price - b.price
            if (action.payload !== 'optimal') break
          /* falls through */
          case 'fast': {
            for (let i = 0; i < a.segments.length; i += 1) f2 += a.segments[i].duration - b.segments[i].duration
            break
          }
          default:
            throw new Error('Invalid sort criterion')
        }
        return f1 + f2
      })
    },
    clear: (state) => {
      state.value = []
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [fetchTickets.fulfilled]: (state) => {
      state.loading = false
    },
    [fetchTickets.rejected]: (state, action) => {
      if (action.error.name !== 'AbortError') {
        state.loading = false
        state.error = action.error.message
      }
    },
  },
})

export const { setTicketsCount, supplyTickets, sortTickets, clear } = ticketsSlice.actions
export default ticketsSlice.reducer
