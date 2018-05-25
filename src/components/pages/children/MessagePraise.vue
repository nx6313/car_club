<template>
  <div>
    <div class="list-item" v-for="(item, index) in dataList" :key="index">
      <span class="user-head" :style="item.head ? { 'background-image': 'url(' + item.head + ')' } : ''"></span>
      <div class="comment-wrap">
        <div>
          <span>{{item.name}}</span>
          <span>赞了你的作品</span>
        </div>
        <div>{{item.time}}</div>
      </div>
      <span class="about-production" :style="item.production.cover ? { 'background-image': 'url(' + item.production.cover + ')' } : ''"></span>
    </div>
    <span class="no-more-data">暂时没有更多了</span>
  </div>
</template>

<script>
export default {
  name: 'message-praise',
  data () {
    return {
      dataList: []
    }
  },
  created () {
    this.dataList = [
      {
        head: 'http://img.zhaogexing.com/touxiang/160414/1-1604140H238-51.jpg',
        name: '@恋东999',
        time: '5-17',
        production: {
          cover: 'http://img.app178.com/tu/201411/g3abx25gqyi.jpg',
          url: ''
        }
      }, {
        head: 'http://img3.duitang.com/uploads/item/201605/20/20160520161456_y5AHJ.jpeg',
        name: '@恋东999',
        time: '5-17',
        production: {
          cover: 'http://pic1.win4000.com/wallpaper/9/58213ac79a12c.jpg',
          url: ''
        }
      }
    ]
  }
}
</script>

<style scoped>
#content-wrap {
    height: 100vh;
    z-index: 9;
    background: rgb(30, 20, 54);
}

.list-item {
  position: relative;
  font-size: 0;
  background: #2c1f4a;
}

.list-item>span.user-head {
  position: absolute;
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  top: 1.2rem;
  left: 0.6rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
}

.list-item>div.comment-wrap {
  position: relative;
  display: inline-block;
  width: calc(100% - 4rem - 4.6rem - 0.6rem - 0.2rem);
  min-height: calc(5.6rem - 1.2rem);
  margin-left: 4rem;
  font-size: 0.7rem;
  padding-top: 1.2rem;
  padding-left: 0.2rem;
  line-height: 1.6rem;
}

.list-item>div.comment-wrap>div {
  position: relative;
  color: #ffffff;
}

.list-item>div.comment-wrap>div:nth-of-type(1)>span:nth-of-type(2) {
  color: #8b7caf;
}

.list-item>div.comment-wrap>div:nth-of-type(2) {
  color: #bfb3dc;
  font-size: 0.6rem;
}

.list-item>span.about-production {
  position: absolute;
  display: inline-block;
  width: 3.9rem;
  height: 3.9rem;
  top: 1rem;
  right: 0.8rem;
  background-color: rgba(118, 88, 151, 0.4);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
}

.list-item>span.about-production::after {
  content: '';
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40% 40%;
  background-image: url('./../../../assets/play.png');
}

.no-more-data {
  display: block;
  text-align: center;
  color: rgba(255, 255, 255, .4);
  margin-top: 1.4rem;
}
</style>
