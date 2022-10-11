const initialState = {
  sortingButtons: [
    { name: 'cheap', label: 'Самый дешевый', isChecked: false },
    { name: 'quick', label: 'Самый быстрый', isChecked: false },
    { name: 'optimal', label: 'Оптимальный', isChecked: false },
  ],
}

// eslint-disable-next-line default-param-last
const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SORT_BUTTONS':
      return {
        ...state,
        sortingButtons: action.payload,
      }
    default:
      return state
  }
}

export default sortReducer
