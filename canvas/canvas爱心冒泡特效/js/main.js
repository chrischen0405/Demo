const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
let bgcolor = getRandom(0, 360);
const hearts = [];

// 提取常量
const MAX_HEARTS = 100;
const HEART_RATE = 0.2;

// 画布根据屏幕大小变化至全屏
canvas.width = width
canvas.height = height

window.addEventListener('resize', () => {
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height
})

function init() {
  window.requestAnimationFrame(init)
  updateBackground()
  updateHearts()
}

/**
 * 更新背景色
 */
function updateBackground() {
  bgcolor += 0.1 // 背景色变化
  ctx.fillStyle = `hsl(${bgcolor}, 100%, 97%)` // 背景色设定
  ctx.fillRect(0, 0, width, height)
}

/**
 * 更新爱心
 */
function updateHearts() {
  if (hearts.length < MAX_HEARTS && Math.random() < HEART_RATE) {
    hearts.push(new Heart()); // 按照一定速率产生新的爱心
  }
  hearts.forEach(heart => heart.run())
}

class Heart {
  constructor() {
    this.reset()
  }

  /**
   * 重置爱心属性
   */
  reset() {
    this.x = getRandom(0, width); // 爱心位置
    this.y = getRandom(0, height);
    this.size = getRandom(1, 2); // 爱心初始大小
    this.changeSize = getRandom(0.3, 0.4); // 爱心大小变化速率
    this.opacity = getRandom(0.3, 0.5); // 爱心初始透明度
    this.changeOpacity = getRandom(0.003, 0.006); // 爱心透明度变化速率
    this.light = getRandom(0, 80); // 爱心亮度
    this.color = `hsl(${bgcolor}, 100%, ${this.light}%)`; // 根据背景色设定爱心颜色
  }

  /**
   * 爱心的变化
   */
  run() {
    this.opacity -= this.changeOpacity;
    this.size += this.changeSize;
    if (this.opacity <= 0) { // 爱心透明度变为0以后重新生成一颗爱心
      this.reset()
      return
    }
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    this.drawHeart(this.x, this.y, this.size, this.size);//根据设定的属性绘制爱心
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;//绘图当前不透明
  }

  /**
   * 绘制爱心
   * @param {number} x - 爱心中心x坐标
   * @param {number} y - 爱心中心y坐标
   * @param {number} z - 爱心大小
   * @param {number} m - 爱心大小
   */
  drawHeart(x, y, z, m) {
    y -= m * 10;
    ctx.moveTo(x, y);
    z *= 0.05;
    ctx.bezierCurveTo(x, y - 3 * z, x - 5 * z, y - 15 * z, x - 25 * z, y - 15 * z);
    ctx.bezierCurveTo(x - 55 * z, y - 15 * z, x - 55 * z, y + 22.5 * z, x - 55 * z, y + 22.5 * z);
    ctx.bezierCurveTo(x - 55 * z, y + 40 * z, x - 35 * z, y + 62 * z, x, y + 80 * z);
    ctx.bezierCurveTo(x + 35 * z, y + 62 * z, x + 55 * z, y + 40 * z, x + 55 * z, y + 22.5 * z);
    ctx.bezierCurveTo(x + 55 * z, y + 22.5 * z, x + 55 * z, y - 15 * z, x + 25 * z, y - 15 * z);
    ctx.bezierCurveTo(x + 10 * z, y - 15 * z, x, y - 3 * z, x, y);
  }
}

/**
 * 产生范围随机数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} - 范围内的随机数
 */
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

init();