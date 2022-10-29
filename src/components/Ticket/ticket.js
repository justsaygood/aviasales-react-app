import React from 'react'
import { format, differenceInHours, differenceInMinutes } from 'date-fns'
import { Col, Row } from 'antd'

import classes from '../TicketList/ticket-list.module.scss'

export default function Ticket({ data }) {
  const layoverText = (num) => {
    if (num === 1) return `${num} пересадка`
    if (num > 1 && num < 5) return `${num} пересадки`
    return `${num} пересадок`
  }

  const scheduledTime = (date, duration) => {
    const departureTime = format(new Date(date), 'HH:mm')
    const arrivalTime = format(new Date(date).setMinutes(new Date(date).getMinutes() + duration), 'HH:mm')
    return `${departureTime} - ${arrivalTime}`
  }

  const flightTime = (date, duration) => {
    const departureTime = new Date(date)
    const arrivalTime = new Date(date).setMinutes(new Date(date).getMinutes() + duration)
    const hoursDiff = differenceInHours(new Date(arrivalTime), departureTime)
    const minDiff = differenceInMinutes(new Date(arrivalTime), departureTime)
    return `${hoursDiff}ч ${minDiff - hoursDiff * 60}м`
  }

  return (
    <li className={classes.ticket}>
      <div className={classes['ticket-body']}>
        <div className={classes['ticket-price-logo']}>
          <span className={classes['ticket-price']}>{data.price} ₽</span>
          <img
            className={classes['ticket-logo']}
            src={`https://pics.avs.io/99/36/${data.carrier}.png`}
            alt={data.carrier}
          />
        </div>
        <Row gutter={[20, 10]}>
          <Col span={8}>
            <div className={classes['ticket-info']}>
              <span>{`${data.from.origin} – ${data.from.destination}`}</span>
              <span>{scheduledTime(data.from.date, data.from.duration)}</span>
            </div>
          </Col>
          <Col span={8}>
            <div className={classes['ticket-info']}>
              <span>В пути</span>
              <span>{flightTime(data.from.date, data.from.duration)}</span>
            </div>
          </Col>
          <Col span={8}>
            <div className={classes['ticket-info']}>
              {data.from.stops.length ? (
                <>
                  <span>{`${layoverText(data.from.stops.length)}`}</span>
                  <span>{data.from.stops.join(', ')}</span>
                </>
              ) : (
                <>
                  <span>Без пересадок</span>
                  <span />
                </>
              )}
            </div>
          </Col>
          <Col span={8}>
            <div className={classes['ticket-info']}>
              <span>{`${data.to.origin} – ${data.to.destination}`}</span>
              <span>{scheduledTime(data.to.date, data.to.duration)}</span>
            </div>
          </Col>
          <Col span={8}>
            <div className={classes['ticket-info']}>
              <span>В пути</span>
              <span>{flightTime(data.to.date, data.to.duration)}</span>
            </div>
          </Col>
          <Col span={8}>
            <div className={classes['ticket-info']}>
              {data.to.stops.length ? (
                <>
                  <span>{`${layoverText(data.to.stops.length)}`}</span>
                  <span>{data.to.stops.join(', ')}</span>
                </>
              ) : (
                <>
                  <span>Без пересадок</span>
                  <span />
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </li>
  )
}
