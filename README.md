# Demo

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

### 6 lufylegend拼图华容道小游戏

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

<a href="https://chrischen0405.github.io/Demo/JavaScript/5-2消息滚动/index.html" target="_blank">预览</a>

### 3 JavaScript取url后参数

### 4 洗牌函数

### 5 闭包

### 6 回调函数

### 7 原型

- 原型链、原型链继承
- 实现`Object.prototype`特性：`Object.prototype.__proto__` 返回为`null`且不可修改
- `prototype`相关API：`getPrototypeOf`、`setPrototypeOf`、`isPrototypeOf`

### 8 Map

Map和Object区别：

- Map 键名：可以是基本类型、引用类型
- Object 键名：只能基本类型


- Map 有序的，可迭代的
- Object 无序的，不可迭代 ES2015规范：建议浏览器厂商对对象枚举采取有序化操作


- Map size
- Object Object.keys().length


- Map 可以使用for...of
- Object 不支持for...of


- Map操作底层做了全面优化
- Object没有做任何优化


- Map没有序列化操作
- Object被支持序列化操作：JSON.stringify parse

### 9 实现对象for...of

ES6：使用迭代器并实现ES6迭代器

### 10 类型检测

封装typeof

## 六、CSS

### 1 布局

#### 圣杯布局
CSS经典三列布局，左右两栏固定，中间自适应

<a href="https://chrischen0405.github.io/Demo/HTML&CSS/6-1layout/%E5%9C%A3%E6%9D%AF%E5%B8%83%E5%B1%80.html" target="_blank">预览</a>

#### 双飞翼布局

同圣杯布局，三列布局，左右两栏固定，中间自适应

<a href="https://chrischen0405.github.io/Demo/HTML&CSS/6-1layout/%E5%8F%8C%E9%A3%9E%E7%BF%BC%E5%B8%83%E5%B1%80.html" target="_blank">预览</a>

#### 瀑布流布局

多列布局，子元素不固定高度，滚动到底部优先往最短那列添加数据

<a href="https://chrischen0405.github.io/Demo/HTML&CSS/6-1layout/瀑布流布局/index.html" target="_blank">预览</a>

### 2 按钮涟漪

- 第一个按钮从右到左动画
- 第二个按钮从右到左带圆角动画
- 第三个按钮中心扩散动画
- 第四个按钮从下至上动画

<a href="https://chrischen0405.github.io/Demo/HTML&CSS/6-2按钮涟漪.html" target="_blank">预览</a>

### 3 绘制三角形

方向依次为上、下、左、右的三角形

<a href="https://chrischen0405.github.io/Demo/HTML&CSS/6-3triangle/index.html" target="_blank">预览</a>

### 4 清除浮动

## 七、Echarts

Echarts的一些配置项

### 1 ecahrts雷达图tooltip显示单轴数据

## 八、Vue

### 1 双向绑定

Vue双向绑定v-model的简单实现原理

<a href="https://chrischen0405.github.io/Demo/Vue/8-1双向绑定实现/index.html" target="_blank">预览</a>

### 2 v-if v-show

Vue v-if/v-show的简单实现原理

<a href="https://chrischen0405.github.io/Demo/Vue/8-2v-ifv-show实现/index.html" target="_blank">预览</a>
