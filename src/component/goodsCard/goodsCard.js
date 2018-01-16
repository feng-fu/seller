import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import moment from 'moment'
moment.locale('zh-cn')
export default props => {
  console.log(props)
  return (
    <WingBlank size="lg">
      <WhiteSpace size="sm" />
        <Card>
          <Card.Header
            title={props.title}
            extra={<span>￥{props.price}</span>}
          />
          <Card.Body>
            <div>{props.desc}</div>
          </Card.Body>
          <Card.Footer content={`来自${props.user}`} extra={<div>{moment().from(props.create_time)}</div>} />
        </Card>
    </WingBlank>
  )
}