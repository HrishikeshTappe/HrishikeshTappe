import axios from 'axios';
export function login(formData){
    return axios.post(`http://localhost:5000/login`, {
        email: formData.email,
        password: formData.password,
        role: formData.role,   
    });
}
