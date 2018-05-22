<template>
  <div>
    <comm-video :full=true :videoInfoList="videoInfoList"></comm-video>
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
      videoInfoList: []
    }
  },
  created: function () {
    this.videoInfoList = [
      {
        src: 'http://l.dachangjr.com/video/2.mp4',
        type: 'video/mp4',
        userHead: '',
        hasAttention: false,
        ifSupport: true,
        supportCount: 0,
        commentCount: 0
      },
      {
        src: 'http://l.dachangjr.com/video/3.mp4',
        type: 'video/mp4',
        userHead: '',
        hasAttention: false,
        ifSupport: true,
        supportCount: 0,
        commentCount: 0
      },
      {
        src: 'http://l.dachangjr.com/video/4.mp4',
        type: 'video/mp4',
        userHead: '',
        hasAttention: false,
        ifSupport: true,
        supportCount: 0,
        commentCount: 0
      },
      {
        src: 'http://l.dachangjr.com/video/5.mp4',
        type: 'video/mp4',
        userHead: '',
        hasAttention: false,
        ifSupport: true,
        supportCount: 0,
        commentCount: 0
      }
    ]
    // this.$http.get('http://www.baidu.com').then(response => {
    //   this.someData = response.body
    // }, response => {
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-wrap {
  overflow: hidden;
}
</style>
