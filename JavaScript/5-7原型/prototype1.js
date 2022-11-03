function Test () {
  this.a = 1
  this.b = 2
}

Test.prototype.c = 3
Test.prototype.d = 4

Object.prototype.e = 5
Object.prototype.f = 6

const test = new Test()

// 原型链
// __proto__ 在浏览器中显示 [[Prototype]]
// test => {
//   a: 1,
//   b: 2,
//   __proto__: Test.prototype {
//     c: 3,
//     d: 4,
//     __proto__: Object.prototype {
//       e: 5,
//       f: 6
//     }
//   }
// }

console.log(test)

// 原型链继承
console.log(test.__proto__.__proto__.f)
console.log(test.f)