import axios from 'axios'
import {Loading} from 'element-ui'

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 3000
})

let loading

function startLoading () {
  loading = Loading.service({
    fullscreen: true,
    lock: true,
    text: '加载中',
    background: 'rgba(0,0,0,.7)'
  })
}

instance.interceptors.request.use(config => {
  // startLoading()
  return config
}, () => {})

instance.interceptors.response.use(res => {
  loading.close()
  return res.data
}, err => {
  loading.close()
})

export function post (url, data, isFormData = false, config = {}) {
  let newParams = {}
  if (data && isFormData) {
    newParams = new FormData()
    for (let i in data) {
      newParams.append(i, data[i])
    }
  } else {
    newParams = data
  }
  return new Promise((resolve, reject) => {
    instance.post(url, newParams, config).then(res => {
      resolve()
    }, err => {
      reject(err)
    })
  })
}

export function get (url, params, isFormData = false, config = {}) {
  let newParams = {}
  if (params && isFormData) {
    newParams = new FormData()
    for (let i in params) {
      newParams.append(i, params[i])
    }
  } else {
    newParams = params
  }
  config = config.params
  return new Promise((resolve, reject) => {
    instance.get(url, config).then(res => {
      resolve()
    }, err => {
      reject(err)
    })
  })
}
