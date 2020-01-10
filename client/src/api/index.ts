import axios, { AxiosResponse } from 'axios'

interface AxiosResponseData {
  code: number
  message: string
  results: any
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
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
