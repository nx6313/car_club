export default {
  install: function (Vue, options) {
    var ComFun = {
      http_get: function (context, url) {
        if (context && url) {
          var http = new Promise((resolve, reject) => {
            var callUrl = context.$moment.server + url
            if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
              callUrl = url
            }
            context.$http.get(callUrl, {
              'headers': {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*'
              }
            }).then(response => {
              context.$comfun.consoleBeautiful('接口访问完成：url【' + url + '】', '#0FB0BF', 'https://img.zcool.cn/community/01db9f579571700000012e7e9da0fb.gif', {
                '链接': callUrl,
                '请求返回': response
              })
              resolve(response)
            }, response => {
              context.$comfun.consoleBeautiful('接口访问出错：url【' + url + '】', '#BF0F3D', 'https://img.zcool.cn/community/014db6579571700000012e7e602493.gif', {
                '链接': callUrl,
                '请求返回': response
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
            context.$http.post(callUrl, JSON.stringify(paramsData), {
              'headers': {
                'Content-Type': 'application/json;charset=utf-8',
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
          console.error('上下文对象或请求地址不能为空', 'http_post(context, url)')
        }
      },
      consoleBeautiful: function (tip, tipColor, tipPic, consoleData, type) {
        if (!tipColor) {
          tipColor = '#0FB0BF'
        }
        if (!tipPic) {
          tipPic = 'https://img.zcool.cn/community/01c3365795716f0000012e7ef2e489.gif'
        }
        if (type) {
          if (type === 'error') {
            tipColor = '#BF0F3D'
            tipPic = 'https://img.zcool.cn/community/014db6579571700000012e7e602493.gif'
          } else if (type === 'warn') {
            tipColor = '#BF720F'
            tipPic = 'https://img.zcool.cn/community/01db9f579571700000012e7e9da0fb.gif'
          } else if (type === 'info') {
            tipColor = '#0FB0BF'
            tipPic = 'https://img.zcool.cn/community/01c3365795716f0000012e7ef2e489.gif'
          }
        }
        if (consoleData) {
          console.log(`%c ${tip}`, `padding: 20px 50px; line-height: 56px; color: ${tipColor}; background-repeat: no-repeat; background-size: auto 100%; background-image: url(${tipPic});`, consoleData)
        } else {
          console.log(`%c ${tip}`, `padding: 20px 50px; line-height: 56px; color: ${tipColor}; background-repeat: no-repeat; background-size: auto 100%; background-image: url(${tipPic});`)
        }
      },
      // 判断字符串是否为空
      isNotNull: function (str) {
        if (!str || str === '' || str === null || str.toLowerCase() === 'null' || typeof str === 'undefined') {
          return false
        }
        return true
      },
      // 获取当前浏览器访问地址，会将地址，参数部分，#部分分别放入json返回
      getCurrentUrl: function (encodeURIFlag) {
        var pathname = location.pathname
        var search = location.search
        var hash = location.hash
        var urlAnalysis = {
          pathname: pathname,
          search: search,
          hash: hash
        }
        return urlAnalysis
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
      getWxUserInfoDataToLocal: function (context, jsApiList) {
        var wxUserInfoData = window.localStorage.getItem('wx-user-info')
        if (context.$comfun.isNotNull(wxUserInfoData)) {
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
          context.$comfun.wx_page_signature(context, jsApiList)
        }
      },
      // 微信网页授权oauth2，scope：snsapi_base、snsapi_userinfo
      wx_oauth2: function (context, scope, jsApiList) {
        context.$comfun.getWxUserInfoDataToLocal(context, jsApiList)
        if (!context.$comfun.isNotNull(context.$moment.wxUserInfo.openid)) {
          var urlParams = context.$comfun.getRequest()
          if (!context.$comfun.isNotNull(urlParams.code)) {
            var oauth2Url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${context.$moment.wxAppId}&redirect_uri=${context.$moment.indexPage}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
            window.location.replace(oauth2Url)
          } else {
            context.$comfun.wx_get_access_token_by_code(context)
          }
        } else {
          context.$comfun.consoleBeautiful('用户信息已存在，不再执行微信授权登录', null, null, null, 'info')
        }
      },
      // 通过code换取网页授权access_token
      wx_get_access_token_by_code: function (context) {
        var accessTokenPromise = new Promise((resolve, reject) => {
          var urlParams = context.$comfun.getRequest()
          context.$comfun.http_get(context, `${context.$moment.urls.get_user_info}${urlParams.code}`).then((response) => {
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
              if (history.replaceState) {
                history.replaceState(null, document.title, context.$moment.indexPage_ + '#')
                window.location.replace('')
              } else {
                window.location.replace(context.$moment.indexPage_)
              }
            }
          }, (response) => {
            reject(response)
          })
        })
        return accessTokenPromise
      },
      // 微信获取页面签名信息
      wx_page_signature: function (context, jsApiList) {
        var wxPageSignaturePromise = new Promise((resolve, reject) => {
          if (context.$comfun.isNotNull(context.$moment.wxUserInfo.openid)) {
            var pageUrl = context.$moment.realm + context.$comfun.getCurrentUrl().pathname
            context.$comfun.http_post(context, `${context.$moment.urls.get_wx_page_signature}`, {
              url: pageUrl,
              openid: context.$moment.wxUserInfo.openid
            }).then((response) => {
              if (response.body.data) {
                context.$moment.wx.config({
                  debug: true,
                  appId: context.$moment.wxAppId,
                  timestamp: response.body.data.timestamp,
                  nonceStr: response.body.data.nonceStr,
                  signature: response.body.data.signature,
                  jsApiList: jsApiList
                })
              }
            }, (response) => {
              reject(response)
            })
          } else {
            resolve({ code: 'no-openid' })
          }
        })
        return wxPageSignaturePromise
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
