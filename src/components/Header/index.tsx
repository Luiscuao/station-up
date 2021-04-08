import React from 'react';
import Logo from '../../assets/img/logo_header.png';
const Header = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary sticky-top mb-4">
            <span className="navbar-brand ml-4">
                <img src={Logo} className="image-fluid" alt="EasyFuels"/>
            </span>
        </nav>
    )
}

export default Header
