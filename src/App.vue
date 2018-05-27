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
    this.$comfun.wx_check_access_token(this).then((response) => {
      console.log(response)
      // this.$comfun.wx_get_access_token_by_code(this).then((response) => {
      //   console.log(response)
      //   if (response.code === 'url-no-code-param') {
      //     this.$comfun.wx_oauth2(this, 'snsapi_userinfo')
      //   }
      // }, (error) => {
      //   console.log(error)
      // })
    }, (error) => {
      console.log(error)
    })
    // this.$moment.wx.config({
    //   debug: true,
    //   appId: this.$moment.wxAppId
    // })
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
