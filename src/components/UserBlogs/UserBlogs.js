import { faUsers, faEye, faUser, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import useCustomHook from '../../Hooks/useCustomHook';
import './UserBlogs.css'
import { useSpring, animated } from 'react-spring'
import { Button } from '@material-ui/core';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) scale(${s})`

function UserBlogs() {
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 350, friction: 100 } }))
    let param = useParams();



    const [users, blogs] = useCustomHook('BLOGS_BY_USER', param.id);
    const blogInfo = blogs ? blogs : [];
    let usersList = users ? users : [];
    debugger;

    return (
        <div className='users-blogs'>
            <h2 className="users-blogs-title">
                <FontAwesomeIcon title="View my Website" className='button-icon' icon={faUsers} /> Users Blogs
                <Link to='/users'>
                    <Button color="primary" >
                        <FontAwesomeIcon title="View my Website" className='button-icon' icon={faArrowAltCircleLeft} /> Back
                </Button>
                </Link>
            </h2>
            <div className="user-blog-list">
                {
                    blogInfo ? blogInfo.map(blog => (

                        <animated.div key={blog.id}
                            className="user-blog-post"
                            onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                            onMouseLeave={() => set({ xys: [0, 0, 1] })}
                            style={{ transform: props.xys.interpolate(trans) }}
                        >
                            <div className="user-blog-post-details">
                                <Link to={"/blog/" + blog.id}>
                                    <Button color="primary">
                                        <FontAwesomeIcon title="View my Website" className='button-icon' icon={faEye} /> more
                                    </Button>
                                </Link>

                                <h3>{blog.title}</h3>
                                <p> {blog.body}  ... </p>
                                <small className="user-blog-author-name">
                                    <FontAwesomeIcon title="View my Website" className='button-icon' icon={faUser} />
                                    {/* {
                                        userDetails ? userDetails.map(user => (
                                            <div>({user.id} === {blog.userId}) ? {user.name} </div>
                                        ))
                                            : <></>
                                    } */}
                                    {usersList ? usersList[0]?.name : null}
                                </small>
                            </div>
                        </animated.div>
                    )) : <></>
                }
            </div>
        </div>
    )
}

export default UserBlogs
