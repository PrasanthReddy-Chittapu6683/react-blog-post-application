import React, { useRef, useState } from 'react'
import './Blogs.css'
import { useSpring, animated } from 'react-spring'
import { faBlog, faEye, faUser } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear';
import { Link, useHistory } from 'react-router-dom';
import useCustomHook from '../../Hooks/useCustomHook';


const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) scale(${s})`

function Blogs({ name }) {
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 350, friction: 100 } }))
    const authorName = useRef(null)
    const [BlogListVal, setBlogList] = useState([])
    const titleName = useRef(null)
    const [users, blogs] = useCustomHook('All');
    const history = useHistory();
    let blogsList = blogs;
    const allBlogsList = blogsList;
    for (let blg of blogsList) {
        if (users) {
            let userData = users.filter(x => x.id === blg.userId)
            blg.userName = userData?.length > 0 ? userData[0].name : "";
        }
    }

    if (blogsList && blogsList.length > 0 && BlogListVal.length === 0) {
        debugger;
        setBlogList(blogsList)
    }


    const searchByUser = (e) => {
        e.preventDefault();
        titleName.current.value = ""
        let data = allBlogsList.filter(x => x.userName === authorName.current.value)
        if (data.length === 0) {
            alert(`No Data found for Author : ${authorName.current.value}`)
        }
        setBlogList(data)
        // authorName.current.value = ""
    }
    const searchByTitle = (e) => {
        e.preventDefault();
        authorName.current.value = ""
        console.log(titleName.current.value)
        let data = allBlogsList.filter(x => x.title.toUpperCase() === titleName.current.value.toUpperCase())
        if (data.length === 0) {

            alert(`No Data found for Title : ${titleName.current.value}`)
        }
        setBlogList(data)
    }
    const clearUser = (e) => {
        e.preventDefault();
        authorName.current.value = ""
        setBlogList([]);
    }

    const clearTitle = (e) => {
        e.preventDefault();
        titleName.current.value = ""
        setBlogList([]);
    }
    if (localStorage.length == 0) {
        history.push('/login')
    }
    return (
        <div className='blogs'>
            <h2 className="blog-title">
                <FontAwesomeIcon title="View my Website" className='button-icon' icon={faBlog} /> Blogs
            </h2>


            <div className="blog-list">

                <div className="blog-filter">
                    <input type='text' ref={authorName} placeholder="Search by Author" className="blog-filter-search-input"></input>
                    <SearchIcon className="blog-filter-search-icon" onClick={searchByUser}></SearchIcon>
                    <ClearIcon className="blog-filter-clear-icon" onClick={clearUser}></ClearIcon>
                </div>
                <div className="blog-filter">
                    <input type='text' ref={titleName} placeholder="Search by Title" className="blog-filter-search-input"></input>
                    <SearchIcon className="blog-filter-search-icon" onClick={searchByTitle}></SearchIcon>
                    <ClearIcon className="blog-filter-clear-icon" onClick={clearTitle}></ClearIcon>

                </div>
                {
                    BlogListVal ? BlogListVal.map(blog => (

                        <animated.div key={blog.id}
                            className="blog-post"
                            onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                            onMouseLeave={() => set({ xys: [0, 0, 1] })}
                            style={{ transform: props.xys.interpolate(trans) }}
                        >
                            <div className="blog-post-details">
                                <Link to={"/blog/" + blog.id}>
                                    <Button color="primary">
                                        <FontAwesomeIcon title="View my Website" className='button-icon' icon={faEye} /> more
                                    </Button>
                                </Link>

                                <h3>{blog.title}</h3>
                                <p> {blog.body}  ... </p>
                                <small className="blog-author-name">
                                    <FontAwesomeIcon title="View my Website" className='button-icon' icon={faUser} />

                                    {blog.userName}
                                </small>
                            </div>
                        </animated.div>
                    )) : <></>
                }

            </div>






        </div>
    )
}


export default Blogs
