<template>
  <div id="message">
    <div class="message-item top-menus-wrap flex-r flex-a">
      <span>
        <span>粉丝</span>
      </span>
      <span>
        <span>赞</span>
      </span>
      <span>
        <span>@我</span>
      </span>
      <span>
        <span>评论</span>
      </span>
    </div>
    <div class="message-item line-menu-wrap" v-on:click="toggleMenu">
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
          <img class="user-head" :src="friend.headImg">
          <div class="item-content flex-col flex-b">
            <span class="flex-r flex-b">
              <span>{{friend.userName}}</span>
              <span>{{friend.lastMsgTime}}</span>
            </span>
            <span>
              <span v-if="friend.lastMsg !== ''">{{friend.lastMsg}}</span>
              <span v-if="friend.lastMsg === ''">座驾类型：{{friend.carType}}</span>
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
      attentionFriends: [{
        id: '1',
        headImg: 'http://img03.store.sogou.com/app/a/10010016/b1296a6eecf78db4143f93678c40ed0b',
        userName: '爱你的傻子',
        lastMsgTime: '11:00',
        lastMsg: '拉拉啊啦啦啦啦啦啦',
        carType: '宝马'
      }, {
        id: '2',
        headImg: 'http://img04.store.sogou.com/app/a/10010016/a8b6552ba860757da7a70ce18fa9505c',
        userName: '疼你的骗子',
        lastMsgTime: '111',
        lastMsg: '',
        carType: '红旗'
      }]
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
          var menuLayoutMaxHeight = `calc(${document.getElementById('content-wrap').clientHeight}px - ${messageItemsHeight}px - ${(messageItems.length - 1) * 1}px)`
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
    toggleMenu: function (event) {
      var menuType = (event.target.classList.contains('shrink-menu') || event.target.parentElement.classList.contains('shrink-menu') || event.target.parentElement.parentElement.classList.contains('shrink-menu')) ? 'shrink' : 'normal'
      if (menuType === 'normal') {
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
          var menuLayoutMaxHeight = `calc(${document.getElementById('content-wrap').clientHeight}px - ${messageItemsHeight}px - ${(messageItems.length - 1) * 1}px)`
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
    }
  }
}
</script>

<style scoped>
#content-wrap>div:nth-of-type(n + 2) {
  margin-top: 1px;
}

.top-menus-wrap {
  position: relative;
  padding: 8px 6px;
  background: rgb(44, 31, 74);
  padding-bottom: 32px;
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
  padding: 13px 18px;
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
  padding: 13px 18px;
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
  top: calc(50% - 5em - 10px);
  width: 100%;
  height: 10em;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  background-image: url('./../../assets/add.png');
}

.attention-friend-item {
  position: relative;
  padding: 10px 12px;
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

.attention-friend-item>img.user-head {
  width: 46px;
  height: 46px;
  border-radius: 46px;
}

.attention-friend-item>div.item-content {
  position: absolute;
  top: 10px;
  left: 72px;
  width: calc(100% - 12px - 72px);
  height: calc(50px - 12px);
  font-size: 0.6rem;
  padding: 4px 0 8px;
}

.attention-friend-item>div.item-content>span:nth-of-type(1) {
  font-size: 0.8rem;
}

.attention-friend-item>div.item-content>span:nth-of-type(1)>span {
  display: inline-block;
}

.attention-friend-item>div.item-content>span:nth-of-type(1)>span:last-of-type {
  font-size: 0.6rem;
  color: rgb(147, 133, 182);
}

.attention-friend-item>div.item-content>span:nth-of-type(2) {
  font-size: 0.4rem;
  color: rgb(119, 106, 151);
}
</style>
