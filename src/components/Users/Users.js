import React, { useEffect, useRef, useState } from 'react'
import { Avatar } from '@material-ui/core'
import './Users.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faEye } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import useCustomHook from '../../Hooks/useCustomHook'
import ClearIcon from '@material-ui/icons/Clear';

function Users({ name }) {


    const [usersData, setUsersData] = useState([])
    const history = useHistory();
    const authorName = useRef(null)
    const redirectToUserBlogs = (e) => {
        e.preventDefault();
        history.push('/blogs')
    }


    const [usersDataList] = useCustomHook('users');
    const usersList = usersDataList;
    if (usersList && usersList.length > 0 && usersData.length === 0) {
        setUsersData(usersList)
    }

    const searchUser = (e) => {
        e.preventDefault();
        debugger;
        let data = usersList.filter(x => x.name.toUpperCase() === authorName.current.value.toUpperCase())
        if (data.length === 0) {
            alert(`No Data found for Author : ${authorName.current.value}`)
        }
        setUsersData(data)

    }


    useEffect(() => {
        if (name === '') {
            history.push('/login')
        }

    }, [name])
    const clearUser = (e) => {
        e.preventDefault();
        authorName.current.value = ""
        setUsersData([]);
    }

    return (
        <div className='users'>
            <h2 className="users-title">
                <FontAwesomeIcon title="View my Website" className='button-icon' icon={faUsers} /> Users List
            </h2>
            <div className="users-list">
                <div className="user-filter">
                    <input type='text' ref={authorName} placeholder="Search Users" className="user-filter-search-input"></input>
                    <SearchIcon onClick={searchUser} className="user-filter-search-icon"></SearchIcon>
                    <ClearIcon className="blog-filter-clear-icon" onClick={clearUser}></ClearIcon>
                </div>

                {
                    usersData ? usersData.map(user => (
                        <div key={user.id} className="user-details">
                            <Avatar src={`https://avatars.dicebear.com/api/human/${user.id}_${user.username}.svg`} />
                            <span className="user-details-name"> {user.name} </span>
                            <div className="user-bolgs-link">
                                <Button color="primary" onClick={redirectToUserBlogs}>
                                    <FontAwesomeIcon title="View my Website" className='button-icon' icon={faEye} /> View Blogs
                                </Button>
                            </div>
                        </div>
                    )) : <></>
                }


            </div>
        </div>

    )
}

export default Users
