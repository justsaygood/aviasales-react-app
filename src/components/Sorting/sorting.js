import React from 'react'
import { connect } from 'react-redux'
import { Radio } from 'antd'

import classes from './sorting.module.scss'

function Sorting(props) {
  const { sortingButtons, updateSortingButtons } = props
  console.log(props)

  const buttons = sortingButtons.map(({ name, label, isChecked }) => {
    let style
    if (isChecked === true) {
      style = { backgroundColor: '#2196f3', borderColor: '#2196f3', color: '#ffff' }
    }
    const onClick = () => {
      const newArr = [...sortingButtons].map((el) => {
        if (el.name === name) {
          // eslint-disable-next-line no-param-reassign
          el.isChecked = true
          console.log(el)
        } else {
          // eslint-disable-next-line no-param-reassign
          el.isChecked = false
        }
        return el
      })
      updateSortingButtons(newArr)
    }
    return (
      <Radio.Button key={name} value={name} onClick={onClick} style={style}>
        {label}
      </Radio.Button>
    )
  })

  return (
    <div className={classes.sorting}>
      <Radio.Group buttonStyle="solid">{buttons} </Radio.Group>
    </div>
  )
}

const mapStateToProps = (sortingButtons) => sortingButtons

const mapDispatchToProps = (dispatch) => ({
  updateSortingButtons: (newSortingButtons) => {
    dispatch({
      type: 'UPDATE_SORT_BUTTONS',
      payload: newSortingButtons,
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Sorting)
