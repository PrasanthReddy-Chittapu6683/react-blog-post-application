import React, { useEffect, useState } from 'react'
import { withRouter, RouteComponentProps, useParams, useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faArrowAltCircleLeft, faUser, faPhone, faAt, faCode, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './BlogDetails.css'
import { Avatar, Button, Paper } from '@material-ui/core';
import HTTPServices from '../../Services/HTTPServices';
import useCustomHook from '../../Hooks/useCustomHook';
function BlogDetails({ name }) {
    let param = useParams();


    const [userDetails, setUserDetails] = useState([])
    const history = useHistory();

    const backToBlogs = (e) => {
        e.preventDefault();
        history.push('/blogs')
    }


    const [[], blogs] = useCustomHook('blogsbyid', param.id);

    const blogInfo = blogs ? blogs[0] : null;

    useEffect(() => {
        if (name === '') {
            history.push('/login')
        } else {

            getUserList(blogInfo?.userId);
        }

    }, [blogInfo?.userId])
    const getUserList = async (id) => {
        HTTPServices.getUserById(id).then(response => {
            setUserDetails(response.data[0])
        }).catch(error => {
            console.log(error)
        })
    }



    return (

        <div className='blog-details'>
            <h2 className="blog-title">
                <FontAwesomeIcon title="View my Website" className='button-icon' icon={faBlog} /> Blog Details
            </h2>
            <Button color="primary" onClick={backToBlogs}>
                <FontAwesomeIcon title="View my Website" className='button-icon' icon={faArrowAltCircleLeft} /> Back
                    </Button>
            <div className="blog-detail">



                <Paper elevation={3} >

                    <h2>
                        {blogInfo?.title}
                    </h2>
                    <p>
                        {blogInfo?.body}
                    </p>
                    <div className='blog-user-details'>
                        <div className="blog-author-image">
                            <Avatar src={`https://avatars.dicebear.com/api/human/${userDetails?.id}_${userDetails?.username}.svg`} />
                        </div>
                        <small className="blog-author-name">
                            <FontAwesomeIcon title="View my Website" className='button-icon' icon={faUser} /> {userDetails?.name}<br />
                            <FontAwesomeIcon title="View my Website" className='button-icon' icon={faAt} /> <span className="email">{userDetails?.email}<br /></span>
                            <FontAwesomeIcon title="View my Website" className='button-icon' icon={faCode} /> {userDetails?.website}<br />
                            <FontAwesomeIcon title="View my Website" className='button-icon' icon={faPhone} /> {userDetails?.phone}<br />
                            <FontAwesomeIcon title="View my Website" className='button-icon' icon={faMapMarkerAlt} /> {userDetails?.address?.suite}, {userDetails?.address?.street}<br />
                            <span className="address">{userDetails?.address?.city} -
                                {userDetails?.address?.zipcode}
                            </span>
                        </small>


                    </div>

                </Paper>

            </div>
        </div >
    )
}

export default BlogDetails
