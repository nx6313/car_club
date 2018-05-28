<template>
  <div>
    <comm-video :full=true :videoInfo="videoInfo" @close-comment-pop="closeCommentPop" @cut-video-page="cutVideoPage" @vieo-to-ref="vieoRef" @look-comment="lookComment"></comm-video>
    <div class="comment-pop-wrap" ref="comment-pop-wrap">
      <span class="pop-close-btn ripple" @click="hideCommentPop"></span>
      <span class="comment-title" v-if="videoComments.length > 0">{{videoComments.length}}条评论</span>
      <div class="comment-item-wrap" v-if="videoComments.length > 0">
        <div class="comment-item" v-for="(comment, index) in videoComments" :key="index">
          <span class="head" :style="comment.head ? { 'background-image': 'url(' + comment.head + ')' } : ''"></span>
          <span :class="['like-btn', 'ripple', comment.isLike ? 'comment-like-btn' : '']"></span>
          <div class="content-wrap">
            <div>{{comment.name}}</div>
            <div>{{comment.content}}</div>
            <div>{{comment.time}}</div>
            <div class="replys-wrap">
              <div class="reply-item-wrap" v-for="(reply, index) in comment.replys" :key="index">
                <div>
                  <span class="reply-user-name">{{reply.name}}</span>
                  <span class="reply-is-author">作者</span>
                  <span>回复&nbsp;&nbsp;{{comment.name}}</span>
                </div>
                <div>{{reply.content}}</div>
                <div>{{reply.time}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-input-wrap">
        <textarea placeholder="请输入评论内容" ref="comment-input-area" v-model="commentContentInput"/>
        <span class="ripple"></span>
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
      currentVideoUserId: null,
      commentContentInput: '',
      videoInfo: {},
      videoComments: []
    }
  },
  created: function () {
    this.videoInfo = {
      userId: '1',
      src: 'http://l.dachangjr.com/video/2.mp4',
      type: 'video/mp4',
      userHead: '',
      hasAttention: false,
      ifSupport: true,
      supportCount: 0,
      commentCount: 0
    }
    // this.$http.get('http://www.baidu.com').then(response => {
    //   this.someData = response.body
    // }, response => {
    // })
  },
  methods: {
    cutVideoPage (videoInfo) {
      console.log(videoInfo)
      // this.currentVideoUserId = videoUserId
    },
    vieoRef (finishFn) {
      setTimeout(() => {
        finishFn()
      }, 3000)
    },
    closeCommentPop () {
      if (this.$refs['comment-pop-wrap'].classList.contains('open')) {
        this.$refs['comment-pop-wrap'].style.opacity = 0
        this.$refs['comment-pop-wrap'].style.transform = 'translateY(110%)'
      }
    },
    hideCommentPop () {
      this.$refs['comment-pop-wrap'].classList.remove('open')
      this.$refs['comment-pop-wrap'].classList.add('close')
      this.$refs['comment-pop-wrap'].style.opacity = 0
      this.$refs['comment-pop-wrap'].style.transform = 'translateY(110%)'
    },
    lookComment (videoInfo) {
      this.videoComments = [
        {
          head: 'http://img2.a0bi.com/upload/ttq/20160804/1470271218794.jpg',
          name: '令狐大侠',
          content: '我们在设计任何作品时，首先考虑的是应用的尺寸。如iPhone8的分辨率',
          time: '40分钟前',
          isLike: false,
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
          head: 'http://img2.a0bi.com/upload/ttq/20160804/1470271218794.jpg',
          name: '令狐大侠',
          content: '我们在设计任何作品时，首先考虑的是应用的尺寸。如iPhone8的分辨率',
          time: '40分钟前',
          isLike: true,
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
      this.$refs['comment-pop-wrap'].classList.remove('close')
      this.$refs['comment-pop-wrap'].classList.add('open')
      this.$refs['comment-pop-wrap'].style.opacity = 1
      this.$refs['comment-pop-wrap'].style.transform = 'translateY(0)'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-wrap {
  overflow: hidden;
}

div.comment-pop-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(30, 20, 54, 0.98);
  width: 100%;
  height: 60%;
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
  background-size: 100% auto;
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

div.comment-pop-wrap>div.comment-input-wrap>textarea {
  display: block;
  width: calc(100% - 3rem - 16px);
  height: calc(100% - 16px);
  border: none;
  outline: none;
  padding: 8px 3rem 8px 16px;
  color: #ffffff;
  font-size: 1rem;
  resize: none;
  background: #110c1d;
}

div.comment-pop-wrap>div.comment-input-wrap>textarea::-webkit-input-placeholder { /* WebKit browsers */
  color: #685d82;
}
div.comment-pop-wrap>div.comment-input-wrap>textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #685d82;
}
div.comment-pop-wrap>div.comment-input-wrap>textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #685d82;
}
div.comment-pop-wrap>div.comment-input-wrap>textarea:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #685d82;
}

div.comment-pop-wrap>div.comment-input-wrap>span {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 3rem;
  display: block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40% 40%;
  background-image: url('./../../assets/aite.png');
}
</style>
