import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PageLogin from '@/pages/login/login'
import Validator from '@/common/validator/validator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/login',
      name: 'PageLogin',
      component: PageLogin
    },{
      path: '/',
      name: 'Validator',
      component: Validator
    }
  ]
})
