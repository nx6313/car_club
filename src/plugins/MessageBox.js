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
      toastElem.style.fontSize = '0.8rem'
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
          document.body.removeChild(document.getElementById('console-copy'))
        }
        var consolePanlContentElem = document.getElementById('console-panl-content-elem')
        if (consolePanlContentElem) {
          consolePanlContentElem.innerHTML = ''
        }
      }
      var consolePanlClearCacheElem = document.createElement('span')
      consolePanlClearCacheElem.style.padding = '2px 10px'
      consolePanlClearCacheElem.style.background = 'rgba(255, 255, 255, .8)'
      consolePanlClearCacheElem.style.borderRadius = '20px'
      consolePanlClearCacheElem.style.color = '#2E2E2E'
      consolePanlClearCacheElem.style.boxShadow = 'rgba(115, 115, 115, 0.68) 0px 0px 4px inset'
      consolePanlClearCacheElem.innerHTML = '清空Local Storage'
      consolePanlClearCacheElem.style.cursor = 'pointer'
      consolePanlClearCacheElem.style.outline = 'none'
      consolePanlClearCacheElem.style.userSelect = 'none'
      consolePanlClearCacheElem.style.msUserSelect = 'none'
      consolePanlClearCacheElem.style.webkitUserSelect = 'none'
      consolePanlClearCacheElem.style.marginLeft = '6px'
      consolePanlTitleElem.appendChild(consolePanlClearCacheElem)
      consolePanlClearCacheElem.onclick = function () {
        if (document.getElementById('console-copy')) {
          document.body.removeChild(document.getElementById('console-copy'))
        }
        window.localStorage.clear()
        context.$toast('Local Storage 数据已清空')
      }
      var consolePanlContentElem = document.createElement('div')
      consolePanlContentElem.id = 'console-panl-content-elem'
      consolePanlContentElem.style.width = '100%'
      consolePanlContentElem.style.height = 'calc(100% - 34px)'
      consolePanlContentElem.style.overflowX = 'hidden'
      consolePanlContentElem.style.overflowY = 'auto'
      consolePanlContentElem.style.wordWrap = 'break-word'
      consolePanlContentElem.style.wordBreak = 'normal'
      consolePanlWrapElem.appendChild(consolePanlContentElem)
      consolePanlContentElem.onclick = function () {
        if (document.getElementById('console-copy')) {
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
  }
}

// 将信息写入日志面板
function writeToConsolePanl (contentHtml, jsonObj, vueContext) {
  var consolePanlContentElem = document.getElementById('console-panl-content-elem')
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
    var addValElem = document.createElement('div')
    addValElem.classList.add('add-val-item')
    addValElem.innerHTML = contentHtml
    addValElem.style.color = '#ffffff'
    addValElem.style.transition = 'all 0.4s ease 0s'
    addValElem.style.opacity = 0
    addValElem.style.padding = '4px 8px'
    consolePanlContentElem.appendChild(addValElem)
    if (jsonObj) {
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
          subjoinDataElem.innerHTML = '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;(' + jsonObj.length + ') ' + JSON.stringify(jsonObj)
        } else {
          subjoinDataElem.innerHTML = '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;' + JSON.stringify(jsonObj)
        }
        subjoinDataWrapElem.appendChild(subjoinDataElem)
        subjoinDataElem.onclick = function () {
          var beforePointerElem = this.getElementsByClassName('close-pointer')[0] || this.getElementsByClassName('open-pointer')[0]
          if (beforePointerElem.classList.contains('close-pointer')) {
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
    }
    setTimeout(() => {
      addValElem.style.opacity = 1
      var scrollH = consolePanlContentElem.scrollHeight
      consolePanlContentElem.scrollTo(0, ++scrollH)
    }, 10)
  }
}

// 获取json数据中每一层级的数据，并写入指定区域
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
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + j + '</span>：' + '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;(' + jsonObj[j].length + ') ' + JSON.stringify(jsonObj[j])
          } else {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + j + '</span>：' + '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;' + JSON.stringify(jsonObj[j])
          }
        } else {
          if (isFunction(jsonObj[j])) {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + j + '</span>：' + 'function () { ~ }'
          } else {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + j + '</span>：' + jsonObj[j]
          }
        }
        jsonItemWrapElem.appendChild(jsonItemElem)
        if (isJsonOrArr(jsonObj[j])) {
          (function (j) {
            jsonItemElem.onclick = function () {
              var beforePointerElem = this.getElementsByClassName('close-pointer')[0] || this.getElementsByClassName('open-pointer')[0]
              if (beforePointerElem.classList.contains('close-pointer')) {
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
                document.body.removeChild(document.getElementById('console-copy'))
              }
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
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + k + '</span>：' + '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;(' + jsonObj[k].length + ') ' + JSON.stringify(jsonObj[k])
          } else {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + k + '</span>：' + '<span class="close-pointer">&#x27b4;</span>&nbsp;&nbsp;' + JSON.stringify(jsonObj[k])
          }
        } else {
          if (isFunction(jsonObj[k])) {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + k + '</span>：' + 'function () { ~ }'
          } else {
            jsonItemElem.innerHTML = '<span style="color: #F78585;">' + k + '</span>：' + jsonObj[k]
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
                document.body.removeChild(document.getElementById('console-copy'))
              }
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

// 判断obj是否为json对象或数组
function isJsonOrArr (obj) {
  var isjson = typeof obj === 'object' && (Object.prototype.toString.call(obj).toLowerCase() === '[object object]' || Object.prototype.toString.call(obj).toLowerCase() === '[object array]')
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
