var wx = require('weixin-js-sdk')

var HttpIp = '172.18.168.44'
var HttpPort = '9007'

var WxAppId = 'wxb50ca85248d03eaa'
var WxSecret = '6c11623d913f9f030bb4a09e6765d360'

export default {
  install: function (Vue, options) {
    var AppConfig = {
      // eslint-disable-next-line
      player: TcPlayer, // 腾讯视频播放器对象
      // 微信包
      wx: wx,
      // 域名地址
      realm: 'http://l.dachangjr.com',
      // 服务器地址
      server: 'http://' + HttpIp + ':' + HttpPort + '/',
      // 访问接口
      urls: {
        get_user_info_by_id: '/user/info.json', // 根据用户id获取用户信息，完整数据
        get_user_info: '/user/wx/openid/', // 根据code获取微信用户基本信息
        get_wx_page_signature: '/user/wx/signature.json', // 获取微信页面接口签名信息
        save_account_info: '/account/create.json', // 保存微信获取到的用户基础信息
        save_wx_image: '/user/wx/savewximg.json', // 保存微信上传的图片
        save_user_info: '/user/save.json', // 保存或更新用户个人信息
        upload_video: '/uploadimg/upload_video.json', // 上传视频
        save_issue: '/news/create.json', // 发布动态
        get_new_info: '/news/getNewinfo.json', // 获取动态列表数据
        praise: '/news/praise.json', // 赞动态
        save_comment: '/news/saveComment.json', // 动态发布评论
        attention: '/user/attention.json', // 关注好友
        praisecomment: '/news/praisecomment.json', // 给评论点赞
        heatInfo: '/user/heatInfo.json', // 获取用户的点赞数，关注数，好友数，粉丝数
        idol: '/user/idol.json', // 获取用户关注的用户列表
        fans: '/user/fans.json', // 获取用户的粉丝列表
        friend: '/user/friend.json', // 获取用户的好友列表
        getNewinfobyIdoi: '/news/getNewinfobyIdoi.json', // 分页获取我关注圈子信息
        getComment: '/news/getComment.json', // 获取动态评论
        getCommentinfo: '/news/getCommentinfo.json', // 获取用户圈子相关评论信息
        getPraiseinfo: '/news/getPraiseinfo.json', // 获取用户圈子相关赞信息
        getAtInfo: '/news/getAtInfo.json', // 获取我的At列表
        getnum: '/news/getnum.json' // 获取某人的动态个数
      },
      // 微信是否开启调试模式，也会一并开启自定义的调试面板
      wxIsDebug: true,
      // 微信AppId
      wxAppId: WxAppId,
      // 微信Secret
      wxSecret: WxSecret,
      // 微信授权后指定的跳转页面
      indexPage: encodeURIComponent('http://l.dachangjr.com/dist/#/'),
      indexPage_: 'http://l.dachangjr.com/dist/',
      // 微信功能页面授权接口列表
      jsApiList: [
        'chooseImage', 'uploadImage'
      ],
      // 微信用户授权后，获取到的用户信息
      wxUserInfo: {
        accountId: '',
        openid: '',
        nickname: '',
        sex: '',
        province: '',
        city: '',
        country: '',
        headimgid: '',
        headimgurl: '',
        privilege: [],
        unionid: '',
        // 完善资料后的参数
        birthday: '',
        carType: '',
        constellation: '',
        phoneNum: '',
        address: '',
        intro: ''
      },
      // 记录 一级页面 - 消息，关注好友列表是否展开。 -1 未记录、0 关闭、1 展开
      message_attention_friend_toggle_state: -1,
      // 记录 一级页面 - 关注，关注页面当前浏览到的位置。
      attention_page_scroll_top: 0,
      // 记录 一级页面 - 关注，关注页面列表数据。
      attention_page_data_list: [],
      // 记录 二级页面 - 聊天，记录用户的聊天内容。
      message_chat_content: {},
      face_imgs: [
        {
          title: '默认',
          faces: [
            require('@/assets/faces/default/1.gif'), require('@/assets/faces/default/2.gif'),
            require('@/assets/faces/default/3.gif'), require('@/assets/faces/default/4.gif'),
            require('@/assets/faces/default/5.gif'), require('@/assets/faces/default/6.gif'),
            require('@/assets/faces/default/7.gif'), require('@/assets/faces/default/8.gif'),
            require('@/assets/faces/default/9.gif'), require('@/assets/faces/default/10.gif'),
            require('@/assets/faces/default/11.gif'), require('@/assets/faces/default/12.gif'),
            require('@/assets/faces/default/13.gif'), require('@/assets/faces/default/14.gif'),
            require('@/assets/faces/default/15.gif'), require('@/assets/faces/default/16.gif'),
            require('@/assets/faces/default/17.gif'), require('@/assets/faces/default/18.gif'),
            require('@/assets/faces/default/19.gif'), require('@/assets/faces/default/20.gif'),
            require('@/assets/faces/default/21.gif'), require('@/assets/faces/default/22.gif'),
            require('@/assets/faces/default/23.gif'), require('@/assets/faces/default/24.gif'),
            require('@/assets/faces/default/25.gif'), require('@/assets/faces/default/26.gif'),
            require('@/assets/faces/default/27.gif'), require('@/assets/faces/default/28.gif'),
            require('@/assets/faces/default/29.gif'), require('@/assets/faces/default/30.gif'),
            require('@/assets/faces/default/31.gif')
          ]
        },
        {
          title: '戳一戳',
          size: 'big',
          type: 'chat',
          faces: [
            require('@/assets/faces/chuo/1.gif'), require('@/assets/faces/chuo/2.gif'),
            require('@/assets/faces/chuo/3.gif'), require('@/assets/faces/chuo/4.gif'),
            require('@/assets/faces/chuo/5.gif'), require('@/assets/faces/chuo/6.gif'),
            require('@/assets/faces/chuo/7.gif'), require('@/assets/faces/chuo/8.gif'),
            require('@/assets/faces/chuo/9.gif'), require('@/assets/faces/chuo/10.gif'),
            require('@/assets/faces/chuo/11.gif'), require('@/assets/faces/chuo/12.gif'),
            require('@/assets/faces/chuo/13.gif'), require('@/assets/faces/chuo/14.gif'),
            require('@/assets/faces/chuo/15.gif'), require('@/assets/faces/chuo/16.gif'),
            require('@/assets/faces/chuo/17.gif'), require('@/assets/faces/chuo/18.gif')
          ]
        }
      ]
    }

    Object.defineProperty(Vue.prototype, '$moment', { value: AppConfig })
  }
}
