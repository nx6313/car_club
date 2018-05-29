export default {
  install: function (Vue, options) {
    var ComFun = {
      http_get: function (context, url, params) {
        if (context && url) {
          var paramsData = params || {}
          var http = new Promise((resolve, reject) => {
            var callUrl = context.$moment.server + url
            if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
              callUrl = url
            }
            context.$http.get(callUrl, paramsData, {
              'headers': {
                'Content-Type': 'appliaction/json',
                'Access-Control-Allow-Origin': '*'
              }
            }).then(response => {
              context.$comfun.consoleBeautiful('接口访问完成：url【' + url + '】', '#0FB0BF', 'https://img.zcool.cn/community/01db9f579571700000012e7e9da0fb.gif', {
                '链接': callUrl,
                '请求返回': response,
                '相关参数': paramsData
              })
              resolve(response)
            }, response => {
              context.$comfun.consoleBeautiful('接口访问出错：url【' + url + '】', '#BF0F3D', 'https://img.zcool.cn/community/014db6579571700000012e7e602493.gif', {
                '链接': callUrl,
                '请求返回': response,
                '相关参数': paramsData
              })
              reject(response)
            })
          })
          return http
        } else {
          console.error('上下文对象或请求地址不能为空', 'http_get(context, url)')
        }
      },
      http_post: function (context, url, params) {
        if (context && url) {
          var paramsData = params || {}
          var http = new Promise((resolve, reject) => {
            var callUrl = context.$moment.server + url
            if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
              callUrl = url
            }
            context.$http.get(callUrl, paramsData, {
              'headers': {
                'Content-Type': 'appliaction/json',
                'Access-Control-Allow-Origin': '*'
              }
            }).then(response => {
              context.$comfun.consoleBeautiful('接口访问完成：url【' + url + '】', '#0FB0BF', 'https://img.zcool.cn/community/01db9f579571700000012e7e9da0fb.gif', {
                '链接': callUrl,
                '请求返回': response,
                '相关参数': paramsData
              })
              resolve(response)
            }, response => {
              context.$comfun.consoleBeautiful('接口访问出错：url【' + url + '】', '#BF0F3D', 'https://img.zcool.cn/community/014db6579571700000012e7e602493.gif', {
                '链接': callUrl,
                '请求返回': response,
                '相关参数': paramsData
              })
              reject(response)
            })
          })
          return http
        } else {
          console.error('上下文对象或请求地址不能为空', 'http_get(context, url)')
        }
      },
      consoleBeautiful: function (tip, tipColor, tipPic, consoleData) {
        if (!tipColor) {
          tipColor = '#0FB0BF'
        }
        if (!tipPic) {
          tipPic = 'https://img.zcool.cn/community/01c3365795716f0000012e7ef2e489.gif'
        }
        console.log(`%c ${tip}`, `padding: 20px 50px; line-height: 56px; color: ${tipColor}; background-repeat: no-repeat; background-size: auto 100%; background-image: url(${tipPic});`, consoleData)
      },
      // 获取网址中的参数
      getRequest: function () {
        var url = location.search
        var theRequest = {}
        if (url.indexOf('?') !== -1) {
          var str = url.substr(1)
          var strs = str.split('&')
          for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
          }
        }
        return theRequest
      },
      // 将localStorage中保存的微信相关信息保存到本地
      getWxUserInfoDataToLocal: function (context) {
        var wxUserInfoData = window.localStorage.getItem('wx-user-info')
        if (wxUserInfoData) {
          var wxUserInfoDataJson = JSON.parse(wxUserInfoData)
          context.$moment.wxUserInfo.openid = wxUserInfoDataJson.openid
          context.$moment.wxUserInfo.nickname = wxUserInfoDataJson.nickname
          context.$moment.wxUserInfo.sex = wxUserInfoDataJson.sex
          context.$moment.wxUserInfo.province = wxUserInfoDataJson.province
          context.$moment.wxUserInfo.city = wxUserInfoDataJson.city
          context.$moment.wxUserInfo.country = wxUserInfoDataJson.country
          context.$moment.wxUserInfo.headimgurl = wxUserInfoDataJson.headimgurl
          context.$moment.wxUserInfo.privilege = wxUserInfoDataJson.privilege
          context.$moment.wxUserInfo.unionid = wxUserInfoDataJson.unionid || ''
        }
      },
      // 微信网页授权oauth2，scope：snsapi_base、snsapi_userinfo
      wx_oauth2: function (context, scope) {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${context.$moment.wxAppId}&redirect_uri=${context.$moment.indexPage}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
      },
      // 通过code换取网页授权access_token
      wx_get_access_token_by_code: function (context, jsApiList) {
        var accessTokenPromise = new Promise((resolve, reject) => {
          var urlParams = context.$comfun.getRequest()
          if (urlParams.code) {
            context.$comfun.http_get(context, `${context.$moment.urls.get_open_id}${urlParams.code}`).then((response) => {
              if (response.body.data && response.body.data.openid) {
                context.$moment.wxUserInfo.openid = response.body.data.openid
                context.$moment.wxUserInfo.nickname = response.body.data.nickname
                context.$moment.wxUserInfo.sex = response.body.data.sex
                context.$moment.wxUserInfo.province = response.body.data.province
                context.$moment.wxUserInfo.city = response.body.data.city
                context.$moment.wxUserInfo.country = response.body.data.country
                context.$moment.wxUserInfo.headimgurl = response.body.data.headimgurl
                context.$moment.wxUserInfo.privilege = response.body.data.privilege
                context.$moment.wxUserInfo.unionid = response.body.data.unionid || ''
                window.localStorage.setItem('wx-user-info', JSON.stringify(context.$moment.wxUserInfo))
                // context.$moment.wx.config({
                //   debug: true,
                //   appId: context.$moment.wxAppId,
                //   timestamp: '',
                //   nonceStr: '',
                //   signature: '',
                //   jsApiList: jsApiList
                // })
              }
            }, (response) => {
              reject(response)
            })
          } else {
            resolve({ code: 'url-no-code-param' })
          }
        })
        return accessTokenPromise
      },
      // 拍照或从手机相册中选图接口
      wxChooseImage: function (context, maxChoose) {
        context.$moment.wx.chooseImage({
          count: maxChoose,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            console.log(localIds)
          }
        })
      }
    }

    Object.defineProperty(Vue.prototype, '$comfun', { value: ComFun })
  }
}
