import axios from 'axios'
import service from './networkApi'
// import {Loading} from 'element-ui'
import {Loading, Message} from 'element-ui'

let loading

function startLoading () {
  loading = Loading.service({
    fullscreen: true,
    lock: true,
    text: '加载中',
    background: 'rgba(0,0,0,.7)'
  })
}

// service 循环遍历输出不同的请求方法
let instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 3000
})

const Http = {} // 包裹请求方法的容器

// 请求格式/参数的统一
for (let key in service) {
  let api = service[key] // url method
  // async 避免进入回调地狱
  Http[key] = async function (params, isFormData = false, config = {}) {
    let url = api.url
    let newParams = {}
    // content-type是否是form-data的判断
    if (params && isFormData) {
      newParams = new FormData()
      for (let i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }
    // 不同请求的判断
    let response = {} // 请求的返回值
    if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
      try {
        response = await instance[api.method](url, newParams, config)
      } catch (err) {
        response = err
      }
    } else if (api.method === 'delete' || api.method === 'get') {
      config.params = newParams
      try {
        response = await instance[api.method](url, config)
      } catch (err) {
        response = err
      }
    }
    return response // 返回响应值
  }
}

// 拦截器的添加
instance.interceptors.request.use(config => {
  // 发起请求前做些什么
  startLoading()
  return config
}, () => {
  // 请求错误
  loading.close()
  // Message.error(err.response.data.Message)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  // 请求成功
  loading.close()
  return res.data
}, (err) => {
  console.log('-err-', err)
  console.log('=err=', err.response.data.Message)
  Message.error('系统出错')
  // 响应失败
  loading.close()
  // Message.error(err.response.data.Message)
})

export default Http
