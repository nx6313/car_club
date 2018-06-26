<template>
  <div>
    <div class="list-item" v-for="(item, index) in dataList" :key="index">
      <span class="user-head" :style="item.head ? { 'background-image': 'url(' + item.head + ')' } : ''"></span>
      <div :class="['comment-wrap', item.production.img || item.production.cover ? 'has-production' : '']">
        <div>
          <span>{{item.name}}</span>
          <span>赞了你的作品</span>
        </div>
        <div>{{item.time}}</div>
      </div>
      <span :class="['about-production', item.newType === '3' ? 'about-production-is-video' : '']" v-if="item.production.img || item.production.cover" :style="(item.production.img || item.production.cover) ? { 'background-image': 'url(' + (item.production.img || item.production.cover) + ')' } : ''"></span>
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
  activated () {
    this.$loading('数据加载中...')
    this.$comfun.http_get(this, this.$moment.urls.getPraiseinfo + '?accountId=' + this.$moment.wxUserInfo.accountId).then((response) => {
      if (response.body.code === '0000' && response.body.success === true) {
        this.dataList = []
        for (let a = 0; a < response.body.data.dataList.length; a++) {
          this.dataList.push({
            head: response.body.data.dataList[a].userHeadimg,
            name: response.body.data.dataList[a].username,
            time: this.$comfun.formatDate(new Date(response.body.data.dataList[a].createTime.replace(/-/g, '/')), 'M-d'),
            newType: response.body.data.dataList[a].newtype,
            production: {
              img: response.body.data.dataList[a].newtype === '2' ? response.body.data.dataList[a].newFace : '',
              cover: response.body.data.dataList[a].newtype === '3' ? response.body.data.dataList[a].newFace : '',
              url: response.body.data.dataList[a].videopath
            }
          })
        }
      } else {
        this.$toast('数据获取失败')
      }
    })
  }
}
</script>

<style scoped>
#content-wrap {
    height: 100vh;
    z-index: 99;
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

.list-item>div.has-production {
  width: calc(100% - 4rem - 0.6rem - 0.2rem);
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

.list-item>span.about-production-is-video::after {
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
  background-color: rgba(0, 0, 0, .4);
}

.no-more-data {
  display: block;
  text-align: center;
  color: rgba(255, 255, 255, .4);
  margin-top: 1.4rem;
  margin-bottom: 1.6rem;
}
</style>
