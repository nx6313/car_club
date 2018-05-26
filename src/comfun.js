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
              resolve(response)
            }, response => {
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
              resolve(response)
            }, response => {
              reject(response)
            })
          })
          return http
        } else {
          console.error('上下文对象或请求地址不能为空', 'http_get(context, url)')
        }
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
      // 检验授权凭证（access_token）是否有效，无效返回 false， 有效返回 true
      wx_check_access_token: function (context) {
        var checkAccessPromise = new Promise((resolve, reject) => {
          if (context.$moment.wxUserInfo.access_token === '' && context.$moment.wxUserInfo.openid === '') {
            resolve({ code: 'no-access_token' })
          } else {
            context.$comfun.http_get(this, `https://api.weixin.qq.com/sns/auth?access_token=${context.$moment.wxUserInfo.access_token}&openid=${context.$moment.wxUserInfo.openid}`).then((response) => {
              resolve(response)
            }, (response) => {
              reject(response)
            })
          }
        })
        return checkAccessPromise
      },
      // 微信网页授权oauth2，scope：snsapi_base、snsapi_userinfo
      wx_oauth2: function (context, scope) {
        if (!window.localStorage.getItem('oauth2')) {
          window.localStorage.setItem('oauth2', true)
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${context.$moment.wxAppId}&redirect_uri=${context.$moment.indexPage}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
        }
      },
      // 通过code换取网页授权access_token
      wx_get_access_token_by_code: function (context) {
        var accessTokenPromise = new Promise((resolve, reject) => {
          var urlParams = context.$comfun.getRequest()
          if (urlParams.code) {
            context.$comfun.http_get(context, `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${context.$moment.wxAppId}&secret=${context.$moment.wxSecret}&code=${urlParams.code}&grant_type=authorization_code`).then((response) => {
              var accessToken = response.access_token
              var expiresIn = response.expires_in
              var refreshToken = response.refresh_token
              var openid = response.openid
              var scope = response.scope
              context.$moment.wxUserInfo.openid = openid
              context.$moment.wxUserInfo.access_token = accessToken
              context.$moment.wxUserInfo.expires_in = expiresIn
              context.$moment.wxUserInfo.refresh_token = refreshToken
              context.$moment.wxUserInfo.scope = scope
              resolve(response)
            }, (response) => {
              reject(response)
            })
          } else {
            resolve({ code: 'url-no-code-param' })
          }
        })
        return accessTokenPromise
      },
      // 拉取用户信息(需scope为 snsapi_userinfo)
      wx_get_user_info: function (context, openid, accessToken) {
        context.$comfun.http_get(context, `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openid}&lang=zh_CN`)
      }
    }

    Object.defineProperty(Vue.prototype, '$comfun', { value: ComFun })
  }
}
