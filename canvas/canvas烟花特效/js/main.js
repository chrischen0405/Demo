const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
let mouseX = null
let mouseY = null
canvas.setAttribute('width', `${window.innerWidth}`) //画布根据屏幕大小变化至全屏
canvas.setAttribute('height', `${window.innerHeight}`)

function init() {
  const arr = []
  let fw = null
  canvas.onclick = function (ev) { // 根据鼠标点击位置生成烟花
    mouseX = changePos(ev)[0]
    mouseY = changePos(ev)[1]
    fw = new Fireworks(mouseX, mouseY)
    arr.unshift(fw)
    setInterval(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let x of arr) {
        x.run()
        x.bomb()
      } //使烟花向上升起
    }, 1)
    console.log(arr)
  }
}

function Fireworks(x, y) {
  this.r = 1
  this.endX = x // 烟花结束位置
  this.endY = y
  this.startX = random(0, canvas.width) // 随机烟花开始横坐标
  this.startY = canvas.height // 烟花从底部开始
  this.speed = 5
  this.x = this.startX
  this.y = this.startY
  this.tail = []//存放烟花轨迹的数组
  this.fire = newFire(x, y) // 烟花爆炸后的火花
}

function newFire(x, y) {
  let arr = []
  for (let i = 0; i < random(20, 30); i++) { // 一束烟花爆炸产生火花
    arr[i] = new Fire(x, y)
  }
  return arr
}

function Fire(x, y) {
  this.x = x // 火花产生点为烟花爆炸点
  this.y = y
  this.r = 3
  this.gravity = 0.03 // 火花所受重力
  this.friction = 0.9999 // 火花所受摩擦力
  this.speedX = random(-3, 3) // 使火花从随机方向打开
  this.speedY = random(-3, 3)
  this.tail = []
  this.color = ranColorNum() // 火花颜色
}

Fireworks.prototype = {
  run: function () {
    if (this.y > this.endY) {
      this.x += this.speedX()
      this.y += this.speedY()
      this.tail.unshift([this.x, this.y]) // 将烟花该时刻位置存进数组
      if (this.tail.length >= 20) { // 数组大小决定烟花尾巴长度
        this.tail.pop()
      }
    }
    for (let x of this.tail) { // 绘制烟花尾部
      ctx.beginPath()
      ctx.arc(x[0], x[1], this.r, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
    }
    if (this.y <= this.endY) { // 烟花到达终点后不再前进，尾部逐渐缩短
      this.tail.pop()
    }
  },
  bomb: function () {
    if (this.y <= this.endY) { // 烟花到达终点后爆炸，火花开始运动
      for (let i = 0; i < this.fire.length; i++) {
        this.fire[i].run()
      }
    }
  },
  distanceX: function () { // 烟花起点终点横坐标差值
    return this.endX - this.startX
  },
  distanceY: function () { // 烟花起点终点纵坐标差值
    return this.endY - this.startY
  },
  distance: function () { // 烟花起点终点距离
    return Math.sqrt(this.distanceX() * this.distanceX() + this.distanceY() * this.distanceY())
  },
  speedX: function () { // 烟花横坐标变化速度
    return this.distanceX() * this.speed / this.distance()
  },
  speedY: function () { // 烟花纵坐标变化速度
    return this.distanceY() * this.speed / this.distance()
  }
}
Fire.prototype = {
  run: function () {
    if (this.y <= canvas.height && this.x <= canvas.width && this.x >= 0) {
      this.x += this.speedX
      this.y += this.speedY
      this.color += 1 // 火花颜色渐变
      this.speedX *= this.friction // 火花所受摩擦力影响
      this.speedY += this.gravity // 火花所受重力影响
      this.tail.unshift([this.x, this.y, ranColor(this.color)]) // 将火花轨迹存入数组
      if (this.tail.length >= 50) { // 数组长度决定火花轨迹长度
        this.tail.pop()
      }
    }
    for (let x of this.tail) { // 绘制火花
      ctx.beginPath() // 保存画布状态，不然火花颜色会影响烟花颜色
      ctx.save()
      ctx.fillStyle = x[2]
      ctx.arc(x[0], x[1], this.r, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
      ctx.restore()
    }
    if (this.y > canvas.height || this.x >= canvas.width || this.x <= 0) {
      this.tail.pop() // 当火花达到边界后释放轨迹
    }
  }
}

function changePos(ev) { // 计算鼠标位置
  const oEvent = ev
  const pos = []
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
  const top = oEvent.clientY + scrollTop
  const left = oEvent.clientX + scrollLeft
  pos[0] = left
  pos[1] = top
  return pos
}

function random(min, max) {//随机值
  return Math.random() * (max - min) + min
}

function ranColorNum() { // 随机生成十六进制颜色
  return Math.floor(Math.random() * 16777216)
}

function ranColor(num) {
  let color = num.toString(16) // 生成ffffff以内16进制数
  while (color.length < 6) { // while循环判断位数，少于6位前面加0凑够6位
    color = `0${color}`
  }
  return `#${color}` // 返回'#'开头16进制颜色
}

init()
