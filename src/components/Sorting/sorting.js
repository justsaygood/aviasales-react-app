import React from 'react'
import { Radio } from 'antd'

import classes from './sorting.module.scss'

export default function Tickets() {
  return (
    <div className={classes.sorting}>
      <Radio.Group buttonStyle="solid">
        <Radio.Button value="cheap">Самый дешёвый</Radio.Button>
        <Radio.Button value="fast">Самый быстрый</Radio.Button>
        <Radio.Button value="optimal">Оптимальный</Radio.Button>
      </Radio.Group>
    </div>
  )
}
