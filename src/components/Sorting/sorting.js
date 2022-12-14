import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Radio } from 'antd'

import * as sortingActions from '../../redux/sortingFeatures'
import { sortTickets } from '../../redux/ticketsFeatures'

import classes from './sorting.module.scss'

export default function Sorting() {
  const dispatch = useDispatch()
  const sortingValue = useSelector((state) => state.sorting.value)

  const sortingOnClick = (e) => {
    dispatch(sortingActions.setValue(e.target.value))
  }

  useEffect(() => {
    dispatch(sortTickets(sortingValue))
  }, [sortingValue])

  return (
    <div className={classes.sorting}>
      <Radio.Group buttonStyle="solid" value={sortingValue} onChange={sortingOnClick}>
        <Radio.Button value="cheap">Самый дешевый</Radio.Button>
        <Radio.Button value="fast">Самый быстрый</Radio.Button>
        <Radio.Button value="optimal">Оптимальный</Radio.Button>
      </Radio.Group>
    </div>
  )
}
