var wx = require('weixin-js-sdk')

var HttpIp = '172.18.168.44'
var HttpPort = '9007'

var WxAppId = 'wxb50ca85248d03eaa'
var WxSecret = '6c11623d913f9f030bb4a09e6765d360'

export default {
  install: function (Vue, options) {
    var AppConfig = {
      // 微信包
      wx: wx,
      // 域名地址
      realm: 'http://l.dachangjr.com',
      // 服务器地址
      server: 'http://' + HttpIp + ':' + HttpPort + '/',
      // 访问接口
      urls: {
        get_user_info: '/user/wx/openid/',
        get_wx_page_signature: '/user/wx/signature.json',
        save_account_info: '/account/create.json'
      },
      // 微信AppId
      wxAppId: WxAppId,
      // 微信Secret
      wxSecret: WxSecret,
      // 微信授权后指定的跳转页面
      indexPage: encodeURIComponent('http://l.dachangjr.com/dist/#/'),
      indexPage_: 'http://l.dachangjr.com/dist/',
      // 微信用户授权后，获取到的用户信息
      wxUserInfo: {
        openid: '',
        nickname: '',
        sex: '',
        province: '',
        city: '',
        country: '',
        headimgurl: '',
        privilege: [],
        unionid: ''
      },
      // 记录 一级页面 - 消息，关注好友列表是否展开。 -1 未记录、0 关闭、1 展开
      message_attention_friend_toggle_state: -1,
      // 记录 一级页面 - 关注，关注页面当前浏览到的位置。
      attention_page_scroll_top: 0,
      // 记录 二级页面 - 聊天，记录用户的聊天内容。
      message_chat_content: {}
    }

    Object.defineProperty(Vue.prototype, '$moment', { value: AppConfig })
  }
}
