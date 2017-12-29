import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
export default class GoodsCard extends React.Component {
  render() {
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
          <Card>
            <Card.Header
              title="This is title"
              extra={<span>this is extra</span>}
            />
            <Card.Body>
              <div>This is content of `Card`</div>
            </Card.Body>
            <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
          </Card>
        <WhiteSpace size="lg" />
      </WingBlank>
    )
  }
}