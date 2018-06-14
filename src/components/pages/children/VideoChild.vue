<template>
  <div class="video-child" ref="me-video-child">
    <span v-if="videoDataList.length > 0" v-for="(video, index) in videoDataList" :key="index" :style="video.cover ? { 'background-image':'url(' + video.cover + ' ) ' } : ''" @click="toChildPage('/me-state-detail', '/video/' + video.videoId)"></span>
    <div class="data-loading" ref="data-loading">数据加载中</div>
    <div class="data-empty" v-if="videoDataList.length === 0"></div>
  </div>
</template>

<script>
export default {
  name: 'child-video',
  data () {
    return {
      pageLimit: 10,
      isNextLoading: false,
      currentPageIndex: 1,
      videoDataList: []
    }
  },
  created () {
    this.$root.eventHub.$on('videoDataNext', () => {
      this.getNextData()
    })
  },
  activated () {
    if (this.videoDataList.length === 0) {
      this.getVideoByPage(this.currentPageIndex, [ '3' ]).then((issData) => {
        if (issData) {
          this.videoDataList = this.videoDataList.concat(issData)
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
      if (!this.isNextLoading && this.videoDataList.length > 0) {
        var pageReal = Math.ceil(this.videoDataList.length / this.pageLimit)
        if (this.videoDataList.length % this.pageLimit === 0) {
          pageReal += 1
        }
        this.currentPageIndex = pageReal
        this.getVideoByPage(this.currentPageIndex, [ '3' ]).then((issData) => {
          if (issData) {
            if (this.videoDataList.length % this.pageLimit > 0) {
              var spliceStartIndex = Math.floor(this.videoDataList.length / this.pageLimit) * this.pageLimit
              var spliceCount = this.videoDataList.length % this.pageLimit
              this.videoDataList.splice(spliceStartIndex, spliceCount)
              this.videoDataList = this.videoDataList.concat(issData)
            } else {
              this.videoDataList = this.videoDataList.concat(issData)
            }
          }
        })
      }
    },
    getVideoByPage (page, type) {
      var videpByPagePromise = new Promise((resolve, reject) => {
        this.isNextLoading = true
        var dataLoading = this.$refs['data-loading']
        dataLoading.style.transform = 'translateY(0)'
        this.$comfun.http_post(this, this.$moment.urls.get_new_info + `?page=${page}&limit=${this.pageLimit}`, {
          accountId: this.$moment.wxUserInfo.accountId,
          searchaccountId: this.$moment.wxUserInfo.accountId,
          type: type
        }).then((response) => {
          this.isNextLoading = false
          setTimeout(() => {
            dataLoading.style.transform = 'translateY(100%)'
          }, 100)
          if (response.body.code === '0000' && response.body.success === true) {
            if (response.body.data.dataList && response.body.data.dataList.length > 0) {
              let videoInfoList = []
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
                let videoInfo = {
                  videoId: response.body.data.dataList[d].id,
                  userId: response.body.data.dataList[d].accountId,
                  src: response.body.data.dataList[d].fileList[0].fileAddress,
                  cover: response.body.data.dataList[d].fileList[0].face,
                  coverWidth: Number(response.body.data.dataList[d].fileList[0].width),
                  coverHeight: Number(response.body.data.dataList[d].fileList[0].height),
                  type: response.body.data.dataList[d].fileList[0].suffix,
                  userHead: response.body.data.dataList[d].userHeadimg,
                  userName: response.body.data.dataList[d].username,
                  hasAttention: hasAttention,
                  ifSupport: ifSupport,
                  supportMans: likeMans,
                  supportCount: likeMans.length,
                  commentCount: response.body.data.dataList[d].commentNum,
                  comments: comments
                }
                videoInfoList.push(videoInfo)
              }
              resolve(videoInfoList)
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
          }, 100)
          reject(response)
        })
      })
      return videpByPagePromise
    }
  }
}
</script>

<style scoped>
.video-child{
  width: 100%;
  background-color: #1E1436;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}

.video-child>span{
  display: inline-block;
  width: calc(100% / 3);
  height: 0;
  padding-bottom: calc(100% / 3 + 50px);
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  box-shadow: inset 0 0 20px 0px rgba(46, 52, 72, .8)
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
  content: '暂无视频';
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  text-align: center;
  color: #8b7caf;
}
</style>
