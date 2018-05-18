export default {
  install: function (Vue, options) {
    var AppConfig = {
      // 记录 一级页面 - 消息，关注好友列表是否展开。 -1 未记录、0 关闭、1 展开
      message_attention_friend_toggle_state: -1
    }

    Object.defineProperty(Vue.prototype, '$moment', { value: AppConfig })
  }
}
