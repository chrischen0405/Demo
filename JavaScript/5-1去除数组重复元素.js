const arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry']

//方法一，使用数组的indexof方法，如果element的index不相等则说明element相同，则过滤掉
Array.prototype.distinct1 = function () {
    let arr = this
    return arr.filter(function (element, index, self) {
        return self.indexOf(element) === index
    })
}

//方法二，Set结构中key不能重复
Array.prototype.distinct2 = function () {
    let arr = this
    let result = []
    let set = new Set()
    for (let x of arr) {
        set.add(x)
    }
    for (let x of set) {
        result.push(x)
    }
    return result
}

//方法三，遍历两个数组，将原数组和新数组比较，如果原数组的值已存在则不加入新数组中
Array.prototype.distinct3 = function () {
    let arr = this
    let result = []
    for (let i of arr) {
        let flag = 0
        for (let j of result) {
            if (i === j) {
                flag = 1
            }
        }
        if (flag === 0) {
            result.push(i)
        }
    }
    return result
}

//方法四，先将数组进行排序，然后遍历，将每个值与后一个值比较，如果不同则存入新数组
Array.prototype.distinct4 = function () {
    let arr = this.sort()
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != arr[i + 1])
            result.push(arr[i])
    }
    return result
}

//方法五，根据对象的属性，如果该属性不存在，则把元素加入新数组
Array.prototype.distinct5 = function () {
    let arr = this
    let result = []
    let obj = {}
    for (let x of arr) {
        if (!obj[x]) {
            obj[x] = x
            result.push(x)
        }
    }
    return result
}

//方法六，双重循环比较值，如果相同，使用splice删去后一个相同的值
Array.prototype.distinct6 = function () {
    let arr = this
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1)
                j--
            }
        }
    }
    return arr
}

console.log(arr.distinct1())
console.log(arr.distinct2())
console.log(arr.distinct3())
console.log(arr.distinct4())
console.log(arr.distinct5())
console.log(arr.distinct6())
