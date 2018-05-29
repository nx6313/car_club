<template>
  <div>
    <div class="state-info-wrap">
      <span class="head" :style="detailData.headImg ? { 'background-image': 'url(' + detailData.headImg + ')' } : ''"></span>
      <div class="content-wrap">
        <span>{{detailData.nikeName}}</span>
        <span v-if="detailData.content">{{detailData.content}}</span>
        <div v-if="detailData.assets.length > 0">
          <span v-for="(asset, index) in detailData.assets" :key="index" :style="(asset.img || asset.video) ? { 'background-image': 'url(' + (asset.img || asset.video) + ')' } : ''"></span>
        </div>
        <div>
          <span>{{detailData.time}}</span>
          <span>{{detailData.readNum}}阅读</span>
          <span class="btn-delete">删除</span>
        </div>
      </div>
    </div>
    <div class="comment-wrap">
      <div v-if="detailData.supports.length > 0">
        <div class="support-count-wrap">
          <span>{{detailData.supports.length}}个赞</span>
          <span></span>
        </div>
        <span v-for="(support, index) in detailData.supports" :key="index" :style="support.head ? { 'background-image': 'url(' + support.head + ')' } : ''"></span>
      </div>
      <div>
        <div class="comment-title-bar">
          <span>{{detailData.comments.length}}全部评论</span>
          <span></span>
        </div>
        <span v-if="detailData.comments.length === 0"></span>
        <div v-if="detailData.comments.length > 0" v-for="(comment, index) in detailData.comments" :key="index">
          <span class="head" :style="comment.head ? { 'background-image': 'url(' + comment.head + ')' } : ''"></span>
          <div class="comment-content-wrap">
            <span>{{comment.nikeName}}</span>
            <span>{{comment.time}}</span>
            <span>{{comment.content}}</span>
            <div v-if="comment.replys.length > 0">
              <div v-for="(reply, index) in comment.replys" :key="index">
                <div>
                  <span>{{reply.name}}</span>
                  <span>回复&nbsp;&nbsp;{{comment.nikeName}}</span>
                </div>
                <span>{{reply.content}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-input-wrap">
      <textarea placeholder="评论....." ref="comment-input-area" v-model="commentContentInput"/>
      <span></span>
      <span class="comment-send-btn ripple" ref="comment-send-btn" @click="commentSend">发送</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'me-state-detail',
  data () {
    return {
      detailData: {},
      commentContentInput: ''
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
        }
      ]
    }
  },
  methods: {
    commentSend () {
      if (!this.commentContentInput.trim()) {
        this.$toast('评论内容不能为空')
        return false
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
  width: calc(100% - 2.2rem);
  margin-left: 2.2rem;
}

.comment-wrap {
  position: relative;
  background: #2c1f4a;
  margin-top: 0.6rem;
}

.comment-input-wrap {
  position: fixed;
  width: 100%;
  height: 3.6rem;
  left: 0;
  bottom: 0;
  background: #2c1f4a;
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
}

.comment-input-wrap>textarea {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.5rem;
  margin: auto 0;
  display: inline-block;
  width: calc(100% - 3.8rem - 20px - 2.2rem - 2px);
  height: calc(2rem - 16px);
  border: none;
  outline: none;
  border-radius: calc(2rem - 16px);
  background-color: #433564;
  padding: 8px 2.2rem 8px 20px;
  color: #ffffff;
  font-size: 1rem;
  resize: none;
}

.comment-input-wrap>textarea::-webkit-input-placeholder { /* WebKit browsers */
  color: #685d82;
}
.comment-input-wrap>textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #685d82;
}
.comment-input-wrap>textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #685d82;
}
.comment-input-wrap>textarea:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #685d82;
}
</style>
