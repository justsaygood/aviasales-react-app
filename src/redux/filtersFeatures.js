import { createSlice } from '@reduxjs/toolkit'

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    checkedItems: [0, 1, 2, 3],
    indeterminate: false,
    checkAll: true,
  },
  reducers: {
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
