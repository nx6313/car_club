<template>
  <div class="stateChild">
    <span v-for="(stateImg, index) in stateImgList" :key="index" :style="stateImg ? { 'background-image':'url(' + stateImg.stateImg + ' ) ' } : ''" ></span>
  </div>
</template>

<script>
export default {
  name: 'child-state',
  data () {
    return {
      stateImgList: [
        { stateImg: 'http://img.zcool.cn/community/01f9df56fccb6c32f875a944518d4c.JPG' },
        { stateImg: 'http://img.zcool.cn/community/01f9df56fccb6c32f875a944518d4c.JPG' },
        { stateImg: 'http://img.zcool.cn/community/01f9df56fccb6c32f875a944518d4c.JPG' },
        { stateImg: 'http://img.zcool.cn/community/01f9df56fccb6c32f875a944518d4c.JPG' }
      ]
    }
  }
}
</script>

<style scoped>
.stateChild{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}
.stateChild>span{
  display: inline-block;
  width: calc(100% / 3);
  height: 0;
  padding-bottom: calc(100% / 3 + 50px);
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
}
</style>
