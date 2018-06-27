<template>
  <div id="message">
    <div class="message-item top-menus-wrap flex-r flex-a">
      <span @click="toChildPage('/message-fans')">
        <span>粉丝</span>
      </span>
      <span @click="toChildPage('/message-praise')">
        <span>赞</span>
      </span>
      <span @click="toChildPage('/message-atme')">
        <span>@ 我</span>
      </span>
      <span @click="toChildPage('/message-comment')">
        <span>评论</span>
      </span>
    </div>
    <div class="message-item line-menu-wrap" v-on:click="toggleMenu('/message-interest')">
      <div>可能感兴趣的人</div>
      <i></i>
    </div>
    <div class="message-item line-menu-wrap shrink-menu">
      <div class="menu-item" v-on:click="toggleMenu">
        <div>关注好友列表</div>
        <i></i>
      </div>
      <div class="menu-layout open attention-friend">
        <div class="attention-friend-item" v-if="attentionFriends.length > 0" v-for="friend in attentionFriends" :key="friend.id">
          <span class="user-head" :style="friend.headImg ? { 'background-image': 'url(' + friend.headImg + ')' } : ''"></span>
          <div class="item-content flex-col flex-b" @click="toChildPage('/message-chat', '/' + friend.id + '/' + friend.userName)">
            <span class="flex-r flex-b">
              <span>{{friend.userName}}</span>
              <span>
                <span v-if="friend.lastMsg !== ''">{{friend.lastMsgTime}}</span>
              </span>
            </span>
            <span>
              <span v-if="friend.lastMsg !== ''">{{friend.lastMsg}}</span>
              <span v-if="friend.lastMsg === '' && friend.carType">座驾：{{friend.carType}}</span>
              <span v-if="friend.lastMsg === '' && !friend.carType">座驾：未填写</span>
            </span>
          </div>
        </div>
        <div class="attention-friend-list-empty" v-if="attentionFriends.length == 0"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-message',
  data () {
    return {
      attentionFriends: []
    }
  },
  mounted () {
    var menuLayouts = document.getElementById('content-wrap').getElementsByClassName('menu-layout')
    for (var ml = 0; ml < menuLayouts.length; ml++) {
      if (menuLayouts[ml].classList.contains('attention-friend')) {
        var lineMenuArrows = menuLayouts[ml].parentElement.getElementsByTagName('i')[0]
        lineMenuArrows.style.transitionDuration = '0s'
        if (this.$moment.message_attention_friend_toggle_state === 1 || (this.$moment.message_attention_friend_toggle_state === -1 && menuLayouts[ml].classList.contains('open'))) {
          var allShrinkMenuLayoutElems = menuLayouts[ml].parentElement.parentElement.getElementsByClassName('shrink-menu')
          for (var asm = 0; asm < allShrinkMenuLayoutElems.length; asm++) {
            allShrinkMenuLayoutElems[asm].getElementsByClassName('menu-layout')[0].classList.remove('open')
            allShrinkMenuLayoutElems[asm].getElementsByClassName('menu-layout')[0].classList.add('close')
            allShrinkMenuLayoutElems[asm].getElementsByClassName('menu-layout')[0].style.height = '0'
          }
          var messageItems = document.getElementById('content-wrap').getElementsByClassName('message-item')
          var messageItemsHeight = 0
          for (var mi = 0; mi < messageItems.length; mi++) {
            if (messageItems[mi].classList.contains('shrink-menu')) {
              messageItemsHeight += messageItems[mi].getElementsByClassName('menu-item')[0].clientHeight
            } else {
              messageItemsHeight += messageItems[mi].clientHeight
            }
          }
          var menuLayoutMaxHeight = `calc(${document.getElementById('content-wrap').clientHeight}px - ${messageItemsHeight}px - ${(messageItems.length - 1) * 1}px - 7px)`
          menuLayouts[ml].style['transition-duration'] = '0.4s'
          menuLayouts[ml].classList.remove('close')
          menuLayouts[ml].classList.add('open')
          menuLayouts[ml].style.height = menuLayoutMaxHeight
          lineMenuArrows.style.transform = 'rotate(0deg)'
        } else {
          menuLayouts[ml].style['transition-duration'] = '0.2s'
          menuLayouts[ml].classList.remove('open')
          menuLayouts[ml].classList.add('close')
          menuLayouts[ml].style.height = '0'
          lineMenuArrows.style.transform = 'rotate(-90deg)'
        }
        setTimeout(() => {
          lineMenuArrows.style.transitionDuration = '0.3s'
        }, 0.3 * 1000)
      }
    }
  },
  methods: {
    toggleMenu: function (toRoutePath) {
      var menuType = (event.target.classList.contains('shrink-menu') || event.target.parentElement.classList.contains('shrink-menu') || event.target.parentElement.parentElement.classList.contains('shrink-menu')) ? 'shrink' : 'normal'
      if (menuType === 'normal') {
        this.toChildPage(toRoutePath)
      } else if (menuType === 'shrink') {
        var shrinkMenuLayoutElem = event.target.getElementsByClassName('menu-layout')[0] || event.target.parentElement.getElementsByClassName('menu-layout')[0] || event.target.parentElement.parentElement.getElementsByClassName('menu-layout')[0]
        var lineMenuArrows = shrinkMenuLayoutElem.parentElement.getElementsByTagName('i')[0]
        if (shrinkMenuLayoutElem.classList.contains('close')) {
          var allShrinkMenuLayoutElems = shrinkMenuLayoutElem.parentElement.parentElement.getElementsByClassName('shrink-menu')
          for (var asm = 0; asm < allShrinkMenuLayoutElems.length; asm++) {
            allShrinkMenuLayoutElems[asm].getElementsByClassName('menu-layout')[0].classList.remove('open')
            allShrinkMenuLayoutElems[asm].getElementsByClassName('menu-layout')[0].classList.add('close')
            allShrinkMenuLayoutElems[asm].getElementsByClassName('menu-layout')[0].style.height = '0'
          }
          var messageItems = document.getElementById('content-wrap').getElementsByClassName('message-item')
          var messageItemsHeight = 0
          for (var mi = 0; mi < messageItems.length; mi++) {
            if (messageItems[mi].classList.contains('shrink-menu')) {
              messageItemsHeight += messageItems[mi].getElementsByClassName('menu-item')[0].clientHeight
            } else {
              messageItemsHeight += messageItems[mi].clientHeight
            }
          }
          var menuLayoutMaxHeight = `calc(${document.getElementById('content-wrap').clientHeight}px - ${messageItemsHeight}px - ${(messageItems.length - 1) * 1}px - 7px)`
          shrinkMenuLayoutElem.style['transition-duration'] = '0.4s'
          shrinkMenuLayoutElem.classList.remove('close')
          shrinkMenuLayoutElem.classList.add('open')
          shrinkMenuLayoutElem.style.height = menuLayoutMaxHeight
          lineMenuArrows.style.transform = 'rotate(0deg)'
          if (shrinkMenuLayoutElem.classList.contains('attention-friend')) {
            this.$moment.message_attention_friend_toggle_state = 1
          }
        } else {
          shrinkMenuLayoutElem.style['transition-duration'] = '0.2s'
          shrinkMenuLayoutElem.classList.remove('open')
          shrinkMenuLayoutElem.classList.add('close')
          shrinkMenuLayoutElem.style.height = '0'
          lineMenuArrows.style.transform = 'rotate(-90deg)'
          if (shrinkMenuLayoutElem.classList.contains('attention-friend')) {
            this.$moment.message_attention_friend_toggle_state = 0
          }
        }
      }
    },
    toChildPage (childPageRouter, params) {
      var option = params || ''
      this.$router.push(childPageRouter + option)
    }
  },
  activated () {
    this.$root.eventHub.$on('ws-get-msg', (receiveMsg) => {
      if (receiveMsg.wsOpCode === this.$moment.wsChatCode.LOGIN_CHAT_SERVER_S) {
        if (this.attentionFriends.length > 0) {
          for (let f = 0; f < this.attentionFriends.length; f++) {
            this.$comfun.webSend(this, {
              wsOpCode: this.$moment.wsChatCode.GET_CHAT_LIST_C,
              currentPage: 1,
              pageSize: 99999,
              toType: 1,
              toTypeId: this.attentionFriends[f].id,
              chatCreateTime: ''
            })
          }
        }
      }
    })
    this.$loading('加载好友列表中...')
    this.$comfun.http_get(this, this.$moment.urls.friend + '?accountId=' + this.$moment.wxUserInfo.accountId).then((response) => {
      if (response.body.code === '0000' && response.body.success === true) {
        if (response.body.data.length > 0) {
          this.attentionFriends = []
          for (let f = 0; f < response.body.data.length; f++) {
            this.attentionFriends.push({
              id: response.body.data[f].accountId,
              headImg: response.body.data[f].headimg,
              userName: response.body.data[f].nickName,
              lastMsgTime: '',
              lastMsg: '',
              carType: response.body.data[f].carList
            })
          }
          if (this.attentionFriends.length > 0) {
            this.$moment.wsIsOpen = false
            this.$comfun.webClose(this)
            // this.$comfun.webSend(this, {
            //   wsOpCode: this.$moment.wsChatCode.LOGIN_CHAT_SERVER_C,
            //   token: this.$moment.wxUserInfo.accountId
            // })
          }
        }
      } else {
        this.$toast('好友列表数据获取失败')
      }
    })
  },
  deactivated () {
    this.$root.eventHub.$off('ws-get-msg')
  }
}
</script>

<style scoped>
#content-wrap {
  overflow: hidden;
}

#content-wrap>div:nth-of-type(n + 2) {
  margin-top: 1px;
}

.top-menus-wrap {
  position: relative;
  padding: 0.9rem 1rem;
  background: rgb(44, 31, 74);
  padding-bottom: 2rem;
  margin-bottom: 7px;
}

.top-menus-wrap>span {
  position: relative;
  display: inline-block;
  width: calc((100vw - 12px - 20px) / 4);
  height: 50px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  margin: 0 auto;
}

.top-menus-wrap>span:nth-of-type(1) {
  background-image: url('./../../assets/fans.png');
}

.top-menus-wrap>span:nth-of-type(2) {
  background-image: url('./../../assets/praise.png');
}

.top-menus-wrap>span:nth-of-type(3) {
  background-image: url('./../../assets/at.png');
}

.top-menus-wrap>span:nth-of-type(4) {
  background-image: url('./../../assets/discuss.png');
}

.top-menus-wrap>span>span{
  display: inline-block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -24px;
  text-align: center;
  font-weight: bold;
}

.line-menu-wrap {
  position: relative;
  background: rgb(44, 31, 74);
  padding: 0.9rem 1.2rem;
}

.line-menu-wrap>i {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 14px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  background-image: url('./../../assets/item-normal.png');
}

.shrink-menu {
  position: relative;
  padding: 0;
}

.shrink-menu>div.menu-item {
  position: relative;
  background: rgb(44, 31, 74);
  padding: 0.9rem 1.2rem;
}

.shrink-menu>div.menu-item>i {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 14px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
  background-image: url('./../../assets/item-shrink.png');
  transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transform: rotate(-90deg);
}

.shrink-menu>div.menu-layout {
  position: relative;
  background: rgb(30, 20, 54);
  overflow-x: hidden;
  overflow-y: auto;
  height: 0;
  transition: height 0.4s ease-in-out 0s;
  -moz-transition: height 0.4s ease-in-out 0s;
  -webkit-transition: height 0.4s ease-in-out 0s;
  -o-transition: height 0.4s ease-in-out 0s;
}

.attention-friend-list-empty {
  position: absolute;
  top: calc(50% - 3.5em - 14%);
  width: 100%;
  height: 7em;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  background-image: url('./../../assets/friend-empty.png');
}

.attention-friend-list-empty::after {
  content: '还没有关注的好友，快去关注好友吧';
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  text-align: center;
  color: #8b7caf;
  font-size: 0.7rem;
}

.attention-friend-item {
  position: relative;
  padding: 0.6rem 0.9rem;
  font-size: 0;
}

.attention-friend-item:nth-of-type(n + 2)::after {
  content: '';
  position: absolute;
  top: 0;
  left: 8px;
  right: 8px;
  height: 1px;
  background: rgb(66, 48, 109);
}

.attention-friend-item>span.user-head {
  display: inline-block;
  width: 46px;
  height: 46px;
  border-radius: 46px;
  background-color: #ffffff;
  background-repeat: repeat-x;
  background-position: center;
  background-size: auto 100%;
  background-image: url('./../../assets/add.png');
}

.attention-friend-item>div.item-content {
  position: absolute;
  top: 0.6rem;
  left: 4.5rem;
  width: calc(100% - 0.9rem - 4.5rem);
  height: calc(46px - 0.4rem);
  font-size: 0.6rem;
  padding: 0.2rem 0 0.1rem;
}

.attention-friend-item>div.item-content>span:nth-of-type(1) {
  font-size: 0.8rem;
}

.attention-friend-item>div.item-content>span:nth-of-type(1)>span {
  display: inline-block;
}

.attention-friend-item>div.item-content>span:nth-of-type(1)>span:last-of-type {
  font-size: 0.7rem;
  color: rgb(147, 133, 182);
}

.attention-friend-item>div.item-content>span:nth-of-type(2) {
  font-size: 0.7rem;
  color: rgb(119, 106, 151);
}
</style>
