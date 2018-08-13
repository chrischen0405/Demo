var txt = document.getElementById('text');
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var mouseX;
var mouseY;
canvas.setAttribute('width', window.innerWidth);//画布根据屏幕大小变化至全屏
canvas.setAttribute('height', window.innerHeight);

function init() {
    var arr = [];
    var intArr = [];
    var pointNum = 100;//圆点数量
    for (let i = 0; i < pointNum; i++) {
        arr[i] = new Point();
    }//随机生成圆点
    for (let i = 0; i < pointNum / 5; i++) {
        intArr[i] = randInt(pointNum);
    }//随机产生整数
    setInterval(function () {
        for (let i = 0; i < pointNum / 5; i++) {
            intArr[i] = randInt(pointNum);
        }
    }, 3000);//3秒改变一次整数数组
    setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);//清空画布
        for (let i = 0; i < pointNum; i++) {
            arr[i].run();
            arr[i].connect(mouseX, mouseY);
        }//使圆点运动，并和鼠标产生交互
        for (let i = 0; i < parseInt(pointNum / 5); i++) {
            for (let j = 0; j < parseInt(pointNum / 3); j++) {
                arr[intArr[i]].connect(arr[j].x, arr[j].y);
            }
        }//圆点间产生交互
    }, 15);
}

canvas.onmousemove = function (ev) {//监听鼠标移动事件
    mouseX = changePos(ev)[0];
    mouseY = changePos(ev)[1];
}

function changePos(ev) {//计算鼠标位置
    var oEvent = ev || event;
    var pos = [];
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var top = oEvent.clientY + scrollTop;
    var left = oEvent.clientX + scrollLeft;
    pos[0] = left;
    pos[1] = top;
    return pos;
}

function Point() {
    this.x = this.rand(canvas.width);//随机圆点横坐标
    this.y = this.rand(canvas.height);//随机圆点纵坐标
    this.r = this.rand(3);//随机圆点半径
    do {
        this.speedX = this.rand(2) - 1;
    } while (this.speedX === 0);//随机圆点横坐标改变速度，速度不为零
    do {
        this.speedY = this.rand(2) - 1;
    } while (this.speedY === 0);//随机圆点纵坐标改变速度，速度不为零
}

Point.prototype = {
    rand: function (num) {//随机数
        return Math.random() * num;
    },
    run: function () {//圆点运动函数
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width - this.r) {//圆点碰到右边界，横坐标速度变为负
            this.speedX = -this.speedX;
        }
        if (this.x < this.r) {//圆点碰到左边界，横坐标速度变为正
            this.speedX = Math.abs(this.speedX);
        }
        if (this.y > canvas.height - this.r) {//圆点碰到下边界，纵坐标速度变为负
            this.speedY = -this.speedY;
        }
        if (this.y < this.r) {//圆点碰到上边界，纵坐标速度变为正
            this.speedY = Math.abs(this.speedY);
        }
        // console.log(this.x + ',' + this.y);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);//绘制圆点
        ctx.fill();
        ctx.closePath();
    },
    connect: function (x, y) {//圆点连接函数
        // console.log(this.distance(mouseX, mouseY));
        if (this.distance(x, y) <= 80) {//距离相差80px使，两点相连
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.closePath();
        }
    },
    distance: function (x, y) {//距离计算函数
        return Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y));
    }
}

function randInt(num) {//随机产生整数
    return parseInt(Math.random() * num);
}

init();