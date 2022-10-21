import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import ApiService from '../services/apiService'
import { RequestError } from '../utils/error'

export const fetchTickets = createAsyncThunk(
  'fetchTickets',
  async function getTicketsAsync(_, { dispatch, getState, signal }) {
    // eslint-disable-next-line no-use-before-define
    dispatch(clear())
    // eslint-disable-next-line no-useless-return
    if (!getState().filters.checkedItems.length) return

    const id = await ApiService.getSearchID({ signal })
    let stop = false
    while (!stop) {
      if (signal.aborted) throw new Error('Request has been aborted')
      const filters = getState().filters.checkedItems
      let packetTickets
      try {
        // eslint-disable-next-line no-await-in-loop
        packetTickets = await ApiService.getTickets(id, { signal })
      } catch (err) {
        if (err instanceof RequestError) {
          setTimeout(() => {
            getTicketsAsync(_, { dispatch, getState, signal })
          }, 1500)
        }
        throw err
      }
      // console.log(packetTickets)

      if (packetTickets.stop || signal.aborted || !filters.length) stop = true
      packetTickets.tickets = packetTickets.tickets.filter((ticket) =>
        ticket.segments.some((segment) => filters.indexOf(segment.stops.length) !== -1)
      )

      if (signal.aborted) throw new Error('Request has been aborted')
      // eslint-disable-next-line no-use-before-define
      dispatch(supplyTickets(packetTickets.tickets))
    }
  }
)

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    value: [],
    loading: false,
    error: null,
    ticketsCount: 5,
  },
  reducers: {
    setTicketsCount(state) {
      state.ticketsCount += 5
    },
    supplyTickets: (state, action) => {
      state.value = state.value.concat(action.payload)
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
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < a.segments.length; i++) f2 += a.segments[i].duration - b.segments[i].duration
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
