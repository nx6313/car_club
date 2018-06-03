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
      <div class="edit-item" v-picker="pickerSex">
        <span>性别</span>
        <input type="text" placeholder="请输入性别" v-model="userInfo.sex">
      </div>
      <div class="edit-item" v-picker="pickerBirthday">
        <span>生日</span>
        <input type="text" placeholder="请输入生日" v-model="userInfo.birthday">
      </div>
      <div class="edit-item">
        <span>座驾</span>
        <input type="text" placeholder="请输入座驾" v-model="userInfo.carType">
      </div>
      <div class="edit-item" v-picker="pickerConstellation">
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
      userInfo: {},
      pickerSex: {
        context: this,
        title: '请选择性别',
        arg: 'sex',
        selectedFn: this.pickSelect,
        type: 'sex'
      },
      pickerBirthday: {
        context: this,
        title: '请选择生日',
        arg: 'birthday',
        selectedFn: this.pickSelect,
        type: 'yyyy-mm-dd',
        valRange: [ '1980-01-01', '~' ]
      },
      pickerConstellation: {
        context: this,
        title: '请选择星座',
        arg: 'constellation',
        selectedFn: this.pickSelect,
        type: 'constellation'
      }
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
      headId: null,
      headImg: this.$moment.wxUserInfo.headimgurl,
      nikeName: this.$moment.wxUserInfo.nickname,
      sexVal: this.$moment.wxUserInfo.sex,
      sex: this.$moment.wxUserInfo.sex === '0' ? '女士' : (this.$moment.wxUserInfo.sex === '1' ? '男士' : ''),
      birthdayVal: [],
      birthday: '',
      carType: '',
      constellation: '',
      phoneNum: '',
      address: address,
      intro: ''
    }
    this.pickerSex.value = [ this.userInfo.sexVal ]
    this.pickerBirthday.value = this.userInfo.birthdayVal
    this.pickerConstellation.value = this.userInfo.constellation
  },
  methods: {
    changeUserHead () {
      this.$comfun.wxChooseImage(this, 1).then((data) => {
        var localIds = data.localIds
        if (localIds && localIds.length > 0) {
          this.userInfo.headImg = localIds[0]
          this.$comfun.wxUploadImage(this, localIds[0]).then((data) => {
            var serverId = data.serverId
            this.$comfun.saveWxImg(this, serverId).then((response) => {
              if (response.body.code === '0000' && response.body.success === true) {
                this.$toast('图片保存成功')
                this.userInfo.headId = response.body.data.id
                this.$moment.wxUserInfo.headimgid = response.body.data.id
              } else {
                this.$toast('图片保存至服务器失败')
              }
            })
          })
        }
      })
    },
    pickSelect (selected, arg) {
      if (arg === 'sex') {
        this.userInfo.sexVal = selected[0].val
        this.userInfo.sex = selected[0].display
        this.pickerSex.value = [ this.userInfo.sexVal ]
      } else if (arg === 'birthday') {
        this.userInfo.birthdayVal = [ selected[0].val, selected[1].val, selected[2].val ]
        this.userInfo.birthday = selected[0].val + selected[0].unit + selected[1].val + selected[1].unit + selected[2].val + selected[2].unit
        this.pickerBirthday.value = this.userInfo.birthdayVal
      } else if (arg === 'constellation') {
        this.userInfo.constellation = selected[0].val
        this.pickerConstellation.value = [ this.userInfo.constellation ]
      }
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
