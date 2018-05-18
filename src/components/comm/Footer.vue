<template>
  <div id="fooer" :class="['flex-r flex-a', curPageIndex == 0 ? 'footerIndex' : 'footerNotIndex']">
    <span v-on:click="toPage('/', 1)">首页</span>
    <span v-on:click="toPage('/attention', 2)">关注</span>
    <span class="btn-video-add"></span>
    <span v-on:click="toPage('/message', 4)">消息</span>
    <span v-on:click="toPage('/me', 5)">我</span>
    <div class="footer-indicator"></div>
  </div>
</template>

<script>
export default {
  name: 'comm-footer',
  mounted () {
    var currentRouterName = this.$router.currentRoute.name
    var indicatorElem = document.getElementById('fooer').getElementsByClassName('footer-indicator')[0]
    if (currentRouterName === 'page-index') {
      this.curPageIndex = 0
      indicatorElem.style.transform = `translateX(calc((100vw - 80px - 10px) / 4 * ${0}))`
    } else if (currentRouterName === 'page-attention') {
      this.curPageIndex = 1
      indicatorElem.style.transform = `translateX(calc((100vw - 80px - 10px) / 4 * ${1}))`
    } else if (currentRouterName === 'page-message') {
      this.curPageIndex = 3
      indicatorElem.style.transform = `translateX(calc(100vw - (100vw - 80px - 10px) / 4 * ${5 - 3}))`
    } else if (currentRouterName === 'page-me') {
      this.curPageIndex = 4
      indicatorElem.style.transform = `translateX(calc(100vw - (100vw - 80px - 10px) / 4 * ${5 - 4}))`
    }
  },
  methods: {
    toPage: function (pageTo, pageIndex) {
      this.$router.push(pageTo)
      this.curPageIndex = pageIndex - 1
      var indicatorElem = document.getElementById('fooer').getElementsByClassName('footer-indicator')[0]
      if (pageIndex < 3) {
        indicatorElem.style.transform = `translateX(calc((100vw - 80px - 10px) / 4 * ${pageIndex - 1}))`
      } else if (pageIndex > 3) {
        indicatorElem.style.transform = `translateX(calc(100vw - (100vw - 80px - 10px) / 4 * ${5 - (pageIndex - 1)}))`
      }
    }
  },
  data () {
    return {
      curPageIndex: 0
    }
  }
}
</script>

<style scoped>
#fooer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  color: #ffffff;
  font-weight: bold;
}

#fooer::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -1px;
  height: 1px;
}

.footerIndex::before {
  background: rgba(53, 68, 82, 0.2);
}

.footerNotIndex::before {
  background: rgba(35, 51, 66, 0.6);
}

span {
  display: inline-block;
  width: calc((100vw - 80px - 10px) / 4);
  text-align: center;
  cursor: pointer;
}

.btn-video-add {
  display: inline-block;
  width: 80px;
  height: 30px;
  background-image: url('./../../assets/add.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
}

.footer-indicator {
  position: absolute;
  bottom: 0;
  width: calc((100vw - 80px - 10px) / 4);
  height: 2px;
  background: rgba(255, 255, 255, .6);
  left: 0;
  transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transform: translateX(0px);
  -moz-transform: translateX(0px);
  -webkit-transform: translateX(0px);
  -o-transform: translateX(0px);
}
</style>
