<template>
  <div @touchmove="touchMove">
    <comm-note v-if="noteList.length > 0" v-for="note in noteList" :key="note.id" :note="note" @to-comment="toComment"></comm-note>
    <div class="data-empty" v-if="noteList.length == 0"></div>
    <div id="face-wrap" ref="face-wrap" class="touchIgnore"></div>
    <div class="comment-wrap touchIgnore close" ref="comment_wrap">
      <div id="edit" ref="edit" class="touchIgnore placeholder" @focus="focusInput" @blur="blurInput" @input="contentInput" contenteditable=“true”>请输入评论内容</div>
      <span class="touchIgnore" @click.passive="selectFace"></span>
      <span class="comment-send-btn ripple touchIgnore" @click="commentSend">评论</span>
    </div>
  </div>
</template>

<script>
import Note from '@/components/comm/Note'

export default {
  name: 'page-attention',
  components: {
    'comm-note': Note
  },
  data () {
    return {
      commentContentInput: '',
      commentContentInputHtml: '',
      noteList: [],
      commentAttentionIndex: -1,
      commentAttentionId: null,
      commentAttentionAboutAccountId: null
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
        event.target.innerHTML = '请输入评论内容'
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
    touchMove () {
      if (!event.target.classList.contains('touchIgnore')) {
        this.$face_close().then(() => {
          this.$refs.comment_wrap.style.transform = 'translateY(100%)'
          this.$refs.comment_wrap.setAttribute('class', 'comment-wrap touchIgnore close')
          this.commentAttentionId = null
          this.commentAttentionAboutAccountId = null
          this.commentAttentionIndex = -1
        })
      }
    },
    commentSend () {
      this.$face_close()
      if (this.commentContentInput.trim() === '' && this.commentContentInputHtml.trim() === '') {
        this.$toast('评论的内容不能为空哦')
        return false
      }
      this.$loading('正在发表评论...')
      let thisCommentData = this.$refs.edit.innerHTML.trim()
      this.$comfun.http_post(this, this.$moment.urls.save_comment, {
        fromAccountId: this.$moment.wxUserInfo.accountId,
        toAccountId: this.commentAttentionAboutAccountId,
        newsId: this.commentAttentionId,
        content: thisCommentData
      }).then((response) => {
        if (response.body.code === '0000' && response.body.success === true) {
          this.$toast('发表评论成功')
          var commentAtt = this.noteList[this.commentAttentionIndex]
          if (commentAtt && commentAtt.comments) {
            commentAtt.comments.unshift(this.$moment.wxUserInfo.nickname + '：' + thisCommentData)
          }
        } else {
          this.$toast('发表评论失败')
        }
      })
      this.$refs.edit.innerHTML = ''
      this.commentContentInput = ''
      this.commentContentInputHtml = ''
      if (!this.$refs.edit.classList.contains('placeholder') && this.$refs.edit.classList.contains('inputing')) {
        this.$refs.edit.classList.remove('inputing')
        this.$refs.edit.classList.add('placeholder')
        this.$refs.edit.innerHTML = '请输入评论内容'
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
    toComment (attentionId, aboutAccountId) {
      this.$face_close()
      this.$refs.edit.classList.remove('inputing')
      this.$refs.edit.classList.add('placeholder')
      this.$refs.edit.innerHTML = '请输入评论内容'
      if (this.$refs.comment_wrap.classList.contains('close')) {
        this.$refs.comment_wrap.classList.remove('close')
        this.$refs.comment_wrap.classList.add('open')
        this.$refs.comment_wrap.id = 'comment-' + attentionId
        this.$refs.comment_wrap.style.transform = 'translateY(0)'
        this.commentAttentionId = attentionId
        this.commentAttentionAboutAccountId = aboutAccountId
        for (let a = 0; a < this.noteList.length; a++) {
          if (this.noteList[a].id === attentionId) {
            this.commentAttentionIndex = a
            break
          }
        }
      } else {
        if (this.$refs.comment_wrap.id === 'comment-' + attentionId) {
          this.$refs.comment_wrap.classList.remove('open')
          this.$refs.comment_wrap.classList.add('close')
          this.$refs.comment_wrap.style.transform = 'translateY(100%)'
          this.$refs.comment_wrap.setAttribute('class', 'comment-wrap touchIgnore close')
          this.commentAttentionId = null
          this.commentAttentionAboutAccountId = null
          this.commentAttentionIndex = -1
        } else {
          this.$refs.comment_wrap.classList.remove('open')
          this.$refs.comment_wrap.classList.add('close')
          this.$refs.comment_wrap.style.transform = 'translateY(100%)'
          setTimeout(() => {
            this.$refs.comment_wrap.style.transform = 'translateY(0)'
            this.$refs.comment_wrap.setAttribute('class', 'comment-wrap touchIgnore open')
            this.$refs.comment_wrap.id = 'comment-' + attentionId
            this.commentAttentionId = attentionId
            this.commentAttentionAboutAccountId = aboutAccountId
            for (let a = 0; a < this.noteList.length; a++) {
              if (this.noteList[a].id === attentionId) {
                this.commentAttentionIndex = a
                break
              }
            }
          }, 100)
        }
      }
    }
  },
  activated () {
    this.noteList = this.$moment.attention_page_data_list
    this.$comfun.http_post(this, this.$moment.urls.get_new_info, {
      // accountId: this.$moment.wxUserInfo.accountId
    }).then((response) => {
      if (response.body.code === '0000' && response.body.success === true) {
        if (response.body.data.dataList.length > 0 && (this.$moment.attention_page_data_list.length === 0 || this.$moment.attention_page_data_list.length !== response.body.data.dataList.length)) {
          this.$toptip(`更新了${Math.abs(response.body.data.dataList.length - this.$moment.attention_page_data_list.length)}条新动态`)
          this.noteList = []
          for (let d = 0; d < response.body.data.dataList.length; d++) {
            let attentionData = response.body.data.dataList[d]
            let imgsOrVideos = []
            if (attentionData.fileList && attentionData.fileList.length > 0) {
              for (let f = 0; f < attentionData.fileList.length; f++) {
                if (String(attentionData.fileList[f].type) === '0') { // 图片资源
                  imgsOrVideos.push({
                    id: attentionData.fileList[f].id,
                    img: attentionData.fileList[f].fileAddress
                  })
                } else if (String(attentionData.fileList[f].type) === '1') { // 视频资源
                  imgsOrVideos.push({
                    id: attentionData.fileList[f].id,
                    video: attentionData.fileList[f].face,
                    resouce: attentionData.fileList[f].fileAddress,
                    width: Number(attentionData.fileList[f].width),
                    height: Number(attentionData.fileList[f].height)
                  })
                }
              }
            }
            let ifLike = false
            let likeMans = []
            if (attentionData.praiseList && attentionData.praiseList.length > 0) {
              for (let p = 0; p < attentionData.praiseList.length; p++) {
                if (attentionData.praiseList[p].accountId === this.$moment.wxUserInfo.accountId) {
                  ifLike = true
                }
                likeMans.push({
                  accountId: attentionData.praiseList[p].accountId,
                  time: attentionData.praiseList[p].createTime,
                  userHeadimg: attentionData.praiseList[p].userHeadimg,
                  username: attentionData.praiseList[p].username
                })
              }
            }
            let comments = []
            if (attentionData.commentList && attentionData.commentList.length > 0) {
              for (let c = 0; c < attentionData.commentList.length; c++) {
                comments.push(attentionData.commentList[c].fromUsername + '：' + attentionData.commentList[c].content)
              }
            }
            this.noteList.push({
              id: attentionData.id,
              accountId: attentionData.accountId,
              uttererHead: attentionData.userHeadimg,
              uttererNickName: attentionData.username,
              uttererTime: attentionData.creationDate,
              uttererContent: attentionData.content,
              imgsOrVideos: imgsOrVideos,
              ifLike: ifLike,
              likeMans: likeMans,
              comments: comments
            })
          }
          this.$moment.attention_page_data_list = this.noteList
        } else {
          var contentWrapElem = document.getElementById('content-wrap')
          contentWrapElem.scrollTop = this.$moment.attention_page_scroll_top
        }
      }
    })
  },
  deactivated () {
    var contentWrapElem = document.getElementById('content-wrap')
    this.$moment.attention_page_scroll_top = contentWrapElem.scrollTop
    this.$toptip_close()
  }
}
</script>

<style scoped>
.data-empty {
  position: relative;
  top: calc(50% - 3.5em - 14%);
  width: 100%;
  height: 7em;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  background-image: url('./../../assets/attention-empty.png');
}

.data-empty::after {
  content: '暂无动态';
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  text-align: center;
  color: #8b7caf;
}

.comment-wrap {
  position: fixed;
  width: 100%;
  height: 3.2rem;
  left: 0;
  bottom: 0;
  background: #28203a;
  transition: all 0.3s ease 0s;
  transform: translateY(100%);
  box-shadow: inset 0px 1px 2px 0px #1d1d2d;
  z-index: 999;
}

.comment-wrap>span {
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

.comment-wrap>span:nth-of-type(1) {
  width: 2rem;
  height: 2rem;
  right: calc(2.8rem + 0.5rem + 4px);
  background-image: url('./../../assets/chat-face.png');
}

.comment-wrap>span.comment-send-btn {
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
  background-color: #433564;
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
  bottom: 3.2rem;
  left: 0;
  background: #443763;
  font-size: 0;
}
</style>
