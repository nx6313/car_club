<template>
  <div>
    <comm-video :full=true :videoInfo="videoInfo"></comm-video>
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
      videoInfo: {}
    }
  },
  created: function () {
    this.videoInfo = {
      src: 'http://l.dachangjr.com/video/2.mp4',
      type: 'video/mp4',
      userHead: '',
      hasAttention: false,
      ifSupport: true
    }
    // this.$http.get('http://www.baidu.com').then(response => {
    //   this.someData = response.body
    // }, response => {
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
