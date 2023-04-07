import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FiSettings } from 'react-icons/fi'
import { GoHome } from 'react-icons/go'
import './nav.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Nav() {
    const user = useSelector(state => state.UserState.User.accessToken)

    return (
        <div className='container nav'>
            <Link to='/'><GoHome size={30}/></Link>
            <div className="nav-links">
                <Link to='/login'><FaUserCircle size={20}/></Link>
                {user && <Link to='/panel'><FiSettings size={20} /></Link>}
            </div>
        </div>
    )
}

export default Nav