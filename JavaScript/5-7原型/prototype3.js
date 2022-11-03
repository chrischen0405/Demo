// prototype相关API
// getPrototypeOf
function Test () {
  this.a = 1
}

Test.prototype.b = 2

const test = new Test()

const testPrototype = Object.getPrototypeOf(test)

console.log(testPrototype === test.__proto__) // true

//setPrototypeOf
const obj = {
  a: 1
}

const objProto = {
  b: 2
}

Object.setPrototypeOf(obj, objProto)

console.log(obj.__proto__)

// isPrototypeOf
console.log(Object.prototype.isPrototypeOf(objProto))

// 浏览器中对原型进行操作性能较差，不建议使用