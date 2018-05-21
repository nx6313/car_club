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
  mounted () {
    this.noteList = [
      {
        id: 0,
        uttererHead: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd',
        uttererNickName: '俱乐部之友爱',
        uttererTime: '2分钟之前',
        uttererContent: '国台办发言人马晓光先生在上次发布会的时候已经明确表示过，解放军军演和空军绕岛飞行，传达的信息是十分清晰和明确的，就是针对“台独”分裂势力及其活动所做',
        imgsOrVideos: [
          {
            id: 0,
            img: 'http://pic.58pic.com/58pic/14/91/93/83M58PICPv5_1024.jpg'
          },
          {
            id: 1,
            video: 'http://img.zcool.cn/community/010f5c586df97ba8012060c8656bf3.jpg@900w_1l_2o_100sh.jpg'
          },
          {
            id: 2,
            img: 'http://img3.redocn.com/tupian/20150318/keaichangjinglukongbaipaizihanguochahua_4024842.jpg'
          },
          {
            id: 3,
            img: 'http://img.zcool.cn/community/01f9df56fccb6c32f875a944518d4c.JPG'
          },
          {
            id: 4,
            img: 'http://pic32.photophoto.cn/20140731/0022005246652881_b.jpg'
          },
          {
            id: 5,
            img: 'http://img.zcool.cn/community/01858e591fe6a6b5b3086ed473c1d0.jpg'
          }
        ],
        ifLike: false,
        likeMans: [ '令狐大侠', '刘德华', '张学友', '贾斯汀', '成龙', '鹿晗', '黄渤', '黄磊', '孙红雷', '谢逊', '张三丰' ],
        comments: [ '令狐冲：这里是测试的评论测试是测试的评论测试是测试的评论测试的评论', 'remmen1025：这里是测试的评论测试的评论', '张学友：这里是测试的评论测试的评论' ]
      },
      {
        id: 1,
        uttererHead: 'http://img01.store.sogou.com/app/a/10010016/04527cba709f67db80087381efeaccfd',
        uttererNickName: '俱乐部之友爱',
        uttererTime: '2分钟之前',
        uttererContent: '国台办发言人马晓光先生在上次发布会的时候已经明确表示过',
        imgsOrVideos: [
          {
            id: 0,
            img: 'http://pic.58pic.com/58pic/14/91/93/83M58PICPv5_1024.jpg'
          }
        ],
        ifLike: false,
        likeMans: [ '令狐大侠', '刘德华', '张学友', '贾斯汀', '成龙', '鹿晗', '黄渤', '黄磊', '孙红雷', '谢逊', '张三丰' ],
        comments: [ '令狐冲：这里是测试的评论测试是测试的评论测试是测试的评论测试的评论', 'remmen1025：这里是测试的评论测试的评论', '张学友：这里是测试的评论测试的评论' ]
      }
    ]
  },
  activated () {
    var contentWrapElem = document.getElementById('content-wrap')
    contentWrapElem.scrollTop = this.$moment.attention_page_scroll_top
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
