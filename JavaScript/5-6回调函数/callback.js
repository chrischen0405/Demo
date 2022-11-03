// 基础回调函数
function test (title, callback) {
  const _title = `TITLE: ${title}`
  callback(_title)
}

test('title', (e) => {
  console.log(e)
})

function calculator (a, b, type, callback) {
  let res = 0
  let sign = '+'
  switch (type) {
    case 'PLUS':
      res = a + b
      sign = '+'
      break
    case 'MINUS':
      res = a - b
      sign = '-'
      break
    case 'MUL':
      res = a * b
      sign = '*'
      break
    case 'DIV':
      res = a / b
      sign = '/'
      break
    default:
      res = a + b
      sign = '+'
  }
  
  callback && callback(a, b, sign, res)
  
  return {
    a,
    b,
    sign,
    res
  }
}

const { a, b, sign, res } = calculator(1, 2, 'DIV')

console.log(`${a} ${sign} ${b} = ${res}`)

calculator(3, 4, 'MUL', (a, b, sign, res) => {
  console.log(`${a} ${sign} ${b} = ${res}`)
})