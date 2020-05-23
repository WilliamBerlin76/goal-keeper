import axios from 'axios';
import firebase from 'firebase';

export const axiosWithAuth = () => {
    firebase.auth().currentUser.getIdToken(true)
        .then(token => {
            return axios.create({
                baseURL: `https://flashcards-be.herokuapp.com`,
                headers: {
                    Authorization: token,
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                
                }
        })
    }).catch(err => console.log(err))
};