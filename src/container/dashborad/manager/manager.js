import React from 'react'
import { List, TextareaItem, InputItem, Accordion } from 'antd-mobile';

export default class Manager extends React.Component {
  render() {
    return (
      <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
        <Accordion.Panel header="添加商品">
          <List>
            <InputItem
              placeholder="请输入标题"
              ref={el => this.autoFocusInst = el}
            >
            标题
            </InputItem>
            <TextareaItem
              title="内容"
              placeholder="请输入内容"
              data-seed="logId"
              autoHeight
              ref={el => this.customFocusInst = el}
              rows={5}
              count={140}
            />
            <List.Item>
              <div
                style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                onClick={() => this.customFocusInst.focus()}
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