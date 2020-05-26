import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import D2Crud from '@d2-projects/d2-crud'

import '@/assets/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'
import moment from 'vue-moment'
import Authorized from '@/components/Authorized'
import '@/assets/icons'
import '@/permission'
Vue.use(ElementUI, { locale })
Vue.use(D2Crud)
Vue.use(moment)
Vue.prototype.$Moment = moment
Vue.component('Authorized', Authorized)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
