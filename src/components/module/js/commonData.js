const array = []

const str = '1/0/'
for (let i = 1; i <= 48; i++) {
  let item = str + i
  array.push({
    value: item,
    label: item
  })
}

console.log('=array=', array)

export default array
