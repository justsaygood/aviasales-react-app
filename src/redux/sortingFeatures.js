import { createSlice } from '@reduxjs/toolkit'

export const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    value: '',
  },
  reducers: {
    setValue: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload
    },
  },
})

export const { setValue } = sortingSlice.actions
export default sortingSlice.reducer
