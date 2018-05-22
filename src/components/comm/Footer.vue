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
  data () {
    return {
      curPageIndex: 0
    }
  },
  mounted () {
    var currentRouterPath = this.$router.currentRoute.path
    var indicatorElem = document.getElementById('fooer').getElementsByClassName('footer-indicator')[0]
    if (currentRouterPath === '/') {
      this.curPageIndex = 0
      indicatorElem.style.transform = `translateX(calc((100vw - 80px - 10px) / 4 * ${0}))`
    } else if (currentRouterPath.indexOf('/attention') === 0) {
      this.curPageIndex = 1
      indicatorElem.style.transform = `translateX(calc((100vw - 80px - 10px) / 4 * ${1}))`
    } else if (currentRouterPath.indexOf('/message') === 0) {
      this.curPageIndex = 3
      indicatorElem.style.transform = `translateX(calc(100vw - (100vw - 80px - 10px) / 4 * ${5 - 3}))`
    } else if (currentRouterPath.indexOf('/me') === 0) {
      this.curPageIndex = 4
      indicatorElem.style.transform = `translateX(calc(100vw - (100vw - 80px - 10px) / 4 * ${5 - 4}))`
    }
  },
  methods: {
    toPage: function (pageTo, pageIndex) {
      this.$router.replace(pageTo)
      this.curPageIndex = pageIndex - 1
      var indicatorElem = document.getElementById('fooer').getElementsByClassName('footer-indicator')[0]
      if (pageIndex < 3) {
        indicatorElem.style.transform = `translateX(calc((100vw - 80px - 10px) / 4 * ${pageIndex - 1}))`
      } else if (pageIndex > 3) {
        indicatorElem.style.transform = `translateX(calc(100vw - (100vw - 80px - 10px) / 4 * ${5 - (pageIndex - 1)}))`
      }
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
  height: 3.2rem;
  color: #ffffff;
  font-weight: bold;
  font-size: 0.8rem;
}

#fooer::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -1px;
  height: 1px;
}

.footerIndex {
  background: rgba(0, 0, 0, 0);
}

.footerIndex::before {
  background: rgba(53, 68, 82, 0.2);
}

.footerNotIndex {
  background: rgb(17, 12, 29);
}

.footerNotIndex::before {
  background: rgba(17, 12, 29, 0.8);
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
  background-image: url('./../../assets/video-add.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
}

.footer-indicator {
  position: absolute;
  bottom: 0;
  width: calc((100vw - 80px - 10px) / 4);
  height: 2px;
  background: rgba(255, 255, 255, .4);
  border-radius: 10px;
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
