// axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'

const httpInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // 假设JWT存储在localStorage中
    const token = localStorage.getItem('token');
    if (token) {
      // 如果存在Token，添加到Authorization字段
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  return Promise.reject(e)
})

export default httpInstance
