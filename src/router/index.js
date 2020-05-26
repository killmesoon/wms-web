import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
Vue.use(Router)
export const constantDashBoardRoutes = {
  path: '/111111111',
  hidden: true,
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/index'),
    meta: { title: '首页', icon: 'menu-dashboard', affix: false, noCache: true, breadcrumb: false }

  }]
}

export const constantRoutes = [
  {
    path: '/',
    redirect: '/blank',
    hidden: true
  },
  {
    path: '/blank',
    component: () => import('@/views/Blank/index'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/Redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    hidden: true,
    path: '*',
    redirect: '/404'
  }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [],
  base: process.env.VUE_APP_VISIT_PREFIX
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
