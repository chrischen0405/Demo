/**
 * 洗牌函数
 * @param arr
 * @returns {*}
 */
function shuffle (arr) {
  let res = arr.slice()
  for (let i = 0; i < res.length; i++) {
    const j = getRandomNumber(0, i)
    const temp = res[i]
    res[i] = res[j]
    res[j] = temp
  }
  return res
}

/**
 * 生成随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns {number}
 */
function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const testArr = [1, 2, 3, 4, 5]
console.log(shuffle(testArr))
