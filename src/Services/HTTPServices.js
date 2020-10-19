// const { default: axios } = require("../axios/axios")
import axios from '../axios/axios'

const getUser = () => {
    return axios.get('/users')
}
const getBlogs = () => {
    return axios.get('/posts')
}

const getBlogById = id => {
    return axios.get(`/posts?id=${id}`);
};

const getUserById = id => {
    return axios.get(`/users?id=${id}`);
};
// const getAllData = (userAPI, blogsApi) => {
//     return axios.all(userAPI, blogsApi)
// }
// const getSpreadData = (fullData) => {
//     return axios.spread(...fullData)
// }
export default { getUser, getBlogs, getBlogById, getUserById }