import React from 'react'
import {IPropsHome} from './interface'
import Logo from '../../assets/img/logo_home.png';
const Home = (props: IPropsHome) => {
    return (
        <div className="bg-primary vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="mb-4">
                <img src={Logo} alt="" />
            </div>
            <div className="d-flex justify-content-around mt-4" style={{"width": "35vw"}}>
            <button 
                className="btn btn-warning text-primary font-weight-bold w-25" 
                style={{"maxWidth": "120px"}} 
                onClick={()=>{props.history.push('/create')}} 
            >Crear   
            </button>
            <button 
                className="btn btn-warning text-primary font-weight-bold w-25" 
                style={{"maxWidth": "120px"}}
                onClick={()=>{props.history.push('/edit')}}
            >Editar
            </button>
            </div>
        </div>
    )
}

export default Home
