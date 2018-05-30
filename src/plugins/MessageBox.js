var toastOpacityTimer, toastRemoveTimer
export default {
  install: function (Vue, options) {
    // toast弹出层
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

    // 显示出指定图片的类似点赞效果
    Vue.prototype.$pageImg = function (imgSrcs, clientX, clientY, root) {
      var imgRoot = root || document.body
      var imgPopElem = document.createElement('img')
      imgPopElem.classList.add('img-pop')
      imgPopElem.src = imgSrcs[rd(0, imgSrcs.length - 1)]
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

    Vue.prototype.$consolePopWindow = function () {
      if (document.getElementById('console-drag-elem')) {
        return false
      }
      var dragElem = document.createElement('span')
      dragElem.id = 'console-drag-elem'
      dragElem.style.display = 'block'
      dragElem.style.width = '3rem'
      dragElem.style.height = '3rem'
      dragElem.style.position = 'absolute'
      dragElem.style.top = '2rem'
      dragElem.style.left = 'calc(100% - 3rem)'
      dragElem.style.borderRadius = '3rem'
      dragElem.style.boxShadow = 'rgba(239, 129, 21, 0.68) 0px 0px 40px inset'
      dragElem.style.background = 'rgb(254, 253, 252)'
      dragElem.style.zIndex = 999999999
      dragElem.style.textAlign = 'center'
      dragElem.style.lineHeight = '3rem'
      dragElem.innerHTML = '日志'
      dragElem.style.textShadow = '0 0 8px rgba(239, 130, 24, .8)'
      dragElem.style.fontWeight = 'bold'
      dragElem.style.fontSize = '14px'
      dragElem.style.color = 'rgb(183, 124, 49)'
      dragElem.style.cursor = 'pointer'
      dragElem.style.outline = 'none'
      document.body.appendChild(dragElem)
      dragElem.onclick = function () {
        if (document.getElementById('console-panl-wrap')) {
          document.getElementById('console-panl-wrap').style.transform = 'translateY(100%)'
          document.getElementById('console-panl-wrap').style.opacity = 0
          setTimeout(() => {
            document.body.removeChild(document.getElementById('console-panl-wrap'))
          }, 410)
          return false
        }
        var consolePanlWrapElem = document.createElement('div')
        consolePanlWrapElem.id = 'console-panl-wrap'
        consolePanlWrapElem.style.background = 'rgba(39, 35, 49)'
        consolePanlWrapElem.style.width = '100%'
        consolePanlWrapElem.style.height = '100%'
        consolePanlWrapElem.style.position = 'absolute'
        consolePanlWrapElem.style.bottom = 0
        consolePanlWrapElem.style.left = 0
        consolePanlWrapElem.style.zIndex = 999999998
        consolePanlWrapElem.style.transition = 'all 0.4s ease 0s'
        consolePanlWrapElem.style.transform = 'translateY(100%)'
        consolePanlWrapElem.style.opacity = 0
        document.body.appendChild(consolePanlWrapElem)
        consolePanlWrapElem.ontouchstart = function () {}
        consolePanlWrapElem.ontouchmove = function () {}
        consolePanlWrapElem.ontouchend = function () {}
        consolePanlWrapElem.ontouchcancel = function () {}
        setTimeout(() => {
          consolePanlWrapElem.style.transform = 'translateY(0px)'
          consolePanlWrapElem.style.opacity = 1
        }, 100)
      }
      if (window.DeviceMotionEvent) {
        dragElem.addEventListener('devicemotion', motionHandler, false)
      }
      if (window.DeviceOrientationEvent) {
        dragElem.addEventListener('deviceorientation', orientationHandler, false)
      }
    }

    // 将日志内容写入日志面板进行显示
    Vue.prototype.$writeToConsolePanl = function (contentHtml) {
      writeToConsolePanl(contentHtml)
    }
  }
}

// 将信息写入日志面板
function writeToConsolePanl (contentHtml) {
  var consolePanlElem = document.getElementById('console-panl-wrap')
  if (consolePanlElem) {
    var addValElem = document.createElement('div')
    addValElem.innerHTML = contentHtml
    addValElem.style.color = '#ffffff'
    consolePanlElem.appendChild(addValElem)
  }
}

// 获取n和m之间的随机数字
function rd (n, m) {
  var c = m - n + 1
  return Math.floor(Math.random() * c + n)
}

// 重力感应方法 - 手势
function motionHandler (event) {
  var interval = event.interval // 上次收到通知的间隔,毫秒
  var acc = event.acceleration
  var ax = acc.x // x轴加速度,米每二次方秒
  var ay = acc.y // y轴加速度,米每二次方秒
  var az = acc.z // z轴加速度,米每二次方秒
  var accGravity = event.accelerationIncludingGravity
  var agx = accGravity.x // x轴加速度(考虑重力加速度),米每二次方秒
  var agy = accGravity.y // y轴加速度(考虑重力加速度),米每二次方秒
  var agz = accGravity.z // z轴加速度(考虑重力加速度),米每二次方秒
  var rotationRate = event.rotationRate
  var alpha = rotationRate.alpha // 左右旋转速度
  var beta = rotationRate.beta // 前后旋转速度
  var gamma = rotationRate.gamma // 扭转速度
  writeToConsolePanl(JSON.stringify({
    '上次收到通知的间隔': interval,
    'x轴加速度': ax,
    'y轴加速度': ay,
    'z轴加速度': az,
    'x轴加速度(考虑重力加速度)': agx,
    'y轴加速度(考虑重力加速度)': agy,
    'z轴加速度(考虑重力加速度)': agz,
    '左右旋转速度': alpha,
    '前后旋转速度': beta,
    '扭转速度': gamma
  }))
}

// 重力感应方法 - 方向
function orientationHandler (event) {
  var alpha = event.alpha // 左右
  var beta = event.beta // 前后
  var gamma = event.gamma // 扭转
  var heading = event.webkitCompassHeading // 指北针指向,度
  var accuracy = event.webkitCompassAccuracy // 指北针精度,度
  writeToConsolePanl(JSON.stringify({
    '左右': alpha,
    '前后': beta,
    '扭转': gamma,
    '指北针指向,度': heading,
    '指北针精度,度': accuracy
  }))
}
