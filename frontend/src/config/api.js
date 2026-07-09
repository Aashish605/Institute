import axios from 'axios'
import { API } from './site'

const api = axios.create({
  baseURL: API.baseURL,
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  error => {
    const ignoredAuthPaths = ['/auth/user', '/auth/login', '/auth/signup'];
    const shouldIgnoreRedirect = ignoredAuthPaths.some(path => error.config?.url?.includes(path));

    if (error.response?.status === 401 && !shouldIgnoreRedirect) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
