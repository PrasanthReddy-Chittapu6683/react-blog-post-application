import axios from 'axios'
export const apiURL = 'https://jsonplaceholder.typicode.com/';
export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

