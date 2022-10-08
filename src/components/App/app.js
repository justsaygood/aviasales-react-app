import React from 'react'

import Logo from '../../images/Logo.png'
import Filters from '../Filters/filters'
import Tickets from '../Tickets/tickets'

import 'antd/dist/antd.css'
import classes from './app.module.scss'

export default function App() {
  return (
    <main className={classes.app}>
      <div className={classes['app-wrapper']}>
        <div className={classes['app-logo']}>
          <img src={Logo} alt="Aviasales logo" />
        </div>
        <section className={classes['app-body']}>
          <Filters />
          <Tickets />
        </section>
      </div>
    </main>
  )
}