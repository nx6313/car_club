<template>
  <div>
    <div class="action-wrap">
      <textarea placeholder="请输入发布内容" ref="issue-input-area" v-model="issueContentInput"/>
      <div class="word-count">
        <span>{{issueContentInput.length}}</span>
        <span>/</span>
        <span>{{maxWordNum}}</span>
      </div>
      <transition-group :name="imgVideoTsName" tag="div" class="issue-video-wrap" ref="issue-video-item-wrap">
        <div v-if="imgVideos.length > 0" v-for="(imgVideo, index) in imgVideos" :key="index" :class="[imgVideo.type === 'add-btn' ? ['issue-video-item-add', 'ripple'] : '', 'issue-video-item']" :style="(imgVideo.type !== 'add-btn' && imgVideo.cover) ? { 'background-image': 'url(' + imgVideo.cover + ')' } : ''" @click="clickImgVideo(imgVideo)">
          <span class="btn-delete ripple" v-if="imgVideo.type !== 'add-btn'" @click.stop="deleteImgVideo(index)"></span>
        </div>
      </transition-group>
      <div class="accessory-wrap">
        <span class="ripple"></span>
        <span class="ripple"></span>
        <span class="ripple photo" @click="showVideoSelect" v-show="imgVideos.length === 1"></span>
      </div>
      <div class="issue-video-input-wrap">
        <input id="issue-video-by-camcorder" ref="issue-video-by-camcorder" type="file" accept="video/*" capture="camcorder" @input="getVideo('camcorder', true)">
        <input id="issue-video-by-photos" ref="issue-video-by-photos" type="file" accept="video/*" @input="getVideo('photos', true)">
      </div>
    </div>
    <div class="btn-issue-wrap">发布</div>
  </div>
</template>

<script>
export default {
  name: 'page-issue',
  data () {
    return {
      maxImgNum: 9,
      issueContentInput: '',
      imgVideos: [
        {
          type: 'add-btn'
        }
      ],
      maxWordNum: 600,
      imgVideoTsName: 'issue-video'
    }
  },
  methods: {
    clickImgVideo (imgVideo) {
      if (imgVideo.type === 'add-btn') {
        this.$comfun.wxChooseImage(this, this.maxImgNum - this.imgVideos.length + 1).then((data) => {
          var localIds = data.localIds
          if (localIds && localIds.length > 0) {
            for (var l = 0; l < localIds.length; l++) {
              this.imgVideos.splice(0, 0, {
                type: 'img',
                cover: localIds[l]
              })
              this.$comfun.wxUploadImage(this, localIds[l]).then((data) => {
                var serverId = data.serverId
                this.$comfun.saveWxImg(this, serverId).then((response) => {
                  if (response.body.code === '0000' && response.body.success === true) {
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
      this.imgVideos.splice(index, 1)
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
        ]
      })
    },
    getVideo (type, finish) {
      if (type === 'camcorder') {
        if (finish === true) {
          alert(1)
          let file = event.target.files[0]
          this.$comfun.http_file(this, this.$moment.urls.upload_video, 'uploadFile', file).then(response => {
            event.target.value = ''
            this.$comfun.console(this, '视频上传结束', response)
          }, error => {
            event.target.value = ''
            this.$comfun.console(this, '视频上传结束，出现错误', error)
          })
        } else {
          this.$refs['issue-video-by-camcorder'].click()
        }
      } else if (type === 'photos') {
        if (finish === true) {
          alert(2)
          let file = event.target.files[0]
          this.$comfun.http_file(this, this.$moment.urls.upload_video, 'uploadFile', file).then(response => {
            event.target.value = ''
            this.$comfun.console(this, '视频上传结束', response)
          }, error => {
            event.target.value = ''
            this.$comfun.console(this, '视频上传结束，出现错误', error)
          })
        } else {
          this.$refs['issue-video-by-photos'].click()
        }
      }
    }
  },
  watch: {
    issueContentInput (newValue, oldValue) {
      if (newValue.length > this.maxWordNum) {
        this.issueContentInput = newValue.substr(0, this.maxWordNum)
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
  z-index: 9;
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

.action-wrap>textarea {
  display: block;
  width: calc(100% - 16px - 16px);
  height: 8rem;
  border: none;
  outline: none;
  padding: 14px 16px 8px 16px;
  color: #ffffff;
  font-size: 1rem;
  resize: none;
  background: transparent;
}

.action-wrap>textarea::-webkit-input-placeholder { /* WebKit browsers */
  color: #685d82;
}
.action-wrap>textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #685d82;
}
.action-wrap>textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #685d82;
}
.action-wrap>textarea:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #685d82;
}

.action-wrap>div.word-count {
  text-align: right;
  padding: 0.2rem 0.8rem;
  color: #ffffff;
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
}

.action-wrap>div.issue-video-wrap>div.issue-video-item-add {
  background-color: #eeeeee;
  background-size: auto 50%;
  background-image: url('./../../assets/camera.png');
  transition: all 0s;
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
