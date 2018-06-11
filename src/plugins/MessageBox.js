var toastOpacityTimer, toastRemoveTimer
var toptipOpacityTimer, toptipRemoveTimer
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
      toastElem.style.position = 'fixed'
      toastElem.style.left = '50%'
      toastElem.style.bottom = '4rem'
      toastElem.style.padding = '0.3rem 0.6rem'
      toastElem.style.whiteSpace = 'nowrap'
      toastElem.style.display = 'inline-block'
      toastElem.style.transition = 'opacity 0.5s ease 0s'
      toastElem.style.opacity = 0
      toastElem.style.fontSize = '0.8rem'
      toastElem.style.borderRadius = '4px'
      toastElem.innerHTML = content
      toastElem.style.zIndex = 999999999
      toastElem.style.background = background
      toastElem.style.color = color
      document.body.appendChild(toastElem)
      toastElem.style.left = `calc(50% - ${toastElem.clientWidth / 2}px)`
      setTimeout(() => {
        toastElem.style.opacity = 1
      }, 10)
      var duration = params.duration || 1000
      toastOpacityTimer = setTimeout(() => {
        toastElem.style.opacity = 0
        toastRemoveTimer = setTimeout(() => {
          document.body.removeChild(toastElem)
        }, 0.5 * 1000)
      }, duration)
    }

    // toptip弹出层
    Vue.prototype.$toptip = function (content, option) {
      if (document.getElementById('toptip-message-box')) {
        document.body.removeChild(document.getElementById('toptip-message-box'))
        clearTimeout(toptipOpacityTimer)
        clearTimeout(toptipRemoveTimer)
      }
      var params = option || {}
      var background = params.background || 'rgb(65, 75, 125)'
      var color = params.color || 'rgb(227, 240, 243)'
      var toptipElem = document.createElement('span')
      toptipElem.id = 'toptip-message-box'
      toptipElem.style.position = 'fixed'
      toptipElem.style.left = 0
      toptipElem.style.top = 0
      toptipElem.style.width = '100%'
      toptipElem.style.padding = '0.3rem 0'
      toptipElem.style.whiteSpace = 'nowrap'
      toptipElem.style.display = 'inline-block'
      toptipElem.style.transition = 'all 0.3s ease 0s'
      toptipElem.style.transform = 'translateY(-100%)'
      toptipElem.style.fontSize = '0.8rem'
      toptipElem.style.textAlign = 'center'
      toptipElem.innerHTML = content
      toptipElem.style.zIndex = 99999999
      toptipElem.style.background = background
      toptipElem.style.color = color
      document.body.appendChild(toptipElem)
      setTimeout(() => {
        toptipElem.style.transform = 'translateY(0)'
      }, 10)
      var duration = params.duration || 4000
      toptipOpacityTimer = setTimeout(() => {
        toptipElem.style.transform = 'translateY(-100%)'
        toptipRemoveTimer = setTimeout(() => {
          document.body.removeChild(toptipElem)
        }, 0.5 * 1000)
      }, duration)
    }

    // 关闭toptip弹出层
    Vue.prototype.$toptip_close = function () {
      if (document.getElementById('toptip-message-box')) {
        document.body.removeChild(document.getElementById('toptip-message-box'))
        clearTimeout(toptipOpacityTimer)
        clearTimeout(toptipRemoveTimer)
      }
    }

    // bottomtip弹出层
    Vue.prototype.$bottomtip = function (content, option) {
      if (document.getElementById('bottomtip-message-box')) {
        document.body.removeChild(document.getElementById('bottomtip-message-box'))
      }
      var params = option || {}
      var background = params.background || 'rgb(255, 255, 255)'
      var color = params.color || 'rgb(44, 44, 44)'
      var items = params.items || []
      var bottomtipShadeElem = document.createElement('div')
      bottomtipShadeElem.id = 'bottomtip-message-box-shade'
      bottomtipShadeElem.style.position = 'fixed'
      bottomtipShadeElem.style.top = 0
      bottomtipShadeElem.style.left = 0
      bottomtipShadeElem.style.right = 0
      bottomtipShadeElem.style.bottom = 0
      bottomtipShadeElem.style.zIndex = 99999998
      bottomtipShadeElem.style.background = 'rgba(0, 0, 0, .2)'
      bottomtipShadeElem.style.transition = 'all 0.3s ease 0s'
      bottomtipShadeElem.style.opacity = 0
      document.body.appendChild(bottomtipShadeElem)
      setTimeout(() => {
        bottomtipShadeElem.style.opacity = 1
      }, 10)
      bottomtipShadeElem.onclick = function () {
        if (document.getElementById('bottomtip-message-box')) {
          document.getElementById('bottomtip-message-box-shade').style.opacity = 1
          document.getElementById('bottomtip-message-box').style.transform = 'translateY(100%)'
          setTimeout(() => {
            document.body.removeChild(document.getElementById('bottomtip-message-box-shade'))
            document.body.removeChild(document.getElementById('bottomtip-message-box'))
          }, 300)
        }
      }
      var bottomtipElem = document.createElement('div')
      bottomtipElem.id = 'bottomtip-message-box'
      bottomtipElem.style.position = 'fixed'
      bottomtipElem.style.left = '0.4rem'
      bottomtipElem.style.bottom = '0.4rem'
      bottomtipElem.style.width = 'calc(100% - 0.8rem)'
      bottomtipElem.style.borderRadius = '4px'
      bottomtipElem.style.overflow = 'hidden'
      bottomtipElem.style.padding = '0.3rem 0'
      bottomtipElem.style.whiteSpace = 'nowrap'
      bottomtipElem.style.display = 'inline-block'
      bottomtipElem.style.transition = 'all 0.3s ease 0s'
      bottomtipElem.style.transform = 'translateY(100%)'
      bottomtipElem.style.fontSize = '0.8rem'
      bottomtipElem.style.textAlign = 'center'
      bottomtipElem.innerHTML = content
      bottomtipElem.style.zIndex = 99999999
      bottomtipElem.style.background = background
      bottomtipElem.style.color = color
      document.body.appendChild(bottomtipElem)
      if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          let itemElem = document.createElement('div')
          itemElem.innerHTML = '--- ' + i
          bottomtipElem.appendChild(itemElem)
        }
      }
      var cancleElem = document.createElement('div')
      cancleElem.innerHTML = '取消'
      cancleElem.style.padding = '0.4rem 0'
      bottomtipElem.appendChild(cancleElem)
      bottomtipElem.onclick = function () {
        if (document.getElementById('bottomtip-message-box')) {
          document.getElementById('bottomtip-message-box-shade').style.opacity = 1
          document.getElementById('bottomtip-message-box').style.transform = 'translateY(100%)'
          setTimeout(() => {
            document.body.removeChild(document.getElementById('bottomtip-message-box-shade'))
            document.body.removeChild(document.getElementById('bottomtip-message-box'))
          }, 300)
        }
      }
      setTimeout(() => {
        bottomtipElem.style.transform = 'translateY(0)'
      }, 10)
    }

    // loading弹出层
    Vue.prototype.$loading = function (content, option) {
      if (document.getElementById('loading-message-box')) {
        return false
      }
      var loadingObj = null
      var params = option || {}
      var context = params.context
      var current = params.current === undefined ? 0 : params.current // 当前进度的百分比
      var completeTip = params.completeTip || '已完成' // 进度完成后的提示文字
      var shade = params.shade === undefined ? true : params.shade
      var progress = params.progress === undefined ? false : params.progress
      var background = params.background || 'rgba(255, 255, 255, 1)'
      var color = params.color || 'rgba(58, 58, 58, 1)'
      if (progress === true) {
        loadingObj = {
          update: (newProgress) => {
            if (document.getElementById('loading-message-box')) {
              var progressLoading = document.getElementById('loading-message-box').getElementsByClassName('loading-progress-wrap')[0]
              if (progressLoading) {
                progressLoading.getElementsByClassName('loading-progress-current')[0].style.width = `${progressLoading.clientWidth * newProgress}px`
              }
              if (Number(newProgress) === 1) {
                // document.getElementById('loading-message-box').getElementsByClassName('loading-tip')[0].innerHTML = completeTip
                if (context) {
                  context.$toast(completeTip)
                }
                document.body.removeChild(document.getElementById('loading-message-box-shade'))
                document.body.removeChild(document.getElementById('loading-message-box'))
              }
            }
          },
          complete: () => {
            if (document.getElementById('loading-message-box')) {
              var progressLoading = document.getElementById('loading-message-box').getElementsByClassName('loading-progress-wrap')[0]
              if (progressLoading) {
                progressLoading.getElementsByClassName('loading-progress-current')[0].style.width = `${progressLoading.clientWidth * 1}px`
              }
              // document.getElementById('loading-message-box').getElementsByClassName('loading-tip')[0].innerHTML = completeTip
              if (context) {
                context.$toast(completeTip)
              }
              document.body.removeChild(document.getElementById('loading-message-box-shade'))
              document.body.removeChild(document.getElementById('loading-message-box'))
            }
          }
        }
      }
      if (shade === true) {
        var loadingShadeElem = document.createElement('div')
        loadingShadeElem.id = 'loading-message-box-shade'
        loadingShadeElem.style.position = 'fixed'
        loadingShadeElem.style.width = '100vw'
        loadingShadeElem.style.height = '100vh'
        loadingShadeElem.style.top = 0
        loadingShadeElem.style.left = 0
        loadingShadeElem.style.transition = 'opacity 0.3s ease 0s'
        loadingShadeElem.style.opacity = 0
        loadingShadeElem.style.zIndex = 99999998
        loadingShadeElem.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
        document.body.appendChild(loadingShadeElem)
        setTimeout(() => {
          loadingShadeElem.style.opacity = 1
        }, 10)
      }
      var loadingElem = document.createElement('div')
      loadingElem.id = 'loading-message-box'
      loadingElem.style.position = 'fixed'
      loadingElem.style.left = '50%'
      loadingElem.style.minWidth = '66vw'
      loadingElem.style.maxWidth = '66vw'
      loadingElem.style.height = '20vw'
      loadingElem.style.whiteSpace = 'nowrap'
      loadingElem.style.display = 'inline-block'
      loadingElem.style.transition = 'opacity 0.5s ease 0s'
      loadingElem.style.opacity = 0
      loadingElem.style.fontSize = '0.8rem'
      loadingElem.style.borderRadius = '2px'
      loadingElem.style.zIndex = 99999999
      loadingElem.style.background = background
      loadingElem.style.color = color
      loadingElem.style.overflow = 'hidden'
      document.body.appendChild(loadingElem)
      loadingElem.style.top = `calc(50% - ${loadingElem.clientHeight / 2}px - 20px)`
      loadingElem.style.left = `calc(50% - ${loadingElem.clientWidth / 2}px)`
      setTimeout(() => {
        loadingElem.style.opacity = 1
      }, 10)
      var loadingImgElem = document.createElement('div')
      loadingImgElem.style.position = 'absolute'
      loadingImgElem.style.top = 0
      loadingImgElem.style.bottom = 0
      loadingImgElem.style.left = 0
      loadingImgElem.style.width = (loadingElem.clientHeight * 3 / 4) + 'px'
      loadingImgElem.style.overflow = 'hidden'
      loadingImgElem.innerHTML = getLoadingHtml(0.1, loadingElem.clientHeight * 3 / 4, loadingElem.clientHeight)
      loadingElem.appendChild(loadingImgElem)
      var loadingTipElem = document.createElement('div')
      loadingTipElem.style.position = 'absolute'
      loadingTipElem.style.top = 0
      loadingTipElem.style.right = 0
      loadingTipElem.style.width = (loadingElem.clientWidth - loadingImgElem.clientWidth - 10) + 'px'
      loadingTipElem.style.height = loadingElem.clientHeight + 'px'
      loadingTipElem.style.overflow = 'hidden'
      var loadingContentElem = document.createElement('span')
      loadingContentElem.classList.add('loading-tip')
      loadingContentElem.style.position = 'absolute'
      if (progress === true) {
        loadingContentElem.style.fontSize = '0.8rem'
        loadingContentElem.style.fontWeight = 'bold'
      } else {
        loadingContentElem.style.top = 0
        loadingContentElem.style.bottom = 0
        loadingContentElem.style.margin = 'auto 0'
      }
      loadingContentElem.innerHTML = content
      loadingContentElem.style.height = '20px'
      loadingContentElem.style.lineHeight = '20px'
      loadingTipElem.appendChild(loadingContentElem)
      if (progress === true) {
        var loadingProgressElem = document.createElement('div')
        loadingProgressElem.classList.add('loading-progress-wrap')
        loadingProgressElem.style.position = 'absolute'
        loadingProgressElem.style.width = '92%'
        loadingProgressElem.style.height = '4px'
        loadingProgressElem.style.fontSize = '0px'
        loadingProgressElem.style.backgroundColor = 'rgba(243, 239, 251, .6)'
        loadingProgressElem.style.borderRadius = '4px'
        loadingProgressElem.style.overflow = 'hidden'
        loadingTipElem.appendChild(loadingProgressElem)
        var loadingCurrentProgressElem = document.createElement('div')
        loadingCurrentProgressElem.classList.add('loading-progress-current')
        loadingCurrentProgressElem.style.height = '100%'
        loadingCurrentProgressElem.style.width = '0px'
        loadingCurrentProgressElem.style.background = 'linear-gradient(to left, #583D9B, #1499CA, #5E3D9B)'
        loadingCurrentProgressElem.style.transition = 'width 0.3s ease 0s'
        loadingCurrentProgressElem.style.overflow = 'hidden'
        loadingProgressElem.appendChild(loadingCurrentProgressElem)
        var progressingElem = document.createElement('div')
        progressingElem.style.position = 'absolute'
        progressingElem.style.top = 0
        progressingElem.style.height = '100%'
        progressingElem.style.width = '100%'
        progressingElem.style.background = 'linear-gradient(to left, rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, .4), rgba(243, 239, 251, .6), rgba(243, 239, 251, .8), rgba(243, 239, 251, .6), rgba(243, 239, 251, .4), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0), rgba(243, 239, 251, 0))'
        progressingElem.style.animation = 'moveflash 4s ease 0s infinite'
        loadingProgressElem.appendChild(progressingElem)
      }
      loadingElem.appendChild(loadingTipElem)
      if (progress === true) {
        loadingContentElem.style.top = `${(loadingTipElem.clientHeight - loadingContentElem.clientHeight) / 2 - 6}px`
        loadingProgressElem.style.top = `${(loadingTipElem.clientHeight - loadingProgressElem.clientHeight) / 2 + 11}px`
        loadingCurrentProgressElem.style.width = `${loadingProgressElem.clientWidth * current}px`
      }
      return loadingObj
    }

    // 关闭loading弹窗
    Vue.prototype.$loading_close = function () {
      if (document.getElementById('loading-message-box')) {
        document.body.removeChild(document.getElementById('loading-message-box-shade'))
        document.body.removeChild(document.getElementById('loading-message-box'))
      }
    }

    // selected弹出层
    Vue.prototype.$select = function (option) {
      if (document.getElementById('select-message-box')) {
        return false
      }
      var params = option || {}
      var items = params.items || []
      var showAfterFn = params.showAfterFn || function () {}
      var background = params.background || 'rgba(255, 255, 255, 1)'
      var color = params.color || 'rgba(58, 58, 58, 1)'
      var selectShadeElem = document.createElement('div')
      selectShadeElem.id = 'select-message-box-shade'
      selectShadeElem.style.position = 'fixed'
      selectShadeElem.style.width = '100vw'
      selectShadeElem.style.height = '100vh'
      selectShadeElem.style.top = 0
      selectShadeElem.style.left = 0
      selectShadeElem.style.transition = 'opacity 0.3s ease 0s'
      selectShadeElem.style.opacity = 0
      selectShadeElem.style.zIndex = 99999998
      selectShadeElem.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
      document.body.appendChild(selectShadeElem)
      setTimeout(() => {
        selectShadeElem.style.opacity = 1
      }, 10)
      selectShadeElem.onclick = function () {
        if (document.getElementById('select-message-box')) {
          document.body.removeChild(document.getElementById('select-message-box-shade'))
          document.body.removeChild(document.getElementById('select-message-box'))
        }
      }
      var selectElem = document.createElement('div')
      selectElem.id = 'select-message-box'
      selectElem.style.position = 'fixed'
      selectElem.style.left = '50%'
      selectElem.style.minWidth = '66vw'
      selectElem.style.maxWidth = '66vw'
      selectElem.style.whiteSpace = 'nowrap'
      selectElem.style.display = 'inline-block'
      selectElem.style.transition = 'opacity 0.5s ease 0s'
      selectElem.style.opacity = 0
      selectElem.style.fontSize = '0.8rem'
      selectElem.style.borderRadius = '2px'
      selectElem.style.zIndex = 99999999
      selectElem.style.background = background
      selectElem.style.color = color
      if (items && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          if (i > 0) {
            let lineElem = document.createElement('span')
            lineElem.style.display = 'block'
            lineElem.style.width = '94%'
            lineElem.style.marginLeft = '3%'
            lineElem.style.height = '1px'
            lineElem.style.backgroundColor = 'rgba(146, 146, 146, 0.1)'
            selectElem.appendChild(lineElem)
          }
          let selectItemElem = document.createElement('div')
          selectItemElem.classList.add('ripple')
          selectItemElem.innerHTML = items[i].content
          selectItemElem.style.padding = '1rem 1.8rem'
          selectElem.appendChild(selectItemElem)
          ;(function (target, callBack) {
            target.onclick = function () {
              if (callBack && isFunction(callBack)) {
                let returnVal = callBack()
                if (returnVal === false) {
                  return returnVal
                }
              }
              if (document.getElementById('select-message-box')) {
                document.body.removeChild(document.getElementById('select-message-box-shade'))
                document.body.removeChild(document.getElementById('select-message-box'))
              }
            }
          })(selectItemElem, items[i].callBack)
        }
      }
      document.body.appendChild(selectElem)
      selectElem.style.top = `calc(50% - ${selectElem.clientHeight / 2}px - 20px)`
      selectElem.style.left = `calc(50% - ${selectElem.clientWidth / 2}px)`
      if (showAfterFn && isFunction(showAfterFn)) {
        showAfterFn()
      }
      setTimeout(() => {
        selectElem.style.opacity = 1
      }, 10)
    }

    // 显示出指定图片的类似点赞效果
    Vue.prototype.$pageImg = function (imgSrcs, clientX, clientY, root) {
      var imgRoot = root || document.body
      var imgPopElem = document.createElement('img')
      imgPopElem.classList.add('img-pop')
      imgPopElem.src = imgSrcs[rd(0, imgSrcs.length - 1)]
      imgPopElem.style.width = (rd(20, 60)) + 'px'
      imgPopElem.style.position = 'fixed'
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

    // 表情选择弹出层
    Vue.prototype.$face = function (context, option) {
      var params = option || {}
      var closeFn = params.closeFn || function () {}
      if (document.getElementById('face-message-box')) {
        if (closeFn && isFunction(closeFn)) {
          closeFn()
        }
        context.$face_close()
        return false
      }
      var faceImgs = context.$moment.face_imgs
      var showFn = params.showFn || function () {}
      var delay = params.delay || 10
      var otherClass = params.otherClass || ''
      var rootElem = params.rootElem || document.body
      var wrapPosition = rootElem.contains(document.body) ? 'absolute' : 'relative'
      // if (!rootElem.contains(document.body)) {
      //   rootElem.style.position = 'relative'
      // }
      var tabBg = params.tabBg || 'rgba(81, 69, 125, 0.48)'
      var background = params.background || 'rgba(255, 255, 255, 0)'
      var color = params.color || 'rgba(58, 58, 58, 1)'
      var width = params.width || '100vw'
      var height = params.height || '9rem'
      var type = params.type || 'all'
      var callBack = params.callBack || function () {}
      var facePopHeightToPx = 0
      if (showFn && isFunction(showFn)) {
        showFn()
      }
      if (height.indexOf('rem') > 0) {
        facePopHeightToPx = Number(height.match(/[-?\d.?]+/g)[0]) * 16
      } else {
        facePopHeightToPx = Number(height.match(/[-?\d.?]+/g)[0])
      }
      setTimeout(() => {
        if (rootElem.contains(document.body)) {
          var faceShadeElem = document.createElement('div')
          faceShadeElem.id = 'face-message-box-shade'
          faceShadeElem.classList.add(otherClass)
          faceShadeElem.style.position = 'fixed'
          faceShadeElem.style.width = '100vw'
          faceShadeElem.style.height = '100vh'
          faceShadeElem.style.top = 0
          faceShadeElem.style.left = 0
          faceShadeElem.style.transition = 'opacity 0.3s ease 0s'
          faceShadeElem.style.opacity = 0
          faceShadeElem.style.zIndex = 99999998
          faceShadeElem.style.backgroundColor = 'rgba(0, 0, 0, 0)'
          rootElem.appendChild(faceShadeElem)
          faceShadeElem.onclick = function () {
            rootElem.removeChild(faceShadeElem)
            rootElem.removeChild(document.getElementById('face-message-box'))
          }
          setTimeout(() => {
            faceShadeElem.style.opacity = 1
          }, 10)
        }
        var faceElem = document.createElement('div')
        faceElem.id = 'face-message-box'
        if (otherClass) {
          faceElem.classList.add(otherClass)
        }
        faceElem.style.position = wrapPosition
        faceElem.style.left = '50%'
        faceElem.style.minWidth = width
        faceElem.style.maxWidth = width
        faceElem.style.whiteSpace = 'nowrap'
        faceElem.style.display = 'inline-block'
        if (rootElem.contains(document.body)) {
          faceElem.style.opacity = 0
          faceElem.style.height = height
          faceElem.style.transition = 'opacity 0.5s ease 0s'
        } else {
          faceElem.style.opacity = 1
          faceElem.style.height = 0
          faceElem.style.transition = 'height 0.5s ease 0s'
        }
        faceElem.style.fontSize = '0.8rem'
        faceElem.style.borderRadius = '1px'
        faceElem.style.zIndex = 99999999
        faceElem.style.background = background
        faceElem.style.color = color
        faceElem.style.overflow = 'hidden'
        rootElem.appendChild(faceElem)
        if (rootElem.contains(document.body)) {
          faceElem.style.top = `calc(50% - ${faceElem.clientHeight / 2}px - 20px)`
        }
        faceElem.style.left = `calc(50% - ${faceElem.clientWidth / 2}px)`
        if (rootElem.contains(document.body)) {
          faceElem.style.opacity = 1
        } else {
          faceElem.style.height = height
        }
        setTimeout(() => {
          let showFaceTabCount = 0
          for (let f = 0; f < faceImgs.length; f++) {
            if (faceImgs[f].faces.length > 0 && (type === 'all' || faceImgs[f].type === undefined || faceImgs[f].type === type)) {
              showFaceTabCount++
            }
          }
          var faceTabsWrapElem = document.createElement('div')
          if (otherClass) {
            faceTabsWrapElem.classList.add(otherClass)
          }
          faceTabsWrapElem.style.position = 'relative'
          faceTabsWrapElem.style.backgroundColor = tabBg
          faceTabsWrapElem.style.height = '2rem'
          faceTabsWrapElem.style.lineHeight = '2rem'
          faceTabsWrapElem.style.overflowX = 'auto'
          faceTabsWrapElem.style.overflowY = 'hidden'
          faceElem.appendChild(faceTabsWrapElem)
          var faceContentWrapElem = document.createElement('div')
          if (otherClass) {
            faceContentWrapElem.classList.add(otherClass)
          }
          faceContentWrapElem.style.position = 'relative'
          faceContentWrapElem.style.width = `${faceElem.clientWidth}px`
          faceContentWrapElem.style.height = `${facePopHeightToPx - faceTabsWrapElem.clientHeight}px`
          faceContentWrapElem.style.overflow = 'hidden'
          faceElem.appendChild(faceContentWrapElem)
          var faceContentTransElem = document.createElement('div')
          faceContentTransElem.classList.add('face-content-trans')
          if (otherClass) {
            faceContentTransElem.classList.add(otherClass)
          }
          faceContentTransElem.style.position = 'relative'
          faceContentTransElem.style.width = `${faceElem.clientWidth * showFaceTabCount}px`
          faceContentTransElem.style.height = `${facePopHeightToPx - faceTabsWrapElem.clientHeight}px`
          faceContentTransElem.style.overflow = 'hidden'
          faceContentTransElem.style.transition = 'all 0.4s ease 0s'
          faceContentTransElem.style.transform = 'translateX(0px)'
          faceContentWrapElem.appendChild(faceContentTransElem)
          let faceTabLeft = 0
          let curFaceShowIndex = 0
          for (let f = 0; f < faceImgs.length; f++) {
            if (faceImgs[f].faces.length > 0 && (faceImgs[f].type === undefined || faceImgs[f].type === type)) {
              var faceTabElem = document.createElement('span')
              faceTabElem.classList.add('face-tab-item-' + f)
              if (otherClass) {
                faceTabElem.classList.add(otherClass)
              }
              faceTabElem.style.display = 'inline-block'
              faceTabElem.style.textAlign = 'center'
              faceTabElem.style.position = 'absolute'
              faceTabElem.style.top = 0
              faceTabElem.style.fontSize = '0.7rem'
              faceTabElem.style.color = '#efefef'
              faceTabElem.style.padding = '0 12px'
              faceTabElem.innerHTML = faceImgs[f].title
              faceTabsWrapElem.appendChild(faceTabElem)
              ;(function (target) {
                target.onclick = function () {
                  var index = Number(target.classList[0].substr('face-tab-item-'.length))
                  var faceTabIndicator = document.getElementById('face-message-box').getElementsByClassName('face-tab-indicator')[0]
                  if (faceTabIndicator) {
                    faceTabIndicator.style.width = target.clientWidth + 'px'
                    faceTabIndicator.style.left = target.offsetLeft + 'px'
                  }
                  var faceAllTabsContentWrap = document.getElementById('face-message-box').getElementsByClassName('face-content-trans')[0]
                  if (faceAllTabsContentWrap) {
                    faceAllTabsContentWrap.style.transform = `translateX(-${faceElem.clientWidth * index}px)`
                  }
                }
              })(faceTabElem)
              if (curFaceShowIndex === 0) {
                var faceTabIndicatorElem = document.createElement('div')
                faceTabIndicatorElem.classList.add('face-tab-indicator')
                if (otherClass) {
                  faceTabIndicatorElem.classList.add(otherClass)
                }
                faceTabIndicatorElem.style.position = 'absolute'
                faceTabIndicatorElem.style.bottom = 0
                faceTabIndicatorElem.style.left = `${faceTabLeft}px`
                faceTabIndicatorElem.style.width = `${faceTabElem.clientWidth}px`
                faceTabIndicatorElem.style.height = '2px'
                faceTabIndicatorElem.style.backgroundColor = 'rgba(120, 108, 158, 0.4)'
                faceTabIndicatorElem.style.transition = 'all 0.4s ease 0s'
                faceTabsWrapElem.appendChild(faceTabIndicatorElem)
              }
              faceTabElem.style.left = `${faceTabLeft}px`
              faceTabLeft += faceTabElem.clientWidth
              var faceItemTransWrap = document.createElement('div')
              if (otherClass) {
                faceItemTransWrap.classList.add(otherClass)
              }
              faceItemTransWrap.style.position = 'absolute'
              faceItemTransWrap.style.width = faceContentWrapElem.clientWidth + 'px'
              faceItemTransWrap.style.height = faceContentWrapElem.clientHeight + 'px'
              faceItemTransWrap.style.top = 0
              faceItemTransWrap.style.left = `${f * faceContentWrapElem.clientWidth}px`
              faceItemTransWrap.style.overflowX = 'hidden'
              faceItemTransWrap.style.overflowY = 'auto'
              faceContentTransElem.appendChild(faceItemTransWrap)
              var faceItem = document.createElement('div')
              if (otherClass) {
                faceItem.classList.add(otherClass)
              }
              faceItem.style.position = 'relative'
              faceItem.style.width = faceContentWrapElem.clientWidth + 'px'
              faceItem.style.top = 0
              faceItem.style.left = 0
              faceItem.style.wordWrap = 'break-word'
              faceItem.style.display = 'flex'
              faceItem.style.flexDirection = 'row'
              faceItem.style.flexWrap = 'wrap'
              faceItem.style.justifyContent = 'flex-start'
              faceItemTransWrap.appendChild(faceItem)
              for (let c = 0; c < faceImgs[f].faces.length; c++) {
                var fw = document.createElement('div')
                if (otherClass) {
                  fw.classList.add(otherClass)
                }
                fw.style.position = 'relative'
                fw.style.display = 'inline-block'
                fw.style.width = `${faceItem.clientWidth / 8}px`
                fw.style.height = `${faceItem.clientWidth / 8}px`
                fw.style.lineHeight = `${faceItem.clientWidth / 8}px`
                fw.style.textAlign = 'center'
                faceItem.appendChild(fw)
                var faceImg = document.createElement('img')
                if (otherClass) {
                  faceImg.classList.add(otherClass)
                }
                faceImg.style.width = '70%'
                faceImg.style.height = '70%'
                faceImg.style.display = 'inline-block'
                faceImg.style.position = 'absolute'
                faceImg.style.top = 0
                faceImg.style.bottom = 0
                faceImg.style.left = 0
                faceImg.style.right = 0
                faceImg.style.margin = 'auto'
                faceImg.src = faceImgs[f].faces[c]
                fw.appendChild(faceImg)
                ;(function (target, face, size) {
                  target.onclick = function () {
                    if (callBack && isFunction(callBack)) {
                      var selectFaceImgHtml
                      var selectFaceImg = document.createElement('img')
                      if (otherClass) {
                        selectFaceImg.classList.add(otherClass)
                      }
                      if (size === 'big') {
                        selectFaceImg.style.width = '3rem'
                        selectFaceImg.style.height = '3rem'
                        selectFaceImgHtml = `<img src="${face}" style="width: 4rem; height: 4rem;">`
                      } else if (size === 'middle') {
                        selectFaceImg.style.width = '1.8rem'
                        selectFaceImg.style.height = '1.8rem'
                      } else {
                        selectFaceImg.style.width = '1.2rem'
                        selectFaceImg.style.height = '1.2rem'
                      }
                      selectFaceImg.style.verticalAlign = 'middle'
                      selectFaceImg.src = face
                      callBack(selectFaceImg, size === 'big' ? true : undefined, selectFaceImgHtml)
                    }
                  }
                })(fw, faceImgs[f].faces[c], faceImgs[f].size)
              }
              curFaceShowIndex++
            }
          }
        }, 10)
      }, delay)
    }

    // 关闭表情选择弹出层
    Vue.prototype.$face_close = function () {
      var faceClosePromise = new Promise((resolve, reject) => {
        var facePop = document.getElementById('face-message-box')
        if (facePop) {
          if (facePop.parentElement.contains(document.body)) {
            document.body.removeChild(document.getElementById('face-message-box-shade'))
            document.body.removeChild(facePop)
            resolve(true)
          } else {
            facePop.style.height = 0
            setTimeout(() => {
              if (facePop.parentElement) {
                facePop.parentElement.removeChild(facePop)
              }
              resolve(true)
            }, 504)
          }
        } else {
          resolve(false)
        }
      })
      return faceClosePromise
    }

    Vue.prototype.$consolePopWindow = function (context) {
      if (document.getElementById('console-drag-elem')) {
        return false
      }
      var dragElem = document.createElement('span')
      dragElem.id = 'console-drag-elem'
      dragElem.style.display = 'block'
      dragElem.style.width = '3rem'
      dragElem.style.height = '3rem'
      dragElem.style.position = 'absolute'
      dragElem.style.top = '6rem'
      dragElem.style.left = 'calc(100% - 3rem - 0.8rem)'
      dragElem.style.borderRadius = '3rem'
      dragElem.style.boxShadow = 'rgba(239, 129, 21, 0.68) 0px 0px 40px inset'
      // dragElem.style.background = 'rgb(254, 253, 252)'
      dragElem.style.zIndex = 999999999
      dragElem.style.textAlign = 'center'
      dragElem.style.lineHeight = '3rem'
      dragElem.style.backgroundImage = 'url(http://image.qqtu8.com/allimg/2018-pic_bq1/18-qqtu81_10829.gif)'
      dragElem.style.backgroundSize = 'auto 100%'
      dragElem.style.backgroundRepeat = 'no-repeat'
      dragElem.style.backgroundPosition = 'center'
      dragElem.style.opacity = 0.8
      dragElem.style.textShadow = '0 0 8px rgba(239, 130, 24, .8)'
      dragElem.style.fontWeight = 'bold'
      dragElem.style.fontSize = '14px'
      dragElem.style.color = 'rgb(183, 124, 49)'
      dragElem.style.cursor = 'pointer'
      dragElem.style.border = 'none'
      dragElem.style.outline = 'none'
      dragElem.style.userSelect = 'none'
      dragElem.style.msUserSelect = 'none'
      dragElem.style.webkitUserSelect = 'none'
      document.body.appendChild(dragElem)
      dragElem.onclick = function () {
        if (document.getElementById('console-copy')) {
          if (currentCopyElem) {
            currentCopyElem.style.color = 'rgb(170, 224, 252)'
            currentCopyElem = null
          }
          document.body.removeChild(document.getElementById('console-copy'))
        }
        var consolePanlWrapElem = document.getElementById('console-panl-wrap')
        if (Number(consolePanlWrapElem.style.opacity) !== 0) {
          dragElem.style.boxShadow = 'rgba(239, 129, 21, 0.68) 0px 0px 40px inset'
          dragElem.style.textShadow = '0 0 8px rgba(239, 130, 24, .8)'
          dragElem.style.color = 'rgb(183, 124, 49)'
          consolePanlWrapElem.style.transform = 'translateX(100%)'
          consolePanlWrapElem.style.opacity = 0
          setTimeout(() => {
            consolePanlWrapElem.style.transform = 'translateX(-100%)'
          }, 400)
          return false
        }
        dragElem.style.boxShadow = 'rgba(21, 216, 46, 0.86) 0px 0px 40px inset'
        dragElem.style.textShadow = 'rgba(30, 239, 24, 0.8) 0px 0px 8px'
        dragElem.style.color = 'rgb(49, 183, 128)'
        setTimeout(() => {
          consolePanlWrapElem.style.transform = 'translateX(0px)'
          consolePanlWrapElem.style.opacity = 1
        }, 100)
      }
      dragElem.addEventListener('touchmove', () => {
        event.preventDefault()
        var toTop = event.touches[0].pageY - dragElem.offsetHeight / 2
        var toLeft = event.touches[0].pageX - dragElem.offsetWidth / 2
        if (toTop < 0) {
          toTop = 0
        }
        if (toTop > document.body.offsetHeight - dragElem.offsetHeight) {
          toTop = document.body.offsetHeight - dragElem.offsetHeight
        }
        if (toLeft < 0) {
          toLeft = 0
        }
        if (toLeft > document.body.offsetWidth - dragElem.offsetWidth) {
          toLeft = document.body.offsetWidth - dragElem.offsetWidth
        }
        dragElem.style.top = toTop + 'px'
        dragElem.style.left = toLeft + 'px'
      }, false)
      var consolePanlWrapElem = document.createElement('div')
      consolePanlWrapElem.id = 'console-panl-wrap'
      consolePanlWrapElem.style.background = 'rgb(39, 35, 49)'
      consolePanlWrapElem.style.width = '100%'
      consolePanlWrapElem.style.height = '100%'
      consolePanlWrapElem.style.position = 'fixed'
      consolePanlWrapElem.style.bottom = 0
      consolePanlWrapElem.style.left = 0
      consolePanlWrapElem.style.zIndex = 999999998
      consolePanlWrapElem.style.overflow = 'hidden'
      consolePanlWrapElem.style.transition = 'all 0.4s ease 0s'
      consolePanlWrapElem.style.transform = 'translateX(-100%)'
      consolePanlWrapElem.style.opacity = 0
      consolePanlWrapElem.style.userSelect = 'none'
      consolePanlWrapElem.style.msUserSelect = 'none'
      consolePanlWrapElem.style.webkitUserSelect = 'none'
      document.body.appendChild(consolePanlWrapElem)
      var consolePanlTitleElem = document.createElement('div')
      consolePanlTitleElem.style.width = '100%'
      consolePanlTitleElem.style.height = '34px'
      consolePanlTitleElem.style.lineHeight = '34px'
      consolePanlTitleElem.style.textAlign = 'center'
      consolePanlWrapElem.appendChild(consolePanlTitleElem)
      var consolePanlTipElem = document.createElement('span')
      consolePanlTipElem.style.padding = '2px 10px'
      consolePanlTipElem.style.background = 'rgba(255, 255, 255, .8)'
      consolePanlTipElem.style.borderRadius = '20px'
      consolePanlTipElem.style.color = '#2E2E2E'
      consolePanlTipElem.style.boxShadow = 'rgba(138, 84, 84, 0.68) 0px 0px 4px inset'
      consolePanlTipElem.innerHTML = '面板虚化'
      consolePanlTipElem.style.cursor = 'pointer'
      consolePanlTitleElem.appendChild(consolePanlTipElem)
      consolePanlTipElem.onclick = function () {
        if (document.getElementById('console-copy')) {
          if (currentCopyElem) {
            currentCopyElem.style.color = 'rgb(170, 224, 252)'
            currentCopyElem = null
          }
          document.body.removeChild(document.getElementById('console-copy'))
        }
        if (Number(consolePanlWrapElem.style.opacity) === 1) {
          consolePanlWrapElem.style.opacity = 0.1
          consolePanlTipElem.innerHTML = '面板清晰'
        } else {
          consolePanlWrapElem.style.opacity = 1
          consolePanlTipElem.innerHTML = '面板虚化'
        }
      }
      var consolePanlClearElem = document.createElement('span')
      consolePanlClearElem.style.padding = '2px 10px'
      consolePanlClearElem.style.background = 'rgba(255, 255, 255, .8)'
      consolePanlClearElem.style.borderRadius = '20px'
      consolePanlClearElem.style.color = '#2E2E2E'
      consolePanlClearElem.style.boxShadow = 'rgba(115, 115, 115, 0.68) 0px 0px 4px inset'
      consolePanlClearElem.innerHTML = '清空日志'
      consolePanlClearElem.style.cursor = 'pointer'
      consolePanlClearElem.style.outline = 'none'
      consolePanlClearElem.style.userSelect = 'none'
      consolePanlClearElem.style.msUserSelect = 'none'
      consolePanlClearElem.style.webkitUserSelect = 'none'
      consolePanlClearElem.style.marginLeft = '6px'
      consolePanlTitleElem.appendChild(consolePanlClearElem)
      consolePanlClearElem.onclick = function () {
        if (document.getElementById('console-copy')) {
          if (currentCopyElem) {
            currentCopyElem.style.color = 'rgb(170, 224, 252)'
            currentCopyElem = null
          }
          document.body.removeChild(document.getElementById('console-copy'))
        }
        var consolePanlContentElem = document.getElementById('console-panl-content-elem')
        if (consolePanlContentElem) {
          consolePanlContentElem.innerHTML = ''
        }
      }
      var consolePanlSeeCacheElem = document.createElement('span')
      consolePanlSeeCacheElem.style.padding = '2px 10px'
      consolePanlSeeCacheElem.style.background = 'rgba(255, 255, 255, .8)'
      consolePanlSeeCacheElem.style.borderRadius = '20px'
      consolePanlSeeCacheElem.style.color = '#2E2E2E'
      consolePanlSeeCacheElem.style.boxShadow = 'rgba(115, 115, 115, 0.68) 0px 0px 4px inset'
      consolePanlSeeCacheElem.innerHTML = '查看Local Storage'
      consolePanlSeeCacheElem.style.cursor = 'pointer'
      consolePanlSeeCacheElem.style.outline = 'none'
      consolePanlSeeCacheElem.style.userSelect = 'none'
      consolePanlSeeCacheElem.style.msUserSelect = 'none'
      consolePanlSeeCacheElem.style.webkitUserSelect = 'none'
      consolePanlSeeCacheElem.style.marginLeft = '6px'
      consolePanlTitleElem.appendChild(consolePanlSeeCacheElem)
      consolePanlSeeCacheElem.onclick = function () {
        if (document.getElementById('console-copy')) {
          if (currentCopyElem) {
            currentCopyElem.style.color = 'rgb(170, 224, 252)'
            currentCopyElem = null
          }
          document.body.removeChild(document.getElementById('console-copy'))
        }
        if (document.getElementById('console-panl-localstorage-elem')) {
          consolePanlSeeCacheElem.innerHTML = '查看Local Storage'
          document.getElementById('console-panl-wrap').removeChild(document.getElementById('console-panl-localstorage-elem'))
          return false
        }
        consolePanlSeeCacheElem.innerHTML = '关闭Local Storage'
        var localStorageElem = document.createElement('div')
        localStorageElem.id = 'console-panl-localstorage-elem'
        localStorageElem.style.position = 'fixed'
        localStorageElem.style.top = '20%'
        localStorageElem.style.left = 0
        localStorageElem.style.width = '100%'
        localStorageElem.style.height = '60%'
        localStorageElem.style.background = 'rgb(49, 49, 49)'
        localStorageElem.style.color = '#E9E9E9'
        localStorageElem.style.boxShadow = '0px 0px 80px 40px #8e8e8e'
        localStorageElem.style.overflowX = 'hidden'
        localStorageElem.style.overflowY = 'auto'
        document.getElementById('console-panl-wrap').appendChild(localStorageElem)
        localStorageElem.onclick = function () {
          if (document.getElementById('console-copy')) {
            if (currentCopyElem) {
              currentCopyElem.style.color = 'rgb(170, 224, 252)'
              currentCopyElem = null
            }
            document.body.removeChild(document.getElementById('console-copy'))
          }
          if (Number(consolePanlWrapElem.style.opacity) !== 1) {
            consolePanlWrapElem.style.opacity = 1
            consolePanlTipElem.innerHTML = '面板虚化'
          }
        }
        var consolePanlClearCacheElem = document.createElement('span')
        consolePanlClearCacheElem.style.position = 'fixed'
        consolePanlClearCacheElem.style.right = '18px'
        consolePanlClearCacheElem.style.width = '40px'
        consolePanlClearCacheElem.style.height = '40px'
        consolePanlClearCacheElem.style.lineHeight = '40px'
        consolePanlClearCacheElem.style.textAlign = 'center'
        consolePanlClearCacheElem.style.background = 'rgba(255, 192, 30, .4)'
        consolePanlClearCacheElem.style.borderRadius = '60px'
        consolePanlClearCacheElem.style.color = 'rgba(253, 247, 233, .8)'
        consolePanlClearCacheElem.style.boxShadow = '0 0 20px 4px rgba(255, 192, 30, .8)'
        consolePanlClearCacheElem.innerHTML = '清空'
        consolePanlClearCacheElem.style.cursor = 'pointer'
        consolePanlClearCacheElem.style.outline = 'none'
        consolePanlClearCacheElem.style.userSelect = 'none'
        consolePanlClearCacheElem.style.msUserSelect = 'none'
        consolePanlClearCacheElem.style.webkitUserSelect = 'none'
        consolePanlClearCacheElem.style.marginBottom = '20px'
        consolePanlClearCacheElem.style.marginLeft = '6px'
        consolePanlClearCacheElem.style.display = 'inline-block'
        consolePanlClearCacheElem.style.marginTop = '16px'
        localStorageElem.appendChild(consolePanlClearCacheElem)
        // consolePanlClearCacheElem.style.marginTop = `-${consolePanlClearCacheElem.clientHeight + 6}px`
        consolePanlClearCacheElem.onclick = function () {
          window.localStorage.clear()
          context.$toast('Local Storage 数据已清空')
          localStorageElem.innerHTML = ''
          for (let ls = 0; ls < window.localStorage.length; ls++) {
            writeToConsolePanl('Local Storage 中的 ' + window.localStorage.key(ls) + ' 数据', JSON.parse(window.localStorage.getItem(window.localStorage.key(ls))), context, localStorageElem)
          }
        }
        for (let ls = 0; ls < window.localStorage.length; ls++) {
          writeToConsolePanl('Local Storage 中的 ' + window.localStorage.key(ls) + ' 数据', JSON.parse(window.localStorage.getItem(window.localStorage.key(ls))), context, localStorageElem)
        }
      }
      var consolePanlContentElem = document.createElement('div')
      consolePanlContentElem.id = 'console-panl-content-elem'
      consolePanlContentElem.style.position = 'relative'
      consolePanlContentElem.style.width = '100%'
      consolePanlContentElem.style.height = 'calc(100% - 34px)'
      consolePanlContentElem.style.overflowX = 'hidden'
      consolePanlContentElem.style.overflowY = 'auto'
      consolePanlContentElem.style.wordWrap = 'break-word'
      consolePanlContentElem.style.wordBreak = 'normal'
      consolePanlWrapElem.appendChild(consolePanlContentElem)
      consolePanlContentElem.onclick = function () {
        if (document.getElementById('console-copy')) {
          if (currentCopyElem) {
            currentCopyElem.style.color = 'rgb(170, 224, 252)'
            currentCopyElem = null
          }
          document.body.removeChild(document.getElementById('console-copy'))
        }
        if (Number(consolePanlWrapElem.style.opacity) !== 1) {
          consolePanlWrapElem.style.opacity = 1
          consolePanlTipElem.innerHTML = '面板虚化'
        }
      }
    }

    // 将日志内容写入日志面板进行显示
    Vue.prototype.$writeToConsolePanl = function (contentHtml, jsonObj, vueContext) {
      writeToConsolePanl(contentHtml, jsonObj, vueContext)
    }

    // picker弹出层
    Vue.prototype.$picker = function (context, option) {
      if (document.getElementById('picker-box')) {
        return false
      }
      var selected = [] // 保存选中的值
      var params = option || {}
      var debug = params.debug === undefined ? false : params.debug // debug模式会显示console日志输出
      var needSelectAll = params.needSelectAll === undefined ? false : params.needSelectAll // 是否需要全选
      var shadeBg = params.shadeBg || 'rgba(0, 0, 0, 0.2)'
      var background = params.background || 'rgba(255, 255, 255, 1)'
      var color = params.color || 'rgba(0, 0, 0, 1)'
      var title = params.title || '请选择项目'
      var titleColor = params.titleColor || 'rgba(0, 0, 0, 1)'
      var titleLineColor = params.titleLineColor || 'rgba(210, 210, 210, .6)'
      var cols = params.cols || []
      var gradualHeight = params.gradualHeight || ((14 - 2.8) / 2) + 'rem'
      var wheelHeight = params.wheelHeight || '14rem'
      var wheelBg = params.wheelBg || 'rgba(250, 250, 250, .8)'
      var colLineColor = params.colLineColor || 'rgba(210, 210, 210, 0.6)'
      var colLineHeight = params.colLineHeight || '2.8rem'
      var selectedBg = params.selectedBg || 'rgba(255, 255, 255, 0)'
      var lineSelectedColor = params.lineSelectedColor || 'rgba(210, 210, 210, 0.1)'
      var lineSelectedOffsetTop = params.lineSelectedOffsetTop || '10px'
      var merge = params.merge === undefined ? true : params.merge // 将相邻的滚轮选择的项目进行显示合并，即不现实分割线
      var unitFollow = params.unitFollow === undefined ? false : params.unitFollow // 单位项是否一起跟随滚动，还是只在最终不同时做滚动
      var unitBg = params.unitBg || 'rgba(255, 255, 255, 1)'
      var touchRate = params.touchRate || 0.8
      var value = params.value || [] // 优先对应实际值，没有实际值时，对应显示值
      var arg = params.arg || [] // 额外的变量，将会直接传给选择回掉方法
      var type = params.type || null // 类型，一些常用滚轮格式的简单封装，可以简化掉cols参数
      var valRange = params.valRange || [] // 数值的范围，数组，两个值，第一个值为最小值，第二个值为最大值；特定值：~代表至今
      var colCallBack = params.colCallBack || [] // 每列移动完后，触发的事件，数组，数组项对应每一列；一般供插件内部使用
      var selectedFn = params.selectedFn || function () {
        if (debug) {
          console.warn('picker 选择响应事件未指定，如果需要请指定参数 selectedFn')
        }
      } // 响应选择的事件
      var selectedFinishFn = params.selectedFinishFn || function () {
        if (debug) {
          console.warn('picker 选择完成后响应事件未指定，如果需要请指定参数 selectedFinishFn')
        }
      } // 响应选择的事件
      var pickerColsDoc = `
        <p class="tip-block">cols属性用于设置选项列内容。如果设置该参数，则不需要再设置type参数。</p>
        格式为 [ [ {}, {}, {}, ... ], [], [], ... ]<br><br>
        {} 中为每一选项列中一个子项的属性json，具体包含：<br>
        <p class="tip-round-block">val：数据的实际值<br><br>
        display：数据的显示值，该值未设置时将认为显示值与实际值一致<br><br>
        unit：数据的单位，设置该值将会在数据滚轮选项后另外添加单位的显示区域，否则只会存在数据的滚轮区域；该属性以第一条数据的单位属性为准，该列中如果其他数据项未设置单位属性，默认按照第一条数据的单位设置<br></p>
      `
      var pickerTypeDoc = `
        <p class="tip-block">type属性是指通过一些特定的值，来进行picker的初始化，主要是为了简化复杂的cols属性的编写。如果设置该参数，则不需要再设置cols参数。</p>
        <p>type属性值列表如下：（字符串属性，不区分大小写）</p>
        <ul>
          <li>yyyy-mm-dd：选择时间格式
            <p class="tip-round-block">其中，yyyy表示年份的选择，mm表示月份的选择，dd表示日期的选择；可参考的组合有：<br>yyyy-mm-dd、yyyy-mm、mm-dd、yyyy、mm<br><br><span style="color: #f51010; font-size: 0.2rem;">注意：只能出现 - 符号和 yyyy mm dd 这些值</span></p>
            <p class="tip-round-block">当使用时间选择时，可以配合 valRange 属性（数组格式）使用，指明日期的可选范围，符号 ～ 表示至今</p>
          </li>
          <li>sex：选择性别
            <p class="tip-round-block">输出：女，对应值0；男，对应值1</p>
          </li>
          <li>constellation：选择星座
            <p class="tip-round-block">输出：星座字符串，对应值与显示值一致</p>
          </li>
        </ul>
        `
      var pickerShade = document.createElement('div')
      pickerShade.style.position = 'fixed'
      pickerShade.style.width = '100vw'
      pickerShade.style.height = '100vh'
      pickerShade.style.top = 0
      pickerShade.style.left = 0
      pickerShade.style.transition = 'all 0.3s ease 0s'
      pickerShade.style.opacity = 0
      pickerShade.style.zIndex = 99999998
      pickerShade.style.backgroundColor = shadeBg
      document.body.appendChild(pickerShade)
      setTimeout(() => {
        pickerShade.style.opacity = 1
      }, 10)

      var pickerElem = document.createElement('div')
      pickerElem.id = 'picker-box'
      pickerElem.style.position = 'fixed'
      pickerElem.style.left = 0
      pickerElem.style.bottom = 0
      pickerElem.style.width = '100%'
      pickerElem.style.transition = 'all 0.4s ease 0s'
      pickerElem.style.transform = 'translateY(110%)'
      pickerElem.style.fontSize = '0.8rem'
      pickerElem.style.zIndex = 99999999
      pickerElem.style.background = background
      pickerElem.style.color = color
      document.body.appendChild(pickerElem)
      setTimeout(() => {
        pickerElem.style.transform = 'translateY(0px)'
      }, 10)
      pickerShade.onclick = function () {
        this.style.opacity = 0
        pickerElem.style.transform = 'translateY(110%)'
        setTimeout(() => {
          document.body.removeChild(this)
          document.body.removeChild(pickerElem)
        }, 400)
        selectedFinishFn(selected, arg)
      }

      var pickerTitleWrapElem = document.createElement('div')
      pickerTitleWrapElem.classList.add('flex-r')
      pickerTitleWrapElem.classList.add('flex-b')
      pickerTitleWrapElem.style.height = '3rem'
      pickerElem.appendChild(pickerTitleWrapElem)

      var pickerTitleLeftElem = document.createElement('span')
      pickerTitleLeftElem.style.height = '100%'
      pickerTitleLeftElem.style.width = '3rem'
      pickerTitleLeftElem.style.borderRadius = '3rem'
      if (debug) {
        pickerTitleLeftElem.classList.add('ripple')
        pickerTitleLeftElem.style.backgroundImage = 'url(' + require('@/assets/bulb-dark.png') + ')'
        pickerTitleLeftElem.style.backgroundRepeat = 'no-repeat'
        pickerTitleLeftElem.style.backgroundSize = '50% 50%'
        pickerTitleLeftElem.style.backgroundPosition = 'center'
        pickerTitleLeftElem.onclick = function () {
          var helpDataArr = [
            {
              content: 'cols属性使用说明',
              title: '属性 cols 说明文档',
              doc: pickerColsDoc
            },
            {
              content: 'type属性使用说明',
              title: '属性 type 说明文档',
              doc: pickerTypeDoc
            }
          ]
          var helpListWrapElem = document.createElement('div')
          helpListWrapElem.innerHTML = `<p class="tip-block">欢迎阅读 picker 选择器的使用说明<br><br>作者：蜜糖灬小妖</p>`
          var helpListUlElem = document.createElement('ul')
          for (let h = 0; h < helpDataArr.length; h++) {
            var helpItemElem = document.createElement('li')
            helpItemElem.style.lineHeight = '30px'
            var helpAElem = document.createElement('a')
            helpAElem.href = 'javascript:void(0);'
            helpAElem.innerHTML = helpDataArr[h].content
            ;(function (target, helpInfo) {
              target.onclick = function () {
                showPickerInfoPop(helpInfo.title, helpInfo.doc)
              }
            })(helpAElem, helpDataArr[h])
            helpItemElem.appendChild(helpAElem)
            helpListUlElem.appendChild(helpItemElem)
          }
          helpListWrapElem.appendChild(helpListUlElem)
          showPickerInfoPop('picker 使用帮助文档', helpListWrapElem, true)
        }
      }
      pickerTitleWrapElem.appendChild(pickerTitleLeftElem)

      var pickerTitleElem = document.createElement('span')
      pickerTitleElem.classList.add('picker-title')
      pickerTitleElem.innerHTML = title
      pickerTitleElem.style.color = titleColor
      pickerTitleWrapElem.appendChild(pickerTitleElem)

      if (needSelectAll === true) {
        var pickerTitleSelectAllElem = document.createElement('span')
        pickerTitleSelectAllElem.classList.add('ripple')
        pickerTitleSelectAllElem.style.height = '100%'
        pickerTitleSelectAllElem.style.width = '3rem'
        pickerTitleSelectAllElem.innerHTML = '全选'
        pickerTitleWrapElem.appendChild(pickerTitleSelectAllElem)
      }

      var pickerTitleRightElem = document.createElement('span')
      pickerTitleRightElem.classList.add('ripple')
      pickerTitleRightElem.style.height = '100%'
      pickerTitleRightElem.style.width = '3rem'
      pickerTitleRightElem.style.borderRadius = '3rem'
      pickerTitleRightElem.style.backgroundImage = 'url(' + require('@/assets/close-dark.png') + ')'
      pickerTitleRightElem.style.backgroundRepeat = 'no-repeat'
      pickerTitleRightElem.style.backgroundSize = '40% 40%'
      pickerTitleRightElem.style.backgroundPosition = 'center'
      pickerTitleWrapElem.appendChild(pickerTitleRightElem)
      pickerTitleRightElem.onclick = function () {
        if (document.getElementById('picker-box').classList.contains('picker-info-pop')) {
          document.getElementById('picker-box').classList.remove('picker-info-pop')
          document.getElementById('picker-box').getElementsByClassName('picker-title')[0].innerHTML = title
          var pickerInfoDocPop = document.getElementById('picker-box').getElementsByClassName('picker-info-doc-pop')[0]
          if (pickerInfoDocPop) {
            document.getElementById('picker-box').getElementsByClassName('picker-wheel-wrap')[0].removeChild(pickerInfoDocPop)
          }
          return false
        }
        pickerShade.style.opacity = 0
        pickerElem.style.transform = 'translateY(110%)'
        setTimeout(() => {
          document.body.removeChild(pickerShade)
          document.body.removeChild(pickerElem)
        }, 400)
        selectedFinishFn(selected, arg)
      }

      var pickerTitleLineElem = document.createElement('div')
      pickerTitleLineElem.style.height = 0
      pickerTitleLineElem.style.borderBottom = '1px solid ' + titleLineColor
      pickerElem.appendChild(pickerTitleLineElem)

      var pickerWheelWrapElem = document.createElement('div')
      pickerWheelWrapElem.classList.add('picker-wheel-wrap')
      pickerWheelWrapElem.style.position = 'relative'
      pickerWheelWrapElem.style.height = wheelHeight
      pickerWheelWrapElem.style.overflow = 'hidden'
      pickerElem.appendChild(pickerWheelWrapElem)

      if (type) {
        var minVal = valRange[0]
        var maxVal = valRange[1]
        if (type.toLowerCase() === 'yyyy-mm-dd' || type.toLowerCase() === 'yyyy-mm') {
          let yearMin = 1900
          let yearMax = Number(new Date().getFullYear())
          if (minVal && minVal !== '~') {
            yearMin = Number(minVal.match(/[\d]+/g)[0])
          } else {
            yearMin = Number(new Date().getFullYear())
          }
          if (maxVal && maxVal !== '~') {
            yearMax = Number(maxVal.match(/[\d]+/g)[0])
          } else {
            yearMax = Number(new Date().getFullYear())
          }
          let monthMax = 12
          if (maxVal && maxVal !== '~') {
            monthMax = 12
          } else {
            if (value && value.length > 0 && Number(value[0]) === yearMax) {
              monthMax = Number(new Date().getMonth()) + 1
            } else {
              monthMax = 12
            }
          }
          let yearArr = []
          for (let y = yearMin; y <= yearMax; y++) {
            yearArr.push({
              val: y,
              unit: '年'
            })
          }
          cols[0] = yearArr
          colCallBack[0] = function (pickerSelected, rowIndex) {
            if (maxVal && maxVal === '~') {
              let changeMonthMax = 12
              let changeDayMax = getDaysInMonth(Number(pickerSelected[0].val), Number(pickerSelected[1].val))
              if (Number(pickerSelected[0].val) === Number(new Date().getFullYear())) {
                changeMonthMax = Number(new Date().getMonth()) + 1
                if (Number(pickerSelected[1].val) === Number(new Date().getMonth()) + 1) {
                  changeDayMax = Number(new Date().getDate())
                }
              }
              let changeMonthData = []
              for (let m = 1; m <= changeMonthMax; m++) {
                changeMonthData.push({
                  val: m,
                  unit: '月'
                })
              }
              resetPickerItem(1, changeMonthData, colLineHeight, lineSelectedOffsetTop, selected, arg, selectedFn)
              if (type.toLowerCase() === 'yyyy-mm-dd') {
                let changeDayData = []
                for (let d = 1; d <= changeDayMax; d++) {
                  changeDayData.push({
                    val: d,
                    unit: '日'
                  })
                }
                resetPickerItem(2, changeDayData, colLineHeight, lineSelectedOffsetTop, selected, arg, selectedFn)
              }
            }
          }
          let monthArr = []
          for (let m = 1; m <= monthMax; m++) {
            monthArr.push({
              val: m,
              unit: '月'
            })
          }
          cols[1] = monthArr
          if (type.toLowerCase() === 'yyyy-mm-dd') {
            colCallBack[1] = function (pickerSelected, rowIndex) {
              if (!maxVal || (maxVal && maxVal === '~')) {
                let changeDayMax = getDaysInMonth(Number(pickerSelected[0].val), Number(pickerSelected[1].val))
                if (maxVal && maxVal === '~' && Number(pickerSelected[0].val) === Number(new Date().getFullYear())) {
                  if (Number(pickerSelected[1].val) === Number(new Date().getMonth()) + 1) {
                    changeDayMax = Number(new Date().getDate())
                  }
                }
                let changeDayData = []
                for (let d = 1; d <= changeDayMax; d++) {
                  changeDayData.push({
                    val: d,
                    unit: '日'
                  })
                }
                resetPickerItem(2, changeDayData, colLineHeight, lineSelectedOffsetTop, selected, arg, selectedFn)
              }
            }
          }
          if (type.toLowerCase() === 'yyyy-mm-dd') {
            let dayMax = -1
            if (value && value.length > 0) {
              dayMax = getDaysInMonth(Number(value[0]), Number(value[1]))
            } else {
              dayMax = getDaysInMonth(Number(cols[0][0].val), Number(cols[1][0].val))
            }
            if (maxVal && maxVal === '~') {
              if (value && value.length > 0 && Number(value[0]) === Number(new Date().getFullYear())) {
                if (Number(value[1]) === Number(new Date().getMonth()) + 1) {
                  dayMax = Number(new Date().getDate())
                }
              }
            }
            let dayArr = []
            for (let d = 1; d <= dayMax; d++) {
              dayArr.push({
                val: d,
                unit: '日'
              })
            }
            cols[2] = dayArr
          }
        } else if (type.toLowerCase() === 'mm-dd') {
          let monthMax = 12
          if (maxVal !== '~') {
            monthMax = 12
          } else {
            monthMax = Number(new Date().getMonth()) + 1
          }
          let monthArr = []
          for (let m = 1; m <= monthMax; m++) {
            monthArr.push({
              val: m,
              unit: '月'
            })
          }
          cols[0] = monthArr
          colCallBack[0] = function (pickerSelected, rowIndex) {
            if (!maxVal || (maxVal && maxVal === '~')) {
              let changeDayMax = getDaysInMonth(Number(new Date().getFullYear()), Number(pickerSelected[0].val))
              if (maxVal && maxVal === '~' && Number(pickerSelected[0].val) === Number(new Date().getMonth()) + 1) {
                changeDayMax = Number(new Date().getDate())
              }
              let changeDayData = []
              for (let d = 1; d <= changeDayMax; d++) {
                changeDayData.push({
                  val: d,
                  unit: '日'
                })
              }
              resetPickerItem(1, changeDayData, colLineHeight, lineSelectedOffsetTop, selected, arg, selectedFn)
            }
          }
          let dayMax = -1
          if (value && value.length > 0) {
            dayMax = getDaysInMonth(Number(new Date().getFullYear()), Number(value[0]))
          } else {
            dayMax = getDaysInMonth(Number(new Date().getFullYear()), Number(cols[0][0].val))
          }
          if (maxVal && maxVal === '~') {
            if (value && value.length > 0) {
              if (Number(value[0]) === Number(new Date().getMonth()) + 1) {
                dayMax = Number(new Date().getDate())
              }
            }
          }
          let dayArr = []
          for (let d = 1; d <= dayMax; d++) {
            dayArr.push({
              val: d,
              unit: '日'
            })
          }
          cols[1] = dayArr
        } else if (type.toLowerCase() === 'yyyy') {
          let yearMin = 1980
          let yearMax = Number(new Date().getFullYear())
          if (minVal && minVal !== '~') {
            yearMin = Number(minVal)
          }
          if (maxVal && maxVal !== '~') {
            yearMax = Number(maxVal)
          }
          let yearArr = []
          for (let y = yearMin; y <= yearMax; y++) {
            yearArr.push({
              val: y,
              unit: '年'
            })
          }
          cols[0] = yearArr
        } else if (type.toLowerCase() === 'mm') {
          let monthMin = 1
          let monthMax = 12
          if (minVal && minVal !== '~') {
            monthMin = Number(minVal)
          }
          if (maxVal && maxVal !== '~') {
            monthMax = Number(maxVal) > 12 ? 12 : Number(maxVal)
          } else if (maxVal && maxVal === '~') {
            monthMax = Number(new Date().getMonth()) + 1
          }
          let monthArr = []
          for (let m = monthMin; m <= monthMax; m++) {
            monthArr.push({
              val: m,
              unit: '月份'
            })
          }
          cols[0] = monthArr
        } else if (type.toLowerCase() === 'sex') {
          cols[0] = [
            {
              val: '0',
              display: '女'
            },
            {
              val: '1',
              display: '男'
            }
          ]
        } else if (type.toLowerCase() === 'constellation') {
          cols[0] = [
            {
              val: '白羊座'
            },
            {
              val: '金牛座'
            },
            {
              val: '双子座'
            },
            {
              val: '巨蟹座'
            },
            {
              val: '狮子座'
            },
            {
              val: '处女座'
            },
            {
              val: '天秤座'
            },
            {
              val: '天蝎座'
            },
            {
              val: '射手座'
            },
            {
              val: '摩羯座'
            },
            {
              val: '水瓶座'
            },
            {
              val: '双鱼座'
            }
          ]
        }
      }
      if (cols.length > 0) {
        var dataColumn = 0
        var unitColumn = 0
        pickerWheelWrapElem.innerHTML = ''
        for (let row = 0; row < cols.length; row++) {
          if (cols[row] && isArr(cols[row]) && cols[row].length > 0) {
            dataColumn++
            if (cols[row][0].unit) {
              unitColumn++
            }
          }
        }
        if (dataColumn > 0) {
          var selectedShowElem = document.createElement('div')
          selectedShowElem.classList.add('picker-selected')
          selectedShowElem.style.position = 'absolute'
          selectedShowElem.style.width = '100%'
          selectedShowElem.style.height = colLineHeight
          selectedShowElem.style.left = 0
          selectedShowElem.style.top = `calc((100% - ${colLineHeight}) / 2 - ${lineSelectedOffsetTop})`
          selectedShowElem.style.borderTop = '0.1px dashed ' + lineSelectedColor
          selectedShowElem.style.borderBottom = '0.1px dashed ' + lineSelectedColor
          selectedShowElem.style.boxShadow = '0px 0px 40px 0px rgba(200, 200, 200, .4) inset'
          selectedShowElem.style.backgroundColor = selectedBg
          selectedShowElem.style.zIndex = 10
          selectedShowElem.style.pointerEvents = 'none'
          pickerWheelWrapElem.appendChild(selectedShowElem)

          var topGradualElem = document.createElement('div')
          topGradualElem.classList.add('picker-gradual-top')
          topGradualElem.style.position = 'absolute'
          topGradualElem.style.width = '100%'
          topGradualElem.style.height = gradualHeight
          topGradualElem.style.left = 0
          topGradualElem.style.top = 0
          topGradualElem.style.background = 'linear-gradient(rgba(255, 255, 255, .8), rgba(255, 255, 255, .6), rgba(255, 255, 255, .2), rgba(255, 255, 255, .0))'
          topGradualElem.style.zIndex = 100
          topGradualElem.style.pointerEvents = 'none'
          pickerWheelWrapElem.appendChild(topGradualElem)

          var bottomGradualElem = document.createElement('div')
          bottomGradualElem.classList.add('picker-gradual-bottom')
          bottomGradualElem.style.position = 'absolute'
          bottomGradualElem.style.width = '100%'
          bottomGradualElem.style.height = gradualHeight
          bottomGradualElem.style.left = 0
          bottomGradualElem.style.bottom = 0
          bottomGradualElem.style.background = 'linear-gradient(rgba(255, 255, 255, .0), rgba(255, 255, 255, .2), rgba(255, 255, 255, .6), rgba(255, 255, 255, .8))'
          bottomGradualElem.style.zIndex = 100
          bottomGradualElem.style.pointerEvents = 'none'
          pickerWheelWrapElem.appendChild(bottomGradualElem)
        }
        var unitColumnWidth = pickerWheelWrapElem.offsetWidth * 0.14
        var dataColumnWidth = (pickerWheelWrapElem.offsetWidth - unitColumn * unitColumnWidth - (dataColumn + unitColumn) * 1) / dataColumn
        var currentOffsetLeft = 1
        for (let row = 0; row < cols.length; row++) {
          if (cols[row] && isArr(cols[row]) && cols[row].length > 0) {
            var initSelectedItemIndex = 0
            for (let d = 0; d < cols[row].length; d++) {
              if (String(value[row]) && String(cols[row][d].val || cols[row][d].display) === String(value[row])) {
                initSelectedItemIndex = d
              }
            }
            var pickerUnitWrapElem = null
            var pickerColmunWrapElem = document.createElement('div')
            pickerColmunWrapElem.classList.add('picker-data-wheel')
            pickerColmunWrapElem.classList.add('data-wheel-' + row)
            pickerColmunWrapElem.style.width = dataColumnWidth + 'px'
            pickerColmunWrapElem.style.height = '100%'
            pickerColmunWrapElem.style.position = 'absolute'
            pickerColmunWrapElem.style.top = 0
            pickerColmunWrapElem.style.left = currentOffsetLeft + 'px'
            pickerColmunWrapElem.style.zIndex = 1
            pickerColmunWrapElem.style.backgroundColor = wheelBg
            if (row > 0) {
              if (merge === true && pickerWheelWrapElem.lastChild.classList.contains('picker-data-wheel')) {
                pickerColmunWrapElem.style.borderLeft = 'none'
              } else {
                pickerColmunWrapElem.style.borderLeft = '1px solid ' + colLineColor
                currentOffsetLeft += 1
              }
            }
            pickerWheelWrapElem.appendChild(pickerColmunWrapElem)
            currentOffsetLeft += dataColumnWidth

            var colLineHeightToPx = 0
            if (colLineHeight.indexOf('rem') > 0) {
              colLineHeightToPx = Number(colLineHeight.match(/[-?\d.?]+/g)[0]) * 16
            } else {
              colLineHeightToPx = Number(colLineHeight.match(/[-?\d.?]+/g)[0])
            }
            var lineSelectedOffsetTopToPx = 0
            if (lineSelectedOffsetTop.indexOf('rem') > 0) {
              lineSelectedOffsetTopToPx = Number(lineSelectedOffsetTop.match(/[-?\d.?]+/g)[0]) * 16
            } else {
              lineSelectedOffsetTopToPx = Number(lineSelectedOffsetTop.match(/[-?\d.?]+/g)[0])
            }
            var pickerDataWheelWrapElem = document.createElement('div')
            pickerDataWheelWrapElem.style.position = 'relative'
            pickerDataWheelWrapElem.style.width = '100%'
            pickerDataWheelWrapElem.style.transition = 'all 0.3s ease 0s'
            pickerDataWheelWrapElem.style.transform = `translateY(${(pickerWheelWrapElem.offsetHeight - colLineHeightToPx) / 2 - lineSelectedOffsetTopToPx}px)`
            pickerColmunWrapElem.appendChild(pickerDataWheelWrapElem)
            ;(function (elem, index) {
              selected[row] = {
                val: cols[row][index].val || '',
                display: cols[row][index].display || '',
                unit: cols[row][index].unit || null
              }
              if (row === cols.length - 1) {
                selectedFn(selected, arg)
              }
              setTimeout(() => {
                elem.style.transform = `translateY(${(pickerWheelWrapElem.offsetHeight - colLineHeightToPx) / 2 - lineSelectedOffsetTopToPx - index * colLineHeightToPx + 1}px)`
              }, 200)
            })(pickerDataWheelWrapElem, initSelectedItemIndex)

            for (let d = 0; d < cols[row].length; d++) {
              var pickerDatalem = document.createElement('span')
              pickerDatalem.style.display = 'block'
              pickerDatalem.innerHTML = cols[row][d].display || cols[row][d].val || ''
              pickerDatalem.style.position = 'relative'
              pickerDatalem.style.width = '100%'
              pickerDatalem.style.height = colLineHeight
              pickerDatalem.style.lineHeight = colLineHeight
              pickerDatalem.style.textAlign = 'center'
              pickerDatalem.setAttribute('picker-item-real-val', cols[row][d].val || '')
              pickerDataWheelWrapElem.appendChild(pickerDatalem)
            }

            var pickerUnitWheelWrapElem = null
            if (cols[row][0].unit) {
              pickerUnitWrapElem = document.createElement('div')
              pickerUnitWrapElem.classList.add('picker-unit-wheel')
              pickerUnitWrapElem.classList.add('unit-wheel-' + row)
              pickerUnitWrapElem.style.width = unitColumnWidth + 'px'
              pickerUnitWrapElem.style.height = '100%'
              pickerUnitWrapElem.style.position = 'absolute'
              pickerUnitWrapElem.style.top = 0
              pickerUnitWrapElem.style.left = currentOffsetLeft + 'px'
              pickerUnitWrapElem.style.borderLeft = '1px solid ' + colLineColor
              pickerUnitWrapElem.style.backgroundColor = unitBg
              pickerUnitWrapElem.style.zIndex = 20
              pickerWheelWrapElem.appendChild(pickerUnitWrapElem)
              currentOffsetLeft += unitColumnWidth + 1

              var shadeTop = document.createElement('div')
              shadeTop.style.position = 'absolute'
              shadeTop.style.left = 0
              shadeTop.style.top = 0
              shadeTop.style.width = '100%'
              shadeTop.style.height = `calc((100% - ${colLineHeight}) / 2 - ${lineSelectedOffsetTop})`
              shadeTop.style.zIndex = 99
              shadeTop.style.background = 'linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))'
              pickerUnitWrapElem.appendChild(shadeTop)

              var shadeBottom = document.createElement('div')
              shadeBottom.style.position = 'absolute'
              shadeBottom.style.left = 0
              shadeBottom.style.bottom = 0
              shadeBottom.style.width = '100%'
              shadeBottom.style.height = `calc((100% - ${colLineHeight}) / 2 + ${lineSelectedOffsetTop})`
              shadeBottom.style.zIndex = 99
              shadeBottom.style.background = 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))'
              pickerUnitWrapElem.appendChild(shadeBottom)

              pickerUnitWheelWrapElem = document.createElement('div')
              pickerUnitWheelWrapElem.style.position = 'relative'
              pickerUnitWheelWrapElem.style.width = '100%'
              pickerUnitWheelWrapElem.style.transition = 'all 0.2s ease 0s'
              pickerUnitWheelWrapElem.style.transform = `translateY(${(pickerWheelWrapElem.offsetHeight - colLineHeightToPx) / 2 - lineSelectedOffsetTopToPx}px)`
              pickerUnitWrapElem.appendChild(pickerUnitWheelWrapElem)
              ;(function (elem, index) {
                setTimeout(() => {
                  elem.style.transform = `translateY(${(pickerWheelWrapElem.offsetHeight - colLineHeightToPx) / 2 - lineSelectedOffsetTopToPx - index * colLineHeightToPx + 1}px)`
                }, 200)
              })(pickerUnitWheelWrapElem, initSelectedItemIndex)

              for (let u = 0; u < cols[row].length; u++) {
                var pickerUnitElem = document.createElement('span')
                pickerUnitElem.style.display = 'block'
                pickerUnitElem.innerHTML = cols[row][u].unit || cols[row][0].unit
                pickerUnitElem.style.position = 'relative'
                pickerUnitElem.style.width = '100%'
                pickerUnitElem.style.height = colLineHeight
                pickerUnitElem.style.lineHeight = colLineHeight
                pickerUnitElem.style.textAlign = 'center'
                pickerUnitWheelWrapElem.appendChild(pickerUnitElem)
              }
            }

            ;(function (pickerDataWheelWrapElem, pickerUnitWheelWrapElem, rowData, row) {
              var pickerWheelTouchYStart = -1
              var currentTranslateY = -1
              var translateToY = -1
              pickerDataWheelWrapElem.addEventListener('touchstart', function () {
                event.preventDefault()
                pickerWheelTouchYStart = event.touches[0].pageY
                currentTranslateY = Number(this.style.transform.match(/[-?\d]+/g)[0])
                translateToY = currentTranslateY
                this.style.transitionDuration = '0s'
              }, false)
              pickerDataWheelWrapElem.addEventListener('touchmove', function () {
                event.preventDefault()
                if (pickerWheelTouchYStart < 0) {
                  pickerWheelTouchYStart = event.touches[0].pageY
                  currentTranslateY = Number(this.style.transform.match(/[-?\d]+/g)[0])
                  translateToY = currentTranslateY
                  this.style.transitionDuration = '0s'
                }
                var diff = event.touches[0].pageY - pickerWheelTouchYStart
                this.style.transform = `translateY(calc(${currentTranslateY}px + ${diff * touchRate}px))`
                if (unitFollow === true && pickerUnitWheelWrapElem) {
                  pickerUnitWheelWrapElem.style.transform = `translateY(calc(${currentTranslateY}px + ${diff * touchRate}px))`
                }
                translateToY = currentTranslateY + diff * touchRate
              }, false)
              pickerDataWheelWrapElem.addEventListener('touchend', function () {
                this.style.transitionDuration = '0.3s'
                var minY = (pickerWheelWrapElem.offsetHeight - colLineHeightToPx) / 2 - lineSelectedOffsetTopToPx - this.offsetHeight
                var maxY = (pickerWheelWrapElem.offsetHeight - colLineHeightToPx) / 2 - lineSelectedOffsetTopToPx
                if (translateToY < minY + colLineHeightToPx) {
                  // 选中最后一项
                  let selectedItemUnit = rowData[rowData.length - 1].unit || rowData[0].unit || null
                  this.style.transform = `translateY(${minY + colLineHeightToPx + 1}px)`
                  if ((unitFollow === false && selectedItemUnit && selectedItemUnit !== selected[row].unit) || unitFollow === true) {
                    if (pickerUnitWheelWrapElem) {
                      pickerUnitWheelWrapElem.style.transform = `translateY(${minY + colLineHeightToPx + 1}px)`
                    }
                  }
                  selected[row] = {
                    val: rowData[rowData.length - 1].val || '',
                    display: rowData[rowData.length - 1].display || '',
                    unit: rowData[rowData.length - 1].unit || null
                  }
                  selectedFn(selected, arg)
                } else if (translateToY > maxY) {
                  // 选中最前一项
                  let selectedItemUnit = rowData[0].unit || null
                  this.style.transform = `translateY(${maxY + 1}px)`
                  if ((unitFollow === false && selectedItemUnit && selectedItemUnit !== selected[row].unit) || unitFollow === true) {
                    if (pickerUnitWheelWrapElem) {
                      pickerUnitWheelWrapElem.style.transform = `translateY(${maxY + 1}px)`
                    }
                  }
                  selected[row] = {
                    val: rowData[0].val || '',
                    display: rowData[0].display || '',
                    unit: rowData[0].unit || null
                  }
                  selectedFn(selected, arg)
                } else {
                  var overItemCount = Math.floor(Math.abs((translateToY - maxY) / colLineHeightToPx))
                  var bryond = Math.abs((translateToY - maxY) % colLineHeightToPx)
                  if (bryond < colLineHeightToPx / 2) {
                    let selectedItemUnit = rowData[overItemCount].unit || rowData[0].unit || null
                    this.style.transform = `translateY(${maxY - overItemCount * colLineHeightToPx + 1}px)`
                    if ((unitFollow === false && selectedItemUnit && selectedItemUnit !== selected[row].unit) || unitFollow === true) {
                      if (pickerUnitWheelWrapElem) {
                        pickerUnitWheelWrapElem.style.transform = `translateY(${maxY - overItemCount * colLineHeightToPx + 1}px)`
                      }
                    }
                    selected[row] = {
                      val: rowData[overItemCount].val || '',
                      display: rowData[overItemCount].display || '',
                      unit: rowData[overItemCount].unit || null
                    }
                    selectedFn(selected, arg)
                  } else {
                    let selectedItemUnit = rowData[overItemCount + 1].unit || rowData[0].unit || null
                    this.style.transform = `translateY(${maxY - (overItemCount + 1) * colLineHeightToPx + 1}px)`
                    if ((unitFollow === false && selectedItemUnit && selectedItemUnit !== selected[row].unit) || unitFollow === true) {
                      if (pickerUnitWheelWrapElem) {
                        pickerUnitWheelWrapElem.style.transform = `translateY(${maxY - (overItemCount + 1) * colLineHeightToPx + 1}px)`
                      }
                    }
                    selected[row] = {
                      val: rowData[overItemCount + 1].val || '',
                      display: rowData[overItemCount + 1].display || '',
                      unit: rowData[overItemCount + 1].unit || null
                    }
                    selectedFn(selected, arg)
                  }
                }
                pickerWheelTouchYStart = -1
                currentTranslateY = -1
                translateToY = -1
                if (colCallBack && isFunction(colCallBack[row])) {
                  colCallBack[row](selected, row)
                }
              }, false)
              pickerDataWheelWrapElem.addEventListener('touchcancle', function () {
                this.style.transitionDuration = '0.3s'
                var minY = (pickerWheelWrapElem.offsetHeight - colLineHeightToPx) / 2 - lineSelectedOffsetTopToPx - this.offsetHeight
                var maxY = (pickerWheelWrapElem.offsetHeight - colLineHeightToPx) / 2 - lineSelectedOffsetTopToPx
                if (translateToY < minY + colLineHeightToPx) {
                  // 选中最后一项
                  let selectedItemUnit = rowData[rowData.length - 1].unit || rowData[0].unit || null
                  this.style.transform = `translateY(${minY + colLineHeightToPx + 1}px)`
                  if ((unitFollow === false && selectedItemUnit && selectedItemUnit !== selected[row].unit) || unitFollow === true) {
                    if (pickerUnitWheelWrapElem) {
                      pickerUnitWheelWrapElem.style.transform = `translateY(${minY + colLineHeightToPx + 1}px)`
                    }
                  }
                  selected[row] = {
                    val: rowData[rowData.length - 1].val || '',
                    display: rowData[rowData.length - 1].display || '',
                    unit: rowData[rowData.length - 1].unit || null
                  }
                  selectedFn(selected, arg)
                } else if (translateToY > maxY) {
                  // 选中最前一项
                  let selectedItemUnit = rowData[0].unit || null
                  this.style.transform = `translateY(${maxY + 1}px)`
                  if ((unitFollow === false && selectedItemUnit && selectedItemUnit !== selected[row].unit) || unitFollow === true) {
                    if (pickerUnitWheelWrapElem) {
                      pickerUnitWheelWrapElem.style.transform = `translateY(${maxY + 1}px)`
                    }
                  }
                  selected[row] = {
                    val: rowData[0].val || '',
                    display: rowData[0].display || '',
                    unit: rowData[0].unit || null
                  }
                  selectedFn(selected, arg)
                } else {
                  var overItemCount = Math.floor(Math.abs((translateToY - maxY) / colLineHeightToPx))
                  var bryond = Math.abs((translateToY - maxY) % colLineHeightToPx)
                  if (bryond < colLineHeightToPx / 2) {
                    let selectedItemUnit = rowData[overItemCount].unit || rowData[0].unit || null
                    this.style.transform = `translateY(${maxY - overItemCount * colLineHeightToPx + 1}px)`
                    if ((unitFollow === false && selectedItemUnit && selectedItemUnit !== selected[row].unit) || unitFollow === true) {
                      if (pickerUnitWheelWrapElem) {
                        pickerUnitWheelWrapElem.style.transform = `translateY(${maxY - overItemCount * colLineHeightToPx + 1}px)`
                      }
                    }
                    selected[row] = {
                      val: rowData[overItemCount].val || '',
                      display: rowData[overItemCount].display || '',
                      unit: rowData[overItemCount].unit || null
                    }
                    selectedFn(selected, arg)
                  } else {
                    let selectedItemUnit = rowData[overItemCount + 1].unit || rowData[0].unit || null
                    this.style.transform = `translateY(${maxY - (overItemCount + 1) * colLineHeightToPx + 1}px)`
                    if ((unitFollow === false && selectedItemUnit && selectedItemUnit !== selected[row].unit) || unitFollow === true) {
                      if (pickerUnitWheelWrapElem) {
                        pickerUnitWheelWrapElem.style.transform = `translateY(${maxY - (overItemCount + 1) * colLineHeightToPx + 1}px)`
                      }
                    }
                    selected[row] = {
                      val: rowData[overItemCount + 1].val || '',
                      display: rowData[overItemCount + 1].display || '',
                      unit: rowData[overItemCount + 1].unit || null
                    }
                    selectedFn(selected, arg)
                  }
                }
                pickerWheelTouchYStart = -1
                currentTranslateY = -1
                translateToY = -1
                if (colCallBack && isFunction(colCallBack[row])) {
                  colCallBack[row](selected, row)
                }
              }, false)
            })(pickerDataWheelWrapElem, pickerUnitWheelWrapElem, cols[row], row)
          }
        }
      } else {
        pickerWheelWrapElem.innerHTML = ''
        var noColsDataTipElem = document.createElement('span')
        noColsDataTipElem.style.position = 'absolute'
        noColsDataTipElem.style.top = 0
        noColsDataTipElem.style.bottom = 0
        noColsDataTipElem.style.left = 0
        noColsDataTipElem.style.right = 0
        noColsDataTipElem.style.textShadow = '2px 1px 18px rgba(0, 0, 0, .6)'
        noColsDataTipElem.style.backgroundColor = 'rgba(173, 173, 173, 0.23)'
        noColsDataTipElem.style.textAlign = 'center'
        noColsDataTipElem.style.lineHeight = pickerWheelWrapElem.offsetHeight + 'px'
        pickerWheelWrapElem.appendChild(noColsDataTipElem)
        var pickerNoColTipSpan = document.createElement('span')
        pickerNoColTipSpan.innerHTML = '请设置'
        var pickerColsTipA = document.createElement('a')
        pickerColsTipA.title = '点击查看cols属性列表'
        pickerColsTipA.innerHTML = 'cols属性'
        pickerColsTipA.href = 'javascript:void(0);'
        pickerColsTipA.onclick = function () {
          showPickerInfoPop('属性 cols 说明文档', pickerColsDoc)
        }
        pickerNoColTipSpan.appendChild(pickerColsTipA)
        var lineTipSpan = document.createElement('span')
        lineTipSpan.innerHTML = '或'
        pickerNoColTipSpan.appendChild(lineTipSpan)
        var pickerNoColTipA = document.createElement('a')
        pickerNoColTipA.title = '点击查看type属性列表'
        pickerNoColTipA.innerHTML = 'type属性'
        pickerNoColTipA.href = 'javascript:void(0);'
        pickerNoColTipA.onclick = function () {
          showPickerInfoPop('属性 type 说明文档', pickerTypeDoc)
        }
        pickerNoColTipSpan.appendChild(pickerNoColTipA)
        noColsDataTipElem.appendChild(pickerNoColTipSpan)
      }
    }
  }
}

// 显示picker中的type属性列表说明区域
function showPickerInfoPop (title, contentHtml, isNode) {
  var curPickerTipElem = document.getElementById('picker-box').getElementsByClassName('picker-wheel-wrap')[0].getElementsByClassName('picker-info-doc-pop')[0]
  if (curPickerTipElem) {
    document.getElementById('picker-box').getElementsByClassName('picker-wheel-wrap')[0].removeChild(curPickerTipElem)
  }
  if (title) {
    document.getElementById('picker-box').classList.add('picker-info-pop')
    document.getElementById('picker-box').getElementsByClassName('picker-title')[0].innerHTML = title
  }
  var pickerTypeInfoWrap = document.createElement('div')
  pickerTypeInfoWrap.classList.add('picker-info-doc-pop')
  pickerTypeInfoWrap.style.position = 'absolute'
  pickerTypeInfoWrap.style.top = 0
  pickerTypeInfoWrap.style.left = 0
  pickerTypeInfoWrap.style.width = 'calc(100% - 16px)'
  pickerTypeInfoWrap.style.height = 'calc(100% - 8px)'
  pickerTypeInfoWrap.style.backgroundColor = 'rgba(255, 255, 255, 1)'
  pickerTypeInfoWrap.style.zIndex = 99999
  pickerTypeInfoWrap.style.padding = '4px 8px'
  pickerTypeInfoWrap.style.overflowX = 'hidden'
  pickerTypeInfoWrap.style.overflowY = 'auto'
  if (isNode) {
    pickerTypeInfoWrap.appendChild(contentHtml)
  } else {
    pickerTypeInfoWrap.innerHTML = contentHtml
  }
  document.getElementById('picker-box').getElementsByClassName('picker-wheel-wrap')[0].appendChild(pickerTypeInfoWrap)
}

// 重置picker滚轮列内容
function resetPickerItem (pickerItemIndex, rowData, colLineHeight, lineSelectedOffsetTop, selected, arg, selectedFn) {
  var pickerDataItem = document.getElementById('picker-box').getElementsByClassName('data-wheel-' + pickerItemIndex)[0]
  var pickerUnitItem = document.getElementById('picker-box').getElementsByClassName('unit-wheel-' + pickerItemIndex)[0]
  if (rowData) {
    pickerDataItem.childNodes[0].innerHTML = ''
    for (let d = 0; d < rowData.length; d++) {
      var pickerDatalem = document.createElement('span')
      pickerDatalem.style.display = 'block'
      pickerDatalem.innerHTML = rowData[d].display || rowData[d].val || ''
      pickerDatalem.style.position = 'relative'
      pickerDatalem.style.width = '100%'
      pickerDatalem.style.height = colLineHeight
      pickerDatalem.style.lineHeight = colLineHeight
      pickerDatalem.style.textAlign = 'center'
      pickerDatalem.setAttribute('picker-item-real-val', rowData[d].val || '')
      pickerDataItem.childNodes[0].appendChild(pickerDatalem)
    }
    var colLineHeightToPx = 0
    if (colLineHeight.indexOf('rem') > 0) {
      colLineHeightToPx = Number(colLineHeight.match(/[-?\d.?]+/g)[0]) * 16
    } else {
      colLineHeightToPx = Number(colLineHeight.match(/[-?\d.?]+/g)[0])
    }
    var lineSelectedOffsetTopToPx = 0
    if (lineSelectedOffsetTop.indexOf('rem') > 0) {
      lineSelectedOffsetTopToPx = Number(lineSelectedOffsetTop.match(/[-?\d.?]+/g)[0]) * 16
    } else {
      lineSelectedOffsetTopToPx = Number(lineSelectedOffsetTop.match(/[-?\d.?]+/g)[0])
    }
    var minY = (pickerDataItem.offsetHeight - colLineHeightToPx) / 2 - lineSelectedOffsetTopToPx - pickerDataItem.childNodes[0].offsetHeight
    var curTranY = Number(pickerDataItem.childNodes[0].style.transform.match(/[-?\d]+/g)[0])
    if (Math.floor(minY + colLineHeightToPx + 1) > curTranY) {
      pickerDataItem.childNodes[0].style.transform = `translateY(${minY + colLineHeightToPx + 1}px)`
      selected[pickerItemIndex] = {
        val: rowData[rowData.length - 1].val || '',
        display: rowData[rowData.length - 1].display || '',
        unit: rowData[rowData.length - 1].unit || null
      }
      selectedFn(selected, arg)
    }
    if (pickerUnitItem && rowData[0].unit) {
      pickerUnitItem.childNodes[2].innerHTML = ''
      for (let u = 0; u < rowData.length; u++) {
        var pickerUnitElem = document.createElement('span')
        pickerUnitElem.style.display = 'block'
        pickerUnitElem.innerHTML = rowData[u].unit || rowData[0].unit
        pickerUnitElem.style.position = 'relative'
        pickerUnitElem.style.width = '100%'
        pickerUnitElem.style.height = colLineHeight
        pickerUnitElem.style.lineHeight = colLineHeight
        pickerUnitElem.style.textAlign = 'center'
        pickerUnitItem.childNodes[2].appendChild(pickerUnitElem)
      }
    }
  }
}

// 将信息写入日志面板
function writeToConsolePanl (contentHtml, jsonObj, vueContext, rootElem) {
  var consolePanlContentElem = document.getElementById('console-panl-content-elem')
  if (rootElem) {
    consolePanlContentElem = rootElem
  }
  if (consolePanlContentElem) {
    if (consolePanlContentElem.getElementsByClassName('add-val-item').length > 0) {
      var itemLineElem = document.createElement('span')
      itemLineElem.style.display = 'block'
      itemLineElem.style.width = '96%'
      itemLineElem.style.height = '0px'
      itemLineElem.style.marginLeft = '2%'
      itemLineElem.style.borderTop = '1px dotted #625A74'
      consolePanlContentElem.appendChild(itemLineElem)
    }
    var addValElem = null
    if (jsonObj) {
      addValElem = document.createElement('div')
      addValElem.classList.add('add-val-item')
      addValElem.innerHTML = contentHtml
      addValElem.style.color = '#ffffff'
      addValElem.style.transition = 'all 0.4s ease 0s'
      addValElem.style.opacity = 0
      addValElem.style.padding = '4px 8px'
      consolePanlContentElem.appendChild(addValElem)
      var subjoinDataWrapElem = document.createElement('div')
      subjoinDataWrapElem.classList.add('json-obj-root-wrap')
      addValElem.appendChild(subjoinDataWrapElem)
      var subjoinDataElem = null
      if (isJsonOrArr(jsonObj)) {
        subjoinDataElem = document.createElement('div')
        subjoinDataElem.style.color = '#23CBEF'
        subjoinDataElem.style.overflow = 'hidden'
        subjoinDataElem.style.whiteSpace = 'nowrap'
        subjoinDataElem.style.textOverflow = 'ellipsis'
        if (isArr(jsonObj)) {
          subjoinDataElem.innerHTML = '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;(' + jsonObj.length + ') ' + JSON.stringify(jsonObj).substr(0, 30) + '...'
        } else {
          subjoinDataElem.innerHTML = '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;' + JSON.stringify(jsonObj).substr(0, 30) + '...'
        }
        subjoinDataWrapElem.appendChild(subjoinDataElem)
        subjoinDataElem.onclick = function () {
          var beforePointerElem = this.getElementsByClassName('close-pointer')[0] || this.getElementsByClassName('open-pointer')[0]
          if (beforePointerElem.classList.contains('close-pointer')) {
            event.preventDefault()
            beforePointerElem.classList.remove('close-pointer')
            beforePointerElem.classList.add('open-pointer')
            beforePointerElem.innerHTML = '&#x25bc;'
            writeJsonContentLevel(this.parentElement, jsonObj, 0, vueContext)
            this.parentNode.childNodes[1].style.maxHeight = ''
          } else {
            beforePointerElem.classList.remove('open-pointer')
            beforePointerElem.classList.add('close-pointer')
            beforePointerElem.innerHTML = '&#x27b4;'
            this.parentNode.childNodes[1].style.maxHeight = '0px'
          }
        }
      } else {
        subjoinDataElem = document.createElement('div')
        subjoinDataElem.innerHTML = jsonObj
        subjoinDataElem.style.color = '#23CBEF'
        subjoinDataWrapElem.appendChild(subjoinDataElem)
      }
    } else {
      writeToConsolePanl(contentHtml, '数据为空', vueContext, rootElem)
    }
    setTimeout(() => {
      if (addValElem) {
        addValElem.style.opacity = 1
      }
      var scrollH = consolePanlContentElem.scrollHeight
      consolePanlContentElem.scrollTo(0, ++scrollH)
    }, 10)
  }
}

// 获取json数据中每一层级的数据，并写入指定区域
var currentCopyElem = null
function writeJsonContentLevel (rootElem, jsonObj, level, vueContext) {
  if (rootElem.getElementsByClassName('json-obj-log-' + level).length === 0) {
    var nextLogElem = document.createElement('div')
    nextLogElem.classList.add('json-obj-log-' + level)
    nextLogElem.style.overflow = 'hidden'
    nextLogElem.style.paddingLeft = '8px'
    rootElem.appendChild(nextLogElem)
    var jsonItemWrapElem = null
    var jsonItemElem = null
    if (jsonObj.length !== undefined) { // 数组格式
      for (let j = 0; j < jsonObj.length; j++) {
        jsonItemWrapElem = document.createElement('div')
        jsonItemWrapElem.classList.add('json-obj-log-' + level + '-' + j)
        nextLogElem.appendChild(jsonItemWrapElem)
        jsonItemElem = document.createElement('div')
        jsonItemElem.style.color = '#AAE0FC'
        if (isJsonOrArr(jsonObj[j])) {
          jsonItemElem.style.overflow = 'hidden'
          jsonItemElem.style.whiteSpace = 'nowrap'
          jsonItemElem.style.textOverflow = 'ellipsis'
          if (isArr(jsonObj[j])) {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + j + '</span>：' + '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;(' + jsonObj[j].length + ') ' + JSON.stringify(jsonObj[j]).substr(0, 30) + '...'
          } else {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + j + '</span>：' + '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;' + JSON.stringify(jsonObj[j]).substr(0, 30) + '...'
          }
        } else {
          if (isFunction(jsonObj[j])) {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + j + '</span>：' + 'function () { ~ }'
          } else {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + j + '</span>：' + String(jsonObj[j]).replace(/<[^>]+>/g, '')
          }
        }
        jsonItemWrapElem.appendChild(jsonItemElem)
        if (isJsonOrArr(jsonObj[j])) {
          (function (j) {
            jsonItemElem.onclick = function () {
              var beforePointerElem = this.getElementsByClassName('close-pointer')[0] || this.getElementsByClassName('open-pointer')[0]
              if (beforePointerElem.classList.contains('close-pointer')) {
                event.preventDefault()
                beforePointerElem.classList.remove('close-pointer')
                beforePointerElem.classList.add('open-pointer')
                beforePointerElem.innerHTML = '&#x25bc;'
                writeJsonContentLevel(this.parentElement, jsonObj[j], level + 1, vueContext)
                this.parentNode.childNodes[1].style.maxHeight = ''
              } else {
                beforePointerElem.classList.remove('open-pointer')
                beforePointerElem.classList.add('close-pointer')
                beforePointerElem.innerHTML = '&#x27b4;'
                this.parentNode.childNodes[1].style.maxHeight = '0px'
              }
            }
          })(j)
        } else if (!isFunction(jsonObj[j])) {
          jsonItemElem.onclick = function (event) {
            setTimeout(() => {
              if (document.getElementById('console-copy')) {
                if (currentCopyElem) {
                  currentCopyElem.style.color = 'rgb(170, 224, 252)'
                  currentCopyElem = null
                }
                document.body.removeChild(document.getElementById('console-copy'))
                return false
              }
              currentCopyElem = this
              currentCopyElem.style.color = '#ffffff'
              var copyElem = document.createElement('button')
              copyElem.id = 'console-copy'
              copyElem.style.display = 'block'
              copyElem.style.width = '2rem'
              copyElem.style.height = '2rem'
              copyElem.style.position = 'absolute'
              copyElem.style.top = event.pageY + 'px'
              copyElem.style.left = event.pageX + 'px'
              copyElem.style.borderRadius = '2rem'
              copyElem.style.boxShadow = 'rgba(239, 129, 21, 0.3) 0px 0px 40px inset'
              copyElem.style.zIndex = 9999999999
              copyElem.style.textAlign = 'center'
              copyElem.style.lineHeight = '2rem'
              copyElem.innerHTML = '&#x270d'
              copyElem.style.opacity = 0.8
              copyElem.style.textShadow = '0 0 8px rgba(239, 130, 24, .8)'
              copyElem.style.fontWeight = 'bold'
              copyElem.style.fontSize = '14px'
              copyElem.style.color = 'rgb(183, 124, 49)'
              copyElem.style.cursor = 'pointer'
              copyElem.style.border = 'none'
              copyElem.style.outline = 'none'
              copyElem.style.userSelect = 'none'
              copyElem.style.msUserSelect = 'none'
              copyElem.style.webkitUserSelect = 'none'
              copyElem.style.opacity = 0.6
              copyElem.setAttribute('data-clipboard-text', this.innerText)
              document.body.appendChild(copyElem)
              copyElem.onclick = function () {
                if (vueContext) {
                  vueContext.$comfun.copyTxt(vueContext, '#console-copy')
                }
              }
            }, 200)
          }
        }
      }
    } else { // json 对象
      for (let k in jsonObj) {
        jsonItemWrapElem = document.createElement('div')
        jsonItemWrapElem.classList.add('json-obj-log-' + level + '-' + k)
        nextLogElem.appendChild(jsonItemWrapElem)
        jsonItemElem = document.createElement('div')
        jsonItemElem.style.color = '#AAE0FC'
        if (isJsonOrArr(jsonObj[k])) {
          jsonItemElem.style.overflow = 'hidden'
          jsonItemElem.style.whiteSpace = 'nowrap'
          jsonItemElem.style.textOverflow = 'ellipsis'
          if (isArr(jsonObj[k])) {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + k + '</span>：' + '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;(' + jsonObj[k].length + ') ' + JSON.stringify(jsonObj[k]).substr(0, 30) + '...'
          } else {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + k + '</span>：' + '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;' + JSON.stringify(jsonObj[k]).substr(0, 30) + '...'
          }
        } else {
          if (isFunction(jsonObj[k])) {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + k + '</span>：' + 'function () { ~ }'
          } else {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + k + '</span>：' + String(jsonObj[k]).replace(/<[^>]+>/g, '')
          }
        }
        jsonItemWrapElem.appendChild(jsonItemElem)
        if (isJsonOrArr(jsonObj[k])) {
          (function (k) {
            jsonItemElem.onclick = function () {
              var beforePointerElem = this.getElementsByClassName('close-pointer')[0] || this.getElementsByClassName('open-pointer')[0]
              if (beforePointerElem.classList.contains('close-pointer')) {
                beforePointerElem.classList.remove('close-pointer')
                beforePointerElem.classList.add('open-pointer')
                beforePointerElem.innerHTML = '&#x25bc;'
                writeJsonContentLevel(this.parentElement, jsonObj[k], level + 1, vueContext)
                this.parentNode.childNodes[1].style.maxHeight = ''
              } else {
                beforePointerElem.classList.remove('open-pointer')
                beforePointerElem.classList.add('close-pointer')
                beforePointerElem.innerHTML = '&#x27b4;'
                this.parentNode.childNodes[1].style.maxHeight = '0px'
              }
            }
          })(k)
        } else if (!isFunction(jsonObj[k])) {
          jsonItemElem.onclick = function (event) {
            setTimeout(() => {
              if (document.getElementById('console-copy')) {
                if (currentCopyElem) {
                  currentCopyElem.style.color = 'rgb(170, 224, 252)'
                  currentCopyElem = null
                }
                document.body.removeChild(document.getElementById('console-copy'))
                return false
              }
              currentCopyElem = this
              currentCopyElem.style.color = '#ffffff'
              var copyElem = document.createElement('button')
              copyElem.id = 'console-copy'
              copyElem.style.display = 'block'
              copyElem.style.width = '2rem'
              copyElem.style.height = '2rem'
              copyElem.style.position = 'absolute'
              copyElem.style.top = event.pageY + 'px'
              copyElem.style.left = event.pageX + 'px'
              copyElem.style.borderRadius = '2rem'
              copyElem.style.boxShadow = 'rgba(239, 129, 21, 0.3) 0px 0px 40px inset'
              copyElem.style.zIndex = 9999999999
              copyElem.style.textAlign = 'center'
              copyElem.style.lineHeight = '2rem'
              copyElem.innerHTML = '&#x270d'
              copyElem.style.opacity = 0.8
              copyElem.style.textShadow = '0 0 8px rgba(239, 130, 24, .8)'
              copyElem.style.fontWeight = 'bold'
              copyElem.style.fontSize = '14px'
              copyElem.style.color = 'rgb(183, 124, 49)'
              copyElem.style.cursor = 'pointer'
              copyElem.style.border = 'none'
              copyElem.style.outline = 'none'
              copyElem.style.userSelect = 'none'
              copyElem.style.msUserSelect = 'none'
              copyElem.style.webkitUserSelect = 'none'
              copyElem.style.opacity = 0.6
              copyElem.setAttribute('data-clipboard-text', this.innerText)
              document.body.appendChild(copyElem)
              copyElem.onclick = function () {
                if (vueContext) {
                  vueContext.$comfun.copyTxt(vueContext, '#console-copy')
                }
              }
            }, 200)
          }
        }
      }
    }
  }
}

// 创建并返回loading动画
function getLoadingHtml (scale, parentWidth, parentHeight) {
  var scaleVal = scale || 1
  var loadsterHtml = `
    <div class="loadster" style="transform: scale(${scaleVal}, ${scaleVal}); margin-top: ${(parentHeight - scaleVal * 308) / 2}px;  margin-left: ${(parentWidth - scaleVal * 308) / 2}px;">
      <div class="loadster__body">
        <div class="body__gum"></div>
      </div>
      <div class="loadster__mask"></div>
      <div class="loadster__head">
        <div class="head__face"></div>
        <div class="head__ear"></div>
        <div class="head__eye"></div>
        <div class="head__horn">
          <div class="horn__circle"></div>
        </div>
        <div class="head__smile"></div>
        <div class="head__hand"></div>
      </div>
      <div class="loadster__bottom">
        <div class="bottom__foot"></div>
      </div>
    </div>
  `
  return loadsterHtml
}

// 判断obj是否为json对象或数组
function isJsonOrArr (obj) {
  var isjson = typeof obj === 'object' && (Object.prototype.toString.call(obj).toLowerCase() === '[object object]' || Object.prototype.toString.call(obj).toLowerCase() === '[object array]' || Object.prototype.toString.call(obj).toLowerCase() === '[object file]')
  return isjson
}

// 判断obj是否为数组对象
function isArr (obj) {
  var isarr = typeof obj === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object array]'
  return isarr
}

// 判断obj是否为方法对象
function isFunction (obj) {
  var isfunction = typeof obj === 'function' && Object.prototype.toString.call(obj).toLowerCase() === '[object function]'
  return isfunction
}

// 获取n和m之间的随机数字
function rd (n, m) {
  var c = m - n + 1
  return Math.floor(Math.random() * c + n)
}

// 判断某年某月有多少天
function getDaysInMonth (year, month) {
  month = parseInt(month, 10)
  var temp = new Date(year, month, 0)
  return temp.getDate()
}
