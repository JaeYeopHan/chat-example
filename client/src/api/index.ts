import axios, { AxiosResponse } from 'axios'

interface AxiosResponseData {
  code: number
  message: string
  results: any
}

export const BASE_URL = 'http://localhost:8000'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  function(response: AxiosResponse<AxiosResponseData>) {
    if (response.data.code !== 1000) {
      Promise.reject(response.data)
    }
    return response.data.results
  },
  function(error) {
    return Promise.reject(error)
  },
)
export default axiosInstance
