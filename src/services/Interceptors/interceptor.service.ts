import api from "../api";

api.interceptors.request.use(function (config){
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.log('Error')
        return config;
    }

    config.headers.Authorization = `Bearer ${token}`
    
    return config;
})