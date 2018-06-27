<template>
  <div class="note-item">
    <div class="head-name-wrap">
      <span class="head" :style="note.uttererHead ? { 'background-image': 'url(' + note.uttererHead + ')' } : ''"></span>
      <div class="nike-name-time flex-col flex-b">
        <span>{{note.uttererNickName}}</span>
        <span>{{note.uttererTime | dateToCur(this, 2 * 24 * 60 * 60 * 1000)}}</span>
      </div>
    </div>
    <div class="content-wrap">
      <span ref="note_html_content" :style="isOnContentFilter ? { 'max-height': noteContentMaxHeight + 'px' } : { 'max-height': 'none' }" v-html="note.uttererContent"></span>
      <span v-if="noteContentHasMore && isOnContentFilter" @click="toggleAllContent">全文</span>
      <span v-if="noteContentHasMore && !isOnContentFilter" @click="toggleAllContent">收起</span>
    </div>
    <div class="imgs-video-wrap" v-if="note.imgsOrVideos.length > 0">
      <span v-for="imgvideo in note.imgsOrVideos" :key="imgvideo.id" :style="(imgvideo.img || imgvideo.video) ? { 'background-image': 'url(' + (imgvideo.img || imgvideo.video) + ')' } : ''" :class="imgvideo.video ? (['isVideo', imgvideo.width > imgvideo.height ? 'vertical' : '']) : ''"></span>
    </div>
    <div class="like-wrap" :style="note.imgsOrVideos.length > 0 ? { 'margin-top': '10px' } : { 'margin-top': '0px' }">
      <div class="like-icon-btn-wrap">
        <span :class="note.ifLike ? 'hasLike' : ''" @click="support"></span>
        <span @click="toComment"></span>
        <span v-show="false"></span>
      </div>
      <div class="like-tip-wrap">
        <span>{{note.likeMans.length}}个点赞</span>
        <span>{{note.likeMans | arrToStr(4, 'username')}}</span>
      </div>
    </div>
    <div class="comments-wrap" v-if="note.comments.length > 0">
      <span v-for="(comment, index) in note.comments" :key="index" v-if="index < 2 || !canToggleComment" v-html="comment"></span>
      <span class="toggleAllComment" v-if="note.comments.length > 2 && canToggleComment" @click="toggleAllComment">查看全部评论</span>
      <span class="toggleAllComment" v-if="note.comments.length > 2 && !canToggleComment" @click="toggleAllComment">显示部分评论</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comm-note',
  props: {
    note: { type: Object, default: function () { return {} } }
  },
  data () {
    return {
      isOnContentFilter: true,
      canToggleComment: true,
      noteContentHasMore: false,
      noteContentMaxHeight: 70
    }
  },
  filters: {
    dateToCur (value, context, maxDiff) {
      let maxDiffVal = maxDiff === undefined ? 0 : maxDiff
      let date = new Date(value.replace(/-/g, '/')).getTime()
      let cur = Date.now()
      let diff = cur - date
      if (maxDiffVal > 0) {
        if (diff > maxDiffVal) {
          return context.$comfun.formatDate(new Date(value.replace(/-/g, '/')), 'yy-MM-dd hh:mm:ss')
        } else {
          return context.$comfun.formatDiffMilliseconds(diff) + ' 前'
        }
      } else {
        return context.$comfun.formatDate(new Date(value.replace(/-/g, '/')), 'yy-MM-dd hh:mm:ss')
      }
    },
    contentMore (value, max, isOn) {
      if (isOn && value.length > max) {
        return value.substr(0, max) + ' ...'
      }
      return value
    },
    arrToStr (value, showCount, key) {
      var showStr = ''
      var index = 0
      for (var a = 0; a < value.length; a++) {
        if (a < showCount) {
          showStr += key !== undefined ? value[a][key] : value[a]
          index++
        }
        if (a < showCount - 1 && a < value.length - 1) {
          showStr += '，'
        }
      }
      if (index < value.length) {
        showStr += ' ...'
      }
      return showStr
    }
  },
  mounted () {
    this.noteContentHasMore = this.$refs.note_html_content.scrollHeight > this.noteContentMaxHeight
  },
  methods: {
    toggleAllContent () {
      this.isOnContentFilter = !this.isOnContentFilter
    },
    toggleAllComment () {
      this.canToggleComment = !this.canToggleComment
    },
    support () {
      if (!this.note.ifLike) {
        this.$loading('点赞中...')
        this.$comfun.http_post(this, this.$moment.urls.praise + '?id=' + this.note.id, {
          accountId: this.$moment.wxUserInfo.accountId
        }).then((response) => {
          if (response.body.code === '0000' && response.body.success === true) {
            this.$toast('点赞成功')
            this.note.ifLike = !this.note.ifLike
            this.note.likeMans.unshift({
              accountId: this.$moment.wxUserInfo.accountId,
              time: this.$comfun.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
              userHeadimg: this.$moment.wxUserInfo.headimgurl,
              username: this.$moment.wxUserInfo.nickname
            })
          } else {
            this.$toast('点赞失败')
          }
        })
      } else {
        this.$loading('取消点赞中...')
        this.$comfun.http_post(this, this.$moment.urls.praise + '?id=' + this.note.id, {
          accountId: this.$moment.wxUserInfo.accountId
        }).then((response) => {
          if (response.body.code === '0000' && response.body.success === true) {
            this.$toast('点赞取消')
            this.note.ifLike = !this.note.ifLike
            let inLikeMansIndex = -1
            for (let l = 0; l < this.note.likeMans.length; l++) {
              if (this.note.likeMans[l].accountId === this.$moment.wxUserInfo.accountId) {
                inLikeMansIndex = l
                break
              }
            }
            if (inLikeMansIndex >= 0) {
              this.note.likeMans.splice(inLikeMansIndex, 1)
            }
          } else {
            this.$toast('取消点赞失败')
          }
        })
      }
    },
    toComment () {
      this.$emit('to-comment', this.note.id, this.note.accountId)
    }
  }
}
</script>

<style scoped>
.note-item {
  padding: 14px 10px;
  background: #2c1f4a;
}

.note-item:nth-of-type(n + 2) {
  margin-top: 8px;
}

.note-item>div.head-name-wrap {
  position: relative;
}

.note-item>div.head-name-wrap>span.head {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
}

.note-item>div.head-name-wrap>div.nike-name-time {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 52px;
  right: 0;
  padding: 4px 0 8px;
}

.note-item>div.head-name-wrap>div.nike-name-time>span:nth-of-type(1) {
  font-size: 0.8rem;
  font-weight: bold;
}

.note-item>div.head-name-wrap>div.nike-name-time>span:nth-of-type(2) {
  font-size: 0.6rem;
  color: rgb(147, 133, 182);
}

.note-item>div.content-wrap {
  position: relative;
  padding: 20px 0 15px;
}

.note-item>div.content-wrap>span:nth-of-type(1) {
  display: block;
  line-height: 23px;
  color: #d0c8e1;
  overflow: hidden;
  /* text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; */
}

.note-item>div.content-wrap>span:nth-of-type(2) {
  display: inline-block;
  padding: 8px 10px 0 0;
  margin-top: 2px;
  color: #ffffff;
}

.note-item>div.imgs-video-wrap {
  position: relative;
  width: 82%;
  font-size: 0;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.note-item>div.imgs-video-wrap>span {
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

.note-item>div.imgs-video-wrap>span.vertical {
  background-size: auto 100%;
}

.note-item>div.imgs-video-wrap>span.isVideo::before {
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

.note-item>div.imgs-video-wrap>span.isVideo::after {
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

.note-item>div.like-wrap {
  position: relative;
  padding: 4px 0;
}

.note-item>div.like-wrap>div.like-icon-btn-wrap {
  position: relative;
  padding-bottom: 9px;
}

.note-item>div.like-wrap>div.like-icon-btn-wrap::after {
  content: '';
  position: absolute;
  left: -10px;
  right: -10px;
  bottom: 0;
  height: 1px;
  background: #33284c;
}

.note-item>div.like-wrap>div.like-icon-btn-wrap>span {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  margin-right: 24px;
}

.note-item>div.like-wrap>div.like-icon-btn-wrap>span:nth-of-type(1) {
  background-image: url('./../../assets/note-like-normal.png');
}

.note-item>div.like-wrap>div.like-icon-btn-wrap>span:nth-of-type(2) {
  background-image: url('./../../assets/note-comment.png');
}

.note-item>div.like-wrap>div.like-icon-btn-wrap>span:nth-of-type(3) {
  background-image: url('./../../assets/note-share.png');
}

.note-item>div.like-wrap>div.like-icon-btn-wrap>span.hasLike {
  background-image: url('./../../assets/note-like-focus.png');
}

.note-item>div.like-wrap>div.like-tip-wrap {
  position: relative;
  padding-top: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.note-item>div.like-wrap>div.like-tip-wrap>span:nth-of-type(1) {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: bold;
  color: #ffffff;
}

.note-item>div.like-wrap>div.like-tip-wrap>span:nth-of-type(2) {
  display: inline-block;
  color: #d0c8e1;
  margin-left: 12px;
}

.note-item>div.comments-wrap {
  position: relative;
  line-height: 23px;
  padding-top: 12px;
  color: #d0c8e1;
}

.note-item>div.comments-wrap>span {
  position: relative;
  display: block;
}

.note-item>div.comments-wrap>span.toggleAllComment {
  display: inline-block;
  padding: 8px 10px 0 0;
  margin-top: 2px;
  color: #685d82;
}
</style>
