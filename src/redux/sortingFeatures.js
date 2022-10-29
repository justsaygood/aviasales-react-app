import { createSlice } from '@reduxjs/toolkit'

export const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    value: 'cheap',
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setValue } = sortingSlice.actions
export default sortingSlice.reducer
