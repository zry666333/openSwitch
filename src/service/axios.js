import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 3000
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

export function get (url, params, isFormData, config = {}) {
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
