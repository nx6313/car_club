<template>
  <div>
    <comm-video :full=true :src="curVideo" :userHead="userHead"></comm-video>
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
      curVideo: 'http://l.dachangjr.com/video/4.mp4',
      userHead: ''
    }
  },
  created: function () {
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
