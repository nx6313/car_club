<template>
  <div>
    <div class="list-item" v-for="(item, index) in dataList" :key="index">
      <span class="user-head" :style="item.head ? { 'background-image': 'url(' + item.head + ')' } : ''"></span>
      <div class="comment-wrap">
        <div>
          <span>{{item.name}}</span>
          <span>关注了你</span>
        </div>
        <div>{{item.time}}</div>
      </div>
      <span class="attention-state ripple" v-if="!item.attention">+关注</span>
      <span class="attention-state ripple has-attention" v-if="item.attention">已关注</span>
    </div>
    <span class="no-more-data">暂时没有更多了</span>
  </div>
</template>

<script>
export default {
  name: 'message-fans',
  data () {
    return {
      dataList: []
    }
  },
  activated () {
    this.$loading('数据加载中...')
    this.$comfun.http_get(this, this.$moment.urls.fans + '?accountId=' + this.$moment.wxUserInfo.accountId).then((response) => {
      if (response.body.code === '0000' && response.body.success === true) {
        this.dataList = []
        for (let f = 0; f < response.body.data.length; f++) {
          this.dataList.push({
            head: response.body.data[f].headimg,
            name: response.body.data[f].nickName,
            time: this.$comfun.formatDate(new Date(response.body.data[f].creationDate), 'M-d'),
            attention: false
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

.list-item>span.attention-state {
  position: absolute;
  display: inline-block;
  top: 2rem;
  right: 0.8rem;
  padding: 0.2rem 0.6rem;
  font-size: 0.7rem;
  border: 1px solid rgba(71, 225, 96, 0.96);
  color: rgba(71, 225, 96, 0.96);
  border-radius: 10rem;
}

.list-item>span.has-attention {
  position: absolute;
  display: inline-block;
  top: 2rem;
  right: 0.8rem;
  padding: calc(0.2rem + 1px) calc(0.6rem + 1px);
  font-size: 0.7rem;
  border: none;
  color: rgba(142, 140, 145, 0.96);
}

.no-more-data {
  display: block;
  text-align: center;
  color: rgba(255, 255, 255, .4);
  margin-top: 1.4rem;
}
</style>
