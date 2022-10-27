import { createListenerMiddleware } from '@reduxjs/toolkit'

import { supplyTickets, sortTickets } from './ticketsFeatures'

const ticketsMiddleware = createListenerMiddleware()

ticketsMiddleware.startListening({
  actionCreator: supplyTickets,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(sortTickets(listenerApi.getState().sorting.value))
  },
})

export default ticketsMiddleware
