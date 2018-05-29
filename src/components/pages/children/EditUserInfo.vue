<template>
  <div>
    <div class="head-wrap">
      <div class="user-info-shade" :style="userInfo.headImg ? { 'background-image': 'url(' + userInfo.headImg + ')' } : ''"></div>
      <span class="head" :style="userInfo.headImg ? { 'background-image': 'url(' + userInfo.headImg + ')' } : ''"></span>
      <br>
      <span class="name ripple" @click="changeUserHead">更换头像</span>
    </div>
    <div class="edit-item-wrap">
      <div class="edit-item">
        <span>昵称</span>
        <input type="text" placeholder="请输入昵称" v-model="userInfo.nikeName">
      </div>
      <div class="edit-item">
        <span>性别</span>
        <input type="text" placeholder="请输入性别" v-model="userInfo.sex">
      </div>
      <div class="edit-item">
        <span>生日</span>
        <input type="text" placeholder="请输入生日" v-model="userInfo.birthday">
      </div>
      <div class="edit-item">
        <span>座驾</span>
        <input type="text" placeholder="请输入座驾" v-model="userInfo.carType">
      </div>
      <div class="edit-item">
        <span>星座</span>
        <input type="text" placeholder="请输入星座" v-model="userInfo.constellation">
      </div>
      <div class="edit-item">
        <span>手机号</span>
        <input type="text" placeholder="请输入手机号" v-model="userInfo.phoneNum">
      </div>
      <div class="edit-item">
        <span>常驻城市</span>
        <input type="text" placeholder="请输入常驻城市" v-model="userInfo.address">
      </div>
      <div class="edit-item">
        <span>个性签名</span>
        <textarea type="text" placeholder="请填写个性签名" v-model="userInfo.intro"></textarea>
      </div>
    </div>
    <div class="btn-edit-info-wrap">保存</div>
  </div>
</template>

<script>
export default {
  name: 'me-edit-user-info',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    var address = ''
    if (this.$moment.wxUserInfo.province && this.$moment.wxUserInfo.city) {
      address = this.$moment.wxUserInfo.province + '，' + this.$moment.wxUserInfo.city
    } else if (this.$moment.wxUserInfo.province) {
      address = this.$moment.wxUserInfo.province
    } else if (this.$moment.wxUserInfo.city) {
      address = this.$moment.wxUserInfo.city
    }
    this.userInfo = {
      headImg: this.$moment.wxUserInfo.headimgurl,
      nikeName: this.$moment.wxUserInfo.nickname,
      sex: this.$moment.wxUserInfo.sex,
      birthday: '',
      carType: '',
      constellation: '',
      phoneNum: '',
      address: address,
      intro: ''
    }
  },
  methods: {
    changeUserHead () {
      this.$comfun.wxChooseImage(this, 1)
    }
  }
}
</script>

<style scoped>
#content-wrap {
    height: 100vh;
    z-index: 9;
    background: rgb(30, 20, 54);
}

.head-wrap {
  position: relative;
  padding: 2.6rem 0 1.4rem 0;
  text-align: center;
}

.head-wrap>div.user-info-shade {
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

.head-wrap>span.head {
  display: inline-block;
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 4.6rem;
  border: 1px solid #b493df;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
}

.head-wrap>span.name {
  display: inline-block;
  padding: 0.2rem 0.8rem;
  font-size: 0.8rem;
  border: 1px solid rgba(71, 225, 96, 0.96);
  color: rgba(71, 225, 96, 0.96);
  border-radius: 10rem;
  margin-top: 1.2rem;
  font-weight: bold;
}

.edit-item {
  position: relative;
  padding: 0.8rem 0.4rem;
  clear: both;
}

.edit-item:nth-of-type(1) {
  margin-top: 0.4rem;
}

.edit-item:nth-of-type(n + 2)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0.1rem;
  right: 0.1rem;
  height: 1px;
  background: #3c314d;
}

.edit-item>span {
  display: inline-block;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: bold;
  width: 4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
}

.edit-item>input {
  display: inline-block;
  position: relative;
  width: calc(100% - 4.8rem);
  padding: 0.4rem 0.2rem;
  border: none;
  outline: none;
  background: transparent;
  color: #ada2c6;
  text-align: right;
  font-size: 0.8rem;
  vertical-align: middle;
}

.edit-item>textarea {
  display: block;
  position: relative;
  width: calc(100% - 0.4rem);
  height: 4rem;
  padding: 0.4rem 0.2rem;
  border: none;
  outline: none;
  background: #2c1f4a;
  color: #ada2c6;
  font-size: 0.8rem;
  margin-top: 0.6rem;
  resize: none;
}

.edit-item-wrap {
  margin-bottom: 3.8rem;
}

.btn-edit-info-wrap  {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background: #110c1d;
  color: #47e160;
  font-size: 0.9rem;
}

.edit-item>input::-webkit-input-placeholder { /* WebKit browsers */
  color: #685d82;
}
.edit-item>input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #685d82;
}
.edit-item>input::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #685d82;
}
.edit-item>input:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #685d82;
}

.edit-item>textarea::-webkit-input-placeholder { /* WebKit browsers */
  color: #685d82;
}
.edit-item>textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #685d82;
}
.edit-item>textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #685d82;
}
.edit-item>textarea:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #685d82;
}
</style>
