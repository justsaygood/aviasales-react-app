import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spin, Result } from 'antd'
import { nanoid } from '@reduxjs/toolkit'

import Sorting from '../Sorting/sorting'
import Ticket from '../Ticket/ticket'
import { setTicketsCount } from '../../redux/ticketsFeatures'

import classes from './ticket-list.module.scss'

export default function TicketList() {
  const dispatch = useDispatch()

  const { ticketsCount } = useSelector((state) => state.tickets)

  const tickets = useSelector((state) => state.tickets.value)
  const ticketsLoading = useSelector((state) => state.tickets.loading)
  const ticketsError = useSelector((state) => state.tickets.error)

  const ticketsRender = tickets.slice(0, ticketsCount).map((item) => {
    const { carrier, price } = item
    const [from, to] = [item.segments[0], item.segments[1]]

    return <Ticket key={nanoid()} data={{ carrier, price, from, to }} />
  })

  const noResults = (
    <div className={classes['app-tickets-not-found']}>Рейсов, подходящих под заданные фильтры, не найдено</div>
  )

  const errorResults = (
    <Result
      status="error"
      title="Ошибка операции"
      subTitle="Проверьте интернет-соединение и попробуйте снова."
      extra={ticketsError}
    />
  )

  const spinner = (
    <div className={classes['centering-container']}>
      <Spin size="large" />
    </div>
  )

  return (
    <section className={classes['app-tickets']}>
      <Sorting />
      <ul>
        {(ticketsLoading && spinner) || null}
        {(ticketsRender.length && ticketsRender) || (!ticketsLoading && !ticketsError && noResults)}
        {!ticketsLoading && ticketsError && ticketsRender.length === 0 && errorResults}
        {ticketsRender.length >= ticketsCount && !errorResults && !ticketsError}
      </ul>
      {(ticketsLoading && ticketsError) || null}
      {ticketsRender.length > 0 ? (
        <button type="button" className={classes['app-button-more']} onClick={() => dispatch(setTicketsCount())}>
          Показать еще
        </button>
      ) : null}
    </section>
  )
}
