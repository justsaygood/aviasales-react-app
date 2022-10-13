import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox } from 'antd'

// import defaultSelected from '../../filtersFeatures'
import * as filtersActions from '../../filtersFeatures'

import classes from './filters.module.scss'

export default function Filters() {
  const filterOptions = [
    { label: 'Без пересадок', value: 0 },
    { label: '1 пересадка', value: 1 },
    { label: '2 пересадки', value: 2 },
    { label: '3 пересадки', value: 3 },
  ]

  const allFilters = Array.from(filterOptions, (x) => x.value)
  // const defaultSelected = ['wo', 'w1', 'w2', 'w3']

  const dispatch = useDispatch()
  const checkedFilter = useSelector((state) => state.filters.checkedItems)
  const indeterminateFilter = useSelector((state) => state.filters.indeterminate)
  const checkedAllFilter = useSelector((state) => state.filters.checkAll)
  console.log(allFilters)

  const filtersOnCheck = (items) => {
    dispatch(filtersActions.setCheckedItems(items))
    dispatch(filtersActions.setIndeterminate(items.length && items.length < allFilters.length))
    dispatch(filtersActions.setCheckAll(items.length === allFilters.length))
  }

  const onCheckAll = (e) => {
    dispatch(filtersActions.setCheckedItems(e.target.checked ? allFilters : []))
    dispatch(filtersActions.setIndeterminate(false))
    dispatch(filtersActions.setCheckAll(e.target.checked))
  }

  /* useEffect(() => {
    filtersOnCheck(defaultSelected)
  }, []) */

  return (
    <aside className={classes.filters}>
      <div className={classes['filters-title']}>Количество пересадок</div>
      <Checkbox indeterminate={indeterminateFilter} onChange={onCheckAll} checked={checkedAllFilter}>
        Все
      </Checkbox>
      <Checkbox.Group options={filterOptions} value={checkedFilter} onChange={filtersOnCheck} />
    </aside>
  )
}
