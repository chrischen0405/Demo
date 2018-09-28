var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var ball1 = document.getElementById('ball1');
var ball2 = document.getElementById('ball2');
var ball3 = document.getElementById('ball3');
var ball4 = document.getElementById('ball4');
var ballList = [ball1, ball2, ball3, ball4];
var ballNum = 4;
var awardList = [];
var timer;

function init() {
    for (let i = 0; i < ballNum; i++) {
        let index = Math.floor(4 * Math.random());
        awardList[i] = new Ball(index, ballList[index]);
    }
    console.log(awardList[3]);
    window.clearInterval(timer);
    timer = setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);//清空画布
        for (let i = 0; i < awardList.length; i++) {
            awardList[i].run();
        }//使小球运动
    }, 15);
}

function Ball(index, img) {
    this.r = 30;
    this.x = this.rand(canvas.width - this.r * 2);
    this.y = this.rand(canvas.height - this.r * 2);
    this.color = index;
    this.img = img;
    do {
        this.speedX = this.rand(20) - 10;
    } while (this.speedX < 5);//小球横坐标改变速度
    do {
        this.speedY = this.rand(20) - 10;
    } while (this.speedY < 5);//小球纵坐标改变速度
}

Ball.prototype = {
    rand: function (num) {//随机数
        return Math.random() * num;
    },
    run: function () {//小球运动函数
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width - this.r * 2) {//小球碰到右边界，横坐标速度变为负
            this.speedX = -this.speedX;
        }
        if (this.x < 0) {//小球碰到左边界，横坐标速度变为正
            this.speedX = Math.abs(this.speedX);
        }
        if (this.y > canvas.height - this.r * 2) {//小球碰到下边界，纵坐标速度变为负
            this.speedY = -this.speedY;
        }
        if (this.y < 0) {//小球碰到上边界，纵坐标速度变为正
            this.speedY = Math.abs(this.speedY);
        }
        ctx.drawImage(this.img, this.x, this.y, 60, 60);
    }
}

function play() {
    if (awardList.length === 0) {
        alert('重新开始！');
        init();
    } else {
        window.clearInterval(timer);
        let r = awardList.pop();
        timer = setInterval(function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);//清空画布
            for (let i = 0; i < awardList.length; i++) {
                awardList[i].run();
            }//使小球运动
        }, 15);
        switch (r.color) {
            case 0:
                alert('紫球！');
                break;
            case 1:
                alert('绿球！');
                break;
            case 2:
                alert('黄球！');
                break;
            case 3:
                alert('红球！');
                break;
        }
    }
}

init();