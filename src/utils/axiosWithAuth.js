import axios from 'axios';
import firebase from 'firebase';

export const axiosWithAuth = () => {
    const token = sessionStorage.getItem('token')
        
    return axios.create({
        baseURL: `http://localhost:5000`,
        headers: {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
};