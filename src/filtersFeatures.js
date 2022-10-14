import { createSlice } from '@reduxjs/toolkit'

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    checkedItems: [],
    indeterminate: false,
    checkAll: true,
  },
  reducers: {
    // console.log(current(state)
    // eslint-disable-next-line no-return-assign, no-param-reassign,no-void
    setCheckedItems: (state, action) => void (state.checkedItems = action.payload),
    // eslint-disable-next-line no-return-assign, no-param-reassign,no-void
    setIndeterminate: (state, action) => void (state.indeterminate = action.payload),
    // eslint-disable-next-line no-return-assign, no-param-reassign,no-void
    setCheckAll: (state, action) => void (state.checkAll = action.payload),
  },
})

export const { setCheckedItems, setIndeterminate, setCheckAll } = filtersSlice.actions
export default filtersSlice.reducer
