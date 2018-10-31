function Block(index, x, y) {
    LExtends(this, LSprite, []);

    var bmpd = imgBmpd.clone();
    if (index != 8) {
        bmpd.setProperties(x * bmpd.width / 3, y * bmpd.width / 3, bmpd.width / 3, bmpd.width / 3);
        this.bmp = new LBitmap(bmpd);
        this.bmp.scaleX = 130 / this.bmp.width;
        this.bmp.scaleY = 130 / this.bmp.height;
        this.addChild(this.bmp);
    } else {
        var shape = new LShape();
        shape.graphics.drawRect(2, "#ffffff", [0, 0, 130, 130], true, "#ffffff");
        this.addChild(shape);
    }

    // 格子边框
    var border = new LShape();
    border.graphics.drawRect(3, "#ffffff", [0, 0, 130, 130]);
    border.graphics.drawRoundRect(3, "#ffffff", [0, 0, 130, 130, 10]);
    this.addChild(border);

    this.index = index;

    this.addEventListener(LMouseEvent.MOUSE_UP, this.onClick);
}

Block.getBlock = function (x, y) {
    return blockList[y * 3 + x];
};

Block.isGameOver = function () {
    var reductionAmount = 0, l = blockList.length;

    /** 计算还原度 */
    for (var i = 0; i < l; i++) {
        var b = blockList[i];

        if (b.index == i) {
            reductionAmount++;
        }
    }

    /** 计算是否完全还原 */
    if (reductionAmount == l) {
        /** 游戏结束 */
        gameOver();
    }
};

Block.exchangePosition = function (b1, b2) {
    var b1x = b1.locationX, b1y = b1.locationY,
        b2x = b2.locationX, b2y = b2.locationY,
        b1Index = b1y * 3 + b1x,
        b2Index = b2y * 3 + b2x;

    /** 在地图块数组中交换两者位置 */
    blockList.splice(b1Index, 1, b2);
    blockList.splice(b2Index, 1, b1);

    /** 交换两者显示位置 */
    b1.setLocation(b2x, b2y);
    b2.setLocation(b1x, b1y);

    /** 判断游戏是否结束 */
    Block.isGameOver();
};

Block.prototype.setLocation = function (x, y) {
    this.locationX = x;
    this.locationY = y;

    this.x = x * 130;
    this.y = y * 130 + 0;
};

Block.prototype.onClick = function (e) {
    var self = e.currentTarget;

    if (isGameOver) {
        return;
    }

    var checkList = new Array();

    /** 判断右侧是否有方块 */
    if (self.locationX > 0) {
        checkList.push(Block.getBlock(self.locationX - 1, self.locationY));
    }

    /** 判断左侧是否有方块 */
    if (self.locationX < 2) {
        checkList.push(Block.getBlock(self.locationX + 1, self.locationY));
    }

    /** 判断上方是否有方块 */
    if (self.locationY > 0) {
        checkList.push(Block.getBlock(self.locationX, self.locationY - 1));
    }

    /** 判断下方是否有方块 */
    if (self.locationY < 2) {
        checkList.push(Block.getBlock(self.locationX, self.locationY + 1));
    }

    for (var i = 0, l = checkList.length; i < l; i++) {
        //console.log(checkList);

        var checkO = checkList[i];

        //console.log(checkO)
        /** 判断是否是空白拼图块 */
        if (checkO.index == 8) {
            steps++;
            updateStepsTxt();

            Block.exchangePosition(self, checkO);
            var str = "";
            for (var i = 0; i < blockList.length; i++) {

                str = str + blockList[i].index;
                //console.log(str);
            }
            _blockList.push(str);
            //console.log(_blockList);

            break;
        }
    }
};