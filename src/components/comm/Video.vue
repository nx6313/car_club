<template>
  <div id="video-item-wrap" ref="video-item-wrap" :style="full ? { position: 'fixed' } : { position: 'absolute' }">
    <div v-for="(videoInfo, index) in videoInfoList" :key="index" :class="['video-item', index == 1 ? 'video-item-current' : '']" @click="supportHold(videoInfo)">
      <div class="video-wrap" ref="video-wrap" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div class="video-shade"></div>
      </div>
      <div :class="['videoDo', full ? 'videoDoFull' : 'videoDoNotFull']">
        <span :style="videoInfo.userHead ? { 'background-image': 'url(' + videoInfo.userHead + ')' } : ''">
          <img v-if="!videoInfo.hasAttention" class="attention" src="./../../assets/attention.png">
        </span>
        <span :class="videoInfo.ifSupport ? 'support-focus' : ''" @click.stop="support(videoInfo)">
          <span>{{videoInfo.supportCount}}</span>
        </span>
        <span @click.stop="lookComment(videoInfo)">
          <span>{{videoInfo.commentCount}}</span>
        </span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import likeIcon from '@/assets/like-icon.png'

export default {
  name: 'comm-video',
  props: {
    full: { type: Boolean, default: false },
    videoInfoList: { type: Array, default () { return [] } }
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
      touchMoveDistanceY: 0,
      moveRate: 0.4,
      everyVITsY: 0,
      currentVIIndex: 1,
      currentVITsY: 0,
      reg: /[-?\d]+/g,
      videoItemWrapElem: null
    }
  },
  mounted () {
    this.videoItemWrapElem = this.$refs['video-item-wrap']
    this.everyVITsY = this.videoItemWrapElem.offsetHeight * 0.25
    this.videoItemWrapElem.style.transform = `translateY(${-this.everyVITsY}px)`
    this.currentVITsY = Number(this.videoItemWrapElem.style.transform.match(this.reg)[0])
  },
  methods: {
    support (videoInfo) {
      videoInfo.ifSupport = !videoInfo.ifSupport
    },
    supportHold (videoInfo) {
      this.$emit('close-comment-pop')
      this.dblclickCount++
      clearTimeout(this.dblclickTimer)
      if (this.dblclickCount > 3) {
        if (!videoInfo.ifSupport) {
          videoInfo.ifSupport = !videoInfo.ifSupport
        }
        this.$pageImg(likeIcon, event.clientX, event.clientY, document.getElementsByClassName('video-item-current')[0])
      }
      this.dblclickTimer = setTimeout(() => {
        this.dblclickCount = 0
      }, 600)
    },
    touchStart () {
      if (this.$pageImgExist(document.getElementsByClassName('video-item-current')[0])) {
        event.preventDefault()
      }
      this.touchStartX = event.touches[0].pageX
      this.touchStartY = event.touches[0].pageY
      this.videoItemWrapElem.style['transition-duration'] = '0s'
    },
    touchMove () {
      if (this.$pageImgExist(document.getElementsByClassName('video-item-current')[0])) {
        return
      }
      event.preventDefault()
      if (this.touchStartX < 0) {
        this.touchStartX = event.touches[0].pageX
        this.touchStartY = event.touches[0].pageY
        this.videoItemWrapElem.style['transition-duration'] = '0s'
      }
      this.touchMoveDistanceX = event.touches[0].pageX - this.touchStartX
      this.touchMoveDistanceY = event.touches[0].pageY - this.touchStartY
      if (this.touchMoveDistanceX > 0 && Math.abs(this.touchMoveDistanceX) > Math.abs(this.touchMoveDistanceY)) {
        if (this.touchToTop || this.touchToBottom) {
          return
        }
        this.touchToLeft = false
        this.touchToRight = true
      } else if (this.touchMoveDistanceX < 0 && Math.abs(this.touchMoveDistanceX) > Math.abs(this.touchMoveDistanceY)) {
        if (this.touchToTop || this.touchToBottom) {
          return
        }
        this.touchToRight = false
        this.touchToLeft = true
      } else if (this.touchMoveDistanceY > 0 && Math.abs(this.touchMoveDistanceX) < Math.abs(this.touchMoveDistanceY)) {
        if (this.touchToLeft || this.touchToRight) {
          return
        }
        this.touchToTop = false
        this.touchToBottom = true
      } else if (this.touchMoveDistanceY < 0 && Math.abs(this.touchMoveDistanceX) < Math.abs(this.touchMoveDistanceY)) {
        if (this.touchToLeft || this.touchToRight) {
          return
        }
        this.touchToBottom = false
        this.touchToTop = true
      }
      if (this.touchToRight) {
        this.$emit('touch-to-right', this.touchMoveDistanceX)
      }
      if (this.touchToLeft) {
        this.$emit('touch-to-left', this.touchMoveDistanceX)
      }
      if (this.touchToTop) {
        this.$emit('touch-to-top', this.touchMoveDistanceY)
        this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY + this.touchMoveDistanceY * this.moveRate}px)`
      }
      if (this.touchToBottom) {
        this.$emit('touch-to-bottom', this.touchMoveDistanceY)
        this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY + this.touchMoveDistanceY * this.moveRate}px)`
      }
    },
    touchEnd () {
      if (this.$pageImgExist(document.getElementsByClassName('video-item-current')[0])) {
        return
      }
      this.touchStartX = -1
      this.touchStartY = -1
      this.videoItemWrapElem.style['transition-duration'] = '0.3s'
      if (this.touchToTop) {
        // 下一个视频
        if (Math.abs(this.touchMoveDistanceY) > 200) {
          this.videoItemWrapElem.style['transition-duration'] = '0.5s'
          this.currentVITsY -= this.everyVITsY
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
        } else {
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
        }
      }
      if (this.touchToBottom) {
        // 上一个视频
        if (Math.abs(this.touchMoveDistanceY) > 200) {
          this.videoItemWrapElem.style['transition-duration'] = '0.5s'
          this.currentVITsY += this.everyVITsY
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
        } else {
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
        }
      }
      this.touchToTop = false
      this.touchToBottom = false
      this.touchToLeft = false
      this.touchToRight = false
    },
    lookComment (videoInfo) {
      this.$emit('look-comment', videoInfo)
    }
  }
}
</script>

<style scoped>
#video-item-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% * 4);
  overflow: hidden;
  font-size: 0;
  transition: all 0s ease 0s;
  transform: translateY(-25%);
}

.video-item {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% / 4);
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

.video-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video-wrap>div.video-shade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}

video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
}

.videoDo {
  position: absolute;
  right: 8px;
  z-index: 999;
}

.videoDoFull {
  bottom: calc(3.2rem + 16px);
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
  font-size: 0.8rem;
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
  font-size: 0.8rem;
}

.videoDo>span:nth-of-type(4) {
  background-image: url('./../../assets/transpond.png');
  margin-bottom: 20px;
  opacity: .8;
}
</style>
