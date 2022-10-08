import React from 'react'
import { Col, Row } from 'antd'

import S7 from '../../images/s7.png'
import Sorting from '../Sorting/sorting'

import classes from './tickets.module.scss'

export default function Tickets() {
  return (
    <section className={classes['app-tickets']}>
      <Sorting />
      <ul>
        <li className={classes.ticket}>
          <div className={classes['ticket-body']}>
            <div className={classes['ticket-price-logo']}>
              <span className={classes['ticket-price']}>35 000 ₽</span>
              <img className={classes['ticket-logo']} src={S7} alt="company logo" />
            </div>
            <Row gutter={[20, 10]}>
              <Col span={8}>
                <div className={classes['ticket-info']}>
                  <span>City</span>
                  <span>12:30</span>
                </div>
              </Col>
              <Col span={8}>
                <div className={classes['ticket-info']}>
                  <span>Time</span>
                  <span>12:30</span>
                </div>
              </Col>
              <Col span={8}>
                <div className={classes['ticket-info']}>
                  <span>Без пересадок</span>
                  <span>-</span>
                </div>
              </Col>
              <Col span={8}>
                <div className={classes['ticket-info']}>
                  <span>City</span>
                  <span>13:30</span>
                </div>
              </Col>
              <Col span={8}>
                <div className={classes['ticket-info']}>
                  <span>Time</span>
                  <span>6:00</span>
                </div>
              </Col>
              <Col span={8}>
                <div className={classes['ticket-info']}>
                  <span>2 пересадки</span>
                  <span>SCW, VKO</span>
                </div>
              </Col>
            </Row>
          </div>
        </li>
      </ul>
      <button type="button" className={classes['app-button-more']}>
        Показать еще
      </button>
    </section>
  )
}
