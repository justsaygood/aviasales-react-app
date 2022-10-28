import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox } from 'antd'

import { fetchTickets } from '../../redux/ticketsFeatures'
import * as filtersAction from '../../redux/filtersFeatures'

import classes from './filters.module.scss'

export default function Filters() {
  const allFilters = useSelector((state) => state.filters.checkedItems)

  const dispatch = useDispatch()
  const toggleItem = (value) => dispatch(filtersAction.setFilter({ value }))

  useEffect(() => {
    dispatch(fetchTickets())
  }, [allFilters])

  // console.log(allFilters)
  return (
    <aside className={classes.filters}>
      <div className={classes['filters-title']}>Количество пересадок</div>
      {allFilters.map((item) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label key={item.value}>
          <Checkbox onChange={() => toggleItem(item.value)} checked={item.isChecked}>
            {item.label}
          </Checkbox>
        </label>
      ))}
    </aside>
  )
}
