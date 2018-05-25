<template>
  <div class="video-child" >
    <span v-for="(videoImg, index) in videoImgList" :key="index" :style="videoImg ? { 'background-image':'url(' + videoImg.videoImg + ' ) ' } : ''" @click="toChildPage('/me-state-detail')"></span>
  </div>
</template>

<script>
export default {
  name: 'child-video',
  data () {
    return {
      videoImgList: [
        { videoImg: 'http://pic.58pic.com/58pic/14/91/93/83M58PICPv5_1024.jpg' },
        { videoImg: 'http://img.zcool.cn/community/010f5c586df97ba8012060c8656bf3.jpg@900w_1l_2o_100sh.jpg' },
        { videoImg: 'http://pic.58pic.com/58pic/14/91/93/83M58PICPv5_1024.jpg' },
        { videoImg: 'http://pic.58pic.com/58pic/14/91/93/83M58PICPv5_1024.jpg' }
      ]
    }
  },
  methods: {
    toChildPage (childPageRouter, params) {
      var option = params || ''
      this.$router.push(childPageRouter + option)
    }
  }
}
</script>

<style scoped>
.video-child{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}
.video-child>span{
  display: inline-block;
  width: calc(100% / 3);
  height: 0;
  padding-bottom: calc(100% / 3 + 50px);
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
}
</style>
