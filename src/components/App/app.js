import React, { useState } from 'react'

import Logo from '../../images/Logo.png'
import Filters from '../Filters/filters'
import TicketList from '../TicketList/ticket-list'
import NetworkDetector from '../../utils/network'

import 'antd/dist/antd.css'
import classes from './app.module.scss'

export default function App() {
  const [connection, setConnection] = useState(true)

  const detectConnection = () => {
    if (connection) {
      setConnection(false)
    } else {
      setConnection(true)
    }
  }

  return (
    <main className={classes.app}>
      <div className={classes['app-wrapper']}>
        <div className={classes['app-logo']}>
          <img src={Logo} alt="Aviasales logo" />
        </div>
        <section className={classes['app-body']}>
          <Filters />
          <NetworkDetector detectConnection={detectConnection} />
          <TicketList connection={connection} />
        </section>
      </div>
    </main>
  )
}
