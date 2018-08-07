var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game(width, height, Phaser.AUTO, '#game');

var states = {
    preload: preload,
    created: created,
    play: play,
    over: over
}

// 添加场景到游戏示例中
Object.keys(states).map(function (key) {
    game.state.add(key, states[key]);
});

// 启动游戏
game.state.start('preload');

function preload() {
    this.preload = function () {
        game.stage.backgroundColor = '#000';
        game.load.crossOrigin = 'anonymous';
        game.load.image('man', 'res/man.png');
        game.load.image('apple', 'res/apple.png');
        game.load.image('bomb', 'res/bomb.png');

        var progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
            fontSize: '60px',
            fill: '#ffffff'
        });
        progressText.anchor.setTo(0.5, 0.5); // 设置锚点，用于居中
        game.load.onFileComplete.add(function (progress) {
            progressText.text = progress + '%';
        });

        game.load.onLoadComplete.add(onLoad);
        var deadLine = false;
        setTimeout(function () {
            deadLine = true;
        }, 1000);

        function onLoad() {
            if (deadLine) {
                // 已到达最小展示时间，可以进入下一个场景
                game.state.start('created');
            } else {
                // 还没有到最小展示时间，1秒后重试
                setTimeout(onLoad, 1000);
            }
        }
    };
}

function created() {
    this.create = function () {
        var title = game.add.text(game.world.centerX, game.world.height * 0.25, '小恐龙接苹果', {
            fontSize: '40px',
            fontWeight: 'bold',
            fill: '#f2bb15'
        });
        title.anchor.setTo(0.5, 0.5);
        var remind = game.add.text(game.world.centerX, game.world.centerY, '点击任意位置开始', {
            fontSize: '20px',
            fill: '#f2bb15'
        });
        remind.anchor.setTo(0.5, 0.5);
        var man = game.add.sprite(game.world.centerX, game.world.height * 0.75, 'man');
        var manImage = game.cache.getImage('man');
        man.width = game.world.width * 0.2;
        man.height = man.width / manImage.width * manImage.height;
        man.anchor.setTo(0.5, 0.5);
        // 添加点击事件
        game.input.onTap.add(function () {
            game.state.start('play');
        });
    }
}

function play() {
    var man;
    var apples;
    var apple;
    var score = 0;
    var title;
    this.create = function () {
        score = 0;
        // 开启物理引擎
        game.physics.startSystem(Phaser.Physics.Arcade);
        game.physics.arcade.gravity.y = 300;

        man = game.add.sprite(game.world.centerX, game.world.height * 0.75, 'man');
        var manImage = game.cache.getImage('man');
        man.width = game.world.width * 0.2;
        man.height = man.width / manImage.width * manImage.height;
        man.anchor.setTo(0.5, 0.5);
        game.physics.enable(man); // 加入物理运动
        man.body.allowGravity = false; // 清除重力影响

        title = game.add.text(game.world.centerX, game.world.height * 0.25, '0', {
            fontSize: '40px',
            fontWeight: 'bold',
            fill: '#f2bb15'
        });
        title.anchor.setTo(0.5, 0.5);

        var touching = false;
        game.input.onDown.add(function (pointer) {
            if (Math.abs(pointer.x - man.x) < man.width / 2)
                touching = true;
        });
        game.input.onUp.add(function () {
            touching = false;
        });
        game.input.addMoveCallback(function (pointer, x, y, isTap) {
            if (!isTap && touching) man.x = x;
        });

        apples = game.add.group();
        var appleTypes = ['apple', 'bomb'];
        var appleTimer = game.time.create(true);
        appleTimer.loop(1000, function () {
            var x = Math.random() * game.world.width;
            var type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
            apple = apples.create(x, 0, type);
            apple.type = type;
            // 设置苹果大小
            var appleImg = game.cache.getImage(type);
            apple.width = game.world.width / 8;
            apple.height = apple.width / appleImg.width * appleImg.height;
            // 设置苹果加入物理运动
            game.physics.enable(apple);
            // 设置苹果与游戏边缘碰撞，
            apple.body.collideWorldBounds = true;
            apple.body.onWorldBounds = new Phaser.Signal();
            apple.body.onWorldBounds.add(function (apple, up, down, left, right) {
                if (down) {
                    apple.kill();
                    if (apple.type !== 'bomb')
                        game.state.start('over', true, false, score);
                }
            });
        });
        appleTimer.start();
    }
    this.update = function () {
        // 监听接触事件
        game.physics.arcade.overlap(man, apples, pickApple, null, this);
    }

    // 接触事件
    function pickApple(man, apple) {
        if (apple.type === 'bomb') {
            game.state.start('over', true, false, score);
        } else {
            apple.kill();
            title.text = ++score;
        }
    }
}

function over() {
    var score = 0;
    this.init = function () {
        score = arguments[0];
    }
    this.create = function () {
        var title = game.add.text(game.world.centerX, game.world.height * 0.25, '游戏结束', {
            fontSize: '40px',
            fontWeight: 'bold',
            fill: '#f2bb15'
        });
        title.anchor.setTo(0.5, 0.5);
        var scoreStr = '你的得分是：' + score + '分';
        var scoreText = game.add.text(game.world.centerX, game.world.height * 0.4, scoreStr, {
            fontSize: '30px',
            fontWeight: 'bold',
            fill: '#f2bb15'
        });
        scoreText.anchor.setTo(0.5, 0.5);
        var remind = game.add.text(game.world.centerX, game.world.height * 0.6, '点击任意位置再玩一次', {
            fontSize: '20px',
            fontWeight: 'bold',
            fill: '#f2bb15'
        });
        remind.anchor.setTo(0.5, 0.5);
        // 添加点击事件
        game.input.onTap.add(function () {
            game.state.start('play');
        });
    }
}