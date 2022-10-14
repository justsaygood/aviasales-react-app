import React from 'react'
import { useSelector } from 'react-redux'
import { Spin, Result } from 'antd'

import Sorting from '../Sorting/sorting'
import Ticket from '../Ticket/ticket'

import classes from './ticket-list.module.scss'

export default function TicketList() {
  const { ticketsCount } = useSelector((state) => state.tickets.ticketsCount)

  const tickets = useSelector((state) => state.tickets.value)
  const ticketsLoading = useSelector((state) => state.tickets.loading)
  const ticketsError = useSelector((state) => state.tickets.error)

  // data = from, to, price
  const ticketsRender = tickets.slice(0, ticketsCount).map((item, id) => {
    const { carrier, price } = item
    const [from, to] = [item.segments[0], item.segments[1]]

    return <Ticket key={`t${id + 1}`} data={{ carrier, price, from, to }} />
  })

  const noResults = (
    <div className={classes['app-tickets-not-found']}>Рейсов, подходящих под заданныефильтры, не найдено</div>
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
    <div className="centering-container" style={{ marginBottom: '15px' }}>
      <Spin size="large" />
    </div>
  )

  return (
    <section className={classes['app-tickets']}>
      <Sorting />
      <ul>
        {(ticketsLoading && spinner) || null}
        {(!ticketsLoading && ticketsError && errorResults) || null}
        {(ticketsRender.length && ticketsRender) || (!ticketsLoading && !ticketsError && noResults)}
      </ul>
      <button type="button" className={classes['app-button-more']}>
        Показать еще
      </button>
    </section>
  )
}
