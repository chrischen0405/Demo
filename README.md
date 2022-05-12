# Demo

<!-- TOC -->

- [Demo](#demo)
    - [一、AJAX_Demo](#一ajax_demo)
    - [二、canvas](#二canvas)
        - [1 canvas鼠标互动特效](#1-canvas鼠标互动特效)
        - [2 canvas阴阳鱼](#2-canvas阴阳鱼)
        - [3 canvas画板](#3-canvas画板)
        - [4 canvas日地月](#4-canvas日地月)
        - [4 canvas烟花效果](#4-canvas烟花效果)
        - [5 canvas爱心冒泡特效](#5-canvas爱心冒泡特效)
        - [6 canvas扭蛋机](#6-canvas扭蛋机)
        - [7 lufylegend拼图华容道小游戏](#7-lufylegend拼图华容道小游戏)
    - [三、jquery](#三jquery)
        - [1 cropper](#1-cropper)
            - [预览](#预览)
    - [四、Phaser](#四phaser)
        - [1 pickApple](#1-pickapple)
            - [预览](#预览-1)
    - [五、JavaScript](#五javascript)
        - [1 去除数组重复元素（6种方法）](#1-去除数组重复元素6种方法)
        - [2 JavaScript实现消息列表滚动](#2-javascript实现消息列表滚动)
    - [六、CSS](#六css)
        - [1 圣杯布局](#1-圣杯布局)
        - [2 双飞翼布局](#2-双飞翼布局)
        - [3 按钮涟漪](#3-按钮涟漪)

<!-- /TOC -->

## 一、AJAX_Demo

一个简单的ajax实例

## 二、canvas

学习canvas时的demo

### 1 canvas鼠标互动特效

整张网页都是一个canvas，鼠标移动时会产生交互

<a href="https://chrischen0405.github.io/Demo/canvas/canvas%E9%BC%A0%E6%A0%87%E4%BA%92%E5%8A%A8%E7%89%B9%E6%95%88/index.html" target="_blank">预览</a>

### 2 canvas阴阳鱼

使用canvas中的arc()函数绘制太极中的阴阳图案

<a href="https://chrischen0405.github.io/Demo/canvas/canvas%20arc()%E5%87%BD%E6%95%B0%E7%BB%98%E5%88%B6%E9%98%B4%E9%98%B3%E9%B1%BC.html" target="_blank">预览</a>

### 3 canvas画板

一个简单的canvas实例，具有简单的画板功能

<a href="https://chrischen0405.github.io/Demo/canvas/canvas%E7%94%BB%E6%9D%BF.html" target="_blank">预览</a>

### 4 canvas日地月

使用canvas中的变形功能实现月球绕地球转，地球绕太阳转的动画效果

<a href="https://chrischen0405.github.io/Demo/canvas/canvas%E7%BB%98%E5%88%B6%E6%97%A5%E5%9C%B0%E6%9C%88.html" target="_blank">预览</a>

### 4 canvas烟花效果

利用canvas实现简易的烟花效果，在页面中点击鼠标，会向鼠标点击处释放烟花

<a href="https://chrischen0405.github.io/Demo/canvas/canvas%E7%83%9F%E8%8A%B1%E7%89%B9%E6%95%88/index.html" target="_blank">预览</a>

### 5 canvas爱心冒泡特效

整张网页会不停地冒出爱心并且不停消失，利用canvas的bezierCurveTo()方法绘制爱心，使用requestAnimationFrame重绘完成动画效果

<a href="https://chrischen0405.github.io/Demo/canvas/canvas%E7%88%B1%E5%BF%83%E5%86%92%E6%B3%A1%E7%89%B9%E6%95%88/index.html" target="_blank">预览</a>

### 6 canvas扭蛋机

一个简单的扭蛋机demo，利用canvas绘制扭蛋动画

<a href="https://chrischen0405.github.io/Demo/canvas/canvas%E6%89%AD%E8%9B%8B%E6%9C%BA%E6%95%88%E6%9E%9C/index.html" target="_blank">预览</a>

### 7 lufylegend拼图华容道小游戏

使用<a href="http://www.lufylegend.com/api/zh_CN/out/" target="_blank">lufylegend.js</a>游戏引擎完成拼图华容道小游戏，小游戏除了游戏功能以外，支持自定义图片上传，并且图片过大进行图片压缩，使用<a href="https://fengyuanchen.github.io/cropper/" target="_blank">cropper</a>插件完成图片裁剪功能，建议在手机端<a href="https://chrischen0405.github.io/Demo/canvas/lufylegend/index.html" target="_blank">试玩</a>

## 三、jquery

学习jquery时的demo

### 1 cropper

使用jquery的cropper插件编写的一个实例，实现图片上传、剪切的功能<br>

<a href="https://fengyuanchen.github.io/cropper/" target="_blank">官网实例</a>

#### 预览

<a href="https://chrischen0405.github.io/Demo/jquery/cropper/cropper%E5%9B%BE%E5%83%8F%E8%A3%81%E5%89%AA.html" target="_blank">预览</a>

## 四、Phaser

学习Phaser游戏引擎时的demo

### 1 pickApple

一个接苹果小游戏的实例<a href="https://segmentfault.com/a/1190000009212221" target="_blank">原作者</a>

#### 预览

最好在手机端<a href="https://chrischen0405.github.io/Demo/Phaser/pickApple/index.html" target="_blank">预览</a>

## 五、JavaScript

学习JavaScript时遇到的那些坑

### 1 去除数组重复元素（6种方法）

- 方法一，使用数组的indexof方法，如果element的index不相等则说明element相同，则过滤掉
- 方法二，Set结构中key不能重复
- 方法三，遍历两个数组，将原数组和新数组比较，如果原数组的值已存在则不加入新数组中
- 方法四，先将数组进行排序，然后遍历，将每个值与后一个值比较，如果不同则存入新数组
- 方法五，方法五，根据对象的属性，如果该属性不存在，则把元素加入新数组
- 方法六，双重循环比较值，如果相同，使用splice删去后一个相同的值

### 2 JavaScript实现消息列表滚动

<a href="https://chrischen0405.github.io/Demo/JavaScript/消息滚动.html" target="_blank">预览</a>

## 六、CSS

### 1 圣杯布局

CSS经典三列布局，左右两栏固定，中间自适应

<a href="https://chrischen0405.github.io/Demo/HTML&CSS/%E5%B8%83%E5%B1%80/%E5%9C%A3%E6%9D%AF%E5%B8%83%E5%B1%80.html" target="_blank">预览</a>

### 2 双飞翼布局

同圣杯布局，三列布局，左右两栏固定，中间自适应

<a href="https://chrischen0405.github.io/Demo/HTML&CSS/%E5%B8%83%E5%B1%80/%E5%8F%8C%E9%A3%9E%E7%BF%BC%E5%B8%83%E5%B1%80.html" target="_blank">预览</a>

### 3 按钮涟漪

- 第一个按钮从右到左动画
- 第二个按钮从右到左带圆角动画
- 第三个按钮中心扩散动画
- 第四个按钮从下至上动画

<a href="https://chrischen0405.github.io/Demo/HTML&CSS/6-3按钮涟漪.html" target="_blank">预览</a>

