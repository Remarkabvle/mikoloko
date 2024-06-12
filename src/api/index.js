import axios from "axios";

const mainUrl = axios.create({
    baseURL: "https://ecommerceapi.firdavsdev.uz"
})

mainUrl.interceptors.request.use((req) => {
    const token = localStorage.getItem("x-auth-token") 
    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

export default mainUrl
