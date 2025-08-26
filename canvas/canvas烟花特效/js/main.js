const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const SPEED = 15 // 烟花速度
let mouseX = null
let mouseY = null
const fireworks = []

canvas.width = window.innerWidth //画布根据屏幕大小变化至全屏
canvas.height = window.innerHeight

function init() {
  canvas.addEventListener('click', (ev) => { // 根据鼠标点击位置生成烟花
    [mouseX, mouseY] = changePos(ev)
    const fw = new Fireworks(mouseX, mouseY)
    fireworks.unshift(fw)
  })

  function animate() {
    // 设置黑色背景，让白色烟花更明显
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // 设置默认填充样式
    ctx.fillStyle = 'white'
    // 清理已完成的烟花 - 修复版本
    for (let i = fireworks.length - 1; i >= 0; i--) {
      const fw = fireworks[i]
      fw.update()
      // 只在烟花尾迹和所有火花尾迹都完全消失后才清理
      if (fw.exploded && fw.tail.length === 0) {
        const allFiresGone = fw.fire.every(fire => fire.tail.length === 0);
        if (allFiresGone) {
          fireworks.splice(i, 1)
        }
      }
    }
    requestAnimationFrame(animate)
  }

  animate()
}

class Fireworks {
  constructor(x, y) {
    this.r = 1 // 恢复原本尺寸
    this.endX = x // 烟花结束位置
    this.endY = y
    this.startX = random(0, canvas.width) // 随机烟花开始横坐标
    this.startY = canvas.height // 烟花从底部开始
    this.speed = SPEED
    this.x = this.startX
    this.y = this.startY
    this.tail = []//存放烟花轨迹的数组
    this.fire = [] // 烟花爆炸后的火花，初始为空
    this.exploded = false // 是否已经爆炸
  }

  update() {
    if (this.y > this.endY) {
      // 烟花还在上升阶段
      const steps = 3; // 恢复原本步骤数
      const stepSpeedX = this.speedX() / steps;
      const stepSpeedY = this.speedY() / steps;

      for (let i = 0; i < steps; i++) {
        this.x += stepSpeedX;
        this.y += stepSpeedY;
        this.tail.unshift([this.x, this.y]);
      }

      if (this.tail.length >= 40) { // 保持尾巴长度
        this.tail.pop()
      }

      this.drawTail()
    } else {
      // 烟花已到达目标位置
      if (!this.exploded) {
        // 第一次到达，创建火花
        this.fire = newFire(this.endX, this.endY)
        this.exploded = true
      }
      // 烟花爆炸后不再绘制本体，只绘制消失的尾迹
      if (this.tail.length > 0) {
        this.tail.pop()
        this.drawTail()
      }
      // 更新火花
      this.bomb()
    }
  }

  // 绘制烟花尾部
  drawTail() {
    // 只在上升阶段绘制烟花头部
    if (this.y > this.endY) {
      ctx.beginPath()
      ctx.fillStyle = 'white'
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
    }
    // 绘制尾迹
    this.tail.forEach(([x, y], index) => {
      ctx.beginPath()
      const alpha = 1 - (index / this.tail.length)
      const radius = this.r * alpha
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
    })
  }

  bomb() {
    this.fire.forEach(fire => fire.update())
  }

  distance() { // 烟花起点终点距离
    return Math.sqrt(Math.pow(this.endX - this.startX, 2) + Math.pow(this.endY - this.startY, 2))
  }

  speedX() { // 烟花横坐标变化速度
    return (this.endX - this.startX) * this.speed / this.distance()
  }

  speedY() { // 烟花纵坐标变化速度
    return (this.endY - this.startY) * this.speed / this.distance()
  }
}

function newFire(x, y) {
  let arr = []
  for (let i = 0; i < random(20, 30); i++) { // 一束烟花爆炸产生火花
    arr.push(new Fire(x, y))
  }
  return arr
}

class Fire {
  constructor(x, y) {
    this.x = x // 火花产生点为烟花爆炸点
    this.y = y
    this.r = 2
    this.gravity = 0.02 // 火花所受重力，减小重力
    this.friction = 0.998 // 火花所受摩擦力，增加摩擦
    this.speedX = random(-SPEED * 0.6, SPEED * 0.6) // 减少火花初始速度
    this.speedY = random(-SPEED * 0.8, SPEED * 0.3)
    this.tail = []
    this.color = ranColorNum() // 火花颜色
  }

  update() {
    if (this.y <= canvas.height && this.x <= canvas.width && this.x >= 0) {
      // 为火花也添加步骤细分来保持连续性
      const steps = 3;
      const stepSpeedX = this.speedX / steps;
      const stepSpeedY = this.speedY / steps;
      const stepGravity = this.gravity / steps;

      for (let i = 0; i < steps; i++) {
        this.x += stepSpeedX;
        this.y += stepSpeedY;
        this.speedY += stepGravity; // 分步应用重力
        this.tail.unshift([this.x, this.y, ranColor(this.color)]);
      }

      this.color += 1 // 火花颜色渐变
      this.speedX *= this.friction // 火花所受摩擦力影响

      if (this.tail.length >= 40) { // 调整火花轨迹长度
        this.tail.pop()
      }
    } else {
      // 火花出屏后逐渐清理尾迹，而不是直接消失
      if (this.tail.length > 0) {
        this.tail.pop()
      }
    }
    this.draw()
  }

  // 绘制火花
  draw() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      const [x1, y1, color1] = this.tail[i];
      const [x2, y2, color2] = this.tail[i + 1];

      ctx.beginPath();
      ctx.save();

      const alpha = 1 - (i / this.tail.length);
      ctx.strokeStyle = color1;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = this.r * alpha;

      // 使用线条连接相邻点，保持连续性
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.closePath();
      ctx.restore();
    }

    // 绘制火花头部
    if (this.tail.length > 0) {
      const [x, y, color] = this.tail[0];
      ctx.beginPath();
      ctx.save();
      ctx.fillStyle = color;
      ctx.arc(x, y, this.r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }
}

function changePos(ev) { // 计算鼠标位置
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
  return [ev.clientX + scrollLeft, ev.clientY + scrollTop]
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
