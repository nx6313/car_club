export default {
  install: function (Vue, options) {
    var AppConfig = {
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
