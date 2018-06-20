<template>
  <div class="stateChild">
    <div class="clear" v-if="stateDataList.length > 0" v-for="(attenImg, index) in stateDataList" :key="index">
      <div class="date-wrap">
        <span class="stateDay">{{attenImg.date}}</span>
        <span class="stateMonth">{{attenImg.month}}月</span>
      </div>
      <span v-for="stateList in attenImg.stateList" :key="stateList.id" @click="toChildPage('/me-state-detail', '/state/' + stateList.id)">
        <span v-if="stateList.attenImgs.length > 0" :class="'statePage' + (stateList.attenImgs.length > 4 ? 4 : stateList.attenImgs.length)">
           <span v-for="(img , index) in stateList.attenImgs" :key="index" :style="img ? { 'background-image':'url(' + img + ' ) ' } : ''" ></span>
        </span>
        <span :class="['stateLast', stateList.attenImgs.length === 0 ? 'stateLastNoFile' : '']">
          <span v-if="stateList.attenImgs.length > 0" class="stateCount">共{{stateList.attenImgCount}}张</span>
          <span class="stateFont" v-html="stateList.atteninfo"></span>
        </span>
      </span>
    </div>
    <div class="data-loading" ref="data-loading" :style="isChild ? { 'bottom': '0px' } : {}">数据加载中</div>
    <div class="data-empty" v-if="stateDataList.length === 0"></div>
  </div>
</template>

<script>
export default {
  name: 'child-state',
  data () {
    return {
      lookUserId: null,
      isChild: false,
      pageLimit: 10,
      isNextLoading: false,
      currentPageIndex: 1,
      attentionList: [],
      stateDataList: []
    }
  },
  created () {
    this.$root.eventHub.$on('stateDataNext', () => {
      this.getNextData()
    })
  },
  activated () {
    this.attentionList = []
    this.stateDataList = []
    this.currentPageIndex = 1
    this.lookUserId = this.$route.params.lookUserId
    if (this.$route.params.isChild) {
      this.isChild = this.$route.params.isChild
    }

    if (this.lookUserId && this.attentionList.length === 0) {
      this.getStateByPage(this.currentPageIndex, [ '1', '2' ]).then((issData) => {
        if (issData) {
          this.attentionList = this.attentionList.concat(issData)
          this.formatDataByDate()
        }
      })
    }
  },
  methods: {
    toChildPage (childPageRouter, params) {
      var option = params || ''
      this.$router.push(childPageRouter + option)
    },
    getNextData () {
      if (!this.isNextLoading && this.attentionList.length > 0) {
        var pageReal = Math.ceil(this.attentionList.length / this.pageLimit)
        if (this.attentionList.length % this.pageLimit === 0) {
          pageReal += 1
        }
        this.currentPageIndex = pageReal
        this.getStateByPage(this.currentPageIndex, [ '1', '2' ]).then((issData) => {
          if (issData) {
            if (this.attentionList.length % this.pageLimit > 0) {
              var spliceStartIndex = Math.floor(this.attentionList.length / this.pageLimit) * this.pageLimit
              var spliceCount = this.attentionList.length % this.pageLimit
              this.attentionList.splice(spliceStartIndex, spliceCount)
              this.attentionList = this.attentionList.concat(issData)
              this.formatDataByDate()
            } else {
              this.attentionList = this.attentionList.concat(issData)
              this.formatDataByDate()
            }
          }
        })
      }
    },
    formatDataByDate () {
      var tempDateKeyArr = {}
      this.stateDataList = []
      for (let a = 0; a < this.attentionList.length; a++) {
        let date = this.$comfun.formatDate(new Date(this.attentionList[a].creationDate), 'yyyy-MM-dd')
        if (tempDateKeyArr[date] !== undefined) {
          let attenImgs = []
          if (this.attentionList[a].fileList && this.attentionList[a].fileList.length > 0) {
            for (let i = 0; i < this.attentionList[a].fileList.length; i++) {
              if (i === 4) {
                break
              }
              attenImgs.push(this.attentionList[a].fileList[i].fileAddress)
            }
          }
          tempDateKeyArr[date].push({
            id: this.attentionList[a].stateId,
            atteninfo: this.attentionList[a].content,
            attenImgs: attenImgs,
            attenImgCount: this.attentionList[a].fileList.length
          })
        } else {
          let dataObj = []
          let attenImgs = []
          if (this.attentionList[a].fileList && this.attentionList[a].fileList.length > 0) {
            for (let i = 0; i < this.attentionList[a].fileList.length; i++) {
              if (i === 4) {
                break
              }
              attenImgs.push(this.attentionList[a].fileList[i].fileAddress)
            }
          }
          dataObj.push({
            id: this.attentionList[a].stateId,
            atteninfo: this.attentionList[a].content,
            attenImgs: attenImgs,
            attenImgCount: this.attentionList[a].fileList.length
          })
          tempDateKeyArr[date] = dataObj
        }
      }
      for (let key in tempDateKeyArr) {
        let month = this.$comfun.formatDate(new Date(key), 'M')
        let day = this.$comfun.formatDate(new Date(key), 'dd')
        this.stateDataList.push({
          date: day,
          month: month,
          stateList: tempDateKeyArr[key]
        })
      }
    },
    getStateByPage (page, type) {
      var videpByPagePromise = new Promise((resolve, reject) => {
        this.isNextLoading = true
        var dataLoading = this.$refs['data-loading']
        dataLoading.style.transform = 'translateY(0)'
        this.$comfun.http_post(this, this.$moment.urls.get_new_info + `?page=${page}&limit=${this.pageLimit}`, {
          accountId: this.lookUserId || this.$moment.wxUserInfo.accountId,
          searchaccountId: this.lookUserId || this.$moment.wxUserInfo.accountId,
          type: type
        }).then((response) => {
          this.isNextLoading = false
          setTimeout(() => {
            dataLoading.style.transform = 'translateY(100%)'
          }, 300)
          if (response.body.code === '0000' && response.body.success === true) {
            if (response.body.data.dataList && response.body.data.dataList.length > 0) {
              let stateInfoList = []
              for (let d = 0; d < response.body.data.dataList.length; d++) {
                let hasAttention = false
                if (response.body.data.dataList[d].accountId === this.$moment.wxUserInfo.accountId || response.body.data.dataList[d].isIdoi === 1) {
                  hasAttention = true
                }
                let ifSupport = false
                let likeMans = []
                if (response.body.data.dataList[d].praiseList && response.body.data.dataList[d].praiseList.length > 0) {
                  for (let p = 0; p < response.body.data.dataList[d].praiseList.length; p++) {
                    if (response.body.data.dataList[d].praiseList[p].accountId === this.$moment.wxUserInfo.accountId) {
                      ifSupport = true
                    }
                    likeMans.push({
                      accountId: response.body.data.dataList[d].praiseList[p].accountId,
                      time: response.body.data.dataList[d].praiseList[p].createTime,
                      userHeadimg: response.body.data.dataList[d].praiseList[p].userHeadimg,
                      username: response.body.data.dataList[d].praiseList[p].username
                    })
                  }
                }
                let comments = []
                if (response.body.data.dataList[d].commentList && response.body.data.dataList[d].commentList.length > 0) {
                  for (let c = 0; c < response.body.data.dataList[d].commentList.length; c++) {
                    let replys = []
                    if (response.body.data.dataList[d].commentList[c].replyInfos && response.body.data.dataList[d].commentList[c].replyInfos.length > 0) {
                      for (let r = 0; r < response.body.data.dataList[d].commentList[c].replyInfos.length; r++) {
                        replys.push({
                          userId: response.body.data.dataList[d].commentList[c].replyInfos[r].fromAccountId,
                          name: response.body.data.dataList[d].commentList[c].replyInfos[r].fromUsername,
                          content: response.body.data.dataList[d].commentList[c].replyInfos[r].content,
                          time: response.body.data.dataList[d].commentList[c].replyInfos[r].createTime,
                          userHead: response.body.data.dataList[d].commentList[c].replyInfos[r].fromUserHeadimg,
                          replyUserId: response.body.data.dataList[d].commentList[c].replyInfos[r].toAccountId,
                          replyUserName: response.body.data.dataList[d].commentList[c].replyInfos[r].toUsername,
                          replyUserHead: response.body.data.dataList[d].commentList[c].replyInfos[r].toUserHeadimg
                        })
                      }
                    }
                    comments.push({
                      id: response.body.data.dataList[d].commentList[c].id,
                      uuid: response.body.data.dataList[d].commentList[c].uuid,
                      head: response.body.data.dataList[d].commentList[c].fromUserHeadimg,
                      userId: response.body.data.dataList[d].commentList[c].fromAccountId,
                      name: response.body.data.dataList[d].commentList[c].fromUsername,
                      content: response.body.data.dataList[d].commentList[c].content,
                      time: response.body.data.dataList[d].commentList[c].createTime,
                      isLike: response.body.data.dataList[d].commentList[c].isPraise === 1,
                      replys: replys
                    })
                  }
                }
                let fileList = []
                if (response.body.data.dataList[d].fileList && response.body.data.dataList[d].fileList.length > 0) {
                  for (let f = 0; f < response.body.data.dataList[d].fileList.length; f++) {
                    fileList.push({
                      id: response.body.data.dataList[d].fileList[f].id,
                      fileAddress: response.body.data.dataList[d].fileList[f].fileAddress,
                      suffix: response.body.data.dataList[d].fileList[f].suffix,
                      type: response.body.data.dataList[d].fileList[f].type
                    })
                  }
                }
                let stateInfo = {
                  stateId: response.body.data.dataList[d].id,
                  userId: response.body.data.dataList[d].accountId,
                  creationDate: response.body.data.dataList[d].creationDate,
                  content: response.body.data.dataList[d].content,
                  fileList: fileList,
                  userHead: response.body.data.dataList[d].userHeadimg,
                  userName: response.body.data.dataList[d].username,
                  hasAttention: hasAttention,
                  ifSupport: ifSupport,
                  supportMans: likeMans,
                  supportCount: likeMans.length,
                  commentCount: response.body.data.dataList[d].commentNum,
                  comments: comments
                }
                stateInfoList.push(stateInfo)
              }
              resolve(stateInfoList)
            } else {
              resolve(null)
            }
          } else {
            resolve(null)
          }
        }, (response) => {
          this.isNextLoading = false
          setTimeout(() => {
            dataLoading.style.transform = 'translateY(100%)'
          }, 300)
          reject(response)
        })
      })
      return videpByPagePromise
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
  background-color: #1E1436;
}

.stateChild > div > div.date-wrap {
  display: inline-block;
  margin: 10px 0 0;
}

.stateChild > div > div > span {
  height: auto;
  float: left;
  margin-left: 10px;
  margin-top: 1.1rem;
}

.stateChild > div > div > span.stateDay {
  font-size: 1.8rem;
  color: #fff;
}

.stateChild > div > div > span.stateMonth {
  font-size: 1rem;
  color: #a09ab0;
  margin-left: 5px;
  margin-top: 9px;
}

.stateChild > div > span {
  display: inline-block;
  margin: 1.6rem 0 0;
}

.stateChild > div > span:last-of-type {
  margin-bottom: 0.8rem;
}

.stateChild > div > span:nth-of-type(n + 2)::before {
  content: '';
  position: absolute;
  left: 0.6rem;
  right: 0.6rem;
  top: -0.8rem;
  height: 0;
  border-top: 1px dotted rgba(61, 48, 100, 0.6);
}

/* 一张图时的样式 */
.stateChild > div > span > .statePage1 {
  display: inline-block;
  width: 28%;
  height: 0;
  padding-bottom: 28%;
  overflow: hidden;
}

.stateChild > div > span > .statePage1 > span {
  display: inline-block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

/* 两张图时的样式 */
.stateChild > div > span > .statePage2 {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 28%;
  height: 0;
  padding-bottom: 28%;
  overflow: hidden;
}

.stateChild > div > span > .statePage2 > span {
  display: inline-block;
  width: calc(97% / 2);
  height: 0;
  padding-bottom: calc(97% / 2 + 50px);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

/* 三张图时的样式 */
.stateChild > div > span > .statePage3 {
  width: 28%;
  height: 0;
  padding-bottom: 28%;
  position: relative;
  overflow: hidden;
}

.stateChild > div > span > .statePage3 > span:nth-of-type(1) {
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

.stateChild > div > span > .statePage3 > span:nth-of-type(2) {
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

.stateChild > div > span > .statePage3 > span:nth-of-type(3) {
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
.stateChild > div > span {
  position: relative;
  width: 74%;
  float: right;
  display: flex;
  justify-content: space-around;
}

.stateChild > div > span > .statePage4 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 31%;
  height: 0;
  padding-bottom: 31%;
  overflow: hidden;
}

.stateChild > div > span > .statePage4 > span {
  display: inline-block;
  width: calc(97% / 2);
  height: 0;
  padding-bottom: calc(97% / 2);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  margin-top: 3px;
}

.stateChild > div > span > .statePage4 > span:nth-of-type(1) {
  margin-top: 0;
}

.stateChild > div > span > .statePage4 > span:nth-of-type(2) {
  margin-top: 0;
}

.stateLast {
  position: relative;
  width: 61%;
  display: inline-block;
}

.stateLastNoFile {
  width: 92%;
}

.stateFont {
  width: 98%;
  font-size: 0.8rem;
  color: #d0c8e1;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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

.data-loading {
  position: fixed;
  left: 0;
  bottom: 3.2rem;
  width: 100%;
  padding: 0.5rem 0;
  font-size: 0.6rem;
  text-align: center;
  background: #2c294e;
  color: rgb(213, 223, 245);
  transition: all 0.3s ease 0s;
  transform: translateY(100%);
  z-index: 1;
}

.data-empty {
  position: relative;
  top: 1rem;
  width: 100%;
  height: 7em;
  padding-bottom: 1.6rem;
  margin-bottom: 1rem;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: auto 60%;
  background-image: url('./../../../assets/attention-empty.png');
}

.data-empty::after {
  content: '暂无动态';
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  text-align: center;
  color: #8b7caf;
}
</style>
