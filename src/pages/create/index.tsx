import React from 'react';
import {withRouter} from 'react-router';
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from 'axios';


import setAuthToken from '../../api/setAuthToken'
import {IPropsCreate,formSchema} from './interface'
import {validateKey} from '../../api/services/keysService'
import {showAlertError} from '../../utils/toast'

import Header from '../../components/Header'
import './styles.css';
const Create = (props:IPropsCreate) => {
    const initialValues={
        apiKey:"",
        ip:""
    }
    
    const submit = async (values)=>{
        try {
            const {apiKey,ip} = values
            const host ="http://"+ip;
            axios.defaults.baseURL = host;
            localStorage.setItem('ip', host);
            setAuthToken(apiKey)
            await validateKey();
            localStorage.setItem('api-key', apiKey);
            props.history.push('/create/station'); 
        } catch (error) {
            const {status} = error.response;
            if(status===404){
                showAlertError('IP INVALIDA')
                setAuthToken('')
                localStorage.setItem('api-key', '');
            }else if(status===403){
                showAlertError('API-KEY expirada')
                setAuthToken('')
                localStorage.setItem('api-key', '');
            }else{
                showAlertError('Error de servidor')
                setAuthToken('')
                localStorage.setItem('api-key', '');
            }
           
        }
        
    }
    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
          keyEvent.preventDefault();
        }
      }
    return (
        <div className="container-fluid p-0">
            <Header/>
            <Formik 
            validationSchema={formSchema}
            initialValues={initialValues}
            onSubmit={submit}>
                <Form onKeyDown={onKeyDown} className="container key-form__container">
                <h3 className="text-center mb-4">Configuracion de estaciones</h3>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                                <label htmlFor="input_api-key">API-KEY</label>
                                <Field type="text" 
                                    placeholder="api-key" 
                                    name='apiKey' 
                                    className="form-control" 
                                    id="input_api-key"/>
                                <ErrorMessage
                                    name="apiKey"
                                    component="small"
                                    className="field-error text-danger"
                                />
                        </div>
                        </div>
                    
                    <div className="col-6">
                        <div className="form-group">
                                <label htmlFor="input_ip">Ip del servidor</label>
                                <Field type="text" 
                                    placeholder="" 
                                    name='ip' 
                                    className="form-control" 
                                    id="input_ip"/>
                                <ErrorMessage
                                    name="ip"
                                    component="small"
                                    className="field-error text-danger"
                                />
                        </div>
                    </div>
                    </div>
                <div className="row mt-4 d-flex justify-content-between">
                    <div className="col-1">
                        <button type="submit" className="btn btn-primary" onClick={()=>{props.history.push('/')}}>Anterior</button>
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </div>
                </div>

            </Form>
            </Formik>
        </div>
    )
}

export default withRouter(Create);
