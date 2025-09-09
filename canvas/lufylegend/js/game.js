/** 初始化游戏 */
var gameWidth = 390;
var gameHeight = 390;
/** 游戏层 */
var stageLayer, gameLayer, overLayer;
/** 拼图块列表 */
var blockList;
/** 是否游戏结束 */
var isGameOver,
  isTimeOver;
/** 用时 */
var startTime, time, countTime;
/** 步数 */
var steps;
/** 图片 */
var imgBmpd, startNewGame, fail, startBitmap, Again, failBitmap, againBitmap, succeed, succeedBitmap;

var _blockList = [];//拼图序列
var datalist = [];//存放图片

function main() {//游戏资源初始化
  /** 全屏设置 */
  if (LGlobal.mobile) {
    LGlobal.width = gameWidth;
    LGlobal.height = gameHeight;
    LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
  }
  LGlobal.screen(LGlobal.FULL_SCREEN);
  LGlobal.preventDefault = false;

  /** 添加加载提示 */
  var loadingHint = new LTextField();
  loadingHint.text = "资源加载中……";
  loadingHint.size = 20;
  loadingHint.x = (LGlobal.width - loadingHint.getWidth()) / 2;
  loadingHint.y = (LGlobal.height - loadingHint.getHeight()) / 2;
  addChild(loadingHint);

  /** 加载图片 文件*/
  LLoadManage.load(
    [
      {path: "./js/Block.js"},
      {name: "startGame", path: "./images/start.png"},
      {name: "fail", path: "./images/fail.png"},
      {name: "Again", path: "./images/challengeAgain.png"},
      {name: "succeed", path: "./images/succeed.png"},
    ],
    null,
    function (result) {
      /** 移除加载提示 */
      loadingHint.remove();

      /** 保存位图数据，方便后续使用 */
      imgBmpd = new LBitmapData(imgResultImg);

      gameInit(result);
    }
  );
}

function gameInit(e) {//游戏内容初始化
  datalist = e;
  var bitmapData = new LBitmapData(imgResultImg);
  var bitmap = new LBitmap(bitmapData);

  bitmap.scaleX = LGlobal.width / bitmap.width;
  bitmap.scaleY = LGlobal.height / bitmap.height;
  bitmap.width = LGlobal.width;
  bitmap.height = LGlobal.height;
  bitmap.x = 0;
  bitmap.y = 0;
  addChild(bitmap);

  startNewGame = new LBitmapData(datalist['startGame']);
  fail = new LBitmapData(datalist["fail"]);
  Again = new LBitmapData(datalist["Again"]);
  succeed = new LBitmapData(datalist["succeed"]);
  startBitmap = new LBitmap(startNewGame);
  failBitmap = new LBitmap(fail);
  againBitmap = new LBitmap(Again);
  succeedBitmap = new LBitmap(succeed);

  /** 初始化舞台层 */
  stageLayer = new LSprite();
  stageLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "transparent");
  addChild(stageLayer);

  /** 初始化游戏层 */
  gameLayer = new LSprite();
  stageLayer.addChild(gameLayer);

  /** 初始化最上层 */
  overLayer = new LSprite();
  stageLayer.addChild(overLayer);

  /** 添加开始界面 */
  addBeginningUI();
}

function addBeginningUI() {//游戏开始界面
  var beginningLayer = new LSprite();
  beginningLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "transparent");
  stageLayer.addChild(beginningLayer);

  /** 游戏标题 */
  var title = new LTextField();
  title.text = "拼图华容道";
  title.size = 48;
  title.weight = "bold";
  title.x = (LGlobal.width - title.getWidth()) / 2;
  title.y = 70;
  title.color = "#f8fbb5";
  title.lineWidth = 5;
  title.lineColor = "#000000";
  title.stroke = true;
  beginningLayer.addChild(title);

  /** 开始游戏提示 */
  startBitmap.scaleX = 0.7;
  startBitmap.scaleY = 0.7;
  startBitmap.x = (LGlobal.width - startBitmap.getWidth()) / 2;
  startBitmap.y = 250 + 0;
  beginningLayer.addChild(startBitmap);

  /** 初始化拼图块列表 */
  initBlockList();
  /** 打乱拼图 */
  getRandomBlockList();

  /** 开始游戏 */
  beginningLayer.addEventListener(LMouseEvent.MOUSE_UP, function () {
    beginningLayer.remove();
    startGame();
  });
}


function startGame() {//开始游戏
  isGameOver = false;
  isTimeOver = false;

  /** 初始化时间和步数 */
  startTime = (new Date()).getTime();
  countTime = 0;
  time = 0;
  steps = 0;

  /** 显示拼图 */
  showBlock();
  /** 计时 */
  updateTimeTxt(countTime);
  /** 显示步数 */
  updateStepsTxt();

  stageLayer.addEventListener(LEvent.ENTER_FRAME, onFrame);
}

function initBlockList() {//初始化拼图列表
  blockList = new Array();

  for (var i = 0; i < 9; i++) {
    /** 根据序号计算拼图块图片显示位置 */
    var y = (i / 3) >>> 0, x = i % 3;
    blockList.push(new Block(i, x, y));
  }

}

function getRandomBlockList() {//随机打乱拼图

  /** 随机打乱拼图 */
  blockList.sort(function () {
    return 0.5 - Math.random();
  });

  /** 计算逆序和 */
  var reverseAmount = 0;

  for (var i = 0, l = blockList.length; i < l; i++) {
    var currentBlock = blockList[i];

    for (var j = i + 1; j < l; j++) {
      var comparedBlock = blockList[j];

      if (comparedBlock.index < currentBlock.index) {
        reverseAmount++;
      }
    }
  }

  /** 检测打乱后是否可还原 */
  if (reverseAmount % 2 != 0) {
    /** 不合格，重新打乱 */
    getRandomBlockList();
  } else {
    var str = "";
    for (var i = 0; i < blockList.length; i++) {
      str = str + blockList[i].index;
    }
    console.log(str);
    if (str.substr(0, 3) == "012") {
      getRandomBlockList();
    } else {
      _blockList.push(str);
    }
  }
}

function showBlock() {//显示拼图
  for (var i = 0, l = blockList.length; i < l; i++) {
    var b = blockList[i];

    /** 根据序号计算拼图块位置 */
    var y = (i / 3) >>> 0, x = i % 3;

    b.setLocation(x, y);

    gameLayer.addChild(b);
  }
}

function updateTimeTxt() {//更新时间
  $('#time').html(getTimeTxt());
}

function getTimeTxt() {
  var d = new Date(time);
  countTime = 99 - Math.floor(d / 1000);
  return countTime;
}

function updateStepsTxt() {//更新步数
  $('#steps').html(steps);
}

function onFrame() {//计时

  if (isGameOver) {
    return;
  }
  if (isTimeOver) {
    return;
  }
  /** 获取当前时间 */
  var currentTime = (new Date()).getTime();

  /** 计算使用的时间并更新时间显示 */
  time = currentTime - startTime;

  if (countTime > 0) {// 倒计时
    updateTimeTxt();
  } else {
    timeOver();
  }
}

function timeOver() {// 判断时间是否结束 失败
  isTimeOver = true;

  var resultLayer = new LSprite();
  resultLayer.filters = [new LDropShadowFilter()];
  resultLayer.graphics.drawRoundRect(3, "#BBBBBB", [0, 0, 390, 450, 5], true, "rgba(0,0,0,.6)");
  resultLayer.x = (LGlobal.width - resultLayer.getWidth()) / 2;
  resultLayer.y = LGlobal.height / 2;
  resultLayer.alpha = 0;
  overLayer.addChild(resultLayer);

  failBitmap.scaleX = 0.6;
  failBitmap.scaleY = 0.6;
  failBitmap.x = (LGlobal.width - failBitmap.getWidth()) / 2;
  failBitmap.y = 70 + 0;
  resultLayer.addChild(failBitmap);

  againBitmap.scaleX = 0.6;
  againBitmap.scaleY = 0.6;
  againBitmap.x = (LGlobal.width - againBitmap.getWidth()) / 2;
  againBitmap.y = 250 + 0;
  resultLayer.addChild(againBitmap);

  LTweenLite.to(resultLayer, 0.5, {
    alpha: 0.7,
    y: (LGlobal.height - resultLayer.getHeight()) / 2 - 15,
    onComplete: function () {
      /** 点击界面重新开始游戏 */
      stageLayer.addEventListener(LMouseEvent.MOUSE_UP, function () {
        gameLayer.removeAllChild();
        overLayer.removeAllChild();
        stageLayer.removeAllEventListener();
        main();
      });
    }
  });
}

function gameOver() {// 游戏成功
  let score = 99 - getTimeTxt(time);
  let blockList = _blockList.join("-");
  let step = steps;
  isGameOver = true;
  console.log('用时：' + getTimeTxt(time) + '步数：' + step + '分数：' + score + '序列：' + blockList);

  var resultLayer = new LSprite();
  resultLayer.filters = [new LDropShadowFilter()];
  resultLayer.graphics.drawRoundRect(3, "#BBBBBB", [0, 0, 390, 450, 5], true, "rgba(0,0,0,.6)");
  resultLayer.x = (LGlobal.width - resultLayer.getWidth()) / 2;
  resultLayer.y = LGlobal.height / 2;
  resultLayer.alpha = 0;
  overLayer.addChild(resultLayer);

  succeedBitmap.scaleX = 0.6;
  succeedBitmap.scaleY = 0.6;
  succeedBitmap.x = (LGlobal.width - succeedBitmap.getWidth()) / 2;
  succeedBitmap.y = 70 + 0;
  resultLayer.addChild(succeedBitmap);

  againBitmap.scaleX = 0.6;
  againBitmap.scaleY = 0.6;
  againBitmap.x = (LGlobal.width - againBitmap.getWidth()) / 2;
  againBitmap.y = 250 + 0;
  resultLayer.addChild(againBitmap);

  LTweenLite.to(resultLayer, 0.5, {
    alpha: 0.7,
    y: (LGlobal.height - resultLayer.getHeight()) / 2 - 15,
    onComplete: function () {
      /** 点击界面重新开始游戏 */
      stageLayer.addEventListener(LMouseEvent.MOUSE_UP, function () {
        gameLayer.removeAllChild();
        overLayer.removeAllChild();
        stageLayer.removeAllEventListener();
        main();
      });
    }
  });
}
