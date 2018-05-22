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
      toastElem.style.bottom = '4rem'
      toastElem.style.padding = '0.3rem 0.6rem'
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

    Vue.prototype.$pageImg = function (imgSrc, clientX, clientY, root) {
      var imgRoot = root || document.body
      var imgPopElem = document.createElement('img')
      imgPopElem.classList.add('img-pop')
      imgPopElem.src = imgSrc
      imgPopElem.style.width = (rd(20, 60)) + 'px'
      imgPopElem.style.position = 'absolute'
      imgPopElem.style.top = (clientY + rd(-10, 10) - 20) + 'px'
      imgPopElem.style.left = (clientX + rd(-10, 10) - 20) + 'px'
      imgPopElem.style.zIndex = 99999999
      imgPopElem.style.opacity = 0
      imgPopElem.style.transform = `rotate(${rd(-20, 20)}deg)`
      imgPopElem.style.transition = 'opacity 0.8s ease 0s'
      imgRoot.appendChild(imgPopElem)
      setTimeout(() => {
        imgPopElem.style.opacity = 1
        imgPopElem.style.transition = 'all 0.8s ease 0s'
        imgPopElem.style.top = (imgPopElem.offsetTop + rd(-50, 50)) + 'px'
        imgPopElem.style.left = (imgPopElem.offsetLeft + rd(-50, 50)) + 'px'
        setTimeout(() => {
          imgPopElem.style.opacity = 0
          setTimeout(() => {
            imgRoot.removeChild(imgPopElem)
          }, 900)
        }, 400)
      }, 20)
    }

    Vue.prototype.$pageImgExist = function (root) {
      var imgRoot = root || document.body
      var imgPopElems = imgRoot.getElementsByClassName('img-pop')
      if (imgPopElems.length > 0) {
        return true
      }
      return false
    }
  }
}

function rd (n, m) {
  var c = m - n + 1
  return Math.floor(Math.random() * c + n)
}
