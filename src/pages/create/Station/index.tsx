import React ,{useState}from 'react'
import currency from 'currency-codes';
import {withRouter} from 'react-router'
import { Formik, Field, Form, ErrorMessage } from "formik";

import {IPropsStation,formSchema} from './interface'

import {createStation} from '../../../api/services/stationService'
import setAuthToken from "../../../api/setAuthToken";

import {showAlertSuccess, showAlertError} from '../../../utils/toast'
import Header from '../../../components/Header';
import Stepper from '../../../components/Stepper';
import SelectSearch from '../../../components/SelectSearch';
import Modal from '../../../components/Modal';
const Station = (props:IPropsStation) => {
    const [modal,setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const initialValues={
        name:"",
        address:"",
        NIT:"",
        bankaccount:"",
        slogan:"",
        currency:"",
        latitude:"",
        longitude:""
    }
    

    const currencyCode =  currency.codes().map((option:string)=>{
        return {value: option, label: option}
    });
  
   const submit =  async (station:any,{resetForm}) => {
    try {
        const {name,address,NIT,bankaccount,slogan,currency,latitude,longitude}:any = station;
        const newStation = {name,address,NIT,bankaccount,slogan,currency,location:{longitude,latitude}}
        await createStation(newStation)
        showAlertSuccess('Estacion Creada');
        resetForm(initialValues)
        props.history.push('/create/device')

    } catch (error) {
        showAlertError('Error al crear la estacion');
    }
}
   const next = ()=>{
    props.history.push('/create/device')
    }
    const confirm = ()=>{
        props.history.push('/create');
        localStorage.setItem("api-key", "");
        setAuthToken("");
    }
    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
          keyEvent.preventDefault();
        }
      }
    
    return (
            <div className='container-fluid p-0'>
                <Header />
                <Stepper current={0}/>
                <Modal modal={modal} toggle={toggle} confirm={confirm} cancel={true}>
                    <strong>¿Deseas Cambiar  API-KEY ?</strong>
                </Modal>
                <Formik
                    validationSchema={formSchema}
                    initialValues={initialValues}
                    onSubmit={submit}
                > 
                    <Form onKeyDown={onKeyDown} className='container'>
                        <div className='row'>
                            <div className="form-group col-md-6">
                                    <label htmlFor="input-station-name">Nombre</label>
                                    <Field 
                                        type="text" 
                                        placeholder="Nombre" 
                                        name='name' 
                                        className="form-control" 
                                        id="input-station-name"
                                    />
                                <ErrorMessage
                                    name='name'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                            <div className="form-group col-md-6">
                                    <label htmlFor="input-station-name">Slogan</label>
                                    <Field 
                                        type="text" 
                                        placeholder="Slogan" 
                                        name='slogan' 
                                        className="form-control" 
                                        id="input-station-name"
                                    />
                                <ErrorMessage
                                    name='slogan'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-md-6">
                                    <label htmlFor="input_address">Direccion</label>
                                    <Field 
                                        type="text" 
                                        placeholder="Direccion" 
                                        name='address' 
                                        className="form-control" 
                                        id="input_address"
                                    />
                                    <ErrorMessage
                                        name='address'
                                        component='small'
                                        className='field-error text-danger'
                                    />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="input_money">Moneda</label>
                                <Field
                                    name="currency"
                                    options={currencyCode}
                                    component={SelectSearch}
                                    placeholder="Select a language..."
                                    isMulti={false}
                                />
                                <ErrorMessage
                                    name='currency'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-md-6">
                                <label htmlFor="input_nit">Nit</label>
                                <Field 
                                    type="text" 
                                    placeholder="Nit" 
                                    name='NIT' 
                                    className="form-control" 
                                    id="input_nit"
                                />
                                <ErrorMessage
                                    name='NIT'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                            <div className="form-group col-md-6">
                            <label htmlFor="input_account_bank">Cuenta</label>
                                <Field type="text" 
                                    placeholder="Numero de Cuenta" 
                                    name='bankaccount' 
                                    className="form-control" 
                                    id="input_account_bank"
                                    />
                                <ErrorMessage
                                    name='bankaccount'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-6">
                                <label htmlFor="input_nit">Ubicacion</label>
                                <div className="d-flex">
                                <div className="form-group flex-grow-1 mr-2">
                                    <Field type="text" 
                                        placeholder="Latitud" 
                                        name='latitude' 
                                        className="form-control mr-2" 
                                        id="input_latitude"
                                    />
                                    <ErrorMessage
                                        name='latitude'
                                        component='small'
                                        className='field-error text-danger'
                                    />
                                </div>
                                <div className='form-group flex-grow-1'>
                                    <Field type="text" 
                                        placeholder="Longitud" 
                                        name='longitude' 
                                        className="form-control" 
                                        id="input_longitude"
                                    />
                                    <ErrorMessage
                                        name='longitude'
                                        component='small'
                                        className='field-error text-danger'
                                    /> 
                                </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-between mt-4">
                            <button className="btn btn-primary" type="button" onClick={toggle}>Anterior</button>
                            <button className="btn btn-primary" type='submit'>Crear</button>
                            <button className="btn btn-primary" type="button"  onClick={next}>Siguiente</button>
                    </div>
                    </Form>
                </Formik>
                
        </div>
    )
}

export default withRouter(Station);