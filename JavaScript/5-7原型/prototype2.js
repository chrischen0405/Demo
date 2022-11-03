// Object.prototype 所有原型链的顶端
// Object.prototype.__proto__ null 不可修改

function MyObject () {}

const myObject = new MyObject()

Object.defineProperty(MyObject.prototype, '__proto__', {
  get () {
    return null
  },
  set (newValue) {
    if (typeof newValue === 'object' || typeof newValue === 'function') {
      throw new TypeError('Uncaught TypeError: Immutable prototype object \'#<MyObject>\' cannot have their prototype set')
    }
  }
})

// MyObject.prototype.__proto__ = 1
// MyObject.prototype.__proto__ = {}
// MyObject.prototype.__proto__ = function () {}