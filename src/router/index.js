import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import MessageBox from '@/plugins/MessageBox'
import Config from './../config.js'
import ComFun from './../comfun.js'
import Index from '@/components/pages/Index'
import Attention from '@/components/pages/Attention'
import Issue from '@/components/pages/Issue'
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
import EditUserInfo from '@/components/pages/children/EditUserInfo'
import VideoStateDetail from '@/components/pages/children/VideoStateDetail'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(MessageBox)
Vue.use(Config)
Vue.use(ComFun)

/** 定义全局指令 */
// picker选择容器指令
Vue.directive('picker', {
  inserted: function (el, binding) {
    var inputs = el.getElementsByTagName('input')
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].readOnly = true
    }
    el.onclick = function () {
      binding.value.context.$picker(binding.value.context, {
        debug: binding.value.debug,
        title: binding.value.title,
        cols: binding.value.cols,
        value: binding.value.value,
        selectedFn: binding.value.selectedFn,
        selectedFinishFn: binding.value.selectedFinishFn,
        shadeBg: binding.value.shadeBg,
        background: binding.value.background,
        color: binding.value.color,
        titleColor: binding.value.titleColor,
        titleLineColor: binding.value.titleLineColor,
        gradualHeight: binding.value.gradualHeight,
        wheelHeight: binding.value.wheelHeight,
        wheelBg: binding.value.wheelBg,
        colLineColor: binding.value.colLineColor,
        colLineHeight: binding.value.colLineHeight,
        selectedBg: binding.value.selectedBg,
        lineSelectedColor: binding.value.lineSelectedColor,
        lineSelectedOffsetTop: binding.value.lineSelectedOffsetTop,
        merge: binding.value.merge,
        unitFollow: binding.value.unitFollow,
        unitBg: binding.value.unitBg,
        touchRate: binding.value.touchRate,
        arg: binding.value.arg
      })
    }
  }
})

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
      path: '/issue',
      name: 'page-issue',
      component: Issue,
      meta: {
        title: '发布动态'
      }
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
      path: '/message-chat/:chatid/:chatusername',
      name: 'message-chat',
      component: MessageChat,
      meta: {
        title: '聊天 - '
      }
    },
    {
      path: '/me-edit-user-info',
      name: 'me-edit-user-info',
      component: EditUserInfo,
      meta: {
        title: '编辑资料'
      }
    },
    {
      path: '/me-state-detail',
      name: 'me-state-detail',
      component: VideoStateDetail,
      meta: {
        title: '动态详情'
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
