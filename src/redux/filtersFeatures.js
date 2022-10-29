import { createSlice } from '@reduxjs/toolkit'

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    checkedItems: [
      { label: 'Все', value: 1, isChecked: true },
      { label: 'Без пересадок', value: 2, isChecked: true },
      { label: '1 пересадка', value: 3, isChecked: true },
      { label: '2 пересадки', value: 4, isChecked: true },
      { label: '3 пересадки', value: 5, isChecked: true },
    ],
    checkAll: true,
  },
  reducers: {
    setFilter: (state, action) => {
      const checkedItem = state.checkedItems.find((elem) => elem.value === action.payload.value)
      const singleFilter = state.checkedItems.filter((elem) => elem.value !== 1)
      const allFilter = state.checkedItems.find((elem) => elem.label === 'Все')

      if (checkedItem.value === 1) {
        state.checkAll = !state.checkAll
        state.checkAll
          ? (state.checkedItems = state.checkedItems.map((elem) => ({ ...elem, isChecked: true })))
          : (state.checkedItems = state.checkedItems.map((elem) => ({ ...elem, isChecked: false })))
      } else {
        state.checkAll = false
        checkedItem.isChecked = !checkedItem.isChecked
        allFilter.isChecked = false
        if (singleFilter.filter((elem) => elem.isChecked).length === 4) {
          state.checkAll = true
          allFilter.isChecked = true
        }
      }
    },
  },
})

export const { setFilter } = filtersSlice.actions
export default filtersSlice.reducer
