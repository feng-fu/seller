import React from 'react'
import DocumentTitle from 'react-document-title'
import { Switch, Route, Redirect } from 'react-router-dom'
import { getRouterData } from './../common/router'

class UserLayout extends React.Component {
  getPageTitle(currentRoutes, currentPath) {
    const currentRoute = currentRoutes.find(v => currentPath.indexOf(v.path) > -1)
    return currentRoute ? currentRoute.name : '用户页'
  }
  render() {
    const path = this.props.location.pathname
    const currentRoutes = getRouterData('/user')
    console.log(path, currentRoutes)
    return (
      <DocumentTitle title={this.getPageTitle(currentRoutes, path)}>
        <Switch>
          {
            currentRoutes.map(v => (
              <Route
                key={v.path}
                path={v.path}
                component={v.component}
              />
            ))
          }
          <Redirect exact from="/user" to="/user/login" />
        </Switch>
      </DocumentTitle>
    )
  }
}

export default UserLayout
