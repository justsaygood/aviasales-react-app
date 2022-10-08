import React from 'react'
import { Checkbox } from 'antd'

import classes from './filters.module.scss'

export default function Filters() {
  const filterOptions = [
    { label: 'Без пересадок', value: 0 },
    { label: '1 пересадка', value: 1 },
    { label: '2 пересадки', value: 2 },
    { label: '3 пересадки', value: 3 },
  ]
  return (
    <aside className={classes.filters}>
      <div className={classes['filters-title']}>Количество пересадок</div>
      <Checkbox>Все</Checkbox>
      <Checkbox.Group options={filterOptions} />
    </aside>
  )
}
