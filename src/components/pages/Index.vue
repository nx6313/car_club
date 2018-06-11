<template>
  <div>
    <comm-video :full=true @close-comment-pop="closeCommentPop" @cut-video-page="cutVideoPage" @look-comment="lookComment" @data-loading="dataLoading"></comm-video>
    <div class="data-loading-tip-pop" ref="data_loading">
      <div><span></span></div>
      <div><span></span></div>
    </div>
    <div class="comment-pop-wrap" id="comment-pop-wrap" ref="comment-pop-wrap" @touchmove="touchMoveCommentPop">
      <span class="pop-close-btn ripple" @click="hideCommentPop"></span>
      <span class="comment-title" v-if="videoComments.length > 0" @click.stop="resetcommenttip">{{videoComments.length}}条评论</span>
      <span class="comment-title" v-if="videoComments.length === 0" @click.stop="resetcommenttip">没有评论</span>
      <div class="comment-item-wrap" ref="comment-item-wrap" v-if="videoComments.length > 0">
        <div class="comment-item" v-for="(comment, index) in videoComments" :key="index">
          <span class="head" :style="comment.head ? { 'background-image': 'url(' + comment.head + ')' } : ''"></span>
          <span class="reply-btn ripple" @click.stop="replycomment(comment, index)"></span>
          <span :class="['like-btn', 'ripple', comment.isLike ? 'comment-like-btn' : '']" @click.stop="praisecomment(comment)"></span>
          <div class="content-wrap">
            <div>{{comment.name}}</div>
            <div v-html="comment.content"></div>
            <div>{{dateToCur(comment.time, 2 * 24 * 60 * 60 * 1000)}}</div>
            <div class="replys-wrap" v-if="comment.replys.length > 0">
              <div class="reply-item-wrap" v-for="(reply, index) in comment.replys" :key="index">
                <div>
                  <span class="reply-user-name">{{reply.name}}</span>
                  <span class="reply-is-author" v-if="comment.userId === currentVideo.userId">作者</span>
                  <span>回复&nbsp;&nbsp;{{comment.name}}</span>
                </div>
                <div v-html="reply.content"></div>
                <div>{{dateToCur(reply.time, 2 * 24 * 60 * 60 * 1000)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-no-data-wrap" v-if="videoComments.length === 0"></div>
      <div id="face-wrap" ref="face-wrap" class="touchIgnore"></div>
      <div class="comment-input-wrap touchIgnore">
        <div id="edit" ref="edit" class="touchIgnore placeholder" @focus="focusInput" @blur="blurInput" @input="contentInput" contenteditable=“true”>{{commentPlaceholder}}</div>
        <span class="touchIgnore" @click.passive="selectFace"></span>
        <span class="comment-send-btn ripple touchIgnore" @click="commentSend">评论</span>
      </div>
    </div>
  </div>
</template>

<script>
import Video from '@/components/comm/Video'

export default {
  name: 'page-index',
  components: {
    'comm-video': Video
  },
  data () {
    return {
      currentVideo: null,
      changeDataFn: null,
      commentContentInput: '',
      commentContentInputHtml: '',
      videoComments: [],
      commentPlaceholder: '请输入评论内容',
      commentDoingTip: '正在发表评论...',
      replyUserId: null,
      replyType: '0',
      replyAboutId: null,
      replyCommentIndex: -1 // 正在回复的评论数据序号
    }
  },
  methods: {
    focusInput () {
      this.$face_close()
      if (event.target.classList.contains('placeholder')) {
        event.target.classList.remove('placeholder')
        event.target.innerHTML = ''
      }
      this.$refs.edit.focus()
    },
    blurInput () {
      this.$face_close()
      if (!event.target.classList.contains('placeholder') && !event.target.classList.contains('inputing')) {
        event.target.classList.add('placeholder')
        event.target.innerHTML = this.commentPlaceholder
      }
    },
    contentInput () {
      this.$face_close()
      this.commentContentInput = event.target.innerText
      this.commentContentInputHtml = event.target.innerHTML
      if (event.target.innerHTML.length > 0) {
        event.target.classList.add('inputing')
        setTimeout(() => {
          var currentpos = this.$refs.edit.scrollHeight * 100
          this.$refs.edit.scrollTop = currentpos
        }, 100)
      } else {
        event.target.classList.remove('inputing')
      }
    },
    dateToCur (value, maxDiff) {
      let maxDiffVal = maxDiff === undefined ? 0 : maxDiff
      let date = new Date(value).getTime()
      let cur = Date.now()
      let diff = cur - date
      if (maxDiffVal > 0) {
        if (diff > maxDiffVal) {
          return this.$comfun.formatDate(new Date(value), 'yy-MM-dd hh:mm:ss')
        } else {
          return this.$comfun.formatDiffMilliseconds(diff) + ' 前'
        }
      } else {
        return this.$comfun.formatDate(new Date(value), 'yy-MM-dd hh:mm:ss')
      }
    },
    touchMoveCommentPop () {
      if (!event.target.classList.contains('touchIgnore')) {
        this.$face_close()
      }
    },
    commentSend () {
      this.$face_close()
      if (this.commentContentInput.trim() === '' && this.commentContentInputHtml.trim() === '') {
        if (this.replyType === '0') {
          this.$toast('评论的内容不能为空哦')
        } else {
          this.$toast('回复的内容不能为空哦')
        }
        return false
      }
      this.$loading(this.commentDoingTip)
      let thisCommentData = this.$refs.edit.innerHTML.trim()
      this.$comfun.http_post(this, this.$moment.urls.save_comment, {
        fromAccountId: this.$moment.wxUserInfo.accountId,
        toAccountId: this.replyUserId,
        newsId: this.currentVideo.videoId,
        content: thisCommentData,
        type: this.replyType,
        fatherid: this.replyAboutId
      }).then((response) => {
        if (response.body.code === '0000' && response.body.success === true) {
          if (this.replyType === '0') {
            this.$toast('发表评论成功')
            this.videoComments.unshift({
              id: response.body.data.id,
              uuid: response.body.data.uuid,
              head: this.$moment.wxUserInfo.headimgurl,
              name: this.$moment.wxUserInfo.nickname,
              userId: this.$moment.wxUserInfo.accountId,
              content: thisCommentData,
              time: this.$comfun.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
              isLike: false,
              replys: []
            })
            this.changeDataFn(this.videoComments)
          } else {
            this.$toast('发表回复成功')
            if (this.replyCommentIndex >= 0) {
              this.videoComments[this.replyCommentIndex].replys.unshift({
                userId: this.$moment.wxUserInfo.accountId,
                name: this.$moment.wxUserInfo.nickname,
                content: thisCommentData,
                time: this.$comfun.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                userHead: this.$moment.wxUserInfo.headimgurl,
                replyUserId: this.replyUserId
              })
            }
          }
        } else {
          if (this.replyType === '0') {
            this.$toast('发表评论失败')
          } else {
            this.$toast('发表回复失败')
          }
        }
      })
      this.$refs.edit.innerHTML = ''
      this.commentContentInput = ''
      this.commentContentInputHtml = ''
      if (!this.$refs.edit.classList.contains('placeholder') && this.$refs.edit.classList.contains('inputing')) {
        this.$refs.edit.classList.remove('inputing')
        this.$refs.edit.classList.add('placeholder')
        this.$refs.edit.innerHTML = this.commentPlaceholder
      }
    },
    selectFace () {
      this.$face(this, {
        rootElem: this.$refs['face-wrap'],
        otherClass: 'touchIgnore',
        callBack: (faceImg) => {
          if (this.$refs.edit.classList.contains('placeholder')) {
            this.$refs.edit.classList.remove('placeholder')
            this.$refs.edit.classList.add('inputing')
            this.$refs.edit.innerHTML = ''
          }
          this.$refs.edit.appendChild(faceImg)
          this.commentContentInput = this.$refs.edit.innerText
          this.commentContentInputHtml = this.$refs.edit.innerHTML
          setTimeout(() => {
            var currentpos = this.$refs.edit.scrollHeight * 100
            this.$refs.edit.scrollTop = currentpos
          }, 100)
        }
      })
    },
    dataLoading (isLoading) {
      if (isLoading) {
        this.$refs.data_loading.style.display = 'block'
      } else {
        this.$refs.data_loading.style.display = 'none'
      }
    },
    cutVideoPage (videoInfo, changeDataFn) {
      this.$comfun.consoleBeautiful(this, '切换到的页面视频信息', null, null, videoInfo, 'info')
      this.currentVideo = videoInfo
      this.videoComments = videoInfo.comments
      this.replyUserId = videoInfo.userId
      this.replyType = '0'
      this.replyAboutId = null
      this.changeDataFn = changeDataFn
    },
    closeCommentPop () {
      if (this.$refs['comment-pop-wrap'].classList.contains('open')) {
        this.hideCommentPop()
      }
    },
    hideCommentPop () {
      this.replyCommentIndex = -1
      this.commentPlaceholder = '请输入评论内容'
      this.commentDoingTip = '正在发表评论...'
      this.$refs.edit.innerHTML = this.commentPlaceholder
      this.replyUserId = this.currentVideo.userId
      this.replyAboutId = null
      this.replyType = '0'
      this.$refs['comment-pop-wrap'].style.opacity = 0
      this.$refs['comment-pop-wrap'].style.transform = 'translateY(110%)'
      setTimeout(() => {
        this.$refs['comment-pop-wrap'].classList.remove('open')
        this.$refs['comment-pop-wrap'].classList.add('close')
      }, 600)
    },
    lookComment () {
      this.$refs['comment-pop-wrap'].classList.remove('close')
      this.$refs['comment-pop-wrap'].classList.add('open')
      this.$refs['comment-pop-wrap'].style.opacity = 1
      this.$refs['comment-pop-wrap'].style.transform = 'translateY(0)'
    },
    praisecomment (comment) {
      if (!event.target.classList.contains('comment-like-btn')) {
        this.$loading('点赞评论...')
        this.$comfun.http_get(this, this.$moment.urls.praisecomment + '?commentId=' + comment.id + '&accountId=' + this.$moment.wxUserInfo.accountId).then((response) => {
          if (response.body.code === '0000' && response.body.success === true) {
            this.$toast('点赞评论成功')
            comment.isLike = !comment.isLike
          }
        })
      } else {
        this.$loading('取消点赞...')
        this.$comfun.http_get(this, this.$moment.urls.praisecomment + '?commentId=' + comment.id + '&accountId=' + this.$moment.wxUserInfo.accountId).then((response) => {
          if (response.body.code === '0000' && response.body.success === true) {
            this.$toast('取消点赞成功')
            comment.isLike = !comment.isLike
          }
        })
      }
    },
    replycomment (comment, index) {
      this.replyCommentIndex = index
      this.commentPlaceholder = '回复 ' + comment.name
      this.$refs.edit.innerHTML = this.commentPlaceholder
      this.commentDoingTip = '正在发表回复...'
      this.replyUserId = comment.userId
      this.replyAboutId = comment.uuid
      this.replyType = '1'
      this.$toast('回复第 ' + this.replyCommentIndex + ' 条评论')
    },
    resetcommenttip () {
      this.$toast('重置回复对象')
      this.replyCommentIndex = -1
      this.commentPlaceholder = '请输入评论内容'
      this.$refs.edit.innerHTML = this.commentPlaceholder
      this.commentDoingTip = '正在发表评论...'
      this.replyUserId = this.currentVideo.userId
      this.replyAboutId = null
      this.replyType = '0'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-wrap {
  overflow: hidden;
}

div.data-loading-tip-pop {
  position: fixed;
  left: 0;
  bottom: 3.2rem;
  width: 100%;
  height: 1px;
  font-size: 0px;
  display: none;
}

div.data-loading-tip-pop>div:nth-of-type(1) {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

div.data-loading-tip-pop>div:nth-of-type(2) {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

div.data-loading-tip-pop>div:nth-of-type(1)>span {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 180%;
  height: 100%;
  background: linear-gradient(to right, rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, .4), rgba(243, 239, 251, .6), rgba(243, 239, 251, .8), rgba(243, 239, 251, .8));
  animation: data-loading-left 0.6s ease 0s infinite;
}

div.data-loading-tip-pop>div:nth-of-type(2)>span {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 180%;
  height: 100%;
  background: linear-gradient(to left, rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, .4), rgba(243, 239, 251, .6), rgba(243, 239, 251, .8), rgba(243, 239, 251, .8));
  animation: data-loading-right 0.6s ease 0s infinite;
}

div.comment-pop-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(30, 20, 54, 0.98);
  width: 100%;
  height: 70%;
  color: #ffffff;
  transition: all 0.4s ease 0s;
  opacity: 0;
  transform: translateY(110%);
}

div.comment-pop-wrap>span.pop-close-btn {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30% 30%;
  background-image: url('./../../assets/close.png');
}

div.comment-pop-wrap>span.comment-title {
  display: block;
  text-align: center;
  height: 2.6rem;
  line-height: 2.6rem;
  font-size: 0.8rem;
}

div.comment-pop-wrap>div.comment-no-data-wrap {
  position: relative;
  top: calc(50% - 4em - 14%);
  width: 100%;
  height: 4rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  background-image: url('./../../assets/attention-empty.png');
}

div.comment-pop-wrap>div.comment-item-wrap {
  position: relative;
  height: calc(100% - 2.6rem - 3rem - 0.8rem);
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 0.8rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item {
  position: relative;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item:nth-of-type(n + 2) {
  margin-top: 1.2rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>span.head {
  position: absolute;
  display: inline-block;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 2.2rem;
  top: 0.2rem;
  left: 0.6rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>span.reply-btn {
  position: absolute;
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 1.6rem;
  top: 0.2rem;
  right: 2.4rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60% 60%;
  background-image: url('./../../assets/icon-reply.png');
  z-index: 9;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>span.like-btn {
  position: absolute;
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 1.6rem;
  top: 0.2rem;
  right: 0.3rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60% 60%;
  background-image: url('./../../assets/heart.png');
  z-index: 9;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>span.comment-like-btn {
  background-image: url('./../../assets/heart-like.png');
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap {
  position: relative;
  width: calc(100% - 2.2rem - 2.8rem - 0.4rem);
  min-height: 3rem;
  margin-left: 3.3rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div {
  position: relative;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div:nth-of-type(1) {
  color: #8b7caf;
  font-size: 0.7rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div:nth-of-type(2) {
  font-size: 0.8rem;
  margin-top: 0.6rem;
  line-height: 1.4rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div:nth-of-type(3) {
  color: #8b7caf;
  font-size: 0.6rem;
  margin-top: 0.4rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div.replys-wrap {
  background: #433564;
  padding: 0.5rem 0.8rem;
  margin-top: 0.6rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div.replys-wrap>div.reply-item-wrap {
  position: relative;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div.replys-wrap>div.reply-item-wrap:nth-of-type(n + 2) {
  margin-top: 1.4rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div.replys-wrap>div.reply-item-wrap:nth-of-type(n + 2)::before {
  content: '';
  position: absolute;
  left: -0.4rem;
  right: -0.4rem;
  border-top: 1px dotted #645981;
  top: -0.8rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div.replys-wrap>div.reply-item-wrap>div {
  position: relative;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div.replys-wrap>div.reply-item-wrap>div:nth-of-type(1) {
  color: #8b7caf;
  font-size: 0.7rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div.replys-wrap>div.reply-item-wrap>div:nth-of-type(1)>span.reply-user-name {
  display: inline-block;
  color: #47e160;
  margin-right: 0.4rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div.replys-wrap>div.reply-item-wrap>div:nth-of-type(1)>span.reply-is-author {
  display: inline-block;
  color: #ff003b;
  margin-right: 0.4rem;
  border: 1px solid #ff003b;
  border-radius: 4px;
  font-size: 0.6rem;
  padding: 0 4px;
  transform: scale(0.8, 0.8);
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div.replys-wrap>div.reply-item-wrap>div:nth-of-type(2) {
  font-size: 0.8rem;
  margin-top: 0.6rem;
  line-height: 1.4rem;
}

div.comment-pop-wrap>div.comment-item-wrap>div.comment-item>div.content-wrap>div.replys-wrap>div.reply-item-wrap>div:nth-of-type(3) {
  color: #8b7caf;
  font-size: 0.6rem;
  margin-top: 0.4rem;
}

div.comment-pop-wrap>div.comment-input-wrap {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background: #110c1d;
}

div.comment-pop-wrap>div.comment-input-wrap>span {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  display: inline-block;
  width: 2.8rem;
  height: 2.8rem;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 76% 76%;
}

div.comment-pop-wrap>div.comment-input-wrap>span:nth-of-type(1) {
  width: 2rem;
  height: 2rem;
  right: calc(2.8rem + 0.5rem + 4px);
  background-image: url('./../../assets/chat-face.png');
}

div.comment-pop-wrap>div.comment-input-wrap>span.comment-send-btn {
  right: 0.5rem;
  background: rgb(90, 64, 158);
  width: 2.5rem;
  height: 1.8rem;
  line-height: 1.92rem;
  border-radius: 2px;
  text-align: center;
  color: #af9be2;
  font-size: 0.8rem;
  text-shadow: 0 0 2px rgba(27, 18, 46, 0.4);
  box-shadow: 0 0 4px rgba(78, 60, 116, 0.4);
  transition: opacity 0.3s ease 0s;
}

#edit {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.5rem;
  margin: auto 0;
  display: inline-block;
  width: calc(100% - 3.8rem - 20px - 2.2rem - 2px);
  height: calc(2rem - 14px);
  border: none;
  outline: none;
  border-radius: calc(2rem - 16px);
  background-color: #3a2c5d;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 6px 2.2rem 8px 20px;
  color: #ffffff;
  font-size: 0.9rem;
}

#edit::-webkit-scrollbar {
  display: none;
}

.placeholder {
  color: #685d82 !important;
}

#face-wrap {
  position: fixed;
  width: 100%;
  bottom: 3rem;
  left: 0;
  background: #443763;
  font-size: 0;
}
</style>
