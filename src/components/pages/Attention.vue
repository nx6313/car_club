<template>
  <div>
    <comm-note v-if="noteList.length > 0" v-for="note in noteList" :key="note.id" :note="note"></comm-note>
    <div class="data-empty" v-if="noteList.length == 0"></div>
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
      noteList: []
    }
  },
  activated () {
    this.noteList = this.$moment.attention_page_data_list
    this.$comfun.http_post(this, this.$moment.urls.get_new_info, {
      // accountId: this.$moment.wxUserInfo.accountId
    }).then((response) => {
      if (response.body.code === '0000' && response.body.success === true) {
        if (response.body.data.dataList.length > 0 && (this.$moment.attention_page_data_list.length === 0 || this.$moment.attention_page_data_list.length !== response.body.data.dataList.length)) {
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
                    resouce: attentionData.fileList[f].fileAddress
                  })
                }
              }
            }
            this.noteList.push({
              id: attentionData.id,
              uttererHead: attentionData.userHeadimg,
              uttererNickName: attentionData.username,
              uttererTime: attentionData.creationDate,
              uttererContent: attentionData.content,
              imgsOrVideos: imgsOrVideos,
              ifLike: false,
              likeMans: [ '令狐大侠', '刘德华', '张学友', '贾斯汀', '成龙', '鹿晗', '黄渤', '黄磊', '孙红雷', '谢逊', '张三丰' ],
              comments: [ '令狐冲：这里是测试的评论测试是测试的评论测试是测试的评论测试的评论', 'remmen1025：这里是测试的评论测试的评论', '张学友：这里是测试的评论测试的评论' ]
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
</style>
