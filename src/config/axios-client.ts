import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
})

//interceptor
axiosClient.interceptors.request.use((config)=>{
  const token = localStorage.getItem('AUTH_TOKEN')
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})