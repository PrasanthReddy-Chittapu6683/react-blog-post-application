import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import useCustomHook from '../../Hooks/useCustomHook';
import './Login.css'
function Login() {
    const history = useHistory();
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [LoginError, setLoginError] = useState('')
    const [userDetails, setuserDetails] = useState([])
    const validateEmail = () => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(Email)) {
            return true
        }
        alert('Enter valid E-mail ID')
        return false;

    }
    const SingInClick = (e) => {
        e.preventDefault();

        if (validateEmail()) {



            if (Email === Password) {

                let validUser = userDetails.filter(x => x.email === Email);
                if (validUser && validUser.length === 0) {
                    alert('User is not valid')
                } else {

                    localStorage.removeItem("user")
                    localStorage.removeItem("userName")


                    localStorage.setItem('user', Email);
                    localStorage.setItem('userName', validUser[0]?.name);
                    history.push('/home')

                }
            } else {
                alert('Enter valid Email & Password')
            }

        }

    }
    const [usersData] = useCustomHook('users');


    useEffect(() => {

        setuserDetails(usersData)

        // HTTPServices.getUser().then(response => {
        //     setUsersList(response.data)
        // }).catch(error => {
        //     console.log(error)
        // })
        return () => {
            // cleanup
        }
    }, [usersData])
    return (
        <div className="login">
            <Link to='/'>
                {/* <img className="login__image" alt='Logo' src='https://upload.wikimedia.org/wikipedia/commons/3/31/Blogger.svg' /> */}
                <FontAwesomeIcon title="View my Website" className='button-icon login__image' icon={faBlog} />
            </Link>
            <div className="login__container">
                {/* <div>
                    {LoginError.message ?
                        <h4 className="login__errornotify">{LoginError.message} <span className="login__closeError" onClick={e => setLoginError('')}>X</span></h4>


                        : null}

                </div> */}
                <h1>Sign In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="email" value={Email} onChange={e => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type="password" value={Password} onChange={e => setPassword(e.target.value)} />
                    <button className="login__signInButton" onClick={SingInClick} >Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login
