import axios from 'axios';

const axiosWithAuth = () => {
    let token
    if (localStorage.getItem('token')){
        token = localStorage.getItem('token');
    } else {
        token = sessionStorage.getItem('token');
    };
        
    return axios.create({
        baseURL: `https://node-goals.herokuapp.com`,
        headers: {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
};

export default axiosWithAuth;