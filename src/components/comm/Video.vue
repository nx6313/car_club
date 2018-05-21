<template>
  <div class="video-item video-item-current" :style="full ? { position: 'fixed' } : { position: 'absolute' }" @click="supportHold" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <video autoplay="true" loop="loop">
      <source :src="videoInfo.src" :type="videoInfo.type">
    </video>
    <div :class="['videoDo', full ? 'videoDoFull' : 'videoDoNotFull']">
      <span :style="videoInfo.userHead ? { 'background-image': 'url(' + videoInfo.userHead + ')' } : ''">
        <img v-if="!videoInfo.hasAttention" class="attention" src="./../../assets/attention.png">
      </span>
      <span :class="videoInfo.ifSupport ? 'support-focus' : ''" @click.stop="support">
        <span>123</span>
      </span>
      <span>
        <span>123</span>
      </span>
      <span></span>
    </div>
  </div>
</template>

<script>
import likeIcon from '@/assets/like-icon.png'

export default {
  name: 'comm-video',
  props: {
    full: { type: Boolean, default: false },
    videoInfo: { type: Object, default () { return {} } }
  },
  data () {
    return {
      dblclickCount: 0,
      dblclickTimer: null,
      touchToTop: false,
      touchToBottom: false,
      touchToLeft: false,
      touchToRight: false,
      touchStartX: -1,
      touchStartY: -1,
      touchMoveDistanceX: 0,
      touchMoveDistanceY: 0
    }
  },
  methods: {
    support () {
      this.videoInfo.ifSupport = !this.videoInfo.ifSupport
    },
    supportHold () {
      this.dblclickCount++
      clearTimeout(this.dblclickTimer)
      if (this.dblclickCount > 2) {
        if (!this.videoInfo.ifSupport) {
          this.videoInfo.ifSupport = !this.videoInfo.ifSupport
        }
        var clickWhereX = event.clientX
        var clickWhereY = event.clientY
        this.$pageImg(likeIcon, clickWhereX, clickWhereY, document.getElementsByClassName('video-item-current')[0])
      }
      this.dblclickTimer = setTimeout(() => {
        this.dblclickCount = 0
      }, 1000)
    },
    touchStart () {
      this.touchStartX = event.touches[0].clientX
      this.touchStartY = event.touches[0].clientY
    },
    touchMove () {
      if (this.touchStartX < 0) {
        this.touchStartX = event.touches[0].clientX
        this.touchStartY = event.touches[0].clientY
      }
      this.touchMoveDistanceX = event.touches[0].clientX - this.touchStartX
      this.touchMoveDistanceY = event.touches[0].clientY - this.touchStartY
      if (this.touchMoveDistanceX > 0 && Math.abs(this.touchMoveDistanceX) > Math.abs(this.touchMoveDistanceY)) {
        if (this.touchToTop || this.touchToBottom || this.$pageImgExist(document.getElementsByClassName('video-item-current')[0])) {
          return
        }
        this.touchToLeft = false
        this.touchToRight = true
      } else if (this.touchMoveDistanceX < 0 && Math.abs(this.touchMoveDistanceX) > Math.abs(this.touchMoveDistanceY)) {
        if (this.touchToTop || this.touchToBottom || this.$pageImgExist(document.getElementsByClassName('video-item-current')[0])) {
          return
        }
        this.touchToRight = false
        this.touchToLeft = true
      } else if (this.touchMoveDistanceY > 0 && Math.abs(this.touchMoveDistanceX) < Math.abs(this.touchMoveDistanceY)) {
        if (this.touchToLeft || this.touchToRight || this.$pageImgExist(document.getElementsByClassName('video-item-current')[0])) {
          return
        }
        this.touchToTop = false
        this.touchToBottom = true
      } else if (this.touchMoveDistanceY < 0 && Math.abs(this.touchMoveDistanceX) < Math.abs(this.touchMoveDistanceY)) {
        if (this.touchToLeft || this.touchToRight || this.$pageImgExist(document.getElementsByClassName('video-item-current')[0])) {
          return
        }
        this.touchToBottom = false
        this.touchToTop = true
      }
      if (this.touchToRight) {
        console.log('执行向右滑动回掉方法', this.touchMoveDistanceX)
      }
      if (this.touchToLeft) {
        console.log('执行向左滑动回掉方法', this.touchMoveDistanceX)
      }
      if (this.touchToTop) {
        console.log('执行向上滑动回掉方法', this.touchMoveDistanceY)
      }
      if (this.touchToBottom) {
        console.log('执行向下滑动回掉方法', this.touchMoveDistanceY)
      }
    },
    touchEnd () {
      this.touchStartX = -1
      this.touchStartY = -1
      this.touchToTop = false
      this.touchToBottom = false
      this.touchToLeft = false
      this.touchToRight = false
    }
  }
}
</script>

<style scoped>
.video-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background: linear-gradient(rgba(30, 20, 54, .6), rgba(0, 0, 0, 0));
}

.video-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background: linear-gradient(to top, rgba(30, 20, 54, .6), rgba(0, 0, 0, 0));
}

video {
  width: 100%;
  height: 100%;
}

.videoDo {
  position: absolute;
  right: 8px;
}

.videoDoFull {
  bottom: calc(48px + 16px);
}

.videoDoNotFull {
  bottom: 16px;
}

.videoDo>span {
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  margin: 0 auto;
}

.videoDo>span:nth-of-type(1) {
  background-color: #ffffff;
  background-image: url('./../../assets/add.png');
  margin-bottom: 36px;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #ffffff;
}

.videoDo>span:nth-of-type(1)>img.attention {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -10px;
  height: 20px;
}

.videoDo>span:nth-of-type(2) {
  background-image: url('./../../assets/support.png');
  margin-bottom: 30px;
  opacity: .8;
}

.videoDo>span.support-focus {
  background-image: url('./../../assets/support-focus.png');
}

.videoDo>span:nth-of-type(2)>span{
  display: inline-block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -15px;
  text-align: center;
  font-weight: bold;
  text-shadow: 0px 0px 4px rgba(41, 41, 41, 0.4);
}

.videoDo>span:nth-of-type(3) {
  background-image: url('./../../assets/comment.png');
  margin-bottom: 30px;
  opacity: .8;
}

.videoDo>span:nth-of-type(3)>span{
  display: inline-block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -15px;
  text-align: center;
  font-weight: bold;
  text-shadow: 0px 0px 4px rgba(41, 41, 41, 0.4);
}

.videoDo>span:nth-of-type(4) {
  background-image: url('./../../assets/transpond.png');
  margin-bottom: 20px;
  opacity: .8;
}
</style>
