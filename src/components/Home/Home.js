import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBlog } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';



function Home({ name }) {
    // const classes = useStyles();

    // const [loggedUser, setloggedUser] = useState('')
    const history = useHistory();
    const redirectToBlog = (e) => {
        e.preventDefault();
        history.push('/blogs')
        // type === 'users' ? history.push('/users') : history.push('/blogs')
    }
    const redirectToUsers = (e) => {
        e.preventDefault();
        history.push('/users')
        // type === 'users' ? history.push('/users') : history.push('/blogs')
    }

    useEffect(() => {
        // setloggedUser(localStorage.length > 0 ? localStorage.getItem('userName') : '');
        if (name === '') {
            history.push('/login')
        }
        return () => {
        }
    }, [])



    return (
        <div className="home">
            <div className="home__container">
                <h3>Hello User, {name}</h3>
                <div className="home__row">

                    <Button variant="contained" size="large" color="primary" onClick={redirectToUsers}>
                        <FontAwesomeIcon title="View my Website" className='button-icon' icon={faUsers} /> Users
                    </Button>
                    <Button variant="contained" size="large" color="primary" onClick={redirectToBlog}>
                        <FontAwesomeIcon title="View my Website" className='button-icon' icon={faBlog} /> Blogs
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home
