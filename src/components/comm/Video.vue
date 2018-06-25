<template>
  <div id="video-data-wrap" :style="full ? { position: 'fixed' } : { position: 'absolute' }">
    <span id="ref-data-wrap" ref="ref-data-wrap">
      <span class="refing" ref="ref-ing"></span>
      <span class="complate" ref="ref-complate"></span>
    </span>
    <div id="video-item-wrap" ref="video-item-wrap">
      <div class="video-item video-item-current" :id="'video-item-' + videoInfo.videoId" :ref="'video-item-' + videoInfo.videoId" @click="supportHold">
        <template>
          <div class="video-item-page-wrap">
            <div class="video-wrap" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
              <div :style="videoInfo.cover ? { 'background-image': 'url(' + videoInfo.cover + ')' } : ''" :class="['video-shade', videoInfo.coverWidth > videoInfo.coverHeight ? 'vertical' : '']"></div>
              <div class="video-play-show" :id="'video-play-' + videoInfo.videoId" :ref="'video-play-' + videoInfo.videoId"></div>
            </div>
            <div :class="['videoDo', full ? 'videoDoFull' : 'videoDoNotFull']">
              <span :style="videoInfo.userHead ? { 'background-image': 'url(' + videoInfo.userHead + ')' } : ''" @click.stop="doAtt(videoInfo)">
                <span :ref="'att-user-' + videoInfo.videoId" v-if="!videoInfo.hasAttention" class="attention"></span>
              </span>
              <span :id="'video-support-' + videoInfo.videoId" :ref="'video-support-' + videoInfo.videoId" :class="videoInfo.ifSupport ? 'support-focus' : ''" @click.stop="support(videoInfo)">
                <span>{{videoInfo.supportCount}}</span>
              </span>
              <span :ref="'video-comment-' + videoInfo.videoId" @click.stop="lookComment">
                <span>{{videoInfo.commentCount}}</span>
              </span>
              <span @click.stop="shareVideo"></span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import likeIcon from '@/assets/like-icon.png'

export default {
  name: 'comm-video',
  props: {
    full: { type: Boolean, default: false }
  },
  data () {
    return {
      videoInfo: {},
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
      refRate: 0.2,
      refActivate: 68,
      refDistance: 64, // 该参数修改的话，需要一起修改 rotate 的 @keyframes 样式
      moveRate: 0.4,
      everyVITsY: 0,
      currentRefTsY: 0,
      currentVITsY: 0,
      reg: /[-?\d]+/g,
      videoItemPageHeight: 0,
      videoDataRefElem: null,
      refingElem: null,
      refComplateElem: null,
      videoItemWrapElem: null,
      isFirst: true,
      hasNext: false,
      isRefing: false,
      currentVideoInfo: null,
      videoInfoList: [],
      currentPlayer: null
    }
  },
  mounted () {
    this.videoDataRefElem = this.$refs['ref-data-wrap']
    this.refingElem = this.$refs['ref-ing']
    this.refComplateElem = this.$refs['ref-complate']
    this.refingElem.style.opacity = 1
    this.refComplateElem.style.opacity = 0
    this.videoItemWrapElem = this.$refs['video-item-wrap']
    this.videoItemPageHeight = this.videoItemWrapElem.offsetHeight
    this.videoItemWrapElem.style.height = `calc(${this.videoItemPageHeight * 1}px)`
    for (var i = 0; i < this.videoItemWrapElem.children.length; i++) {
      if (this.videoItemWrapElem.children[i].classList.contains('video-item')) {
        this.videoItemWrapElem.children[i].style.height = `calc(${this.videoItemPageHeight}px)`
      }
    }
    this.everyVITsY = this.videoItemWrapElem.offsetHeight * (1 / 1)
    this.videoDataRefElem.style.transform = `translateY(${-this.videoDataRefElem.offsetHeight - 2}px)`
    this.currentRefTsY = Number(this.videoDataRefElem.style.transform.match(this.reg)[0])
    this.videoItemWrapElem.style.transform = `translateY(0px)`
    this.currentVITsY = Number(this.videoItemWrapElem.style.transform.match(this.reg)[0])
    var currentIndex = Array.prototype.indexOf.call(this.videoItemWrapElem.children, this.videoItemWrapElem.getElementsByClassName('video-item-current')[0]) + 1
    this.getVideoByPage(true, currentIndex).then((videoInfo) => {
      this.videoInfo = videoInfo
      this.videoInfoList.push(this.videoInfo)
      this.currentVideoInfo = this.videoInfo
      this.$emit('cut-video-page', this.currentVideoInfo, this.changeData)
      this.updateAttState()
      setTimeout(() => {
        this.createVideoPlayer()
      }, 10)
      this.getNextVideoInfo().then(() => {
        this.$emit('data-loading', false)
      }, () => {
        this.$emit('data-loading', false)
      })
    })
  },
  methods: {
    getNextVideoInfo (isRef) {
      this.hasNext = false
      var nextVideoInfoPromise = new Promise((resolve, reject) => {
        let videoItemWrap = this.$refs['video-item-wrap']
        var currentIndex = Array.prototype.indexOf.call(this.videoItemWrapElem.children, this.videoItemWrapElem.getElementsByClassName('video-item-current')[0])
        var searchIndex = currentIndex + 1
        if (isRef !== true) {
          searchIndex += 1
        }
        if (isRef || currentIndex === videoItemWrap.childNodes.length - 1) {
          this.getVideoByPage(false, searchIndex).then((videoInfo) => {
            if (videoInfo) {
              let hasVideo = false
              for (let v = 0; v < this.videoInfoList.length; v++) {
                if (this.videoInfoList[v].videoId === videoInfo.videoId) {
                  hasVideo = true
                  break
                }
              }
              if (!hasVideo) {
                let insertIndex = -1
                if (isRef === true) {
                  this.videoInfoList.unshift(videoInfo)
                  this.currentVideoInfo = videoInfo
                  this.createVideoPlayer()
                } else {
                  if (currentIndex === videoItemWrap.childNodes.length - 1) {
                    this.videoInfoList.push(videoInfo)
                  }
                  //  else {
                  //   insertIndex = currentIndex + 1
                  //   this.videoInfoList.splice(currentIndex + 1, 0, videoInfo)
                  // }
                }
                this.hasNext = true
                this.addVideoWrap(isRef, insertIndex, videoInfo.videoId)
                this.addComponentToPage(videoInfo, isRef)
              } else {
                if (isRef !== true) {
                  this.hasNext = true
                } else {
                  this.createVideoPlayer()
                  if (videoItemWrap.childNodes.length > 1) {
                    this.hasNext = true
                  }
                }
              }
            } else {
              if (isRef !== true) {
                this.hasNext = false
              } else {
                if (videoItemWrap.childNodes.length > 1) {
                  this.hasNext = true
                }
              }
            }
            resolve(videoInfo)
          }, (response) => {
            if (isRef !== true) {
              this.hasNext = false
            } else {
              if (videoItemWrap.childNodes.length > 1) {
                this.hasNext = true
              }
            }
            reject(response)
          })
        } else {
          this.hasNext = true
          resolve(null)
        }
      })
      return nextVideoInfoPromise
    },
    getVideoByPage (needLoading, page) {
      if (needLoading === true) {
        this.$emit('data-loading', true)
      }
      var videpByPagePromise = new Promise((resolve, reject) => {
        this.$comfun.http_post(this, this.$moment.urls.get_new_info + `?page=${page}&limit=1`, {
          accountId: this.$moment.wxUserInfo.accountId,
          type: [ '3' ]
        }).then((response) => {
          if (response.body.code === '0000' && response.body.success === true) {
            if (response.body.data.dataList && response.body.data.dataList.length > 0) {
              let hasAttention = false
              if (response.body.data.dataList[0].accountId === this.$moment.wxUserInfo.accountId || response.body.data.dataList[0].isIdoi === 1) {
                hasAttention = true
              }
              let ifSupport = false
              let likeMans = []
              if (response.body.data.dataList[0].praiseList && response.body.data.dataList[0].praiseList.length > 0) {
                for (let p = 0; p < response.body.data.dataList[0].praiseList.length; p++) {
                  if (response.body.data.dataList[0].praiseList[p].accountId === this.$moment.wxUserInfo.accountId) {
                    ifSupport = true
                  }
                  likeMans.push({
                    accountId: response.body.data.dataList[0].praiseList[p].accountId,
                    time: response.body.data.dataList[0].praiseList[p].createTime,
                    userHeadimg: response.body.data.dataList[0].praiseList[p].userHeadimg,
                    username: response.body.data.dataList[0].praiseList[p].username
                  })
                }
              }
              let comments = []
              if (response.body.data.dataList[0].commentList && response.body.data.dataList[0].commentList.length > 0) {
                for (let c = 0; c < response.body.data.dataList[0].commentList.length; c++) {
                  let replys = []
                  if (response.body.data.dataList[0].commentList[c].replyInfos && response.body.data.dataList[0].commentList[c].replyInfos.length > 0) {
                    for (let r = 0; r < response.body.data.dataList[0].commentList[c].replyInfos.length; r++) {
                      replys.push({
                        userId: response.body.data.dataList[0].commentList[c].replyInfos[r].fromAccountId,
                        name: response.body.data.dataList[0].commentList[c].replyInfos[r].fromUsername,
                        content: response.body.data.dataList[0].commentList[c].replyInfos[r].content,
                        time: response.body.data.dataList[0].commentList[c].replyInfos[r].createTime,
                        userHead: response.body.data.dataList[0].commentList[c].replyInfos[r].fromUserHeadimg,
                        replyUserId: response.body.data.dataList[0].commentList[c].replyInfos[r].toAccountId,
                        replyUserName: response.body.data.dataList[0].commentList[c].replyInfos[r].toUsername,
                        replyUserHead: response.body.data.dataList[0].commentList[c].replyInfos[r].toUserHeadimg
                      })
                    }
                  }
                  comments.push({
                    id: response.body.data.dataList[0].commentList[c].id,
                    uuid: response.body.data.dataList[0].commentList[c].uuid,
                    head: response.body.data.dataList[0].commentList[c].fromUserHeadimg,
                    userId: response.body.data.dataList[0].commentList[c].fromAccountId,
                    name: response.body.data.dataList[0].commentList[c].fromUsername,
                    content: response.body.data.dataList[0].commentList[c].content,
                    time: response.body.data.dataList[0].commentList[c].createTime,
                    isLike: response.body.data.dataList[0].commentList[c].isPraise === 1,
                    replys: replys
                  })
                }
              }
              let videoInfo = {
                videoId: response.body.data.dataList[0].id,
                userId: response.body.data.dataList[0].accountId,
                src: response.body.data.dataList[0].fileList[0].fileAddress,
                cover: response.body.data.dataList[0].fileList[0].face,
                coverWidth: Number(response.body.data.dataList[0].fileList[0].width),
                coverHeight: Number(response.body.data.dataList[0].fileList[0].height),
                type: response.body.data.dataList[0].fileList[0].suffix,
                userHead: response.body.data.dataList[0].userHeadimg,
                userName: response.body.data.dataList[0].username,
                hasAttention: hasAttention,
                ifSupport: ifSupport,
                supportMans: likeMans,
                supportCount: likeMans.length,
                commentCount: response.body.data.dataList[0].commentNum,
                comments: comments
              }
              resolve(videoInfo)
            } else {
              resolve(null)
            }
          } else {
            resolve(null)
          }
        }, (response) => {
          reject(response)
        })
      })
      return videpByPagePromise
    },
    addVideoWrap (isRef, insertIndex, videoId) {
      var that = this
      var VideoWrapComponent = Vue.extend({
        template: `<div class="video-item" id="video-item-${videoId}" ref="video-item-${videoId}" :style="{ height: 'calc(' + initPageItemHeight + 'px)' }" @click="supportHold">
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
      videoItemWrap.style['transition-duration'] = '0s'
      var nextVideoWrap = new VideoWrapComponent().$mount()
      if (isRef === true) {
        videoItemWrap.insertBefore(nextVideoWrap.$el, videoItemWrap.children[0])
      } else {
        if (insertIndex > 0) {
          videoItemWrap.insertBefore(nextVideoWrap.$el, videoItemWrap.children[insertIndex])
        } else {
          videoItemWrap.appendChild(nextVideoWrap.$el)
        }
      }
      videoItemWrap.style.height = `calc(${videoItemWrap.childNodes.length * that.videoItemPageHeight}px)`
    },
    addComponentToPage (videoInfo, isRef) {
      var that = this
      var VideoPageComponent = Vue.extend({
        template: `<div class="video-item-page-wrap">
          <div class="video-wrap" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <div :style="newPageVideoInfo.cover ? { 'background-image': 'url(' + newPageVideoInfo.cover + ')' } : ''" :class="['video-shade', newPageVideoInfo.coverWidth > newPageVideoInfo.coverHeight ? 'vertical' : '']"></div>
            <div class="video-play-show" :id="'video-play-' + newPageVideoInfo.videoId" :ref="'video-play-' + newPageVideoInfo.videoId"></div>
          </div>
          <div :class="['videoDo', sfull ? 'videoDoFull' : 'videoDoNotFull']">
            <span :style="newPageVideoInfo.userHead ? { 'background-image': 'url(' + newPageVideoInfo.userHead + ')' } : ''" @click.stop="doAtt(newPageVideoInfo)">
              <span :ref="'att-user-' + newPageVideoInfo.videoId" v-if="!newPageVideoInfo.hasAttention" class="attention"></span>
            </span>
            <span :id="'video-support-' + newPageVideoInfo.videoId" :ref="'video-support-' + newPageVideoInfo.videoId" :class="newPageVideoInfo.ifSupport ? 'support-focus' : ''" @click.stop="support(newPageVideoInfo)">
              <span>{{newPageVideoInfo.supportCount}}</span>
            </span>
            <span :ref="'video-comment-' + newPageVideoInfo.videoId" @click.stop="lookComment">
              <span>{{newPageVideoInfo.commentCount}}</span>
            </span>
            <span @click.stop="shareVideo"></span>
          </div>
        </div>`,
        data () {
          return {
            sfull: that.full,
            newPageVideoInfo: videoInfo
          }
        },
        methods: {
          touchStart: that.touchStart,
          touchMove: that.touchMove,
          touchEnd: that.touchEnd,
          support: that.support,
          supportHold: that.supportHold,
          lookComment: that.lookComment,
          doAtt: that.doAtt,
          shareVideo: that.shareVideo
        }
      })
      if (isRef === true) {
        var previousReplaceElem = this.videoItemWrapElem.getElementsByClassName('video-item-current')[0].previousSibling.getElementsByClassName('video-item-replace')[0]
        if (previousReplaceElem) {
          new VideoPageComponent().$mount(previousReplaceElem)
          var currentElem = this.videoItemWrapElem.getElementsByClassName('video-item-current')[0]
          currentElem.classList.remove('video-item-current')
          currentElem.previousSibling.classList.add('video-item-current')
          this.hasNext = true
        }
      } else {
        var nextReplaceElem = this.videoItemWrapElem.getElementsByClassName('video-item-current')[0].nextSibling.getElementsByClassName('video-item-replace')[0]
        if (nextReplaceElem) {
          new VideoPageComponent().$mount(nextReplaceElem)
        }
      }
    },
    toggleCurrentPage (direction) {
      if (this.currentPlayer !== null) {
        if (this.$comfun.isAndroidIos().isiOS && this.currentPlayer && this.currentPlayer.playing()) {
          document.getElementById('video-play-' + this.currentVideoInfo.videoId).style.display = 'none'
        }
        this.currentPlayer.destroy()
        this.currentPlayer = null
      }
      var currentElem = this.videoItemWrapElem.getElementsByClassName('video-item-current')[0]
      if (direction === 'pre') {
        currentElem.classList.remove('video-item-current')
        currentElem.previousSibling.classList.add('video-item-current')
      } else if (direction === 'next') {
        currentElem.classList.remove('video-item-current')
        currentElem.nextSibling.classList.add('video-item-current')
        this.getNextVideoInfo().then(() => {
          this.$emit('data-loading', false)
        }, () => {
          this.$emit('data-loading', false)
        })
      }
      var currentIndex = Array.prototype.indexOf.call(this.videoItemWrapElem.children, this.videoItemWrapElem.getElementsByClassName('video-item-current')[0])
      this.currentVideoInfo = this.videoInfoList[currentIndex]
      this.createVideoPlayer()
      this.$emit('cut-video-page', this.currentVideoInfo, this.changeData)
      this.updateAttState()
    },
    touchStart () {
      this.$emit('close-comment-pop')
      if (this.$pageImgExist(document.getElementsByClassName('video-item-current')[0])) {
        event.preventDefault()
      }
      this.touchStartX = event.touches[0].pageX
      this.touchStartY = event.touches[0].pageY
      this.videoDataRefElem.style['transition-duration'] = '0s'
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
        this.videoDataRefElem.style['transition-duration'] = '0s'
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
        if (!this.isRefing) {
          this.$emit('touch-to-top', this.touchMoveDistanceY)
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY + this.touchMoveDistanceY * this.moveRate}px)`
        }
      }
      if (this.touchToBottom) {
        if (this.isFirst) {
          if (!this.isRefing) {
            var moveGraded = this.touchMoveDistanceY * this.refRate / this.refActivate > 1 ? 1 : this.touchMoveDistanceY * this.refRate / this.refActivate
            this.videoDataRefElem.style.transform = `translateY(${this.currentRefTsY + this.touchMoveDistanceY * this.refRate}px) rotate(${-moveGraded * 360}deg)`
            this.videoDataRefElem.style.opacity = moveGraded
          }
        } else {
          this.$emit('touch-to-bottom', this.touchMoveDistanceY)
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY + this.touchMoveDistanceY * this.moveRate}px)`
        }
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
        if (!this.isRefing) {
          if (Math.abs(this.touchMoveDistanceY) > 100) {
            if (!this.hasNext) {
              this.$toast('没有更多视频啦')
              this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
              this.touchReset()
              return false
            }
            this.videoItemWrapElem.style['transition-duration'] = '0.5s'
            this.currentVITsY -= this.everyVITsY
            this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
            this.isFirst = false
            this.hasNext = false
            this.$emit('data-loading', true)
            setTimeout(() => {
              this.toggleCurrentPage('next')
            }, 0.5 * 1000)
          } else {
            this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
          }
        }
      }
      if (this.touchToBottom) {
        if (this.isFirst) {
          if (!this.isRefing) {
            this.videoDataRefElem.style['transition-duration'] = '0.3s'
            if (this.touchMoveDistanceY * this.refRate > this.refActivate) {
              this.isRefing = true
              this.videoDataRefElem.style.transform = `translateY(${this.currentRefTsY + this.refDistance}px)`
              this.$emit('data-loading', true)
              setTimeout(() => {
                this.videoDataRefElem.classList.add('rotate')
                if (this.currentPlayer !== null) {
                  if (this.$comfun.isAndroidIos().isiOS && this.currentPlayer && this.currentPlayer.playing()) {
                    document.getElementById('video-play-' + this.currentVideoInfo.videoId).style.display = 'none'
                  }
                  this.currentPlayer.destroy()
                  this.currentPlayer = null
                }
                this.getNextVideoInfo(true).then(() => {
                  this.finishRef()
                  this.$emit('data-loading', false)
                }, () => {
                  this.finishRef()
                  this.$emit('data-loading', false)
                })
              }, 0.3 * 1000)
            } else {
              this.videoDataRefElem.style.transform = `translateY(${this.currentRefTsY}px)`
            }
          }
          this.touchReset()
          return false
        }
        // 上一个视频
        if (Math.abs(this.touchMoveDistanceY) > 100) {
          this.videoItemWrapElem.style['transition-duration'] = '0.5s'
          this.currentVITsY += this.everyVITsY
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
          if (this.currentVITsY === 0) {
            this.isFirst = true
          }
          this.hasNext = true
          setTimeout(() => {
            this.toggleCurrentPage('pre')
          }, 0.5 * 1000)
        } else {
          this.videoItemWrapElem.style.transform = `translateY(${this.currentVITsY}px)`
        }
      }
      this.touchReset()
    },
    touchReset () {
      this.touchToTop = false
      this.touchToBottom = false
      this.touchToLeft = false
      this.touchToRight = false
      this.touchMoveDistanceX = 0
      this.touchMoveDistanceY = 0
    },
    finishRef () {
      this.videoDataRefElem.style['transition-duration'] = '0.2s'
      setTimeout(() => {
        this.isRefing = false
        this.videoDataRefElem.classList.remove('rotate')
        setTimeout(() => {
          this.refingElem.style.opacity = 0
          this.refComplateElem.style.opacity = 1
          setTimeout(() => {
            this.videoDataRefElem.style.transform = `translateY(${this.currentRefTsY}px)`
            setTimeout(() => {
              this.refingElem.style.opacity = 1
              this.refComplateElem.style.opacity = 0
            }, 200)
          }, 400)
        }, 100)
      }, 10)
    },
    doAtt (video) {
      this.$moment.lookUserInfo = {
        userId: video.userId,
        hasAttention: video.hasAttention,
        isChild: true
      }
      this.$router.push('/user-info')
    },
    support (video) {
      if (!video.ifSupport) {
        this.$loading('点赞中...')
        this.$comfun.http_post(this, this.$moment.urls.praise + '?id=' + this.currentVideoInfo.videoId, {
          accountId: this.$moment.wxUserInfo.accountId
        }).then((response) => {
          if (response.body.code === '0000' && response.body.success === true) {
            this.$toast('点赞成功')
            video.ifSupport = !video.ifSupport
            video.supportCount += 1
            document.getElementById('video-support-' + video.videoId).classList.add('support-focus')
            for (var h = 0; h < 3; h++) {
              this.$pageImg([likeIcon], document.body.clientWidth * 3 / 5, document.body.clientHeight * 3 / 5, document.getElementsByClassName('video-item-current')[0])
            }
          } else {
            this.$toast('点赞失败')
          }
        })
      } else {
        this.$loading('取消点赞中...')
        this.$comfun.http_post(this, this.$moment.urls.praise + '?id=' + this.currentVideoInfo.videoId, {
          accountId: this.$moment.wxUserInfo.accountId
        }).then((response) => {
          if (response.body.code === '0000' && response.body.success === true) {
            this.$toast('点赞取消')
            video.ifSupport = !video.ifSupport
            video.supportCount -= 1
            document.getElementById('video-support-' + video.videoId).classList.remove('support-focus')
          } else {
            this.$toast('取消点赞失败')
          }
        })
      }
    },
    supportHold () {
      this.$emit('data-loading', true)
      this.$emit('close-comment-pop')
      this.dblclickCount++
      if (this.dblclickCount > 2) {
        this.$emit('data-loading', false)
        if (!this.currentVideoInfo.ifSupport) {
          this.support(this.currentVideoInfo)
        }
        this.$pageImg([likeIcon], event.clientX, event.clientY, document.getElementsByClassName('video-item-current')[0])
      }
      this.playVideo()
    },
    createVideoPlayer () {
      if (this.currentPlayer !== null) {
        if (this.$comfun.isAndroidIos().isiOS && this.currentPlayer && this.currentPlayer.playing()) {
          document.getElementById('video-play-' + this.currentVideoInfo.videoId).style.display = 'none'
        }
        this.currentPlayer.destroy()
        this.currentPlayer = null
      }
      var videoOption = {
        m3u8: this.currentVideoInfo.src, // 请替换成实际可用的播放地址
        coverpic: { style: 'cover', src: this.currentVideoInfo.cover },
        controls: 'none'
      }
      if (this.$comfun.isAndroidIos().isiOS) {
        document.getElementById('video-play-' + this.currentVideoInfo.videoId).style.display = 'block'
      }
      this.currentPlayer = this.$comfun.createVideo(this, 'video-play-' + this.currentVideoInfo.videoId, videoOption, true, () => {
        this.$emit('data-loading', true)
      }, () => {
        this.$emit('data-loading', false)
      })
      if (this.$comfun.isAndroidIos().isiOS) {
        // 自动播放处理在手机端不会触发，必须手动点击才会播放，是为了防止无故浪费流量资费
        document.getElementById('video-item-' + this.currentVideoInfo.videoId).click()
      }
    },
    playVideo () {
      clearTimeout(this.dblclickTimer)
      this.dblclickTimer = setTimeout(() => {
        if (this.dblclickCount === 1 && !document.getElementById('comment-pop-wrap').classList.contains('open')) {
          if (this.currentPlayer !== null && !this.currentPlayer.playing()) {
            this.currentPlayer.play()
          }
        }
        this.dblclickCount = 0
      }, 500)
    },
    lookComment () {
      this.$emit('look-comment')
    },
    shareVideo () {
      this.$loading('分享功能...')
    },
    changeData (videoComments) {
      var commentCountElem = this.$refs['video-comment-' + this.currentVideoInfo.videoId].getElementsByTagName('span')[0]
      commentCountElem.innerText = videoComments.length
    },
    updateAttState () {
      if (this.currentVideoInfo) {
        this.$comfun.http_get(this, this.$moment.urls.isidol + '?accountId=' + this.$moment.wxUserInfo.accountId + '&otheraccountId=' + this.currentVideoInfo.userId).then((response) => {
          if (response.body.code === '0000' && response.body.success === true) {
            this.currentVideoInfo.hasAttention = response.body.data
          }
        })
      }
    }
  },
  activated () {
    this.updateAttState()
    this.$moment.lookUserInfo = {}
  }
}
</script>

<style scoped>
#video-data-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 0;
}

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

#ref-data-wrap {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 2.6rem;
  box-shadow: 0 0 10px rgba(37, 37, 37, 0.6);
  position: absolute;
  top: 0;
  left: calc((100% - 2.6rem) / 2);
  overflow: hidden;
  font-size: 0;
  background-color: #ffffff;
  opacity: 0;
  z-index: 9;
  transition: all 0s ease 0s;
}

#ref-data-wrap>span.refing {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 62% 62%;
  background-image: url('./../../assets/data-ref.png');
  transition: all 0.4s ease 0s;
  opacity: 1;
}

#ref-data-wrap>span.complate {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 62% 62%;
  background-image: url('./../../assets/data-complate.png');
  transition: all 0.4s ease 0s;
  opacity: 0;
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
  cursor: pointer;
}

.video-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background: linear-gradient(rgba(30, 20, 54, .6), rgba(0, 0, 0, 0));
  z-index: 99;
}

.video-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background: linear-gradient(to top, rgba(30, 20, 54, .8), rgba(0, 0, 0, 0));
  z-index: 99;
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
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
}

.video-wrap>div.video-play-show {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  overflow: hidden;
  z-index: 999;
}

.video-wrap>div.vertical {
  background-size: auto 100%;
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

@-webkit-keyframes rotating {
  0% {
    transform: translateY(20px) rotate(0deg);
  }
  to {
    transform: translateY(20px) rotate(1turn);
  }
}

@keyframes rotating {
  0% {
    transform: translateY(20px) rotate(0deg);
  }
  to {
    transform: translateY(20px) rotate(1turn);
  }
}

.rotate {
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation: rotating 1.2s linear infinite;
  animation: rotating 1.2s linear infinite;
}
</style>
