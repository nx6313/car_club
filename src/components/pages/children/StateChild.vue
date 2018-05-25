<template>
  <div class="stateChild">
    <span class="clear" v-for="(attenImg, index) in attentionList" :key="index">
      <span>
        <span class="stateDay">{{attenImg.date}}</span>
        <span class="stateMonth">{{attenImg.month}}月</span>
      </span>
      <span v-for="stateList in attenImg.stateList" :key="stateList.id" @click="toChildPage('/me-state-detail')">
        <span :class="'statePage' + (stateList.attenImgs.length > 4 ? 4 : stateList.attenImgs.length)">
           <span v-for="(img , index) in stateList.attenImgs" :key="index" :style="img ? { 'background-image':'url(' + img + ' ) ' } : ''" ></span>
        </span>
        <span class="stateLast">
          <span class="stateCount">共{{stateList.attenImgs.length}}张</span>
          <span class="stateFont">{{stateList.atteninfo}}</span>
        </span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'child-state',
  data () {
    return {
      attentionList: []
    }
  },
  mounted () {
    this.attentionList = [
      {
        date: '04',
        month: '5',
        stateList: [
          {
            id: 0,
            atteninfo:
              '用8当然不是因为数字吉利，而是因为 8 是偶数，并且8可以被成倍缩小三次以被成倍缩!',
            attenImgs: [
              'http://pic32.photophoto.cn/20140731/0022005246652881_b.jpg',
              'http://img.zcool.cn/community/01f9df56fccb6c32f875a944518d4c.JPG',
              'http://pic32.photophoto.cn/20140731/0022005246652881_b.jpg',
              'http://img3.redocn.com/tupian/20150318/keaichangjinglukongbaipaizihanguochahua_4024842.jpg',
              'http://img3.redocn.com/tupian/20150318/keaichangjinglukongbaipaizihanguochahua_4024842.jpg'
            ]
          },
          {
            id: 1,
            atteninfo:
              '用8当然不是因为数字吉利，而是因为 8 是偶数，并且8可以被成倍缩小三次以被成倍缩!',
            attenImgs: [
              'http://pic32.photophoto.cn/20140731/0022005246652881_b.jpg'
            ]
          }
        ]
      },
      {
        date: '03',
        month: '5',
        stateList: [
          {
            id: 0,
            atteninfo:
              '用8当然不是因为数字吉利，而是因为 8 是偶数，并且8可以被成倍缩小三次以被成倍缩!',
            attenImgs: [
              'http://pic32.photophoto.cn/20140731/0022005246652881_b.jpg',
              'http://img.zcool.cn/community/01f9df56fccb6c32f875a944518d4c.JPG'
            ]
          },
          {
            id: 1,
            atteninfo:
              '用8当然不是因为数字吉利，而是因为 8 是偶数，并且8可以被成倍缩小三次以被成倍缩!',
            attenImgs: [
              'http://pic32.photophoto.cn/20140731/0022005246652881_b.jpg',
              'http://img.zcool.cn/community/01f9df56fccb6c32f875a944518d4c.JPG',
              'http://pic32.photophoto.cn/20140731/0022005246652881_b.jpg'
            ]
          }
        ]
      }
    ]
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
.clear::after {
  display: block;
  clear: both;
  content: "";
}
.stateChild {
  width: 100%;
}
.stateChild > span {
  width: 100%;
  margin: 0 15px;
}
.stateChild > span > span {
  margin: 10px 0 0;
}
.stateChild > span > span:nth-of-type(1) {
  width: 21%;
  height: auto;
  float: left;
  margin-left: 10px;
  margin-top: 1.1rem;
}
.stateChild > span > span > .stateDay {
  font-size: 1.8rem;
  color: #fff;
}
.stateChild > span > span > .stateMonth {
  font-size: 1rem;
  color: #a09ab0;
  margin-left: 5px;
  margin-top: 9px;
}
/* 一张图时的样式 */
.stateChild > span > span > .statePage1 {
  display: inline-block;
  width: 28%;
  height: 0;
  padding-bottom: 28%;
  overflow: hidden;
}
.stateChild > span > span > .statePage1 > span {
  display: inline-block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}
/* 两张图时的样式 */
.stateChild > span > span > .statePage2 {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 28%;
  height: 0;
  padding-bottom: 28%;
  overflow: hidden;
}
.stateChild > span > span > .statePage2 > span {
  display: inline-block;
  width: calc(97% / 2);
  height: 0;
  padding-bottom: calc(97% / 2 + 50px);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}
/* 三张图时的样式 */
.stateChild > span > span > .statePage3 {
  width: 28%;
  height: 0;
  padding-bottom: 28%;
  position: relative;
  overflow: hidden;
}
.stateChild > span > span > .statePage3 > span:nth-of-type(1) {
  display: inline-block;
  width: calc(97% / 2);
  height: 0;
  padding-bottom: calc(97% / 2 + 50px);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.stateChild > span > span > .statePage3 > span:nth-of-type(2) {
  display: inline-block;
  width: calc(97% / 2);
  height: 0;
  padding-bottom: calc(97% / 2);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  right: 0;
}
.stateChild > span > span > .statePage3 > span:nth-of-type(3) {
  display: inline-block;
  width: calc(97% / 2);
  height: 0;
  padding-bottom: calc(97% / 2);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0;
  right: 0;
}
/* 四张图的样式 */
.stateChild > span > span {
  position: relative;
  width: 74%;
  float: right;
  display: flex;
  justify-content: space-around;
}
.stateChild > span > span > .statePage4 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 31%;
  height: 0;
  padding-bottom: 31%;
  overflow: hidden;
}
.stateChild > span > span > .statePage4 > span {
  display: inline-block;
  width: calc(97% / 2);
  height: 0;
  padding-bottom: calc(97% / 2);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  margin-top: 3px;
}
.stateChild > span > span > .statePage4 > span:nth-of-type(1) {
  margin-top: 0;
}
.stateChild > span > span > .statePage4 > span:nth-of-type(2) {
  margin-top: 0;
}
.stateLast {
  position: relative;
  width: 61%;
  display: inline-block;
}
.stateFont {
  width: 98%;
  font-size: 0.8rem;
  color: #d0c8e1;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.stateCount {
  display: block;
  width: 80%;
  height: 1rem;
  overflow: hidden;
  color: #685d82;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
