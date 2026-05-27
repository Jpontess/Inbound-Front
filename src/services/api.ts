import axios from 'axios'; 

const api = axios.create({
    baseURL: 'https://inbound-backend.onrender.com/', /*http://localhost:3000*/ 
    headers: {
        'Content-Type': 'application/json',
        Authorization: ""
    }
    
});

export default api;