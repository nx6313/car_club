<template>
  <div id="user-info" ref="user-info" @touchend="touchEnd">
    <div class="user-info-wrap" ref="user-info-wrap">
      <div class="user-info-shade" :style="userInfo.headImg ? { 'background-image': 'url(' + userInfo.headImg + ')' } : ''"></div>
      <div class="head-wrap">
        <span class="head" :style="userInfo.headImg ? { 'background-image': 'url(' + userInfo.headImg + ')' } : ''"></span>
        <div class="do-wrap flex-r flex-a">
          <span @click="doAtt(true)" v-if="!hasAttention">+ 关注</span>
          <span @click="doAtt(false)" v-if="hasAttention">已关注</span>
        </div>
      </div>
      <div class="name-wrap">
        <span :class="['nike-sex', userInfo.sex === 0 ? 'sex-lady' : 'sex-sir']" v-html="userInfo.nickName"></span>
        <span class="address">
          <span>{{userInfo.address}}</span>
          <span v-if="userInfo.age">{{userInfo.age}}岁</span>
          <span v-if="userInfo.constellation">{{userInfo.constellation}}</span>
        </span>
      </div>
      <div class="intro-wrap">
        <p v-if="userInfo.carType === ''">座驾：未填写</p>
        <p v-if="userInfo.carType !== ''">座驾：{{userInfo.carType}}</p>
        <p v-if="userInfo.intro !== ''">{{userInfo.intro}}</p>
      </div>
      <div class="user-info-footer flex-r flex-b">
        <div>
          <span>{{userInfo.praiseCount}}</span>&nbsp;获赞
        </div>
        <div>
          <span>{{userInfo.attentionCount}}</span>&nbsp;关注
        </div>
        <div>
          <span>{{userInfo.fansCount}}</span>&nbsp;粉丝
        </div>
      </div>
    </div>
    <div class="video-tabs flex-r flex-b" ref="video-tabs">
      <span class="tab-item selected" v-on:click="toPage('userinfo-child-video', $event.target)">视频 {{videoInfo.videoCount}}</span>
      <span class="tab-item" v-on:click="toPage('userinfo-child-state', $event.target)">动态 {{videoInfo.stateCount}}</span>
    </div>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view id="me-child-router" ref="me-child-router"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'child-user-info',
  data () {
    return {
      currentChildPage: null,
      lookUserId: null,
      hasAttention: false,
      userInfo: {
        type: {
          headImg: String,
          nickName: String,
          sex: Number,
          address: String,
          age: Number,
          constellation: String,
          carType: String,
          intro: String,
          praiseCount: Number,
          attentionCount: Number,
          fansCount: Number
        },
        default: {}
      },
      videoInfo: {
        type: {
          videoCount: Number,
          stateCount: Number
        },
        default: {}
      }
    }
  },
  methods: {
    touchEnd () {
      var userInfo = this.$refs['user-info']
      if (userInfo.scrollTop > userInfo.scrollHeight - userInfo.clientHeight - 30) {
        var currentRouterPath = this.$router.currentRoute.path
        if (currentRouterPath === '/user-info' || currentRouterPath === '/user-info/' || currentRouterPath === '/user-info/child-video') {
          this.$root.eventHub.$emit('videoDataNext')
        } else if (currentRouterPath === '/user-info/child-state') {
          this.$root.eventHub.$emit('stateDataNext')
        }
      }
    },
    toPage: function (pageTo, selectElem) {
      this.$router.replace({
        name: pageTo
      })
      var tabs = this.$refs['video-tabs'].getElementsByTagName('span')
      for (var t = 0; t < tabs.length; t++) {
        tabs[t].classList.remove('selected')
      }
      selectElem.classList.add('selected')
    },
    doAtt (doAttFlag) {
      if (doAttFlag) {
        this.$loading('关注...')
        this.$comfun.http_get(this, this.$moment.urls.attention + '?id=' + this.$moment.wxUserInfo.accountId + '&accountId=' + this.lookUserId).then((response) => {
          if (response.body.code === '0000' && response.body.success === true) {
            this.$toast('关注用户成功')
            this.hasAttention = !this.hasAttention
          } else {
            this.$toast('关注用户失败')
          }
        })
      } else {
        this.$loading('取消关注...')
        this.$comfun.http_get(this, this.$moment.urls.attention + '?id=' + this.$moment.wxUserInfo.accountId + '&accountId=' + this.lookUserId).then((response) => {
          if (response.body.code === '0000' && response.body.success === true) {
            this.$toast('取消用户关注成功')
            this.hasAttention = !this.hasAttention
          } else {
            this.$toast('取消用户关注失败')
          }
        })
      }
    }
  },
  activated () {
    this.lookUserId = this.$moment.lookUserInfo.userId
    this.hasAttention = this.$moment.lookUserInfo.hasAttention

    var currentRouterPath = this.$router.currentRoute.path
    // if (currentRouterPath === '/user-info' || currentRouterPath === '/user-info/') {
    //   setTimeout(() => {
    //     this.toPage('userinfo-child-video', this.$refs['video-tabs'].getElementsByClassName('selected')[0])
    //   }, 10)
    // }

    var tabElems = this.$refs['video-tabs'].getElementsByClassName('tab-item')
    for (var t = 0; t < tabElems.length; t++) {
      tabElems[t].classList.remove('selected')
    }
    if (currentRouterPath === '/user-info' || currentRouterPath === '/user-info/' || currentRouterPath === '/user-info/child-video') {
      tabElems[0].classList.add('selected')
    } else if (currentRouterPath === '/user-info/child-state') {
      tabElems[1].classList.add('selected')
    }

    this.userInfo = {
      headImg: '',
      nickName: '',
      sex: '',
      address: '',
      age: null,
      constellation: '',
      carType: '',
      intro: '',
      praiseCount: 0,
      attentionCount: 0,
      fansCount: 0
    }
    this.$loading('加载用户信息中...')
    this.$comfun.http_get(this, this.$moment.urls.get_user_info_by_id + '?id=' + this.lookUserId).then((response) => {
      if (response.body.code === '0000' && response.body.success === true) {
        var address = ''
        if (response.body.data.province && response.body.data.city) {
          address = response.body.data.province + '，' + response.body.data.city
        } else if (response.body.data.province) {
          address = response.body.data.province
        } else if (response.body.data.city) {
          address = response.body.data.city
        }
        this.userInfo = {
          headImg: response.body.data.headimg,
          nickName: response.body.data.nickName,
          sex: response.body.data.sex,
          address: address,
          age: null,
          constellation: response.body.data.constellation,
          carType: response.body.data.carList,
          intro: response.body.data.signature,
          praiseCount: 0,
          attentionCount: 0,
          fansCount: 0
        }
      } else {
        this.$toast('获取用户信息失败')
      }
    })
    this.videoInfo = {
      videoCount: 0,
      stateCount: 0
    }
    if (this.lookUserId !== null) {
      this.$comfun.http_get(this, this.$moment.urls.heatInfo + '?accountId=' + this.lookUserId).then((response) => {
        if (response.body.code === '0000' && response.body.success === true) {
          this.userInfo.praiseCount = response.body.data.praiseNum
          this.userInfo.attentionCount = response.body.data.focusNum
          this.userInfo.fansCount = response.body.data.fansNum
        }
      })
      this.$comfun.http_get(this, this.$moment.urls.getnum + '?accountId=' + this.lookUserId).then((response) => {
        if (response.body.code === '0000' && response.body.success === true) {
          this.videoInfo.videoCount = response.body.data.videoNum
          this.videoInfo.stateCount = response.body.data.newsNum
        }
      })
    }
  }
}
</script>

<style scoped>
#content-wrap {
  height: 100vh;
  z-index: 99;
  background: rgb(30, 20, 54);
}

.user-info-wrap {
  position: relative;
  overflow: hidden;
}

.user-info-wrap>div.user-info-shade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-filter: blur(6px);
  -moz-filter: blur(6px);
  -o-filter: blur(6px);
  -ms-filter: blur(6px);
  filter: blur(6px);
  background-repeat: repeat-x;
  background-position: top center;
  background-size: auto 100%;
  opacity: .2;
}

.head-wrap {
  position: relative;
  padding: 18px 18px 0 18px;
}

.head-wrap>span.head {
  display: inline-block;
  width: 64px;
  height: 64px;
  border-radius: 64px;
  border: 1px solid rgba(223, 209, 250, 0.521);
  background-color: #ffffff;
  background-repeat: repeat-x;
  background-position: center;
  background-size: auto 100%;
  background-image: url('./../../../assets/add.png');
}

.head-wrap>div.do-wrap {
  position: absolute;
  top: 18px;
  bottom: 0;
  right: 20px;
  margin: auto 0;
}

.head-wrap>div.do-wrap>span {
  height: 26px;
  line-height: 26px;
  padding: 0 10px;
  background-color: rgba(134, 125, 153, 0.8);
  border-radius: 2px;
}

.name-wrap {
  position: relative;
  margin-top: 16px;
  padding: 0 18px;
}

.name-wrap>span.nike-sex {
  position: relative;
  display: inline-block;
  font-size: 1.4rem;
  color: #ffffff;
}

.name-wrap>span.nike-sex::after {
  content: '';
  position: absolute;
  top: 2px;
  bottom: 0;
  right: -22px;
  margin: auto 0;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
}

.name-wrap>span.sex-lady::after {
  background-image: url('./../../../assets/sex-lady.png');
}

.name-wrap>span.sex-sir::after {
  background-image: url('./../../../assets/sex-sir.png');
}

.name-wrap>span.address {
  position: relative;
  display: block;
  font-size: 0.94rem;
  margin-top: 16px;
  color: #bfb3dc;
}

.name-wrap>span.address>span {
  position: relative;
  display: inline-block;
  margin: auto 0;
}

.name-wrap>span.address>span:nth-of-type(2) {
  background: #47e160;
  color: #ffffff;
  margin-left: 18px;
  padding: 2px 2px 2px 6px;
  border-radius: 3px 0px 0px 3px;
}

.name-wrap>span.address>span:nth-of-type(2)::after {
  content: '';
  position: absolute;
  top: 0;
  right: -6px;
  background: #47e160;
  width: 30px;
  height: 100%;
  transform: skewX(160deg);
  z-index: -1;
  border-radius: 3px;
}

.name-wrap>span.address>span:nth-of-type(3) {
  background: #21affd;
  color: #ffffff;
  margin-left: 13px;
  padding: 2px 6px 2px 2px;
  border-radius: 0px 3px 3px 0px;
}

.name-wrap>span.address>span:nth-of-type(3)::before {
  content: '';
  position: absolute;
  top: 0;
  left: -6px;
  background: #21affd;
  width: 30px;
  height: 100%;
  transform: skewX(160deg);
  z-index: -1;
  border-radius: 3px;
}

.intro-wrap {
  position: relative;
  margin-top: 20px;
  padding: 8px 18px 10px 18px;
  color: #8b7caf;
  font-size: 0.9rem;
}

.intro-wrap::after {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background-color: rgba(113, 95, 145, 0.521);
}

.user-info-footer {
  padding: 2px 18px 12px 18px;
  font-size: 0.9rem;
  color: #8b7caf;
}

.user-info-footer span {
  color: #ffffff;
  font-size: 1rem;
}

.video-tabs>span {
  display: inline-block;
  width: 50%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  font-size: 1rem;
  background-color: #201a2e;
}

.video-tabs>span.selected {
  background-color: #ff003b;
}

#me-child-router {
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
