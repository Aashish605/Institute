import axios from 'axios'
import { API } from './site'

const api = axios.create({
  baseURL: API.baseURL,
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/user')) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
