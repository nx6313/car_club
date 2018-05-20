var toastOpacityTimer, toastRemoveTimer
export default {
  install: function (Vue, options) {
    Vue.prototype.$toast = function (content, option) {
      if (document.getElementById('toast-message-box')) {
        document.body.removeChild(document.getElementById('toast-message-box'))
        clearTimeout(toastOpacityTimer)
        clearTimeout(toastRemoveTimer)
      }
      var params = option || {}
      var background = params.background || 'rgba(0, 0, 0, 1)'
      var color = params.color || 'rgba(255, 255, 255, 1)'
      var toastElem = document.createElement('span')
      toastElem.id = 'toast-message-box'
      toastElem.style.position = 'absolute'
      toastElem.style.left = '50%'
      toastElem.style.bottom = '80px'
      toastElem.style.padding = '3px 8px'
      toastElem.style.whiteSpace = 'nowrap'
      toastElem.style.display = 'inline-block'
      toastElem.style.transition = 'opacity 0.5s ease 0s'
      toastElem.style.opacity = 0
      toastElem.style.fontSize = '0.6rem'
      toastElem.style.borderRadius = '4px'
      toastElem.innerHTML = content
      toastElem.style.zIndex = 999999999
      toastElem.style.background = background
      toastElem.style.color = color
      document.body.appendChild(toastElem)
      toastElem.style.left = `calc(50% - ${toastElem.clientWidth / 2}px)`
      toastElem.style.opacity = 1
      var duration = params.duration || 1000
      toastOpacityTimer = setTimeout(() => {
        toastElem.style.opacity = 0
        toastRemoveTimer = setTimeout(() => {
          document.body.removeChild(toastElem)
        }, 0.5 * 1000)
      }, duration)
    }
  }
}
