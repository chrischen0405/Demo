const input = document.getElementById('input1')

input.addEventListener('input', throttle(handler, 800), false)

function handler () {
  console.log(this.value)
}

// 节流
function throttle (handler, delay) {
  const d = delay || 1000
  let initTime = new Date().getTime()
  
  return function () {
    const ctx = this
    const currentTime = new Date().getTime()
    if (currentTime - initTime >= d) {
      handler.apply(ctx, arguments)
      initTime = currentTime
    }
  }
}