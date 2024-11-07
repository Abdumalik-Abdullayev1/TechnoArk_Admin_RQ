import axios from "axios";
import { getAccessToken } from "../utils/tokens";

const axiosInstance = axios.create({
    baseURL: "https://texnoark.ilyosbekdev.uz"
})
 axiosInstance.interceptors.request.use((config: any): any => {
    const access_token = getAccessToken()
    if(access_token){
        config.headers["Authorization"] = `Bearer ${access_token}`
    }
    return config
 })
 export default axiosInstance