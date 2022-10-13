import { configureStore } from '@reduxjs/toolkit'

import sortReducer from './sortingFeatures'
import filtersReducer from './filtersFeatures'

const store = configureStore({
  reducer: {
    sorting: sortReducer,
    filters: filtersReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store
