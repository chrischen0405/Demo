// ES6方法：使用迭代器
Object.prototype[Symbol.iterator] = function * () {
  let keys = Object.keys(this) // ['a', 'b', 'c']

  for (let key of keys) {
    yield [key, this[key]]
  }
}

// 实现ES6迭代器
Object.prototype[Symbol.iterator] = function () {
  var keys = Object.keys(this)
  var count = 0
  var _self = this
  
  return {
    next: function () {
      return count < keys.length ?
        {
          value: [keys[count], _self[keys[count ++]]],
          done: false
        } :
        {
          value: undefined,
          done: true
        }
    }
  }
}

const obj = {
  a: 1,
  b: 2,
  c: 3
}

for (let [k, v] of obj) {
  console.log(k, v)
}