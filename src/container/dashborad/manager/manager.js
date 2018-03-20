import React from 'react'
import { List, TextareaItem, InputItem, Accordion } from 'antd-mobile'
import axios from 'axios'

export default class Manager extends React.Component {
  constructor() {
    super()
    this.state ={
      content: '',
      title: '',
      price: ''
    }
    this.publishGoodsHandle = this.publishGoodsHandle.bind(this)
    this.changeStateHandle = this.changeStateHandle.bind(this)
  }
  changeStateHandle(key, val) {
    this.setState({
      [key]: val
    })
  }
  publishGoodsHandle() {
    
    axios.post(`/goods/add`, this.state)
      .then(r => {
        console.log(r)
      })
      .catch(e => {
        console.log(e)
      })
  }
  render() {
    return (
      <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
        <Accordion.Panel header="添加商品">
          <List>
            <InputItem
              placeholder="请输入标题"
              value={this.state.title}
              onChange={val => this.changeStateHandle('title', val)}
            >
            标题
            </InputItem>
            <TextareaItem
              title="内容"
              placeholder="请输入内容"
              data-seed="logId"
              value={this.state.content}
              onChange={val => this.changeStateHandle('content', val)}
              autoHeight
              rows={5}
              count={140}
            />
            <List.Item>

            <InputItem
              placeholder="请输入价格"
              value={this.state.price}
              onChange={val => this.changeStateHandle('price', val)}
          >价格</InputItem>

              <div
                style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                onClick={this.publishGoodsHandle.bind(this)}
              >
                提交
              </div>
            </List.Item>
          </List>
        </Accordion.Panel>
      </Accordion>
    )
  }
}