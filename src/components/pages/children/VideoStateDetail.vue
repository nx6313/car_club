<template>
  <div @touchmove="touchMove">
    <div class="state-info-wrap">
      <span class="head" :style="detailData.headImg ? { 'background-image': 'url(' + detailData.headImg + ')' } : ''"></span>
      <div class="content-wrap">
        <span>{{detailData.nikeName}}</span>
        <span v-if="detailData.content">{{detailData.content}}</span>
        <div class="assets-item-wrap" v-if="detailData.assets.length > 0">
          <span v-for="(asset, index) in detailData.assets" :key="index" :style="(asset.img || asset.video) ? { 'background-image': 'url(' + (asset.img || asset.video) + ')' } : ''" :class="asset.video ? (['isVideo', asset.width > asset.height ? 'vertical' : '']) : ''"></span>
        </div>
        <div class="time-read-delete-wrap">
          <span>{{detailData.time}}</span>
          <span>{{detailData.readNum}}阅读</span>
          <span class="btn-delete">删除</span>
        </div>
      </div>
    </div>
    <div class="comment-wrap">
      <div class="support-users-wrap" v-if="detailData.supports.length > 0">
        <div class="support-count-wrap">
          <span>{{detailData.supports.length}}个赞</span>
          <span></span>
        </div>
        <div class="support-user-item-wrap">
          <span v-for="(support, index) in detailData.supports" :key="index" :style="support.head ? { 'background-image': 'url(' + support.head + ')' } : ''"></span>
        </div>
      </div>
      <div class="comment-data-wrap">
        <div class="comment-title-bar flex-r flex-b">
          <span>{{detailData.comments.length}} 全部评论</span>
          <span class="ripple" @click="filterType">按照热度</span>
        </div>
        <span v-if="detailData.comments.length === 0"></span>
        <div class="comment-info-wrap" v-if="detailData.comments.length > 0" v-for="(comment, index) in detailData.comments" :key="index">
          <span class="head" :style="comment.head ? { 'background-image': 'url(' + comment.head + ')' } : ''"></span>
          <div class="comment-content-wrap">
            <span>{{comment.nikeName}}</span>
            <span>{{comment.time}}</span>
            <span>{{comment.content}}</span>
            <div class="comment-reply-wrap" v-if="comment.replys.length > 0">
              <div v-for="(reply, index) in comment.replys" :key="index">
                <div>
                  <span>{{reply.name}}</span>
                  <span>回复&nbsp;&nbsp;{{comment.nikeName}}</span>
                </div>
                <span>{{reply.content}}</span>
              </div>
            </div>
            <div class="comment-do-wrap">
              <span @click="toComment"></span>
              <span>1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="face-wrap" ref="face-wrap" class="touchIgnore"></div>
    <div class="comment-input-wrap touchIgnore close" ref="comment_wrap">
      <div id="edit" ref="edit" class="touchIgnore placeholder" @focus="focusInput" @blur="blurInput" @input="contentInput" contenteditable=“true”>请输入评论内容</div>
      <span class="touchIgnore" @click.passive="selectFace"></span>
      <span class="comment-send-btn ripple touchIgnore" @click="commentSend">评论</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'me-state-detail',
  data () {
    return {
      detailData: {},
      commentContentInput: '',
      commentContentInputHtml: ''
    }
  },
  created () {
    this.detailData = {
      headImg: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd',
      nikeName: '俱乐部之友爱',
      content: '国台办发言人马晓光先生在上次发布会的时候已经明确表示过，解放军军演和空军绕',
      assets: [
        {
          img: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        },
        {
          img: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        },
        {
          img: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        },
        {
          video: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        }
      ],
      time: '2018年5月19日 15:49:51',
      readNum: 3,
      supports: [
        {
          head: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        },
        {
          head: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        },
        {
          head: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        },
        {
          head: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        },
        {
          head: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        },
        {
          head: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        },
        {
          head: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        },
        {
          head: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd'
        }
      ],
      comments: [
        {
          head: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd',
          nikeName: '刘德华',
          time: '40分钟前',
          like: 2,
          content: '我们在设计任何作品时，首先考虑的是应用的尺寸。如iPhone8的分辨率我们在设计任何作品时，首先考虑的是应用的尺寸。如iPhone8的分辨率',
          replys: [
            {
              userId: '2',
              name: '张学友',
              content: '你说的好棒棒！我们在设计任何作品时，首先考虑的是应用的尺寸',
              time: '40分钟前'
            },
            {
              userId: '2',
              name: '张学友',
              content: '你说的好棒棒！我们在设计任何作品时，首先考虑的是应用的尺寸',
              time: '40分钟前'
            }
          ]
        },
        {
          head: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd',
          nikeName: '刘德华',
          time: '40分钟前',
          like: 2,
          content: '我们在设计任何作品时，首先考虑的是应用的尺寸。如iPhone8的分辨率我们在设计任何作品时，首先考虑的是应用的尺寸。如iPhone8的分辨率',
          replys: [
            {
              userId: '2',
              name: '张学友',
              content: '你说的好棒棒！我们在设计任何作品时，首先考虑的是应用的尺寸',
              time: '40分钟前'
            },
            {
              userId: '2',
              name: '张学友',
              content: '你说的好棒棒！我们在设计任何作品时，首先考虑的是应用的尺寸',
              time: '40分钟前'
            }
          ]
        }
      ]
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
          this.$refs.comment_wrap.setAttribute('class', 'comment-input-wrap touchIgnore close')
        })
      }
    },
    filterType () {
      this.$bottomtip('456')
    },
    toComment (attentionId) {
      this.$face_close()
      this.$refs.edit.classList.remove('inputing')
      this.$refs.edit.classList.add('placeholder')
      this.$refs.edit.innerHTML = '请输入评论内容'
      if (this.$refs.comment_wrap.classList.contains('close')) {
        this.$refs.comment_wrap.classList.remove('close')
        this.$refs.comment_wrap.classList.add('open')
        this.$refs.comment_wrap.id = 'comment-' + attentionId
        this.$refs.comment_wrap.style.transform = 'translateY(0)'
      } else {
        if (this.$refs.comment_wrap.id === 'comment-' + attentionId) {
          this.$refs.comment_wrap.classList.remove('open')
          this.$refs.comment_wrap.classList.add('close')
          this.$refs.comment_wrap.style.transform = 'translateY(100%)'
          this.$refs.comment_wrap.setAttribute('class', 'comment-input-wrap touchIgnore close')
        } else {
          this.$refs.comment_wrap.classList.remove('open')
          this.$refs.comment_wrap.classList.add('close')
          this.$refs.comment_wrap.style.transform = 'translateY(100%)'
          setTimeout(() => {
            this.$refs.comment_wrap.style.transform = 'translateY(0)'
            this.$refs.comment_wrap.setAttribute('class', 'comment-input-wrap touchIgnore open')
            this.$refs.comment_wrap.id = 'comment-' + attentionId
          }, 100)
        }
      }
    },
    commentSend () {
      if (!this.commentContentInput.trim()) {
        this.$toast('评论内容不能为空')
        return false
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

.state-info-wrap {
  position: relative;
  background: #2c1f4a;
  padding: 1rem 0.6rem;
}

.state-info-wrap>span.head {
  display: block;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 2.2rem;
  border: 1px solid #ffffff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
}

.state-info-wrap>div.content-wrap {
  position: relative;
  width: calc(100% - 2.9rem);
  margin-left: 2.9rem;
  margin-top: -2.2rem;
}

.state-info-wrap>div.content-wrap>span:nth-of-type(1) {
  position: relative;
  display: block;
  font-size: 0.8rem;
  font-weight: bold;
}

.state-info-wrap>div.content-wrap>span:nth-of-type(2) {
  position: relative;
  display: block;
  margin-top: 0.5rem;
}

.state-info-wrap>div.content-wrap>div.assets-item-wrap {
  position: relative;
  width: 82%;
  font-size: 0;
  margin-top: 1rem;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.state-info-wrap>div.content-wrap>div.assets-item-wrap>span {
  position: relative;
  display: inline-block;
  width: calc((100% - 15px) / 3);
  height: 0;
  padding-bottom: calc((100% - 15px) / 3);
  margin: 0 5px 5px 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
}

.state-info-wrap>div.content-wrap>div.assets-item-wrap>span.vertical {
  background-size: auto 100%;
}

.state-info-wrap>div.content-wrap>div.assets-item-wrap>span.isVideo::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
}

.state-info-wrap>div.content-wrap>div.assets-item-wrap>span.isVideo::after {
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
  background-image: url('./../../../assets/play.png');
}

.state-info-wrap>div.content-wrap>div.time-read-delete-wrap {
  margin-top: 0.8rem;
  color: #8b7caf;
}

.state-info-wrap>div.content-wrap>div.time-read-delete-wrap>span {
  position: relative;
  display: inline-block;
}

.state-info-wrap>div.content-wrap>div.time-read-delete-wrap>span:nth-of-type(1) {
  margin-right: 0.4rem;
}

.state-info-wrap>div.content-wrap>div.time-read-delete-wrap>span:nth-of-type(1)::after {
  content: '';
  position: absolute;
  top: 0.4rem;
  right: -0.6rem;
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background: #8b7caf;
}

.state-info-wrap>div.content-wrap>div.time-read-delete-wrap>span:nth-of-type(2) {
  margin-left: 0.4rem;
}

.state-info-wrap>div.content-wrap>div.time-read-delete-wrap>span:nth-of-type(3) {
  margin-left: 0.8rem;
  color: #b8a6e3;
  font-size: 0.8rem;
}

.comment-wrap {
  position: relative;
  background: #2c1f4a;
  margin-top: 0.6rem;
}

.comment-wrap>div.support-users-wrap {
  position: relative;
  padding: 0.8rem 0.8rem 0.4rem 0.2rem;
}

.comment-wrap>div.support-users-wrap>div.support-count-wrap {
  position: relative;
  width: calc(5rem - 0.8rem);
  height: 2.6rem;
  text-align: center;
}

.comment-wrap>div.support-users-wrap>div.support-count-wrap>span {
  position: relative;
}

.comment-wrap>div.support-users-wrap>div.support-count-wrap>span:nth-of-type(1) {
  display: block;
  width: 100%;
  text-align: center;
  white-space: nowrap;
}

.comment-wrap>div.support-users-wrap>div.support-count-wrap>span:nth-of-type(2) {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 0.2rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-image: url('../../../assets/icon-support.png');
}

.comment-wrap>div.support-users-wrap>div.support-user-item-wrap {
  position: absolute;
  top: 0.8rem;
  left: 5rem;
  width: calc(100% - 5rem - 0.8rem);
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: visible;
}

.comment-wrap>div.support-users-wrap>div.support-user-item-wrap>span {
  position: relative;
  display: inline-block;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 2.6rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  flex-shrink: 0;
}

.comment-wrap>div.support-users-wrap>div.support-user-item-wrap>span::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: -0.2rem;
  width: 1rem;
  height: 1rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-image: url('../../../assets/icon-support-2.png');
}

.comment-wrap>div.support-users-wrap>div.support-user-item-wrap>span:nth-of-type(n + 2) {
  margin-left: 0.8rem;
}

.comment-wrap>div.comment-data-wrap {
  position: relative;
  margin-top: 0.4rem;
  padding: 0 0.6rem;
}

.comment-wrap>div.comment-data-wrap>div.comment-title-bar {
  position: relative;
  padding: 0.8rem 0;
  font-size: 0.8rem;
}

.comment-wrap>div.comment-data-wrap>div.comment-title-bar>span:nth-of-type(2) {
  position: relative;
  color: #8b7caf;
  display: inline-block;
  padding-left: 0.9rem;
}

.comment-wrap>div.comment-data-wrap>div.comment-title-bar>span:nth-of-type(2)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.22rem;
  width: 0.8rem;
  height: 0.6rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-image: url('../../../assets/icon-order.png');
}

.comment-wrap>div.comment-data-wrap>div.comment-title-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -0.6rem;
  right: -0.6rem;
  border-top: 1px solid #554a66;
}

.comment-wrap>div.comment-data-wrap>div.comment-title-bar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -0.6rem;
  right: -0.6rem;
  border-bottom: 1px solid #554a66;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap {
  position: relative;
  padding: 1rem 0 1.4rem;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>span.head {
  display: block;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 2.2rem;
  border: 1px solid #bdb9d1;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap {
  position: relative;
  width: calc(100% - 2.9rem);
  margin-left: 2.9rem;
  margin-top: -2.2rem;
  color: #8b7caf;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>span {
  display: block;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>span:nth-of-type(1) {
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: bold;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>span:nth-of-type(3) {
  margin-top: 0.6rem;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>div.comment-reply-wrap {
  margin-top: 0.6rem;
  background: #433564;
  padding: 0.5rem 0.8rem;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>div.comment-reply-wrap>div:nth-of-type(n + 2) {
  border-top: 1px solid #4d4071;
  margin-top: 0.6rem;
  padding-top: 0.6rem;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>div.comment-reply-wrap>div>div {
  margin-bottom: 0.4rem;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>div.comment-reply-wrap>div>div>span:nth-of-type(1) {
  color: #47e160;
  display: inline-block;
  margin-right: 0.4rem;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>div.comment-do-wrap {
  position: absolute;
  top: 0;
  right: 0;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>div.comment-do-wrap>span {
  position: relative;
  display: inline-block;
  height: 1.8rem;
  line-height: 1.8rem;
  vertical-align: top;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>div.comment-do-wrap>span:nth-of-type(1) {
  width: 2.6rem;
  background-repeat: no-repeat;
  background-size: 40% auto;
  background-position: center;
  background-image: url('../../../assets/icon-reply.png');
  margin-right: 0.8rem;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>div.comment-do-wrap>span:nth-of-type(2) {
  /* width: 2.6rem; */
  text-align: left;
  margin-right: 0.1rem;
  padding-left: 1.4rem;
  line-height: 1.9rem;
}

.comment-wrap>div.comment-data-wrap>div.comment-info-wrap>div.comment-content-wrap>div.comment-do-wrap>span:nth-of-type(2)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2.6rem;
  height: 1.8rem;
  background-repeat: no-repeat;
  background-size: 40% auto;
  background-position: left;
  background-image: url('../../../assets/icon-like.png');
}

.comment-input-wrap {
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

.comment-input-wrap>span {
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

.comment-input-wrap>span:nth-of-type(1) {
  width: 2rem;
  height: 2rem;
  right: calc(2.8rem + 0.5rem + 4px);
  background-image: url('./../../../assets/chat-face.png');
}

.comment-input-wrap>span.comment-send-btn {
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
