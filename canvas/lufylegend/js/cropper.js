var flObj = document.getElementById("file");
var photoBox = document.getElementById('photoBox');

$('#getImg').click(function () {
    $('#file').bind('change', function () {
        var file = $(this).val();
        console.log(file);
        if (file.length > 0) {
            uploadImg();
            $('#photoBox').css('display', 'block');
            $('.getImg').css('display', 'none');
        }
    });
    $('#file').click();
    $('#uploadPhotoBox').css('display', 'block');
});

$('#cancel').click(function () {
    window.location.reload();
});

var options = {
    aspectRatio: 1,  //宽高比
    preview: '.preview',  //预览窗口
    guides: true,  //裁剪框的虚线
    autoCropArea: 0.5,  //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
    dragCrop: true,  //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
    movable: true,  //是否允许移动剪裁框
    resizable: true,  //是否允许改变裁剪框的大小
    zoomable: true,  //是否允许缩放图片大小
    mouseWheelZoom: true,  //是否允许通过鼠标滚轮来缩放图片
    touchDragZoom: true,  //是否允许通过触摸移动来缩放图片
    rotatable: true,  //是否允许旋转图片
    minContainerWidth: 200,  //容器的最小宽度
    minContainerHeight: 200,  //容器的最小高度
    minCanvasWidth: 0,  //canvas 的最小宽度（image wrapper）
    minCanvasHeight: 0,  //canvas 的最小高度（image wrapper）
    strict: true,
};

function cropper(photo, options) {
    var cropper = new Cropper(photo, options);
    $('#crop').on('click', function () {
        imgResult = cropper.getCroppedCanvas().toDataURL();
        imgResultImg.src = imgResult;
        $('.img').css('display', 'none');
        LInit(60, "myGame", gameWidth, gameHeight, main);
        $('.game').css('display', 'block');
    })
}

function checkFile(file) {//检查文件是否为图像类型
    console.log(file);
    //使用正则表达式匹配判断
    if (!/image\/\w+/.test(file.type)) {
        return false;
    }
    return file;
}

function judgeCompress(image, imageSize) {
    //判断图片是否大于300000 bit
    var threshold = 300000; //阈值,可根据实际情况调整
    if (imageSize > threshold) {
        var imageData = compress(image);

        var newImage = new Image();
        newImage.src = imageData;
        return newImage;
    } else {
        return image;
    }
}

function compress(image) {
    console.log("compress");

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    var imageLength = image.src.length;
    var originWidth = image.width;
    var originHeight = image.height;

    var maxWidth = 800,
        maxHeight = 800;
    // 目标尺寸
    var targetWidth = originWidth,
        targetHeight = originHeight;
    // 图片尺寸超过800x800的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
    }

    canvas.height = targetHeight;
    canvas.width = targetWidth;
    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

    //压缩操作

    var quality = 0.8; //图片质量  范围：0<quality<=1 根据实际需求调正
    var imageData = canvas.toDataURL("image/jpeg", quality);


    return imageData;
}

function uploadImg() {
    $('#photoBox').empty();
    photoBox.innerHTML = '<img id="photo" src="">';
    var file = flObj.files[0];//因为每次只上传了一张图片，所以获取到flObj.files[0];
    var fReader = new FileReader();
    var isImage = checkFile(file);


    if (!isImage) {
        alert("请确保文件为图像类型");
    } else {
        fReader.onload = function (e) {
            var imageSize = e.total; //图片大小
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                // 压缩图片
                image = judgeCompress(image, imageSize);
                document.getElementById("photo").src = image.src;
                cropper(document.getElementById("photo"), options);
            };
        }

    }

    fReader.readAsDataURL(isImage);

};
