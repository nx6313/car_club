<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive exclude="page-index">
        <router-view id="content-wrap"/>
      </keep-alive>
    </transition>
    <comm-footer></comm-footer>
  </div>
</template>

<script>
import Footer from '@/components/comm/Footer'

export default {
  name: 'App',
  components: {
    'comm-footer': Footer
  },
  beforeCreate () {
    this.$moment.wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
      this.$comfun.consoleBeautiful('微信config信息验证失败', null, null, res, 'warn')
    })
    var jsApiList = [ 'chooseImage' ]
    this.$comfun.wx_oauth2(this, 'snsapi_userinfo', jsApiList)
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  overflow: hidden;
}

#content-wrap {
  position: relative;
  height: calc(100vh - 3.2rem);
  overflow-x: hidden;
  overflow-y: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
