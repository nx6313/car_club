<template>
  <div id="about-me" ref="about-me" @touchend="touchEnd">
    <div class="user-info-wrap" ref="user-info-wrap">
      <div class="user-info-shade" :style="userInfo.headImg ? { 'background-image': 'url(' + userInfo.headImg + ')' } : ''"></div>
      <div class="head-wrap">
        <span class="head" :style="userInfo.headImg ? { 'background-image': 'url(' + userInfo.headImg + ')' } : ''"></span>
        <div class="do-wrap flex-r flex-a">
          <span @click="toChildPage('/me-edit-user-info')">编辑资料</span>
          <span><img src="./../../assets/transpond.png"></span>
        </div>
      </div>
      <div class="name-wrap">
        <span :class="['nike-sex', userInfo.sex === 0 ? 'sex-lady' : 'sex-sir']">{{userInfo.nickName}}</span>
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
      <span class="tab-item selected" v-on:click="toPage('/child-video')">视频 {{videoInfo.videoCount}}</span>
      <span class="tab-item" v-on:click="toPage('/child-state')">动态 {{videoInfo.stateCount}}</span>
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
  name: 'page-me',
  data () {
    return {
      currentChildPage: null,
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
      var aboutMe = this.$refs['about-me']
      if (aboutMe.scrollTop > aboutMe.scrollHeight - aboutMe.clientHeight - 30) {
        var currentRouterPath = this.$router.currentRoute.path
        if (currentRouterPath === '/me' || currentRouterPath === '/me/' || currentRouterPath === '/me/child-video') {
          this.$root.eventHub.$emit('videoDataNext')
        } else if (currentRouterPath === '/me/child-state') {
          this.$root.eventHub.$emit('stateDataNext')
        }
      }
    },
    toPage: function (pageTo) {
      this.$router.replace('/me' + pageTo)
      var tabs = event.target.parentElement.getElementsByTagName('span')
      for (var t = 0; t < tabs.length; t++) {
        tabs[t].classList.remove('selected')
      }
      event.target.classList.add('selected')
    },
    toChildPage (childPageRouter, params) {
      var option = params || ''
      this.$router.push(childPageRouter + option)
    }
  },
  activated () {
    var currentRouterPath = this.$router.currentRoute.path
    var tabElems = this.$refs['video-tabs'].getElementsByClassName('tab-item')
    for (var t = 0; t < tabElems.length; t++) {
      tabElems[t].classList.remove('selected')
    }
    if (currentRouterPath === '/me' || currentRouterPath === '/me/' || currentRouterPath === '/me/child-video') {
      tabElems[0].classList.add('selected')
    } else if (currentRouterPath === '/me/child-state') {
      tabElems[1].classList.add('selected')
    }

    var address = ''
    if (this.$moment.wxUserInfo.address) {
      address = this.$moment.wxUserInfo.address
    } else if (this.$moment.wxUserInfo.province && this.$moment.wxUserInfo.city) {
      address = this.$moment.wxUserInfo.province + '，' + this.$moment.wxUserInfo.city
    } else if (this.$moment.wxUserInfo.province) {
      address = this.$moment.wxUserInfo.province
    } else if (this.$moment.wxUserInfo.city) {
      address = this.$moment.wxUserInfo.city
    }
    this.userInfo = {
      headImg: this.$moment.wxUserInfo.headimgurl,
      nickName: this.$moment.wxUserInfo.nickname,
      sex: this.$moment.wxUserInfo.sex,
      address: address,
      age: null,
      constellation: this.$moment.wxUserInfo.constellation,
      carType: this.$moment.wxUserInfo.carType,
      intro: this.$moment.wxUserInfo.intro,
      praiseCount: 0,
      attentionCount: 0,
      fansCount: 0
    }
    this.videoInfo = {
      videoCount: 0,
      stateCount: 0
    }
    if (this.$moment.wxUserInfo.accountId !== '') {
      this.$comfun.http_get(this, this.$moment.urls.heatInfo + '?accountId=' + this.$moment.wxUserInfo.accountId).then((response) => {
        if (response.body.code === '0000' && response.body.success === true) {
          this.userInfo.praiseCount = response.body.data.praiseNum
          this.userInfo.attentionCount = response.body.data.focusNum
          this.userInfo.fansCount = response.body.data.fansNum
        }
      })
      this.$comfun.http_get(this, this.$moment.urls.getnum + '?accountId=' + this.$moment.wxUserInfo.accountId).then((response) => {
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
  background-image: url('./../../assets/add.png');
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

.head-wrap>div.do-wrap>span:nth-of-type(n + 2) {
  margin-left: 6px;
}

.head-wrap>div.do-wrap>span>img {
  position: relative;
  height: 70%;
  vertical-align: middle;
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
  background-image: url('./../../assets/sex-lady.png');
}

.name-wrap>span.sex-sir::after {
  background-image: url('./../../assets/sex-sir.png');
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
