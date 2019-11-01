// 判断一个数组对象中，是否有相同的对象属性值
export function isRepeat (obj, array, key) {
  let flag = false
  if (array instanceof Array && array.length !== 0) {
    array.forEach((item, index) => {
      if (item[key] === obj[key] + '') {
        flag = true
      }
    })
    return flag
  } else {
    return flag
  }
}
