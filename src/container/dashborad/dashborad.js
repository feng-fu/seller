import React from 'react'
import { TabBar, NavBar } from 'antd-mobile'
import { Switch, Route, Redirect } from 'react-router-dom'
import Manager from './manager/manager'
import List from './list/list'
import Message from './message/message'
import Me from './me/me'
import { connect } from 'react-redux'
@connect(
  state => state.user,
  {}
)
export default class extends React.Component {
  render() {
    const menu = [
      {
        title:'商品列表',
        desc:'商品列表',
        path: '/dashboard/list',
        icon: 'icon-sell',
        component: List
      },
      {
        title: '管理',
        desc: '管理',
        path: '/dashboard/manager',
        icon: 'icon-operationandmaintenancemanagement0101',
        component: Manager,
        hide: 'buyer'
      },
      {
        title: '消息',
        desc: '消息中心',
        path: '/dashboard/message',
        icon: 'icon-chat',
        component: Message
      },
      {
        title: '我',
        desc: '个人中心',
        path: '/dashboard/me',
        icon: 'icon-me',
        component: Me
      }
    ]
    const pathname = this.props.location.pathname
    const menuList = this.props.type ? menu.filter(v => v.hide !== this.props.type) : menu
    return (
      <div className="dashborad">
        <NavBar
          mode="dark"
          className="fixed-top"
        >{menuList.filter(v => v.path === pathname).length && menuList.filter(v => v.path === pathname)[0].desc}</NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {menuList.map(v=> (
              <Route key={v.path} path={v.path} component={v.component}/>
            ))}
            <Redirect exact from="/dashboard" to="/dashboard/list" />
          </Switch>
        </div>
        <div className="fixed-bottom">
          <TabBar>
            {menuList.map(v=>(
              <TabBar.Item
                key={v.title}
                title={v.title}
                icon={<i className={'iconfont ' + v.icon}></i>}
                onPress={() => this.props.history.push(v.path)}
                selected={v.path === pathname}
                selectedIcon={<i className={'iconfont ' + v.icon + '-copy'}></i>}
              ></TabBar.Item>
            ))}
          </TabBar>
        </div>
      </div>
    )
  }
}