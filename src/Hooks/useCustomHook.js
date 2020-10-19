import axios from 'axios';
import { useEffect, useState } from 'react'
import { apiURL } from '../axios/axios';
import HTTPServices from '../Services/HTTPServices'

function useCustomHook(type, id = 0) {

    const [usersList, setUsersList] = useState(initialState)
    const [blogsList, setBlogsList] = useState(initialState)

    const fetchAllData = () => {
        const usersAPI = axios.get(apiURL + 'users');
        const blogsAPI = axios.get(apiURL + 'posts');
        axios.all([usersAPI, blogsAPI]).then(
            axios.spread((...allData) => {
                // users(allData[0])
                // blogs(allData[1])
                setUsersList(allData[0]?.data)
                setBlogsList(allData[1]?.data)
            })
        )
    }

    const fechUsers = async () => {
        HTTPServices.getUser().then(response => {
            setUsersList(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    const fechUsersById = async () => {
        HTTPServices.getUserById(id).then(response => {

            setUsersList(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    const fechBlogs = async () => {
        HTTPServices.getBlogs().then(response => {
            setBlogsList(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    const fechBlogsById = async (id) => {
        HTTPServices.getBlogById(id).then(response => {
            setBlogsList(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        if (type === 'users') {
            fechUsers()
        } else if (type === 'blogs') {
            fechBlogs();
        } else if (type === 'All') {
            fetchAllData()
        } else if (type === 'blogsbyid') {
            fechBlogsById(id);
        } else if (type === 'userbyid' && id > 0) {
            fechUsersById();
        }
        return () => {
        }
    }, [type])

    return [usersList, blogsList]

}



export default useCustomHook



const initialState = [];
