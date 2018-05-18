import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Config from './../config.js'
import Index from '@/components/pages/Index'
import Attention from '@/components/pages/Attention'
import Message from '@/components/pages/Message'
import Me from '@/components/pages/Me'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(Config)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'page-index',
      component: Index
    },
    {
      path: '/attention',
      name: 'page-attention',
      component: Attention
    },
    {
      path: '/message',
      name: 'page-message',
      component: Message
    },
    {
      path: '/me',
      name: 'page-me',
      component: Me
    }
  ]
})
