const regVal = /\{\{(.+?)\}\}/

class MVVM {
  constructor (el, data) {
    this.el = document.querySelector(el)
    this._data = data
    this.domPool = {}
    this.init()
  }
  
  init () {
    this.initData()
    this.initDom()
  }
  
  initDom () {
    this.bindDom(this.el)
    this.bindInput(this.el)
  }
  
  // 响应式数据 数据劫持
  initData () {
    const _this = this
    this.data = {}
  
    for (let key in this._data) {
      Object.defineProperty(this.data, key, {
        get () {
          console.log('获取数据:', key, _this._data[key])
          return _this._data[key]
        },
        set (newValue) {
          console.log('设置数据:', key, newValue)
          _this.domPool[key].innerHTML = newValue
          _this._data[key] = newValue
        }
      })
    }
  }
  
  bindDom (el) {
    const childNodes = el.childNodes
    childNodes.forEach(item => {
      console.log(item.nodeType)
      if (item.nodeType === 3) { // 文本节点
        const _value = item.nodeValue
        
        if (_value.trim().length) {
          let _isValid = regVal.test(_value)
          
          if (_isValid) {
            const _key = _value.match(regVal)[1].trim()
            this.domPool[_key] = item.parentNode
            item.parentNode.innerText = this.data[_key] || ''
          }
        }
      }
      
      item.childNodes && this.bindDom(item)
    })
  }
  
  // 绑定事件处理函数
  bindInput (el) {
    const _allInput = document.querySelectorAll('input')
    
    _allInput.forEach(input => {
      const _vModel = input.getAttribute('v-model')
      
      if (_vModel) {
        input.addEventListener('keyup', this.handleInput.bind(this, _vModel, input), false)
      }
    })
  }
  
  // 更改数据
  handleInput (key, input) {
    const _value = input.value
    this.data[key] = _value
  }
  
  // 设置数据方法
  setData (key, value) {
    this.data[key] = value
  }
}