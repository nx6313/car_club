import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import MessageBox from '@/plugins/MessageBox'
import Config from './../config.js'
import Index from '@/components/pages/Index'
import Attention from '@/components/pages/Attention'
import Message from '@/components/pages/Message'
import Me from '@/components/pages/Me'
import VideoChild from '@/components/pages/children/VideoChild'
import StateChild from '@/components/pages/children/StateChild'
import MessageComment from '@/components/pages/children/MessageComment'
import MessageAtme from '@/components/pages/children/MessageAtme'
import MessagePraise from '@/components/pages/children/MessagePraise'
import MessageFans from '@/components/pages/children/MessageFans'
import MessageInterest from '@/components/pages/children/MessageInterest'
import MessageChat from '@/components/pages/children/MessageChat'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(MessageBox)
Vue.use(Config)

var router = new Router({
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
      component: Me,
      children: [
        {
          path: '',
          component: VideoChild
        }, {
          path: 'child-video',
          component: VideoChild
        }, {
          path: 'child-state',
          component: StateChild
        }
      ]
    },
    {
      path: '/message-comment',
      name: 'message-comment',
      component: MessageComment,
      meta: {
        title: '评论'
      }
    },
    {
      path: '/message-atme',
      name: 'message-atme',
      component: MessageAtme,
      meta: {
        title: '@ 我的'
      }
    },
    {
      path: '/message-praise',
      name: 'message-praise',
      component: MessagePraise,
      meta: {
        title: '赞'
      }
    },
    {
      path: '/message-fans',
      name: 'message-fans',
      component: MessageFans,
      meta: {
        title: '粉丝'
      }
    },
    {
      path: '/message-interest',
      name: 'message-interest',
      component: MessageInterest,
      meta: {
        title: '可能感兴趣的人'
      }
    },
    {
      path: '/message-chat:chatusername',
      name: 'message-chat',
      component: MessageChat,
      meta: {
        title: '聊天 - '
      }
    }
  ]
})
router.beforeEach(function (to, from, next) {
  if (to.meta.title) {
    var chatUserName = to.params['chatusername'] || ''
    document.title = to.meta.title + chatUserName
  } else {
    document.title = '极道汽车俱乐部'
  }
  next()
})

export default router
