<template>
  <div>
    <div class="list-item" v-for="(item, index) in dataList" :key="index">
      <span class="user-head" :style="item.head ? { 'background-image': 'url(' + item.head + ')' } : ''"></span>
      <div class="comment-wrap">
        <div>{{item.name}}</div>
        <div>
          <div>
            <span></span>
            <span>{{item.address}}</span>
          </div>
          <div>
            <span></span>
            <span>{{item.carType}}</span>
          </div>
        </div>
      </div>
      <span class="attention-state ripple" v-if="!item.attention" @click="addAttention(item)">+关注</span>
      <span class="attention-state ripple has-attention" v-if="item.attention">已关注</span>
    </div>
    <span class="no-more-data">暂时没有更多了</span>
  </div>
</template>

<script>
export default {
  name: 'message-interest',
  data () {
    return {
      dataList: []
    }
  },
  methods: {
    addAttention (dataItem) {
      this.$loading('加关注中...')
      this.$comfun.http_get(this, this.$moment.urls.attention + '?id=' + this.$moment.wxUserInfo.accountId + '&accountId=' + dataItem.userId).then((response) => {
        if (response.body.code === '0000' && response.body.success === true) {
          this.$toast('关注用户成功')
          dataItem.attention = !dataItem.attention
        } else {
          this.$toast('关注用户失败')
        }
      })
    }
  },
  activated () {
    this.$loading('数据加载中...')
    this.$comfun.http_get(this, this.$moment.urls.interested + '?accountId=' + this.$moment.wxUserInfo.accountId).then((response) => {
      if (response.body.code === '0000' && response.body.success === true) {
        this.dataList = []
        for (let a = 0; a < response.body.data.dataList.length; a++) {
          this.dataList.push({
            userId: response.body.data.dataList[a].accountId,
            head: response.body.data.dataList[a].headimg,
            name: response.body.data.dataList[a].nickName,
            address: response.body.data.dataList[a].city,
            carType: response.body.data.dataList[a].carList,
            attention: response.body.data.dataList[a].isfriend
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

.list-item>div.comment-wrap>div {
  position: relative;
  color: #ffffff;
}

.list-item>div.comment-wrap>div:nth-of-type(2) {
  color: rgba(191, 179, 220, 0.96);
  font-size: 0.6rem;
}

.list-item>div.comment-wrap>div:nth-of-type(2)>div {
  display: inline-block;
}

.list-item>div.comment-wrap>div:nth-of-type(2)>div:nth-of-type(2) {
  margin-left: 0.8rem;
}

.list-item>div.comment-wrap>div:nth-of-type(2)>div:nth-of-type(1)>span:nth-of-type(1) {
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  margin-right: 0.2rem;
  width: 0.7rem;
  height: 0.7rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
  background-image: url('./../../../assets/icon-address.png');
}

.list-item>div.comment-wrap>div:nth-of-type(2)>div:nth-of-type(1)>span:nth-of-type(2) {
  display: inline-block;
  margin-left: 1rem;
}

.list-item>div.comment-wrap>div:nth-of-type(2)>div:nth-of-type(2)>span:nth-of-type(1) {
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  margin-right: 0.2rem;
  width: 0.7rem;
  height: 0.7rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
  background-image: url('./../../../assets/icon-car-type.png');
}

.list-item>div.comment-wrap>div:nth-of-type(2)>div:nth-of-type(2)>span:nth-of-type(2) {
  display: inline-block;
  margin-left: 1rem;
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
  margin-bottom: 1.6rem;
}
</style>
