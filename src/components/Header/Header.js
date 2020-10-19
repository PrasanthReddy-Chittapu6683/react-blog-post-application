import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link, useHistory } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
function Header() {
    const history = useHistory();
    const [loggedUser, setloggedUser] = useState('')

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("userName")
        history.push('/login')
    }
    useEffect(() => {
        if (localStorage.length == 0) {
            history.push('/login')
        } else {
            setloggedUser(localStorage.getItem('userName'))
        }
        return () => {

        }
    }, [])

    return (
        <div>
            <div className="header">
                <div className="herader__sidepanelIcon">

                </div>
                <Link to="/home">
                    <FontAwesomeIcon title="View my Website" className='button-icon header__logo' icon={faBlog} />

                </Link>
                <div className="herader__nav">
                    <Link to="/home">
                        <div className="herader__option">

                            <span className="header__optionLineTwo"> <HomeIcon /> Home </span>
                        </div>
                    </Link>
                    <Link to='/users'>

                        <div className="herader__option">

                            <span className="header__optionLineTwo"> <PeopleIcon /> Users</span>
                        </div>
                    </Link>
                    <Link to='/blogs'>
                        <div className="herader__option">

                            <span className="header__optionLineTwo"> <LocalPostOfficeIcon /> Blogs </span>
                        </div>
                    </Link>
                </div>


                <div className="herader__gap">

                </div>
                <div className="herader__nav">

                    <Link to='/login'>
                        <div className="herader__option__username">
                            <span className="header__optionLineOne"> Hello  </span>
                            <span className="header__optionLineTwo"> {loggedUser ? loggedUser : 'Guest'} </span>
                        </div>
                    </Link>


                    <div className="header__optionBasket" >
                        <ExitToAppIcon onClick={logout} />

                    </div>


                </div>

            </div>
        </div>
    )
}

export default Header
