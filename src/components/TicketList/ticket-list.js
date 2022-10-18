import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spin, Result } from 'antd'

import Sorting from '../Sorting/sorting'
import Ticket from '../Ticket/ticket'
import { setTicketsCount } from '../../ticketsFeatures'

import classes from './ticket-list.module.scss'

export default function TicketList() {
  const dispatch = useDispatch()
  const ticketsCount = useSelector((state) => state.tickets.ticketsCount)

  const tickets = useSelector((state) => state.tickets.value)
  const ticketsLoading = useSelector((state) => state.tickets.loading)
  const ticketsError = useSelector((state) => state.tickets.error)

  const ticketsRender = tickets.slice(0, ticketsCount).map((item, id) => {
    const { carrier, price } = item
    const [from, to] = [item.segments[0], item.segments[1]]

    return <Ticket key={`t${id + 1}`} data={{ carrier, price, from, to }} />
  })

  // console.log(ticketsRender.length)

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
    <div className="centering-container" style={{ marginBottom: '15px' }}>
      <Spin size="large" />
    </div>
  )

  const onHandle = () => {
    dispatch(setTicketsCount())
    console.log('click more-tickets', ticketsCount)
  }

  return (
    <section className={classes['app-tickets']}>
      <Sorting />
      <ul>
        {(ticketsLoading && spinner) || null}
        {(!ticketsLoading && ticketsError && errorResults) || null}
        {(ticketsRender.length && ticketsRender) || (!ticketsLoading && !ticketsError && noResults)}
        {ticketsRender.length >= ticketsCount && !errorResults}
      </ul>
      {(ticketsLoading && ticketsError) || null}
      {ticketsRender.length >= ticketsCount && ticketsLoading ? (
        <button type="button" className={classes['app-button-more']} onClick={onHandle}>
          Показать еще
        </button>
      ) : null}
    </section>
  )
}
