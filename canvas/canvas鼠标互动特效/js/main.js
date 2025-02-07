function rand(num) {//随机数
  return Math.random() * num
}

function randInt(num) {//随机产生整数
  return Math.floor(Math.random() * num)
}

const canvasApp = (function () {
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')
  let mouseX = null
  let mouseY = null
  canvas.setAttribute('width', `${window.innerWidth}`)//画布根据屏幕大小变化至全屏
  canvas.setAttribute('height', `${window.innerHeight}`)

  function init() {
    const pointNum = 100//圆点数量
    const points = createPoints(pointNum)
    const randomIndices = generateRandomIndices(pointNum, pointNum / 5)
    setInterval(() => {
      updateRandomIndices(randomIndices, pointNum)
    }, 3000)//3秒改变一次整数数组
    setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)//清空画布
      //使圆点运动，并和鼠标产生交互
      points.forEach(point => {
        point.run()
        point.connect(mouseX, mouseY)
      })
      connectRandomPoints(points, randomIndices)
    }, 15)
  }

  canvas.onmousemove = function (ev) {//监听鼠标移动事件
    [mouseX, mouseY] = changePos(ev)
  }

  function changePos(ev) {//计算鼠标位置
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
    const top = ev.clientY + scrollTop
    const left = ev.clientX + scrollLeft
    return [left, top]
  }

  // 随机生成圆点
  function createPoints(num) {
    const points = [];
    for (let i = 0; i < num; i++) {
      points.push(new Point());
    }
    return points;
  }

  // 随机产生整数
  function generateRandomIndices(total, count) {
    const indices = [];
    for (let i = 0; i < count; i++) {
      indices.push(randInt(total));
    }
    return indices;
  }

  // 更新随机数组
  function updateRandomIndices(indices, total) {
    indices.forEach((_, index) => {
      indices[index] = randInt(total)
    })
  }

  // 随机圆点间产生交互
  function connectRandomPoints(points, indices) {
    indices.forEach(index => {
      points.slice(0, Math.floor(points.length / 3)).forEach(point => {
        points[index].connect(point.x, point.y);
      });
    });
  }

  function Point() {
    this.x = rand(canvas.width)//随机圆点横坐标
    this.y = rand(canvas.height)//随机圆点纵坐标
    this.r = rand(3)//随机圆点半径
    do {
      this.speedX = rand(2) - 1
    } while (this.speedX === 0)//随机圆点横坐标改变速度，速度不为零
    do {
      this.speedY = rand(2) - 1
    } while (this.speedY === 0)//随机圆点纵坐标改变速度，速度不为零
  }

  Point.prototype = {
    run: function () {//圆点运动函数
      this.x += this.speedX
      this.y += this.speedY
      this.handleBoundaryCollision()
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)//绘制圆点
      ctx.fill()
      ctx.closePath()
    },
    handleBoundaryCollision: function () {
      if (this.x > canvas.width - this.r || this.x < this.r) {//圆点碰到左右边界，横坐标速度变为负
        this.speedX = -this.speedX
      }
      if (this.y > canvas.height - this.r || this.y < this.r) {//圆点碰到上下边界，纵坐标速度变为负
        this.speedY = -this.speedY
      }
    },
    connect: function (x, y) {//圆点连接函数
      if (this.distance(x, y) <= 80) {//距离相差80px使，两点相连
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.closePath()
      }
    },
    distance: function (x, y) {//距离计算函数
      return Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y))
    }
  }

  return { init }
})()

canvasApp.init()