import React from 'react';
import {IPropsHeader} from './interface';
const Header = (props:IPropsHeader) => {
    console.log(props)
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary sticky-top mb-4">
            <span className="navbar-brand ml-4">
                <img src="https://eazyfuels.s3.amazonaws.com/Assets/75x75.png" className="image-fluid" alt="EasyFuels"/>
            </span>
        </nav>
    )
}

export default Header
