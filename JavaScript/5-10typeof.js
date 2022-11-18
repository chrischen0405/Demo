/**
 * @name 类型检测
 * @author ChrisChen
 * @version 1.0
 * @desc 封装typeof
 * @date 2022/11/18 16:46:54
 * @param val 要检测类型的参数
 * @returns {string} 传入参数的类型
 */
function myTypeof (val) {
  const type = typeof(val)
  const typeSet = {
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object Number]': 'obj_number',
    '[object String]': 'obj_string',
    '[object Boolean]': 'obj_boolean',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
  }
  if (val === null) {
    return 'null'
  } else if (type === 'object') {
    const res = Object.prototype.toString.call(val)
    return typeSet[res]
  } else {
    return type
  }
}

console.log(myTypeof(1))
console.log(myTypeof('1'))
console.log(myTypeof(null))
console.log(myTypeof(false))
console.log(myTypeof({}))
console.log(myTypeof([]))
console.log(myTypeof(new Date()))
console.log(myTypeof(new RegExp(/\w/)))
console.log(myTypeof(new Number()))
console.log(myTypeof(new String()))
console.log(myTypeof(new Boolean()))