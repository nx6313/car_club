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
          if (currentCopyElem) {
            currentCopyElem.style.color = 'rgb(170, 224, 252)'
            currentCopyElem = null
          }
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
            <p class="tip-round-block">输出：女士，对应值0；男士，对应值1</p>
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
              display: '女士'
            },
            {
              val: '1',
              display: '男士'
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
        pickerNoColTipSpan.innerHTML = '请设置clos属性或'
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

// 判断某年某月有多少天
function getDaysInMonth (year, month) {
  month = parseInt(month, 10)
  var temp = new Date(year, month, 0)
  return temp.getDate()
}
