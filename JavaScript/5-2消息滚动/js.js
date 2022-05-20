let scrollBox = document.getElementById('scrollBox')
let scrollUl = document.getElementById('scroll_ul')
let iliHeight = 30//单行滚动的高度
let stayTime = 1500//消息停留时间
let scrollTime = 30//滚动刷新时间
let timer = null//计时器
let List = ['通知1', '通知2', '通知3']//存放通知消息的列表

init(List)

function init (list) {//滚动初始化
    scrollBox.scrollTop = 0
    for (let i = 0; i < list.length; i++) {//将列表中的消息添加到dom树里
        let li = document.createElement('li')
        li.innerHTML = list[i]
        scrollUl.appendChild(li)
    }
    scrollBox.innerHTML += scrollBox.innerHTML//克隆一份一样的内容
    setTimeout(startScroll, stayTime)//列表开始滚动
}

function startScroll () {//列表滚动
    timer = setInterval(scrollUp, scrollTime)
    scrollBox.scrollTop++
}

function scrollUp () {//列表向上滚动
    if (scrollBox.scrollTop % iliHeight === 0) {//滚动一条消息的高度停止计时
        clearInterval(timer)
        timer = null
        setTimeout(startScroll, stayTime)
    } else {//滚动不足一条消息的高度继续滚动
        scrollBox.scrollTop++
        if (scrollBox.scrollTop >= scrollBox.scrollHeight / 2) {//滚动完一个列表以后重新开始滚动
            scrollBox.scrollTop = 0
        }
    }
}
