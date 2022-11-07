const m1 = new Map()

m1.set('a', 1)
m1.set('b', 2)
m1.set('c', 3)

// 可迭代对象
for (let [ k, v ] of m1) {
  console.log(k, v)
}

const m2 = new Map()

// 同零相等
m2.set(0, 1)
m2.set(-0, 2)

// NaN键名相等
m2.set(NaN, 1)
m2.set(NaN, 2)

console.log(m2)