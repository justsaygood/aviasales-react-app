import { configureStore } from '@reduxjs/toolkit'

import sortReducer from './reducers'

const store = configureStore({ reducer: sortReducer })

export default store
