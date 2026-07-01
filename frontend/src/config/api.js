import axios from 'axios'
import { API } from './site'

const api = axios.create({
  baseURL: API.baseURL,
  withCredentials: true,
})

export default api
