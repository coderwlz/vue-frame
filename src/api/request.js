import axios from 'axios'
import { message } from 'ant-design-vue'
import router from '/src/router/index.js'
import qs from 'qs'

const service = axios.create({
  baseURL: '/m/api',
  withCredentials: true, //跨域请求时发送cookies
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  }
  // timeout: 10000 // 请求超时
})
//请求拦截
service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem('token')
    config.headers['x-user-agent'] = `uam-web/${
      import.meta.env.VITE_VUE_APP_VERSION
    } (https://www.vesystem.com)`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
) //响应拦截
service.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 204) {
      return response
    }
  },
  (error) => {
    if (error.response.status === 400) {
      message.warning(error.response.data.msg)
    } else if (error.response.status === 401) {
      message.warning('登录状态无效，请重新登录')
      window.location.href = import.meta.env.VITE_BASE_PATHS
    } else if (error.response.status === 402) {
      router.push('/information')
      // message.warning('需要授权码')
    } else if (error.response.status === 403) {
      message.warning('当前账号无权限进行此操作')
      router.push('/403')
    } else if (error.response.status === 404) {
      message.warning('URI不存在')
    } else if (error.response.status === 405) {
      message.warning('不支持请求的HTTP方法')
    } else if (error.response.status === 412) {
      router.push('/token')
      // message.warning("不支持请求的HTTP方法");
    } else if (error.response.status === 500) {
      message.warning('服务端错误')
    } else if (error.response.status === 502) {
      message.warning(' 网关异常')
    } else {
      message.warning('服务端错误：未识别状态码')
    }

    return Promise.reject(error)
  }
)
export default service
