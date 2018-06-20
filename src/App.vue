<template>
  <div id="app">
    <div id="log-pointer-handle" v-show="showLogPointerFlag" @touchstart="holdToShowLog(true)" @touchend="holdToShowLog(false)"></div>
    <div id="log-pointer-time-show-handle" v-show="showLogTimeFlag">{{holdLogTime}}</div>
    <div id="log-pointer-show-handle" @click="showLogPointer"></div>
    <transition name="fade" mode="out-in">
      <keep-alive>
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
  data () {
    return {
      showLogPointerFlag: false,
      showLogTimeFlag: false,
      holdLogTimer: null,
      holdLogTime: 0
    }
  },
  beforeCreate () {
    this.$comfun.wx_oauth2(this, 'snsapi_userinfo')
  },
  methods: {
    holdToShowLog (holdFlag) {
      if (holdFlag) {
        clearInterval(this.holdLogTimer)
        this.showLogTimeFlag = !this.showLogTimeFlag
        this.holdLogTimer = setInterval(() => {
          this.holdLogTime += 1
        }, 1000)
      } else {
        this.showLogPointerFlag = !this.showLogPointerFlag
        this.showLogTimeFlag = !this.showLogTimeFlag
        if (this.holdLogTime > 10) {
          this.$consolePopWindow(this)
        }
        clearInterval(this.holdLogTimer)
        this.holdLogTime = 0
      }
    },
    showLogPointer () {
      this.showLogPointerFlag = !this.showLogPointerFlag
    }
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

#log-pointer-handle {
  position: fixed;
  width: 20vw;
  height: 20vw;
  border-radius: 20vw;
  background: rgba(0, 0, 0, 0);
  z-index: 999999;
  left: -10vw;
  top: -10vw;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
}

#log-pointer-time-show-handle {
  position: fixed;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 10vw;
  text-align: center;
  background: rgba(0, 0, 0, 0);
  z-index: 999999;
  right: calc((100vw - 30px) / 2);
  top: 2vw;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  user-select: none;
  color: #616161;
  box-shadow: inset 0 0 20px hsla(0, 0%, 100%, 0.5);
}

#log-pointer-show-handle {
  position: fixed;
  width: 20vw;
  height: 20vw;
  border-radius: 20vw;
  background: rgba(0, 0, 0, 0);
  z-index: 999999;
  right: -10vw;
  top: -10vw;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
}
</style>
