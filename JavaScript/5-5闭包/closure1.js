// 变量私有化，可以从外部访问到内部变量
function calculator (initialNumber) {
  let num = Number(initialNumber) || 0
  
  function changeNumber (value) {
    num += value
  }
  
  function add (value) {
    changeNumber(value)
  }
  
  function minus (value) {
    changeNumber(-value)
  }
  
  function value () {
    return num
  }
  
  return {
    add,
    minus,
    value
  }
}

const cal = calculator(100)

console.log(cal.value())

cal.add(5)

console.log(cal.value())

cal.minus(50)

console.log(cal.value())