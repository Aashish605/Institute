import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://institute-xi.vercel.app' : ''),
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
