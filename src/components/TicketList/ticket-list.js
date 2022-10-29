import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spin, Result } from 'antd'
import { nanoid } from '@reduxjs/toolkit'

import Sorting from '../Sorting/sorting'
import Ticket from '../Ticket/ticket'
import { setTicketsCount } from '../../redux/ticketsFeatures'

import classes from './ticket-list.module.scss'

export default function TicketList({ connection }) {
  const dispatch = useDispatch()

  const { ticketsCount, value } = useSelector((state) => state.tickets)

  const ticketsLoading = useSelector((state) => state.tickets.loading)
  const ticketsError = useSelector((state) => state.tickets.error)

  const noChange = useSelector((state) => state.filters.checkedItems[1].isChecked)
  const oneChange = useSelector((state) => state.filters.checkedItems[2].isChecked)
  const twoChanges = useSelector((state) => state.filters.checkedItems[3].isChecked)
  const threeChanges = useSelector((state) => state.filters.checkedItems[4].isChecked)

  const getPacketTickets = value.filter((ticket) => {
    const stopsLengthFirst = ticket.segments[0].stops.length
    const stopsLengthSecond = ticket.segments[1].stops.length

    return (
      (stopsLengthFirst === (noChange && 0) && stopsLengthSecond === (noChange && 0)) ||
      (stopsLengthFirst === (oneChange && 1) && stopsLengthSecond === (oneChange && 1)) ||
      (stopsLengthFirst === (twoChanges && 2) && stopsLengthSecond === (twoChanges && 2)) ||
      (stopsLengthFirst === (threeChanges && 3) && stopsLengthSecond === (threeChanges && 3))
    )
  })

  const ticketsRender = getPacketTickets.slice(0, ticketsCount).map((item) => {
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
        {!connection ? errorResults && !ticketsRender : null}
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
