class MVVM {
  constructor (options) {
    const {el, data, methods} = options
    
    this.el = document.querySelector(el)
    this.data = data
    this.methods = methods
    this.showPool = new Map()
    this.eventPool = new Map()
    
    this.init()
  }
  
  init () {
    this.initData()
    this.initDom(this.el)
    this.initView(this.showPool)
    this.initEvent(this.eventPool)
  }
  
  // 1 数据代理与劫持
  initData () {
    for (let key in this.data) {
      Object.defineProperty(this, key, {
        get () {
          return this.data[key]
        },
        set (newValue) {
          this.data[key] = newValue
          this.domChange(key, this.showPool)
        }
      })
    }
  }
  
  // 2 初始化dom
  initDom (el) {
    const _childNodes = el.childNodes
    
    if (!_childNodes.length) return
    _childNodes.forEach(dom => {
      if (dom.nodeType === 1) {
        const vIf = dom.getAttribute('v-if')
        const vShow = dom.getAttribute('v-show')
        const vEvent = dom.getAttribute('@click')
        let _opt = null
        
        if (vIf) {
          _opt = {
            type: 'if',
            show: this.data[vIf],
            data: vIf
          }
        } else if (vShow) {
          _opt = {
            type: 'show',
            show: this.data[vShow],
            data: vShow
          }
        }
        
        if (_opt) {
          this.showPool.set(dom, _opt)
        }
        
        if (vEvent) {
          this.eventPool.set(dom, this.methods[vEvent])
        }
      }
      
      this.initDom(dom)
    })
  }
  
  // 3 初始化视图
  initView (showPool) {
    this.domChange(null, showPool)
  }
  
  domChange (data, showPool) {
    if (!data) {
      for (let [k, v] of showPool) {
        switch (v.type) {
          case 'if':
            v.comment = document.createComment('v-if')
            if (!v.show) {
              k.parentNode.replaceChild(v.comment, k)
            }
            break;
          case 'show':
            if (!v.show) {
              k.style.display = 'none'
            }
            break;
          default: break;
        }
      }
      return
    }
    
    //5 改变数据的同时，改变dom
    for (let [k, v] of showPool) {
      if (v.data === data) {
        switch (v.type) {
          case 'if':
            v.show ? k.parentNode.replaceChild(v.comment, k)
              : v.comment.parentNode.replaceChild(k, v.comment)
            v.show = !v.show
            break;
          case 'show':
            k.style.display = v.show ? 'none' : 'block'
            v.show = !v.show
            break;
          default: break;
        }
      }
    }
  }
  
  // 4 事件处理函数绑定
  initEvent (eventPool) {
    for (let [k, v] of eventPool) {
      k.addEventListener('click', v.bind(this), false)
    }
  }
}