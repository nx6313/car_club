import Clipboard from 'clipboard'

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
              context.$comfun.consoleBeautiful(context, '接口访问完成：url【' + url + '】', '#0FB0BF', 'https://img.zcool.cn/community/01db9f579571700000012e7e9da0fb.gif', {
                '链接': callUrl,
                '请求返回': response
              })
              context.$loading_close()
              resolve(response)
            }, response => {
              context.$comfun.consoleBeautiful(context, '接口访问出错：url【' + url + '】', '#BF0F3D', 'https://img.zcool.cn/community/014db6579571700000012e7e602493.gif', {
                '链接': callUrl,
                '请求返回': response
              })
              context.$loading_close()
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
              context.$comfun.consoleBeautiful(context, '接口访问完成：url【' + url + '】', '#0FB0BF', 'https://img.zcool.cn/community/01db9f579571700000012e7e9da0fb.gif', {
                '链接': callUrl,
                '请求返回': response,
                '相关参数': paramsData
              })
              context.$loading_close()
              resolve(response)
            }, response => {
              context.$comfun.consoleBeautiful(context, '接口访问出错：url【' + url + '】', '#BF0F3D', 'https://img.zcool.cn/community/014db6579571700000012e7e602493.gif', {
                '链接': callUrl,
                '请求返回': response,
                '相关参数': paramsData
              })
              context.$loading_close()
              reject(response)
            })
          })
          return http
        } else {
          console.error('上下文对象或请求地址不能为空', 'http_post(context, url)')
        }
      },
      http_file: function (context, url, aboutKey, file, progressFn) {
        if (context && url && file) {
          context.$comfun.console(context, '要上传的视频对象', file)
          const formData = new FormData()
          formData.append(aboutKey, file)
          var http = new Promise((resolve, reject) => {
            var callUrl = context.$moment.server + url
            if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
              callUrl = url
            }
            context.$http.post(callUrl, formData, {
              'headers': {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
              },
              progress (event) {
                context.$comfun.console(context, '视频上传进度', parseFloat(event.loaded / event.total * 100))
                if (progressFn && typeof progressFn === 'function' && Object.prototype.toString.call(progressFn).toLowerCase() === '[object function]') {
                  progressFn(parseFloat(event.loaded / event.total))
                }
              }
            }).then(response => {
              context.$comfun.consoleBeautiful(context, '接口访问完成：url【' + url + '】', '#0FB0BF', 'https://img.zcool.cn/community/01db9f579571700000012e7e9da0fb.gif', {
                '链接': callUrl,
                '请求返回': response,
                '要上传的视频对象': file
              })
              context.$loading_close()
              resolve(response)
            }, response => {
              context.$comfun.consoleBeautiful(context, '接口访问出错：url【' + url + '】', '#BF0F3D', 'https://img.zcool.cn/community/014db6579571700000012e7e602493.gif', {
                '链接': callUrl,
                '请求返回': response,
                '要上传的视频对象': file
              })
              context.$loading_close()
              reject(response)
            })
          })
          return http
        } else {
          console.error('上下文对象或请求地址不能为空', 'http_file(context, url)')
        }
      },
      console: function (context, tip, data, type) {
        context.$comfun.consoleBeautiful(context, tip, null, null, data, type)
      },
      consoleBeautiful: function (context, tip, tipColor, tipPic, consoleData, type) {
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
          console.log(`%c ${tip}`, `height: 40px; padding-left: 60px; line-height: 56px; color: ${tipColor}; background-repeat: no-repeat; background-size: auto 100%; background-image: url(${tipPic});`, consoleData)
        } else {
          console.log(`%c ${tip}`, `height: 40px; padding-left: 60px; line-height: 56px; color: ${tipColor}; background-repeat: no-repeat; background-size: auto 100%; background-image: url(${tipPic});`)
        }
        context.$writeToConsolePanl(`<div>
        <span style="display: inline-block; width: 40px; height: 36px; vertical-align: middle; 
        background-repeat: no-repeat; background-size: auto 100%; background-image: url(${tipPic});"></span>
        <span style="vertical-align: middle;">${tip}</span></div>`, consoleData, context)
      },
      // 复制文本到剪切板，在input或者button元素上加上data-clipboard-text属性，填入要复制的值
      copyTxt: function (context, target) {
        var clipboard = new Clipboard(target)
        clipboard.on('success', e => {
          context.$toast('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          context.$toast('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
      // 封装生成视频对象，调用腾讯视频的js接口
      createVideo: function (context, rootId, option, loop, progressFn, timeupdateFn) {
        var params = option || {}
        var TcPlayer = context.$moment.player
        var width = 0
        var height = 0
        if (rootId) {
          width = document.getElementById(rootId).clientWidth
          height = document.getElementById(rootId).clientHeight
        }
        if (!params.width && !params.height) {
          params.width = width // 视频的显示宽度，请尽量使用视频分辨率宽度
          params.height = height // 视频的显示高度，请尽量使用视频分辨率高度
        }
        params.flash = false
        // params.h5_flv = true
        params.x5_player = true
        params.x5_type = 'H5'
        var player = new TcPlayer(rootId, option)
        player.listener = function (msg) {
          if (loop === true) {
            if (msg.type === 'ended') {
              player.play()
            }
          }
          if (msg.type === 'progress' && progressFn && typeof progressFn === 'function' && Object.prototype.toString.call(progressFn).toLowerCase() === '[object function]') {
            progressFn()
          }
          if (msg.type === 'timeupdate' && timeupdateFn && typeof timeupdateFn === 'function' && Object.prototype.toString.call(timeupdateFn).toLowerCase() === '[object function]') {
            timeupdateFn()
          }
          if (context.$moment.wxIsDebug) {
            if (context.$comfun.isAndroidIos().isMobile) {
              context.$comfun.console(context, '播放视频进度监听', {
                // src: msg.src,
                timestamp: msg.timestamp,
                ts: msg.ts,
                type: msg.type
              })
            } else {
              console.log(msg)
            }
          }
        }
        return player
      },
      // 判断设备类型
      isAndroidIos: function () {
        var p = navigator.platform
        var u = navigator.userAgent
        var app = navigator.appVersion
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
        return {
          isAndroid: isAndroid,
          isiOS: isiOS,
          platform: p,
          isMobile: !(p.toLowerCase().indexOf('win') >= 0 || p.toLowerCase().indexOf('mac') >= 0),
          deviceInfo: app
        }
      },
      // 判断字符串是否为空
      isNotNull: function (str) {
        if (!str || str === '' || str === null || str.toLowerCase() === 'null' || typeof str === 'undefined') {
          return false
        }
        return true
      },
      // 日期格式转字符串，指定格式
      // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
      // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
      // 例子：
      // (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
      // (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
      formatDate: function (date, fmt) {
        var o = {
          'M+': date.getMonth() + 1, // 月份
          'd+': date.getDate(), // 日
          'h+': date.getHours(), // 小时
          'm+': date.getMinutes(), // 分
          's+': date.getSeconds(), // 秒
          'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
          'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      },
      // 将相差的毫秒数转为时间
      formatDiffMilliseconds (diffMilliseconds) {
        let dayMill = 24 * 60 * 60 * 1000
        let hourMill = 60 * 60 * 1000
        let minuteMill = 60 * 1000
        let secondMill = 1000
        let day = Math.floor(diffMilliseconds / dayMill)
        let dayResidue = diffMilliseconds % dayMill
        let hour = Math.floor(dayResidue / hourMill)
        let hourResidue = dayResidue % hourMill
        let minute = Math.floor(hourResidue / minuteMill)
        let minuteResidue = hourResidue % minuteMill
        let second = Math.ceil(minuteResidue / secondMill)
        let returnVal = ''
        if (day > 0) {
          returnVal += day + ' 天 '
        } else {
          if (hour > 0) {
            returnVal += hour + ' 小时 '
          }
          if (minute > 0) {
            returnVal += minute + ' 分钟 '
          }
          if (hour === 0 && minute === 0) {
            returnVal = second + ' 秒 '
          }
        }
        return returnVal
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
      // 初始化webSocket
      webSocketInit: function (context, userId) {
        var socketLoginUserId = context.$moment.wxUserInfo.accountId || userId
        context.$moment.ws = new WebSocket('ws://47.93.201.234:8080/AnychatServer/ws')
        context.$moment.ws.onopen = () => {
          context.$comfun.console(context, 'webSocket 开启，开始登陆')
          context.$comfun.webSend(context, {
            wsOpCode: context.$moment.wsChatCode.LOGIN_CHAT_SERVER_C,
            token: socketLoginUserId
          })
        }
        context.$moment.ws.onmessage = (evt) => {
          if (evt && evt.data) {
            var receiveData = JSON.parse(evt.data)
            context.$comfun.console(context, 'webSocket 接收到数据 code - ' + receiveData.wsOpCode, evt)
            context.$root.eventHub.$emit('ws-get-msg', receiveData)
            switch (receiveData.wsOpCode) {
              case context.$moment.wsChatCode.LOGIN_CHAT_SERVER_S:
                context.$comfun.console(context, '用户 webSocket 登陆成功')
                context.$moment.wsIsOpen = true
                break
              case context.$moment.wsChatCode.USER_KICK_S:
                context.$comfun.console(context, '用户 webSocket 被踢下线，尝试重新登陆')
                context.$moment.wsIsOpen = false
                context.$comfun.console(context, '重新调用登陆')
                context.$comfun.webSend(context, {
                  wsOpCode: context.$moment.wsChatCode.LOGIN_CHAT_SERVER_C,
                  token: socketLoginUserId
                })
                break
              case context.$moment.wsChatCode.AGAIN_CONNECT_S:
                context.$comfun.console(context, 'webSocket 通知用户重连，尝试重新登陆')
                context.$moment.wsIsOpen = false
                context.$comfun.console(context, '重新调用登陆')
                context.$comfun.webSend(context, {
                  wsOpCode: context.$moment.wsChatCode.LOGIN_CHAT_SERVER_C,
                  token: socketLoginUserId
                })
                break
            }
          } else {
            context.$comfun.console(context, 'webSocket 接收到数据', evt)
          }
        }
        context.$moment.ws.onclose = (evt) => {
          context.$moment.wsIsOpen = false
          context.$comfun.console(context, 'webSocket 已关闭', evt)
          context.$comfun.console(context, '重新初始化 webSocket')
          context.$comfun.webSocketInit(context)
        }
        context.$moment.ws.onerror = (evt) => {
          context.$comfun.console(context, 'webSocket 出错', evt)
        }
      },
      // webSocket发送聊天信息
      webSend (context, data) {
        if (context.$moment.ws !== null) {
          context.$comfun.console(context, 'webSocket 准备发送数据', data)
          var blob = new Blob([JSON.stringify(data)])
          context.$moment.ws.send(blob)
        } else {
          context.$comfun.console(context, 'webSocket 对象为 null')
        }
      },
      // 断开 socket
      webClose (context) {
        if (context.$moment.ws !== null) {
          context.$moment.ws.close()
        }
      },
      // 转义 html 标签代码
      HTMLEncode (html) {
        var temp = document.createElement('div')
        temp.textContent != null ? (temp.textContent = html) : (temp.innerText = html)
        var output = temp.innerHTML
        temp = null
        return output
      },
      // 反转义 html 标签代码
      HTMLDecode (text) {
        var temp = document.createElement('div')
        temp.innerHTML = text
        var output = temp.innerText || temp.textContent
        temp = null
        return output
      },
      // 更新localstorge中的用户信息
      updateUserInfo: function (context, updateUserInfo) {
        if (updateUserInfo) {
          for (let key in updateUserInfo) {
            if (context.$moment.wxUserInfo[key] !== undefined && context.$comfun.isNotNull(updateUserInfo[key])) {
              context.$moment.wxUserInfo[key] = updateUserInfo[key]
              window.localStorage.setItem('wx-user-info', JSON.stringify(context.$moment.wxUserInfo))
            }
          }
        }
      },
      // 将localStorage中保存的微信相关信息保存到本地
      getWxUserInfoDataToLocal: function (context) {
        var wxUserInfoData = window.localStorage.getItem('wx-user-info')
        if (context.$comfun.isNotNull(wxUserInfoData)) {
          var wxUserInfoDataJson = JSON.parse(wxUserInfoData)
          if (context.$comfun.isNotNull(wxUserInfoDataJson.openid) && context.$comfun.isNotNull(wxUserInfoDataJson.accountId)) {
            context.$moment.wxUserInfo.accountId = wxUserInfoDataJson.accountId
            context.$moment.wxUserInfo.openid = wxUserInfoDataJson.openid
            context.$moment.wxUserInfo.nickname = wxUserInfoDataJson.nickname
            context.$moment.wxUserInfo.sex = wxUserInfoDataJson.sex
            context.$moment.wxUserInfo.province = wxUserInfoDataJson.province
            context.$moment.wxUserInfo.city = wxUserInfoDataJson.city
            context.$moment.wxUserInfo.country = wxUserInfoDataJson.country
            context.$moment.wxUserInfo.headimgurl = wxUserInfoDataJson.headimgurl
            context.$moment.wxUserInfo.privilege = wxUserInfoDataJson.privilege
            context.$moment.wxUserInfo.unionid = wxUserInfoDataJson.unionid || ''
            // 完善资料后的参数
            context.$moment.wxUserInfo.birthday = wxUserInfoDataJson.birthday
            context.$moment.wxUserInfo.carType = wxUserInfoDataJson.carType
            context.$moment.wxUserInfo.constellation = wxUserInfoDataJson.constellation
            context.$moment.wxUserInfo.phoneNum = wxUserInfoDataJson.phoneNum
            context.$moment.wxUserInfo.intro = wxUserInfoDataJson.intro
          }
        }
      },
      // 微信网页授权oauth2，scope：snsapi_base、snsapi_userinfo
      wx_oauth2: function (context, scope, callback) {
        // 显示日志面板
        if (context.$moment.wxIsDebug) {
          context.$consolePopWindow(context)
        }
        context.$comfun.getWxUserInfoDataToLocal(context)
        if (!context.$comfun.isNotNull(context.$moment.wxUserInfo.openid) || !context.$comfun.isNotNull(context.$moment.wxUserInfo.accountId)) {
          var urlParams = context.$comfun.getRequest()
          if (!context.$comfun.isNotNull(urlParams.code)) {
            context.$loading('账号授权中...')
            var oauth2Url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${context.$moment.wxAppId}&redirect_uri=${context.$moment.indexPage}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
            window.location.replace(oauth2Url)
          } else {
            context.$comfun.wx_get_access_token_by_code(context)
          }
        } else {
          context.$loading('初始化账号信息中...')
          context.$comfun.http_get(context, context.$moment.urls.get_user_info_by_id + '?id=' + context.$moment.wxUserInfo.accountId).then((response) => {
            if (response.body.code === '0000' && response.body.success === true) {
              context.$moment.wxUserInfo.headimgurl = context.$comfun.isNotNull(response.body.data.headimg) ? response.body.data.headimg : ''
              context.$moment.wxUserInfo.birthday = context.$comfun.isNotNull(response.body.data.birthday) ? response.body.data.birthday : ''
              context.$moment.wxUserInfo.carType = context.$comfun.isNotNull(response.body.data.carList) ? response.body.data.carList : ''
              context.$moment.wxUserInfo.constellation = context.$comfun.isNotNull(response.body.data.constellation) ? response.body.data.constellation : ''
              context.$moment.wxUserInfo.phoneNum = context.$comfun.isNotNull(response.body.data.phone) ? response.body.data.phone : ''
              context.$moment.wxUserInfo.address = context.$comfun.isNotNull(response.body.data.city) ? response.body.data.city : ''
              context.$moment.wxUserInfo.intro = context.$comfun.isNotNull(response.body.data.signature) ? response.body.data.signature : ''
              window.localStorage.setItem('wx-user-info', JSON.stringify(context.$moment.wxUserInfo))
              if (callback !== undefined && typeof callback === 'function') {
                callback()
              }
              context.$comfun.wx_page_signature(context)
            } else {
              context.$toast('初始化账号信息失败')
            }
          })
        }
      },
      // 通过code换取网页授权access_token
      wx_get_access_token_by_code: function (context) {
        var accessTokenPromise = new Promise((resolve, reject) => {
          context.$loading('初始化信息中...')
          var urlParams = context.$comfun.getRequest()
          context.$comfun.http_get(context, `${context.$moment.urls.get_user_info}${urlParams.code}`).then((response) => {
            if (response.body.code === '0000' && response.body.success === true) {
              context.$moment.wxUserInfo.accountId = response.body.data.accountId
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
            } else {
              context.$toast('通过code获取用户信息失败')
            }
          }, (response) => {
            reject(response)
          })
        })
        return accessTokenPromise
      },
      // 微信获取页面签名信息
      wx_page_signature: function (context) {
        var wxPageSignaturePromise = new Promise((resolve, reject) => {
          if (context.$comfun.isNotNull(context.$moment.wxUserInfo.openid)) {
            context.$loading('初始化签名中...')
            var pageUrl = context.$moment.realm + context.$comfun.getCurrentUrl().pathname
            context.$comfun.http_post(context, `${context.$moment.urls.get_wx_page_signature}`, {
              url: pageUrl,
              openid: context.$moment.wxUserInfo.openid
            }).then((response) => {
              if (response.body.code === '0000' && response.body.success === true) {
                context.$moment.wx.ready(() => {
                  context.$loading_close()
                  context.$toast('配置页面签名信息成功')
                })
                context.$moment.wx.error((res) => {
                  context.$loading_close()
                  context.$toast('配置页面签名信息失败')
                  context.$comfun.console(context, '配置页面签名信息失败', res)
                })

                context.$loading('配置页面签名信息中...')
                context.$moment.wx.config({
                  debug: context.$moment.wxIsDebug,
                  appId: context.$moment.wxAppId,
                  timestamp: response.body.data.timestamp,
                  nonceStr: response.body.data.nonceStr,
                  signature: response.body.data.signature,
                  jsApiList: context.$moment.jsApiList
                })
              } else {
                context.$toast('获取签名信息失败')
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
        var chooseImagePromise = new Promise((resolve, reject) => {
          context.$moment.wx.chooseImage({
            count: maxChoose,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              context.$comfun.console(context, '微信选取图片完成', res)
              resolve(res)
            }
          })
        })
        return chooseImagePromise
      },
      // 微信 - 上传图片到微信服务器
      wxUploadImage: function (context, localId, isShowProgressTips) {
        var uploadImagePromise = new Promise((resolve, reject) => {
          var isShowProgress = isShowProgressTips || 1
          context.$moment.wx.uploadImage({
            localId: localId,
            isShowProgressTips: isShowProgress, // 默认为1，显示进度提示
            success: function (res) {
              context.$comfun.console(context, '微信 - 上传图片到微信服务器', res)
              resolve(res)
            }
          })
        })
        return uploadImagePromise
      },
      // 保存微信临时服务器的图片到本地服务器
      saveWxImg: function (context, mediaId) {
        var saveWxImgPromise = new Promise((resolve, reject) => {
          context.$comfun.http_get(context, `${context.$moment.urls.save_wx_image}?mediaId=${mediaId}`).then((response) => {
            resolve(response)
          }, (response) => {
            reject(response)
          })
        })
        return saveWxImgPromise
      }
    }

    Object.defineProperty(Vue.prototype, '$comfun', { value: ComFun })
  }
}
