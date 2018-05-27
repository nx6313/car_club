<template>
  <div id="video-item-wrap" ref="video-item-wrap" :style="full ? { position: 'fixed' } : { position: 'absolute' }">
    <div v-once v-for="(init, index) in videoInitList" :key="index" :class="['video-item', init === 'init-page' ? 'video-item-current' : '']" @click="supportHold">
      <template v-if="init === 'init-page'">
        <div class="video-item-page-wrap">
          <div class="video-wrap" ref="video-wrap" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <div class="video-shade"></div>
          </div>
          <div :class="['videoDo', full ? 'videoDoFull' : 'videoDoNotFull']">
            <span :style="videoInfo.userHead ? { 'background-image': 'url(' + videoInfo.userHead + ')' } : ''">
              <span v-if="!videoInfo.hasAttention" class="attention"></span>
            </span>
            <span ref="video-support" :class="videoInfo.ifSupport ? 'support-focus' : ''" @click.stop="support(videoInfo)">
              <span>{{videoInfo.supportCount}}</span>
            </span>
            <span @click.stop="lookComment">
              <span>{{videoInfo.commentCount}}</span>
            </span>
            <span></span>
          </div>
        </div>
      </template>
      <template v-if="init !== 'init-page'">
        <div class="video-item-replace"></div>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import likeIcon from '@/assets/like-icon.png'

export default {
  name: 'comm-video',
  props: {
    full: { type: Boolean, default: false },
    videoInitList: { type: Array, default () { return ['', '', 'init-page', '', ''] } },
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
      touchMoveDistanceY: 0,
      moveRate: 0.4,
      everyVITsY: 0,
      currentVIIndex: 1,
      currentVITsY: 0,
      reg: /[-?\d]+/g,
      videoItemPageHeight: 0,
      videoItemWrapElem: null,
      hasPre: false,
      hasNext: false,
      currentVideoInfo: this.videoInfo
    }
  },
  mounted () {
    this.videoItemWrapElem = this.$refs['video-item-wrap']
    this.videoItemPageHeight = this.videoItemWrapElem.offsetHeight
    this.videoItemWrapElem.style.height = `calc(${this.videoItemPageHeight * this.videoInitList.length}px)`
    for (var i = 0; i < this.videoItemWrapElem.children.length; i++) {
      this.videoItemWrapElem.children[i].style.height = `calc(${this.videoItemPageHeight}px)`
    }
    this.everyVITsY = this.videoItemWrapElem.offsetHeight * (1 / this.videoInitList.length)
    this.videoItemWrapElem.style.transform = `translateY(${-this.everyVITsY * this.videoInitList.indexOf('init-page')}px)`
    this.currentVITsY = Number(this.videoItemWrapElem.style.transform.match(this.reg)[0])
    this.getVideoInfo()
  },
  methods: {
    getVideoInfo (direction) {
      this.hasPre = true
      if (direction === 'pre') {
      } else if (direction === 'next') {
      } else {
        // 初始化前一页以及后一页的视频信息
      }
    },
    addVideoWrap (direction) {
      var that = this
      var VideoWrapComponent = Vue.extend({
        template: `<div v-once class="video-item" :style="{ height: 'calc(' + initPageItemHeight + 'px)' }" @click="supportHold">
          <div class="video-item-replace"></div>
        </div>`,
        data () {
          return {
            initPageItemHeight: that.videoItemPageHeight
          }
        },
        methods: {
          supportHold: that.supportHold
        }
      })
      var videoItemWrap = that.$refs['video-item-wrap']
      if (direction === 'pre') {
        videoItemWrap.style['transition-duration'] = '0s'
        var preVideoWrap = new VideoWrapComponent().$mount()
        videoItemWrap.insertBefore(preVideoWrap.$el, videoItemWrap.childNodes[0])
        videoItemWrap.style.transform = 'translateY(-1280px)'
      } else if (direction === 'next') {
        videoItemWrap.style['transition-duration'] = '0s'
        var nextVideoWrap = new VideoWrapComponent().$mount()
        videoItemWrap.appendChild(nextVideoWrap.$el)
      }
    },
    addComponentToPage (direction) {
      var that = this
      var VideoPageComponent = Vue.extend({
        template: `<div class="video-item-page-wrap">
          <div class="video-wrap" ref="video-wrap" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <div class="video-shade"></div>
          </div>
          <div :class="['videoDo', sfull ? 'videoDoFull' : 'videoDoNotFull']">
            <span :style="newPageVideoInfo.userHead ? { 'background-image': 'url(' + newPageVideoInfo.userHead + ')' } : ''">
              <span v-if="!newPageVideoInfo.hasAttention" class="attention"></span>
            </span>
            <span :class="newPageVideoInfo.ifSupport ? 'support-focus' : ''" @click.stop="support(newPageVideoInfo)">
              <span>{{newPageVideoInfo.supportCount}}</span>
            </span>
            <span @click.stop="lookComment">
              <span>{{newPageVideoInfo.commentCount}}</span>
            </span>
            <span></span>
          </div>
        </div>`,
        data () {
          return {
            sfull: that.full,
            newPageVideoInfo: {
              userId: '1',
              src: 'http://l.dachangjr.com/video/2.mp4',
              type: 'video/mp4',
              userHead: '',
              hasAttention: false,
              ifSupport: true,
              supportCount: 0,
              commentCount: 0
            }
          }
        },
        methods: {
          touchStart: that.touchStart,
          touchMove: that.touchMove,
          touchEnd: that.touchEnd,
          support: that.support,
          supportHold: that.supportHold,
          lookComment: that.lookComment
        }
      })
      if (direction === 'pre') {
        var preReplaceElem = this.videoItemWrapElem.children[2].previousSibling.getElementsByClassName('video-item-replace')[0]
        new VideoPageComponent().$mount(preReplaceElem)
        this.addVideoWrap(direction)
      } else if (direction === 'next') {
        var nextReplaceElem = this.videoItemWrapElem.children[2].nextSibling.getElementsByClassName('video-item-replace')[0]
        new VideoPageComponent().$mount(nextReplaceElem)
        this.addVideoWrap(direction)
      }
    },
    toggleCurrentPage (direction) {
      var currentElem = this.videoItemWrapElem.getElementsByClassName('video-item-current')[0]
      if (direction === 'pre') {
        currentElem.classList.remove('video-item-current')
        currentElem.previousSibling.classList.add('video-item-current')
        this.addComponentToPage(direction)
      } else if (direction === 'next') {
        currentElem.classList.remove('video-item-current')
        currentElem.nextSibling.classList.add('video-item-current')
        this.addComponentToPage(direction)
      }
    },
    support (video) {
      video.ifSupport = !video.ifSupport
      if (video.ifSupport) {
        this.$refs['video-support'][0].classList.add('support-focus')
      } else {
        this.$refs['video-support'][0].classList.remove('support-focus')
      }
    },
    supportHold () {
      this.$emit('close-comment-pop')
      this.dblclickCount++
      clearTimeout(this.dblclickTimer)
      if (this.dblclickCount > 2) {
        if (!this.currentVideoInfo.ifSupport) {
          this.support(this.currentVideoInfo)
        }
        this.$pageImg(likeIcon, event.clientX, event.clientY, document.getElementsByClassName('video-item-current')[0])
      }
      this.dblclickTimer = setTimeout(() => {
        this.dblclickCount = 0
      }, 600)
    },
    touchStart () {
      this.$emit('close-comment-pop')
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
          if (!this.hasNext) {
            this.$toast('没有更多视频啦')
            this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
            return false
          }
          this.videoItemWrapElem.style['transition-duration'] = '0.5s'
          this.currentVITsY -= this.everyVITsY
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
          setTimeout(() => {
            this.toggleCurrentPage('next')
          }, 0.5 * 1000)
        } else {
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
        }
      }
      if (this.touchToBottom) {
        // 上一个视频
        if (Math.abs(this.touchMoveDistanceY) > 200) {
          if (!this.hasPre) {
            this.$toast('没有更多视频啦')
            this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
            return false
          }
          this.videoItemWrapElem.style['transition-duration'] = '0.5s'
          this.currentVITsY += this.everyVITsY
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
          setTimeout(() => {
            this.toggleCurrentPage('pre')
          }, 0.5 * 1000)
        } else {
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
        }
      }
      this.touchToTop = false
      this.touchToBottom = false
      this.touchToLeft = false
      this.touchToRight = false
    },
    lookComment () {
      this.$emit('look-comment', this.videoInfo)
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
  height: 100%;
  overflow: hidden;
  font-size: 0;
  transition: all 0s ease 0s;
}
</style>

<style>
.video-item {
  position: relative;
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

.video-item-page-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
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

.videoDo>span:nth-of-type(1)>span.attention {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -10px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  background-image: url('./../../assets/attention.png');
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
