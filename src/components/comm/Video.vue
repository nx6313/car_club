<template>
  <div id="video" :style="full ? { position: 'fixed' } : { position: 'absolute' }">
    <video autoplay="true" loop="loop">
      <source :src="src" :type="type">
    </video>
    <div :class="['videoDo', full ? 'videoDoFull' : 'videoDoNotFull']">
      <span :style="{ 'background-image': 'url(' + userHead + ')' }">
        <img v-if="!hasAttention" class="attention" src="./../../assets/attention.png">
      </span>
      <span>
        <span>123</span>
      </span>
      <span>
        <span>123</span>
      </span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comm-video',
  props: {
    full: { type: Boolean, default: false },
    src: { type: String, default: '' },
    type: { type: String, default: 'video/mp4' },
    userHead: { type: String, default: '' },
    hasAttention: { type: Boolean, default: false }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

video {
  width: 100%;
  height: 100%;
}

.videoDo {
  position: absolute;
  right: 8px;
}

.videoDoFull {
  bottom: calc(48px + 16px);
}

.videoDoNotFull {
  bottom: 16px;
}

.videoDo>span {
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  margin: 0 auto;
}

.videoDo>span:nth-of-type(1) {
  background-image: url('./../../assets/add.png');
  margin-bottom: 36px;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #ffffff;
}

.videoDo>span:nth-of-type(1)>img.attention {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -10px;
  height: 20px;
}

.videoDo>span:nth-of-type(2) {
  background-image: url('./../../assets/add.png');
  margin-bottom: 30px;
}

.videoDo>span:nth-of-type(2)>span{
  display: inline-block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -15px;
  text-align: center;
  font-weight: bold;
}

.videoDo>span:nth-of-type(3) {
  background-image: url('./../../assets/add.png');
  margin-bottom: 30px;
}

.videoDo>span:nth-of-type(3)>span{
  display: inline-block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -15px;
  text-align: center;
  font-weight: bold;
}

.videoDo>span:nth-of-type(4) {
  background-image: url('./../../assets/add.png');
  margin-bottom: 20px;
}
</style>
