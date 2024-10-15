import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://texnoark.ilyosbekdev.uz"
})
 axiosInstance.interceptors.request.use((config: any): any => {
    const access = localStorage.getItem("access")
    if(access){
        config.headers["Authorization"] = `${access}`
    }
    return config
 })
 export default axiosInstance