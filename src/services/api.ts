import axios from 'axios'; 

const api = axios.create({
    baseURL: 'https://inbound-backend.onrender.com/', 
    headers: {
        'Content-Type': 'application/json',
        Authorization: ""
    }
    
});

export default api;