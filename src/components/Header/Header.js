import React from 'react'
import './Header.css'
// import SearchIcon from '@material-ui/icons/Search'
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
// import MenuIcon from '@material-ui/icons/Menu'
import { Link, useHistory } from 'react-router-dom'
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
function Header({ name }) {
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("userName")
        history.push('/login')
    }

    return (
        <div>
            <div className="header">
                <div className="herader__sidepanelIcon">
                    {/* <HomeIcon /> */}
                </div>
                <Link to="/home">
                    <FontAwesomeIcon title="View my Website" className='button-icon header__logo' icon={faBlog} />
                    {/* <img className="header__logo" src='https://upload.wikimedia.org/wikipedia/commons/3/31/Blogger.svg' alt='' /> */}
                </Link>
                <div className="herader__nav">
                    <Link to="/home">
                        <div className="herader__option">
                            {/* <span className="header__optionLineOne"> Home </span> */}
                            <span className="header__optionLineTwo"> <HomeIcon /> Home </span>
                        </div>
                    </Link>
                    <Link to='/users'>

                        <div className="herader__option">
                            {/* <span className="header__optionLineOne"> Users</span> */}
                            <span className="header__optionLineTwo"> <PeopleIcon /> Users</span>
                        </div>
                    </Link>
                    <Link to='/blogs'>
                        <div className="herader__option">
                            {/* <span className="header__optionLineOne"> Blogs </span> */}
                            <span className="header__optionLineTwo"> <LocalPostOfficeIcon /> Blogs </span>
                        </div>
                    </Link>
                </div>


                <div className="herader__gap">

                </div>
                <div className="herader__nav">
                    {/* <Link to={!user && '/login'}> */}
                    <Link to='/login'>
                        <div className="herader__option__username">
                            <span className="header__optionLineOne"> Hello  </span>
                            <span className="header__optionLineTwo"> {name ? name : 'Guest'} </span>
                        </div>
                    </Link>


                    <div className="header__optionBasket" >
                        <ExitToAppIcon onClick={logout} />
                        {/* <span className="header__optionLineTwo header__basketCount">0 </span> */}
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Header
