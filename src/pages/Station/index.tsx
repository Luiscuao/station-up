import React from 'react'
import currency from 'currency-codes';
import {withRouter} from 'react-router'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {IPropsStation} from './interface'

/* import {createStation} from '../../api/services/stationService' */

import {showAlertSuccess, showAlertError} from '../../utils/toast'
import Header from '../../components/Header';
import Stepper from '../../components/Stepper';

import SelectSearch from '../../components/SelectSearch';
const Station = (props:IPropsStation) => {
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
    const formSchema = Yup.object().shape({
        name: Yup.string()
          .required("Campo Requerido")
          .max(255, `Máximo 255 caracteres`)
          .min(2, `Mínimo 5 caracteres`),
        address: Yup.string()
          .min(5, `Mínimo 5 caracteres`)
          .max(25, `Máximo 25 caracteres`)
          .required("Campo Requerido"),
        NIT: Yup.string()
          .required("Campo Requerido")
          .min(9,`Mínimo 9 caracteres`),
        bankaccount: Yup.string()
          .required("Campo Requerido")
          .min(10, `Mínimo 10 caracteres`),
        slogan: Yup.string()
          .required("Campo Requerido")
          .min(5, `Mínimo 5 caracteres`),
        currency: Yup.string()
          .required("Campo Requerido"),
        latitude: Yup.string()
        .required("Campo Requerido")
        .matches(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:.[0-9]{1,6})?))$/,'Latitud no valida'),
        longitude: Yup.string()
        .required("Campo Requerido")
        .matches(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,'Longitud no valida'),
      });

    const currencyCode =  currency.codes().map((option:string)=>{
        return {value: option, label: option}
    });
  
   const submit =  async (station:any) => {
    try {
        const {name,address,NIT,bankaccount,slogan,currency,latitude,longitude}:any = station;
        const newStation = {name,address,NIT,bankaccount,slogan,currency,location:{longitude,latitude}}
        console.log(newStation);
        /* await createStation(newStation) */
        showAlertSuccess('Estacion Creada'); 

    } catch (error) {
        showAlertError(error.message);
    }
}
   const next = ()=>{
    props.history.push('/tank')
    } 
    return (
            <div className='container-fluid p-0'>
                <Header title='Estacion'/>
                <Stepper current={0}/>
                <Formik
                    validationSchema={formSchema}
                    initialValues={initialValues}
                    onSubmit={submit}
                >
                    <Form className='container'>
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
                                <Field type="number" 
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
                            <button className="btn btn-primary" type='submit'>Crear</button>
                            <button className="btn btn-primary" onClick={next}>Siguiente</button>
                    </div>
                    </Form>
                </Formik>
                
        </div>
    )
}

export default withRouter(Station);







/* <div className=''>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="input-station-name">Nombre</label>
                            <input type="text" 
                                placeholder="Nombre" 
                                name='name' 
                                className="form-control" 
                                id="input-station-name"
                                onChange={onChange}
                                required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="input_address">Direccion</label>
                            <input type="text" 
                                placeholder="Direccion" 
                                name='address' 
                                className="form-control" 
                                id="input_address"
                                onChange={onChange}
                                required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="input_nit">Nit</label>
                            <input type="text" 
                                placeholder="Nit" 
                                name='NIT' 
                                className="form-control" 
                                id="input_nit"
                                onChange={onChange}
                                required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="input_account_bank">Cuenta</label>
                            <input type="number" 
                                placeholder="Numero de Cuenta" 
                                name='bankaccount' 
                                className="form-control" 
                                id="input_account_bank"
                                onChange={onChange}
                                required
                                />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="input_slogan">Slogan</label>
                            <input type="text" 
                                placeholder="Slogan" 
                                name='slogan' 
                                className="form-control" 
                                id="input_slogan"
                                onChange={onChange}
                                required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="input_money">Moneda</label>
                            <SelectSearch options={currencyCode} name="currency"  onChange={onchangeSelect}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input_api-key">Cordenadas</label>
                            <div className="d-flex">
                            <input type="text" 
                                placeholder="Latitud" 
                                name='latitude' 
                                className="form-control mr-2" 
                                id="input_latitude"
                                onChange={onChange}
                                required
                                />
                            <input type="text" 
                                placeholder="Longitud" 
                                name='longitude' 
                                className="form-control" 
                                id="input_longitude"
                                onChange={onChange}
                                required
                                />
                            </div>
                        </div>
                    </div>
                    
                    
                </div>

        </div> */