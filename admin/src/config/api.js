import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://institute-backend-eight.vercel.app' : ''),
  withCredentials: true,
})

export default api
