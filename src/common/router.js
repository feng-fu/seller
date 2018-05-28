import Login from './../container/login/login'
import Register from './../container/register/register'

const routerConfig = {
  '/user': [
    {
      path: '/user/login',
      component: Login,
      name: '登录'
    },
    {
      path: '/user/register',
      component: Register,
      name: '注册'
    }
  ]
}

export const getRouterData = (path) => routerConfig[path] || []
