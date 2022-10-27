import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { myRequest } from '../utils'

export const fetchTickets = createAsyncThunk('fetchTickets', async (_, { dispatch, getState, signal }) => {
  // eslint-disable-next-line no-use-before-define
  dispatch(clear())
  // eslint-disable-next-line no-useless-return
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
    packetTickets.tickets = packetTickets.tickets.filter((ticket) => {
      const stopsLengthFirst = ticket.segments[0].stops.length
      const stopsLengthSecond = ticket.segments[1].stops.length

      const noChange = getState().filters.checkedItems[0]
      const oneChange = getState().filters.checkedItems[1]
      const twoChanges = getState().filters.checkedItems[2]
      const threeChanges = getState().filters.checkedItems[3]
      return (
        (stopsLengthFirst === (noChange && 0) && stopsLengthSecond === (noChange && 0)) ||
        (stopsLengthFirst === (oneChange && 1) && stopsLengthSecond === (oneChange && 1)) ||
        (stopsLengthFirst === (twoChanges && 2) && stopsLengthSecond === (twoChanges && 2)) ||
        (stopsLengthFirst === (threeChanges && 3) && stopsLengthSecond === (threeChanges && 3))
      )
    })

    // console.log(packetTickets)

    if (signal.aborted) throw new Error('Request has been aborted')
    // eslint-disable-next-line no-use-before-define
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
