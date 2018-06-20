<template>
  <div>
    <div class="action-wrap">
      <div id="edit" ref="edit" class="placeholder" @focus="focusInput" @blur="blurInput" @input="contentInput" contenteditable="true">请输入发布内容</div>
      <div class="word-count">
        <span>{{issueContentInput.length}}</span>
        <span>/</span>
        <span>{{maxWordNum}}</span>
      </div>
      <div class="at-users-wrap" v-if="atFrientList.length > 0">
        <span v-for="(atFriend, index) in atFrientList" :key="index" @click="deleteAtUser(index)">@ {{atFriend.name}}</span>
      </div>
      <transition-group :name="imgVideoTsName" tag="div" class="issue-video-wrap" ref="issue-video-item-wrap">
        <div v-if="imgVideos.length > 0" v-for="(imgVideo, index) in imgVideos" :key="index" :class="[imgVideo.type === 'add-btn' ? ['issue-video-item-add', 'ripple'] : '', 'issue-video-item']" :style="(imgVideo.type === 'img' && imgVideo.cover) ? { 'background-image': 'url(' + imgVideo.cover + ')' } : ''" @click="clickImgVideo(imgVideo)">
          <span class="btn-delete ripple" v-if="imgVideo.type !== 'add-btn'" @click.stop="deleteImgVideo(index)"></span>
          <div class="video-show" :id="'video-show-' + index" :ref="'video-show-' + index" v-if="imgVideo.type === 'video'"></div>
        </div>
      </transition-group>
      <div id="face-wrap" ref="face-wrap"></div>
      <div class="accessory-wrap">
        <span class="ripple" @click="selectFace"></span>
        <span class="ripple" @click="aiteFriend"></span>
        <span class="ripple photo" @click="showVideoSelect" v-show="imgVideos.length === maxVideoNum && canSelectVideo"></span>
      </div>
      <div class="issue-video-input-wrap">
        <input v-if="clearShowCamcorder" id="issue-video-by-camcorder" ref="issue-video-by-camcorder" type="file" accept="video/*" capture="camcorder" @change="getVideo('camcorder', true)">
        <input v-if="clearShowPhotos" id="issue-video-by-photos" ref="issue-video-by-photos" type="file" accept="video/*" @change="getVideo('photos', true)">
      </div>
    </div>
    <div class="btn-issue-wrap" @click="sendIssue">发布</div>
  </div>
</template>

<script>
export default {
  name: 'page-issue',
  data () {
    return {
      maxImgNum: 9,
      maxVideoNum: 1,
      canSelectVideo: true,
      issueContentInput: '',
      issueContentInputHtml: '',
      imgVideos: [
        {
          type: 'add-btn'
        }
      ],
      maxWordNum: 600,
      imgVideoTsName: 'issue-video',
      clearShowCamcorder: true,
      clearShowPhotos: true,
      atFrientList: [],
      issType: '1' // 1：文字；2：图片；3：视频
    }
  },
  activated () {
    this.issType = '1'
  },
  methods: {
    focusInput () {
      this.$face_close()
      if (event.target.classList.contains('placeholder')) {
        event.target.classList.remove('placeholder')
        event.target.innerHTML = ''
      }
      event.target.focus()
    },
    blurInput () {
      this.$face_close()
      if (!event.target.classList.contains('placeholder') && !event.target.classList.contains('inputing')) {
        event.target.classList.add('placeholder')
        event.target.innerHTML = '请输入发布内容'
      }
    },
    contentInput () {
      this.$face_close()
      this.issueContentInput = event.target.innerText
      this.issueContentInputHtml = event.target.innerHTML
      if (event.target.innerHTML.length > 0) {
        event.target.classList.add('inputing')
      } else {
        event.target.classList.remove('inputing')
      }
    },
    clickImgVideo (imgVideo) {
      this.$face_close()
      if (imgVideo.type === 'add-btn') {
        this.$comfun.wxChooseImage(this, this.maxImgNum - this.imgVideos.length + 1).then((data) => {
          var localIds = data.localIds
          if (localIds && localIds.length > 0) {
            for (var l = 0; l < localIds.length; l++) {
              let uploadImgLocalId = localIds[l]
              this.$comfun.wxUploadImage(this, uploadImgLocalId).then((data) => {
                var serverId = data.serverId
                this.$comfun.saveWxImg(this, serverId).then((response) => {
                  if (response.body.code === '0000' && response.body.success === true) {
                    this.issType = '2'
                    this.imgVideos.splice(0, 0, {
                      type: 'img',
                      cover: uploadImgLocalId,
                      id: response.body.data.id
                    })
                  } else {
                    this.$toast('图片保存至服务器失败')
                  }
                })
              })
            }
          }
        })
      }
    },
    deleteImgVideo (index) {
      if (this.canSelectVideo) {
        this.imgVideos.splice(index, 1)
      } else {
        this.canSelectVideo = true
        this.imgVideos.splice(index, 1)
        this.imgVideos.splice(this.maxVideoNum, this.maxVideoNum, {
          type: 'add-btn'
        })
      }
    },
    showVideoSelect () {
      this.$select({
        items: [
          {
            content: '拍摄',
            callBack: () => {
              this.getVideo('camcorder')
            }
          }, {
            content: '从相册选择视频',
            callBack: () => {
              this.getVideo('photos')
            }
          }
        ],
        showAfterFn: () => {
          this.clearShowCamcorder = true
          this.clearShowPhotos = true
          this.$face_close()
        }
      })
    },
    getVideo (type, finish) {
      if (type === 'camcorder') {
        if (finish === true) {
          let file = event.target.files[0]
          this.clearShowCamcorder = false
          let videoProgress = this.$loading('视频正在上传中', {
            context: this,
            progress: true,
            completeTip: '视频上传完成'
          })
          this.$comfun.http_file(this, this.$moment.urls.upload_video, 'uploadFile', file, (progress) => {
            videoProgress.update(progress)
          }).then(response => {
            if (response.body && response.body.code === '0000' && response.body.success === true) {
              videoProgress.complete()
              this.issType = '3'
              this.imgVideos.splice(0, 0, {
                type: 'video',
                src: response.body.data.path,
                id: response.body.data.id,
                cover: response.body.data.face,
                width: Number(response.body.data.width),
                height: Number(response.body.data.height)
              })
              this.imgVideos.splice(this.maxVideoNum, 1)
              setTimeout(() => {
                if (this.imgVideos[this.imgVideos.length - 1].width > this.imgVideos[this.imgVideos.length - 1].height) {
                  this.$refs['video-show-' + (this.imgVideos.length - 1)][0].classList.add('video-vertical')
                }
                this.$refs['video-show-' + (this.imgVideos.length - 1)][0].style.backgroundImage = 'url(' + this.imgVideos[this.imgVideos.length - 1].cover + ')'
              //   this.$comfun.createVideo(this, 'video-show-' + (this.imgVideos.length - 1), {
              //     m3u8: this.imgVideos[this.imgVideos.length - 1].src, // 请替换成实际可用的播放地址
              //     flv: this.imgVideos[this.imgVideos.length - 1].src, // 请替换成实际可用的播放地址
              //     autoplay: true, // iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
              //     coverpic: this.imgVideos[this.imgVideos.length - 1].cover,
              //     controls: 'none'
              //   }, true)
              }, 20)
              if (this.imgVideos.length >= this.maxVideoNum) {
                this.canSelectVideo = false
              }
            } else {
              this.$comfun.loading_close()
              this.$toast('视频上传失败')
            }
          }, () => {
            this.$comfun.loading_close()
            this.$toast('视频上传失败')
          })
        } else {
          this.$refs['issue-video-by-camcorder'].click()
        }
      } else if (type === 'photos') {
        if (finish === true) {
          let file = event.target.files[0]
          this.clearShowPhotos = false
          let videoProgress = this.$loading('视频正在上传中', {
            context: this,
            progress: true,
            completeTip: '视频上传完成'
          })
          this.$comfun.http_file(this, this.$moment.urls.upload_video, 'uploadFile', file, (progress) => {
            videoProgress.update(progress)
          }).then(response => {
            if (response.body && response.body.code === '0000' && response.body.success === true) {
              videoProgress.complete()
              this.issType = '3'
              this.imgVideos.splice(0, 0, {
                type: 'video',
                src: response.body.data.path,
                id: response.body.data.id,
                cover: response.body.data.face,
                width: Number(response.body.data.width),
                height: Number(response.body.data.height)
              })
              this.imgVideos.splice(this.maxVideoNum, 1)
              setTimeout(() => {
                if (this.imgVideos[this.imgVideos.length - 1].width > this.imgVideos[this.imgVideos.length - 1].height) {
                  this.$refs['video-show-' + (this.imgVideos.length - 1)][0].classList.add('video-vertical')
                }
                this.$refs['video-show-' + (this.imgVideos.length - 1)][0].style.backgroundImage = 'url(' + this.imgVideos[this.imgVideos.length - 1].cover + ')'
              //   this.$comfun.createVideo(this, 'video-show-' + (this.imgVideos.length - 1), {
              //     m3u8: this.imgVideos[this.imgVideos.length - 1].src, // 请替换成实际可用的播放地址
              //     flv: this.imgVideos[this.imgVideos.length - 1].src, // 请替换成实际可用的播放地址
              //     autoplay: true, // iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
              //     coverpic: this.imgVideos[this.imgVideos.length - 1].cover,
              //     controls: 'none'
              //   }, true)
              }, 20)
              if (this.imgVideos.length >= this.maxVideoNum) {
                this.canSelectVideo = false
              }
            } else {
              this.$comfun.loading_close()
              this.$toast('视频上传失败')
            }
          }, () => {
            this.$comfun.loading_close()
            this.$toast('视频上传失败')
          })
        } else {
          this.$refs['issue-video-by-photos'].click()
        }
      }
    },
    selectFace () {
      this.$face(this, {
        rootElem: this.$refs['face-wrap'],
        callBack: (faceImg) => {
          if (this.$refs.edit.classList.contains('placeholder')) {
            this.$refs.edit.classList.remove('placeholder')
            this.$refs.edit.classList.add('inputing')
            this.$refs.edit.innerHTML = ''
          }
          this.$refs.edit.appendChild(faceImg)
          this.issueContentInput = this.$refs.edit.innerText
          this.issueContentInputHtml = this.$refs.edit.innerHTML
        }
      })
    },
    aiteFriend () {
      this.$face_close()
      this.$loading('加载好友列表中...')
      this.$comfun.http_get(this, this.$moment.urls.friend + '?accountId=' + this.$moment.wxUserInfo.accountId).then((response) => {
        if (response.body.code === '0000' && response.body.success === true) {
          let friends = []
          if (response.body.data.length > 0) {
            friends = []
            for (let f = 0; f < response.body.data.length; f++) {
              friends.push({
                val: response.body.data[f].accountId,
                display: response.body.data[f].nickName
              })
            }
          }
          this.$picker(this, {
            title: '选择您要 @ 的人',
            cols: [ friends ],
            selectedFinishFn: (selected, arg) => {
              if (selected[0].val !== '') {
                for (let a = 0; a < this.atFrientList.length; a++) {
                  if (this.atFrientList[a].userId === selected[0].val) {
                    return false
                  }
                }
                this.atFrientList.push({
                  userId: selected[0].val,
                  name: selected[0].display
                })
              }
            }
          })
        } else {
          this.$toast('好友列表数据获取失败')
        }
      })
    },
    sendIssue () {
      this.$face_close()
      if (this.issueContentInputHtml === '') {
        this.$toast('写点什么吧')
        return false
      }
      let fileList = []
      for (let d = 0; d < this.imgVideos.length; d++) {
        if (this.imgVideos[d].type !== 'add-btn' && this.imgVideos[d].id) {
          fileList.push({
            id: this.imgVideos[d].id,
            sort: d
          })
        }
      }
      let atAccountIds = []
      if (this.atFrientList.length > 0) {
        for (let a = 0; a < this.atFrientList.length; a++) {
          atAccountIds.push(this.atFrientList[a].userId)
        }
      }
      this.$loading('发布中，请稍后...')
      this.$comfun.http_post(this, this.$moment.urls.save_issue, {
        accountId: this.$moment.wxUserInfo.accountId,
        openid: this.$moment.wxUserInfo.openid,
        content: this.issueContentInputHtml.trim(),
        fileList: fileList,
        type: this.issType,
        atAccountId: atAccountIds
      }).then((response) => {
        if (response.body && response.body.code === '0000' && response.body.success === true) {
          this.$toast('发布成功')
          this.$refs.edit.innerHTML = ''
          this.imgVideos = [
            {
              type: 'add-btn'
            }
          ]
          this.canSelectVideo = true
          this.issueContentInput = ''
          this.issueContentInputHtml = ''
          this.clearShowCamcorder = true
          this.clearShowPhotos = true
          this.atFrientList = []
          this.issType = '1'
          if (!this.$refs.edit.classList.contains('placeholder') && this.$refs.edit.classList.contains('inputing')) {
            this.$refs.edit.classList.remove('inputing')
            this.$refs.edit.classList.add('placeholder')
            this.$refs.edit.innerHTML = '请输入发布内容'
          }
        }
      })
    },
    deleteAtUser (index) {
      this.atFrientList.splice(index, 1)
    }
  },
  watch: {
    issueContentInput (newValue, oldValue) {
      if (newValue.length > this.maxWordNum) {
        this.$toast('您输入的内容太多了，删一点吧')
        // this.issueContentInput = newValue.substr(0, this.maxWordNum)
        // this.$refs.edit.innerHTML = this.issueContentInput
      }
    },
    imgVideos (newValue, oldValue) {
      if (newValue.length >= this.maxImgNum + 1) {
        this.imgVideos.splice(this.maxImgNum, 1)
      } else if (newValue.length === this.maxImgNum - 1) {
        if (this.imgVideos[this.imgVideos.length - 1].type !== 'add-btn') {
          this.imgVideos.splice(this.maxImgNum, this.maxImgNum, {
            type: 'add-btn'
          })
        }
      }
    }
  }
}
</script>

<style scoped>
#content-wrap {
  height: 100vh;
  z-index: 99;
  background: rgb(30, 20, 54);
}

.action-wrap {
  position: relative;
  background-color: #2c1f4a;
  margin-bottom: 3.8rem;
}

.btn-issue-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background: #110c1d;
  color: #a395c7;
  font-size: 0.9rem;
}

#edit {
  display: block;
  width: calc(100% - 16px - 16px);
  height: 8rem;
  line-height: 1.2rem;
  border: none;
  outline: none;
  padding: 14px 16px 8px 16px;
  color: #ffffff;
  font-size: 0.9rem;
  resize: none;
  background: transparent;
  overflow-x: hidden;
  overflow-y: auto;
}

.placeholder {
  color: #685d82 !important;
}

.action-wrap>div.word-count {
  text-align: right;
  padding: 0.2rem 0.8rem;
  color: #ffffff;
}

.action-wrap>div.at-users-wrap {
  position: relative;
  padding: 0.4rem 0.8rem;
  word-wrap: break-word;
}

.action-wrap>div.at-users-wrap>span {
  display: inline-block;
  position: relative;
  padding: 0.2rem 0.6rem;
  background: #423b71;
  color: #cfceef;
  font-size: 0.6rem;
  border-radius: 1rem;
  margin-right: 0.4rem;
  margin-bottom: 0.3rem;
}

.action-wrap>div.issue-video-wrap {
  position: relative;
  padding: 0.2rem 0 0.2rem 10px;
  font-size: 0;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.issue-video-enter, .issue-video-leave-to {
  opacity: 0.6;
  transform: translateY(-6px);
}
.issue-video, .issue-video-leave-active {
  position: absolute;
}

.action-wrap>div.issue-video-wrap>div.issue-video-item {
  position: relative;
  display: inline-block;
  width: calc((100% - 4 * 10px) / 4);
  height: 0;
  padding-bottom: calc((100% - 4 * 10px) / 4);
  margin: 0 10px 10px 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
  transition: all 0.4s;
}

.action-wrap>div.issue-video-wrap>div.issue-video-item>span.btn-delete {
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 2rem;
  background-color: rgba(230, 27, 27, 0.836);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50% 50%;
  background-image: url('./../../assets/close.png');
  z-index: 999999999;
}

.action-wrap>div.issue-video-wrap>div.issue-video-item>div.video-show {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1f1f1f;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
}

.action-wrap>div.issue-video-wrap>div.issue-video-item>div.video-show::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 50%;
  height: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  background-image: url('./../../assets/play.png');
}

.action-wrap>div.issue-video-wrap>div.issue-video-item>div.video-vertical {
  background-size: auto 100%;
}

.action-wrap>div.issue-video-wrap>div.issue-video-item-add {
  background-color: #eeeeee;
  background-size: auto 50%;
  background-image: url('./../../assets/camera.png');
  transition: all 0s;
}

#face-wrap {
  position: relative;
  background: #443763;
  font-size: 0;
}

.action-wrap>div.accessory-wrap {
  position: relative;
  padding-bottom: 0.2rem;
}

.action-wrap>div.accessory-wrap>span {
  position: relative;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60% 60%;
}

.action-wrap>div.accessory-wrap>span:nth-of-type(1) {
  background-image: url('./../../assets/face-light.png');
  margin-left: 0.3rem;
  margin-right: 0.8rem;
}

.action-wrap>div.accessory-wrap>span:nth-of-type(2) {
  background-image: url('./../../assets/aite-light.png');
}

.action-wrap>div.accessory-wrap>span:nth-of-type(3) {
  background-image: url('./../../assets/photo-light.png');
  margin-left: 0.8rem;
}

.action-wrap>div.issue-video-input-wrap {
  display: none;
}
</style>
