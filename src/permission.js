import router from './router'
import { constantDashBoardRoutes, constantRoutes } from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
import Layout from '@/components/Layout'
import { getMenus } from '@/api/user'

const _import = require('./router/_import_' + process.env.NODE_ENV)
NProgress.configure({ showSpinner: false })
var getRouter

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  if (typeof getRouter !== 'undefined') {
    next()
  } else {
    if (typeof store.getters.menus === 'undefined') {
      await getMenus().then(response => {
        const { data } = response
        getRouter = data[0].routers
        const { name, number, loginName, phone, email, authorities } = data[0].user
        store.commit('user/SET_NAME', name)
        store.commit('user/SET_NUMBER', number)
        store.commit('user/SET_LOGINNAME', loginName)
        store.commit('user/SET_PHONE', phone)
        store.commit('user/SET_EMAIL', email)
        store.commit('user/SET_AUTHORITIES', authorities)
      }).catch(() => {
        getRouter = []
      })
      routerGo(to, next)
    } else {
      getRouter = store.getters.menus
      routerGo(to, next)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter)
  for (let index = 0; index < constantRoutes.length; index++) {
    if (index === 0 && getRouter.length > 0) {
      // const defaultRouter = { ...constantRoutes[index] }
      // if (constantRoutes[index].redirect.indexOf('dashboard') === -1) {
      // defaultRouter.redirect = getRouter[0].path
      // }
      getRouter = [constantDashBoardRoutes, ...getRouter]
      continue
    }
    getRouter.push(constantRoutes[index])
  }
  router.addRoutes(getRouter)
  store.commit('user/SET_MENU', getRouter)
  next({ ...to, replace: true })
}

function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}
