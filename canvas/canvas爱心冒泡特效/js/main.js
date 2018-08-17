var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = window.innerWidth;
var height = window.innerHeight;
var bgcolor = random(0, 360);
var arr = [];
canvas.setAttribute('width', window.innerWidth);//画布根据屏幕大小变化至全屏
canvas.setAttribute('height', window.innerHeight);

function init() {
    window.requestAnimationFrame(init);//使用requestAnimationFrame来重绘从而完成动画
    bgcolor += 0.1;//背景色变化
    ctx.fillStyle = 'hsl(' + bgcolor + ',100%,97%)';//背景色设定
    ctx.fillRect(0, 0, width, height);
    if (arr.length < 100 && Math.random() < 0.2) {
        arr.push(new heart());//按照一定速率产生新的爱心
    }
    arr.map(function (heart) {//使用map方法使每一颗爱心变化起来
        heart.run();
    })
}

function drawHeart(x, y, z, m) {//绘制爱心
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

function heart() {
    this.set();
}

heart.prototype = {
    set: function () {//设定爱心属性
        this.x = random(0, width);//爱心位置
        this.y = random(0, height);
        this.size = random(1, 2);//爱心初始大小
        this.changeSize = random(0.3, 0.4);//爱心大小变化速率
        this.opacity = random(0.3, 0.5);//爱心初始透明度
        this.changeOpacity = random(0.003, 0.006);//爱心透明度变化速率
        this.light = random(0, 80);//爱心亮度
        this.color = 'hsl(' + bgcolor + ',100%,' + this.light + '%)';//根据背景色设定爱心颜色
    },
    run: function () {//爱心的变化
        this.opacity -= this.changeOpacity;
        this.size += this.changeSize;
        if (this.opacity <= 0) {//爱心透明度变为0以后重新生成一颗爱心
            this.set();
            return false;
        }
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        drawHeart(this.x, this.y, this.size, this.size);//根据设定的属性绘制爱心
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;//绘图当前不透明
    }
};

function random(min, max) {//产生范围随机数
    return Math.random() * (max - min) + min;
}

init();