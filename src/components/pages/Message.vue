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
        <span>@我的</span>
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
        <div>好友列表</div>
        <i></i>
      </div>
      <div class="menu-layout close">
        <div>这里写消息列表项的ui</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-message',
  methods: {
    toggleMenu: function (event) {
      var menuType = (event.target.classList.contains('shrink-menu') || event.target.parentElement.classList.contains('shrink-menu') || event.target.parentElement.parentElement.classList.contains('shrink-menu')) ? 'shrink' : 'normal'
      if (menuType === 'normal') {
      } else if (menuType === 'shrink') {
        var shrinkMenuLayoutElem = event.target.getElementsByClassName('menu-layout')[0] || event.target.parentElement.getElementsByClassName('menu-layout')[0] || event.target.parentElement.parentElement.getElementsByClassName('menu-layout')[0]
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
        } else {
          shrinkMenuLayoutElem.style['transition-duration'] = '0.2s'
          shrinkMenuLayoutElem.classList.remove('open')
          shrinkMenuLayoutElem.classList.add('close')
          shrinkMenuLayoutElem.style.height = '0'
        }
      }
    }
  },
  data () {
    return {}
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
  background: #2D2D2D;
  padding-bottom: 32px;
}

.top-menus-wrap>span {
  position: relative;
  display: inline-block;
  width: calc((100vw - 12px - 20px) / 4);
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  margin: 0 auto;
}

.top-menus-wrap>span:nth-of-type(1) {
  background-image: url('./../../assets/add.png');
}

.top-menus-wrap>span:nth-of-type(2) {
  background-image: url('./../../assets/add.png');
}

.top-menus-wrap>span:nth-of-type(3) {
  background-image: url('./../../assets/add.png');
}

.top-menus-wrap>span:nth-of-type(4) {
  background-image: url('./../../assets/add.png');
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
  background: #2D2D2D;
  padding: 13px 18px;
}

.line-menu-wrap>i {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 14px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  background-image: url('./../../assets/add.png');
}

.shrink-menu {
  position: relative;
  padding: 0;
}

.shrink-menu>div.menu-item {
  position: relative;
  background: #2D2D2D;
  padding: 13px 18px;
}

.shrink-menu>div.menu-item>i {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 14px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  background-image: url('./../../assets/add.png');
}

.shrink-menu>div.menu-layout {
  position: relative;
  background: rgb(15, 15, 24);
  overflow-x: hidden;
  overflow-y: auto;
  height: 0;
  transition: height 0.4s ease-in-out 0s;
  -moz-transition: height 0.4s ease-in-out 0s;
  -webkit-transition: height 0.4s ease-in-out 0s;
  -o-transition: height 0.4s ease-in-out 0s;
}
</style>
