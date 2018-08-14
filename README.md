# Demo

<!-- TOC -->

- [Demo](#demo)
    - [一、AJAX_Demo](#一ajax_demo)
        - [简介](#简介)
    - [二、canvas](#二canvas)
        - [简介](#简介-1)
        - [1 canvas鼠标互动特效](#1-canvas鼠标互动特效)
            - [简介](#简介-2)
        - [2 canvas阴阳鱼](#2-canvas阴阳鱼)
            - [简介](#简介-3)
        - [3 canvas画板](#3-canvas画板)
            - [简介](#简介-4)
        - [4 日地月](#4-日地月)
            - [简介](#简介-5)
    - [三、jquery](#三jquery)
        - [简介](#简介-6)
        - [1 cropper](#1-cropper)
            - [简介](#简介-7)
            - [预览](#预览)
    - [四、Phaser](#四phaser)
        - [简介](#简介-8)
        - [1 pickApple](#1-pickapple)
            - [简介](#简介-9)
            - [预览](#预览-1)
    - [五、Vue学习](#五vue学习)
        - [简介](#简介-10)
        - [1 循环输出图片](#1-循环输出图片)
            - [简介](#简介-11)
    - [六、JavaScript](#六javascript)
        - [简介](#简介-12)
        - [1 去除数组重复元素（6种方法）](#1-去除数组重复元素6种方法)

<!-- /TOC -->

## 一、AJAX_Demo
### 简介
一个简单的ajax实例
## 二、canvas
### 简介
学习canvas时的demo
### 1 canvas鼠标互动特效
#### 简介
整张网页都是一个canvas，鼠标移动时会产生交互
<a href="https://chrischen0405.github.io/Demo/canvas/canvas%E9%BC%A0%E6%A0%87%E4%BA%92%E5%8A%A8%E7%89%B9%E6%95%88/index.html" target="_blank">预览</a>
### 2 canvas阴阳鱼
#### 简介
使用canvas中的arc（）函数绘制太极中的阴阳图案
<a href="https://chrischen0405.github.io/Demo/canvas/canvas%20arc()%E5%87%BD%E6%95%B0%E7%BB%98%E5%88%B6%E9%98%B4%E9%98%B3%E9%B1%BC.html" target="_blank">预览</a>
### 3 canvas画板
#### 简介
一个简单的canvas实例，具有简单的画板功能
<a href="https://chrischen0405.github.io/Demo/canvas/canvas%E7%94%BB%E6%9D%BF.html" target="_blank">预览</a>
### 4 日地月
#### 简介
使用canvas中的变形功能实现月球绕地球转，地球绕太阳转的动画效果
<a href="https://chrischen0405.github.io/Demo/canvas/canvas%E7%BB%98%E5%88%B6%E6%97%A5%E5%9C%B0%E6%9C%88.html" target="_blank">预览</a>
## 三、jquery
### 简介
学习jquery时的demo
### 1 cropper
#### 简介
使用jquery的cropper插件编写的一个实例，实现图片上传、剪切的功能<br>
<a href="https://fengyuanchen.github.io/cropper/" target="_blank">官网实例</a>
#### 预览
<a href="https://chrischen0405.github.io/Demo/jquery/cropper/cropper%E5%9B%BE%E5%83%8F%E8%A3%81%E5%89%AA.html" target="_blank">预览</a>
## 四、Phaser
### 简介
学习Phaser游戏引擎时的demo
### 1 pickApple
#### 简介
一个接苹果小游戏的实例<br>
<a href="https://segmentfault.com/a/1190000009212221" target="_blank">出处</a>
#### 预览
最好在手机端<a href="https://chrischen0405.github.io/Demo/Phaser/pickApple/index.html" target="_blank">预览</a>
## 五、Vue学习
### 简介
学习vue时的demo
### 1 循环输出图片
#### 简介
主要使用v-for完成图片的循环输出
## 六、JavaScript
### 简介
学习JavaScript时遇到的那些坑
### 1 去除数组重复元素（6种方法）
- 方法一，使用数组的indexof方法，如果element的index不相等则说明element相同，则过滤掉
- 方法二，Set结构中key不能重复
- 方法三，遍历两个数组，将原数组和新数组比较，如果原数组的值已存在则不加入新数组中
- 方法四，先将数组进行排序，然后遍历，将每个值与后一个值比较，如果不同则存入新数组
- 方法五，方法五，根据对象的属性，如果该属性不存在，则把元素加入新数组
- 方法六，双重循环比较值，如果相同，使用splice删去后一个相同的值