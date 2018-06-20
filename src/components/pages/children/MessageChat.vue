<template>
  <div @touchstart="touchStart" @touchmove="touchMove">
    <transition-group :name="chatContentListTrsName" tag="div" class="chat-content-wrap" ref="chat-content-wrap">
      <div v-for="(chat, index) in chatList" :key="index" :class="['chat-item', chat.isMe ? 'right' : 'left']">
        <span class="head" :style="chat.head ? { 'background-image': 'url(' + chat.head + ')' } : ''"></span>
        <div class="content-wrap">
          <div class="chat-time-name" v-if="chat.isMe">
            <span>{{chat.time}}</span>
            <span>{{chat.nikeName}}</span>
          </div>
          <div class="chat-time-name" v-if="!chat.isMe">
            <span>{{chat.nikeName}}</span>
            <span>{{chat.time}}</span>
          </div>
          <div :class="['chat-content', chat.isBig === true ? 'chat-content-big-img' : '', chat.isMe ? 'chat-content-self' : 'chat-content-friend']" v-html="chat.content"></div>
        </div>
      </div>
    </transition-group>
    <div id="face-wrap" ref="face-wrap" class="touchIgnore"></div>
    <div class="chat-input-wrap touchIgnore">
      <div id="edit" ref="edit" class="touchIgnore placeholder" @focus="focusInput" @blur="blurInput" @input="contentInput" contenteditable="true">请输入消息内容</div>
      <span class="touchIgnore" @click="selectFace"></span>
      <span class="chat-add-btn touchIgnore" style="display: block;" ref="chat-add-btn"></span>
      <span class="chat-send-btn ripple touchIgnore" style="display: none;" ref="chat-send-btn" @click="chatSend($event)">发送</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message-chat',
  data () {
    return {
      friendResiveTimer: null,
      chatContentListTrsName: 'me-chat',
      chatContentInput: '',
      chatContentInputHtml: '',
      chatList: []
    }
  },
  activated () {
    this.chatList = this.$moment.message_chat_content[this.$route.params.chatid] || []
    this.scrollTobottom()
  },
  deactivated () {
    clearTimeout(this.friendResiveTimer)
    this.chatList = []
  },
  methods: {
    focusInput () {
      this.$face_close()
      if (event.target.classList.contains('placeholder')) {
        event.target.classList.remove('placeholder')
        event.target.innerHTML = ''
      }
      event.target.focus()
    },
    blurInput () {
      this.$face_close()
      if (!event.target.classList.contains('placeholder') && !event.target.classList.contains('inputing')) {
        event.target.classList.add('placeholder')
        event.target.innerHTML = '请输入消息内容'
      }
    },
    contentInput () {
      this.$face_close()
      this.chatContentInput = event.target.innerText
      this.chatContentInputHtml = event.target.innerHTML
      if (event.target.innerHTML.length > 0) {
        event.target.classList.add('inputing')
        setTimeout(() => {
          var currentpos = this.$refs.edit.scrollHeight * 100
          this.$refs.edit.scrollTop = currentpos
        }, 100)
      } else {
        event.target.classList.remove('inputing')
      }
    },
    touchStart () {
      if (!event.target.classList.contains('touchIgnore')) {
        this.$face_close()
      }
    },
    touchMove () {
      if (!event.target.classList.contains('touchIgnore')) {
        this.$face_close()
      }
    },
    scrollTobottom () {
      setTimeout(() => {
        var currentpos = this.$refs['chat-content-wrap'].$el.scrollHeight * 100
        this.$refs['chat-content-wrap'].$el.scrollTop = currentpos
      }, 100)
    },
    friendResive () {
      this.friendResiveTimer = setTimeout(() => {
        this.chatContentListTrsName = 'friend-chat'
        var newResiveData = {
          head: 'http://img01.store.sogou.com/app/a/10010016/80f52439c4ed48b974a3a756cb5b9bfe',
          nikeName: '刘德华',
          time: '2/18 16:23:30',
          content: this.chatList[this.chatList.length - 1].content,
          isMe: false,
          isBig: this.chatList[this.chatList.length - 1].isBig
        }
        this.chatList.push(newResiveData)
        this.$moment.message_chat_content[this.$route.params.chatid] = this.chatList
        this.scrollTobottom()
      }, 3000)
    },
    chatSend (event, chatContent, isBig) {
      var thisChatContent = chatContent || this.chatContentInputHtml.trim()
      this.chatContentListTrsName = 'me-chat'
      var newSendData = {
        head: 'http://img01.store.sogou.com/app/a/10010016/80f52439c4ed48b974a3a756cb5b9bfe',
        nikeName: '刘德华',
        time: '2/18 16:23:30',
        content: thisChatContent,
        isMe: true,
        isBig: isBig === undefined ? false : isBig
      }
      this.chatList.push(newSendData)
      this.$moment.message_chat_content[this.$route.params.chatid] = this.chatList
      this.scrollTobottom()
      this.$refs.edit.innerHTML = ''
      this.chatContentInput = ''
      this.chatContentInputHtml = ''
      if (!this.$refs.edit.classList.contains('placeholder') && this.$refs.edit.classList.contains('inputing')) {
        this.$refs.edit.classList.remove('inputing')
        this.$refs.edit.classList.add('placeholder')
        this.$refs.edit.innerHTML = '请输入消息内容'
      }
      this.$face_close()
      this.friendResive()
    },
    selectFace () {
      this.$face(this, {
        rootElem: this.$refs['face-wrap'],
        type: 'chat',
        otherClass: 'touchIgnore',
        callBack: (faceImg, isBig, faceImgHtml) => {
          if (isBig === true) {
            this.chatSend(event, faceImgHtml, true)
          } else {
            if (this.$refs.edit.classList.contains('placeholder')) {
              this.$refs.edit.classList.remove('placeholder')
              this.$refs.edit.classList.add('inputing')
              this.$refs.edit.innerHTML = ''
            }
            this.$refs.edit.appendChild(faceImg)
            this.chatContentInput = this.$refs.edit.innerText
            this.chatContentInputHtml = this.$refs.edit.innerHTML
            setTimeout(() => {
              var currentpos = this.$refs.edit.scrollHeight * 100
              this.$refs.edit.scrollTop = currentpos
            }, 100)
          }
        }
      })
    }
  },
  watch: {
    chatContentInputHtml (newValue, oldValue) {
      var chatAddBtn = this.$refs['chat-add-btn']
      var chatSendBtn = this.$refs['chat-send-btn']
      if (newValue.trim()) {
        if (chatSendBtn.style.display === 'none') {
          chatAddBtn.style.display = 'none'
          chatSendBtn.style.opacity = 0
          chatSendBtn.style.display = 'block'
          setTimeout(() => {
            chatSendBtn.style.opacity = 1
          }, 10)
        }
      } else {
        if (chatAddBtn.style.display === 'none') {
          chatSendBtn.style.display = 'none'
          chatAddBtn.style.opacity = 0
          chatAddBtn.style.display = 'block'
          setTimeout(() => {
            chatAddBtn.style.opacity = 1
          }, 10)
        }
      }
    }
  }
}
</script>

<style scoped>
#content-wrap {
  height: 100vh;
  z-index: 99;
  background: rgb(30, 20, 54);
  overflow: hidden;
}

.chat-content-wrap {
  position: absolute;
  width: 100%;
  height: calc(100% - 3.6rem - 14px);
  top: 0;
  left: 0;
  padding-bottom: 14px;
  overflow-x: hidden;
  overflow-y: auto;
}

.chat-content-wrap>div.chat-item {
  position: relative;
  max-width: calc(100% - 4rem);
  min-height: 4rem;
  overflow-x: hidden;
}

.chat-content-wrap>div.chat-item:nth-of-type(n + 2) {
  margin-top: 4px;
}

.chat-content-wrap>div.left {
  left: 0;
}

.chat-content-wrap>div.right {
  margin-left: 4rem;
}

.chat-content-wrap>div.chat-item>span.head {
  position: absolute;
  display: block;
  top: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
}

.chat-content-wrap>div.left>span.head {
  left: 0.6rem;
}

.chat-content-wrap>div.right>span.head {
  right: 0.6rem;
}

.chat-content-wrap>div.chat-item>div.content-wrap {
  position: relative;
  display: inline-block;
  margin-top: 0.8rem;
  width: calc(100% - 3rem - 0.6rem - 0.6rem);
}

.chat-content-wrap>div.chat-item>div.content-wrap>div.chat-time-name {
  position: relative;
  display: block;
  margin-bottom: 6px;
}

.chat-content-wrap>div.chat-item>div.content-wrap>div.chat-content {
  position: relative;
  display: inline-block;
  border-radius: 5px;
  background-color: #5c4592;
  padding: 0.4rem 0.9rem;
  line-height: 1.4rem;
  font-size: 0.9rem;
  max-width: 100%;
  word-break: break-all;
  word-wrap: break-word;
}

.chat-content-wrap>div.chat-item>div.content-wrap>div.chat-content::after {
  content: '';
  position: absolute;
  width: 0.6rem;
  height: 1rem;
  background-color: #5c4592;
  top: 0.4rem;
  z-index: -1;
}

.chat-content-wrap>div.left>div.content-wrap>div.chat-content::after {
  transform: skewX(30deg) rotate(190deg);
  left: -0.08rem;
}

.chat-content-wrap>div.right>div.content-wrap>div.chat-content::after {
  transform: skewX(330deg) rotate(170deg);
  right: -0.08rem;
}

.chat-content-wrap>div.chat-item>div.content-wrap>div.chat-content-big-img {
  background-color: transparent !important;
}

.chat-content-wrap>div.chat-item>div.content-wrap>div.chat-content-big-img::after {
  background-color: transparent !important;
}

.chat-content-wrap>div.chat-item>div.content-wrap>div.chat-content-friend {
  background-color: #2c1f4a;
}

.chat-content-wrap>div.chat-item>div.content-wrap>div.chat-content-friend::after {
  background-color: #2c1f4a;
}

.chat-content-wrap>div.left>div.content-wrap {
  text-align: left;
  margin-left: calc(3rem + 0.6rem + 0.6rem);
}

.chat-content-wrap>div.left>div.content-wrap>div.chat-time-name {
  text-align: left;
}

.chat-content-wrap>div.left>div.content-wrap>div.chat-time-name>span:nth-of-type(1) {
  color: #bfb3dc;
  margin-right: 6px;
}

.chat-content-wrap>div.left>div.content-wrap>div.chat-time-name>span:nth-of-type(2) {
  color: #8b7caf;
}

.chat-content-wrap>div.left>div.content-wrap>div.chat-content {
  text-align: left;
}

.chat-content-wrap>div.right>div.content-wrap {
  text-align: right;
}

.chat-content-wrap>div.right>div.content-wrap>div.chat-time-name {
  text-align: right;
}

.chat-content-wrap>div.right>div.content-wrap>div.chat-time-name>span:nth-of-type(1) {
  color: #8b7caf;
  margin-right: 6px;
}

.chat-content-wrap>div.right>div.content-wrap>div.chat-time-name>span:nth-of-type(2) {
  color: #bfb3dc;
}

.chat-content-wrap>div.right>div.content-wrap>div.chat-content {
  text-align: left;
}

.me-chat-enter-active, .me-chat-leave-active {
  transition: all 0.6s;
}
.me-chat-enter, .me-chat-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.friend-chat-enter-active, .friend-chat-leave-active {
  transition: all 0.6s;
}
.friend-chat-enter, .friend-chat-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.chat-input-wrap {
  position: fixed;
  width: 100%;
  height: 3.6rem;
  left: 0;
  bottom: 0;
  background: #2c1f4a;
}

.chat-input-wrap>span {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  display: inline-block;
  width: 2.8rem;
  height: 2.8rem;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 76% 76%;
}

.chat-input-wrap>span:nth-of-type(1) {
  width: 2rem;
  height: 2rem;
  right: calc(2.8rem + 0.5rem + 4px);
  background-image: url('./../../../assets/chat-face.png');
}

.chat-input-wrap>span.chat-add-btn {
  right: 0.5rem;
  background-image: url('./../../../assets/chat-add.png');
  transition: opacity 0.3s ease 0s;
  display: block;
}

.chat-input-wrap>span.chat-send-btn {
  right: 0.5rem;
  background: rgb(90, 64, 158);
  width: 2.5rem;
  height: 1.8rem;
  line-height: 1.92rem;
  border-radius: 2px;
  text-align: center;
  color: #af9be2;
  font-size: 0.8rem;
  text-shadow: 0 0 2px rgba(27, 18, 46, 0.4);
  box-shadow: 0 0 4px rgba(78, 60, 116, 0.4);
  transition: opacity 0.3s ease 0s;
  display: none;
}

#edit {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.5rem;
  margin: auto 0;
  display: inline-block;
  width: calc(100% - 3.8rem - 20px - 2.2rem - 2px);
  height: calc(2rem - 14px);
  border: none;
  outline: none;
  border-radius: calc(2rem - 16px);
  background-color: #433564;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 6px 2.2rem 8px 20px;
  color: #ffffff;
  font-size: 0.9rem;
}

#edit::-webkit-scrollbar {
  display: none;
}

.placeholder {
  color: #685d82 !important;
}

#face-wrap {
  position: fixed;
  width: 100%;
  bottom: 3.2rem;
  left: 0;
  background: #443763;
  font-size: 0;
}
</style>
