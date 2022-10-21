import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spin, Result } from 'antd'

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

  const ticketsRender = tickets.slice(0, ticketsCount).map((item, id) => {
    const { carrier, price } = item
    const [from, to] = [item.segments[0], item.segments[1]]

    return <Ticket key={`t${id + 1}`} data={{ carrier, price, from, to }} />
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

  console.log(ticketsCount, 'vs', ticketsRender.length, 'and', ticketsRender)

  return (
    <section className={classes['app-tickets']}>
      <Sorting />
      <ul>
        {(ticketsLoading && spinner) || null}
        {(!ticketsLoading && ticketsError && errorResults && ticketsRender.length === 0) || null}
        {(ticketsRender.length && ticketsRender) || (!ticketsLoading && !ticketsError && noResults)}
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
