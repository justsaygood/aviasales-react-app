import { configureStore } from '@reduxjs/toolkit'

import sortReducer from './sortingFeatures'
import filtersReducer from './filtersFeatures'
import ticketsReducer from './ticketsFeatures'

const store = configureStore({
  reducer: {
    sorting: sortReducer,
    filters: filtersReducer,
    tickets: ticketsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store
