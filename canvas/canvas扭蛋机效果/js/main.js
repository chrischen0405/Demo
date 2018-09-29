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
var award = document.getElementById('awardBall');
var message = document.getElementById('message');

function init() {//初始化
    for (let i = 0; i < ballNum; i++) {//随机生成各色小球
        let index = Math.floor(4 * Math.random());
        awardList[i] = new Ball(index, ballList[index]);
    }
    window.clearInterval(timer);
    timer = setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);//清空画布
        for (let i = 0; i < awardList.length; i++) {
            awardList[i].run();
        }//使小球运动
    }, 15);
}

function Ball(index, img) {
    this.r = 30;//小球半径
    this.x = this.rand(canvas.width - this.r * 2);//小球初始横坐标
    this.y = this.rand(canvas.height - this.r * 2);//小球初始纵坐标
    this.color = index;//小球颜色，以下标表示
    this.img = img;//小球素材
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
        ctx.drawImage(this.img, this.x, this.y, 60, 60);//绘制小球
    }
}

function play() {
    if (awardList.length === 0) {//奖池中没有小球
        alert('重新开始！');
        init();
        message.innerText = '点击抽奖';
    } else {
        window.clearInterval(timer);
        let r = awardList.pop();
        timer = setInterval(function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);//清空画布
            for (let i = 0; i < awardList.length; i++) {
                awardList[i].run();
            }//使小球运动
        }, 15);
        switch (r.color) {//小球掉落动画
            case 0:
                award.setAttribute('class', 'dropBall1');
                break;
            case 1:
                award.setAttribute('class', 'dropBall2');
                break;
            case 2:
                award.setAttribute('class', 'dropBall3');
                break;
            case 3:
                award.setAttribute('class', 'dropBall4');
                break;
        }
        setTimeout(function () {//扭蛋成功提示
            award.setAttribute('class', '');
            switch (r.color) {
                case 0:
                    message.innerText = '紫球！';
                    break;
                case 1:
                    message.innerText = '绿球！';
                    break;
                case 2:
                    message.innerText = '黄球！';
                    break;
                case 3:
                    message.innerText = '红球！';
                    break;
            }
        }, 1100);
    }
}

init();