import {isAxiosError} from "axios";
import {axiosClient} from "../config/axios-client"
import {User} from "../types";

export const getUser = async () =>{
  try {
    const {data} = await axiosClient.get<User>('/user');
    return data
  } catch (error) {
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
  }
}

export const updateUserProfile = async (formData: User) =>{
  try {
      const {data} = await axiosClient.patch('/user',formData)
      return data
    } catch (error) {
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
    }
}

export const uploadImage = async (file: File)=>{
  const formData = new FormData()
  formData.append('file', file)
  try {
    const {data} = await axiosClient.post('/user/image', formData)
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
  }
}

export const getUserByHandle = async (handle: string) =>{
  try {
      const {data} = await axiosClient(`/${handle}`)
      return data
    } catch (error) {
      console.log(error)
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
      }
    }
}

export const searchByHandle = async (handle: string) =>{
  try {
      const {data} = await axiosClient.post<string>('/search',{handle})
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      if(isAxiosError(error) && error.response){
        console.log(error.response.data.error)
        throw new Error(error.response.data.error)
      }
    }
}