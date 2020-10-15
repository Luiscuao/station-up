import React from 'react';
import {withRouter} from 'react-router'
import { Formik, Field, Form, ErrorMessage } from "formik";

import setAuthToken from '../../api/setAuthToken'
import {IPropsEdit,formSchema} from './interface'
import {validateKey} from '../../api/services/keysService'
import {getStation} from '../../api/services/stationService'
import {showAlertError} from '../../utils/toast'

import Header from '../../components/Header'
import './styles.css';
const Edit = (props:IPropsEdit) => {
    const initialValues={
        apiKey:"",
        idStation:"",
    }
    const previous = ()=>{
      props.history.push('/');
      localStorage.setItem('idStation', '');
      localStorage.setItem('api-key', '');
    }
    const submit =  (values,{resetForm})=>{
      
        const {apiKey,idStation} = values;
        setAuthToken(apiKey);
        validateKey()
        .then(()=>{
            localStorage.setItem('api-key', apiKey);
            getStation(idStation)
            .then(()=>{
                localStorage.setItem('idStation', idStation);
                resetForm(initialValues)
                props.history.push('/edit/device');
            })
            .catch(()=>{
                showAlertError('Estacion no encontrada');
                localStorage.setItem('idStation', '');
            }) 
        }).catch(()=>{
            showAlertError('API-KEY expirada');
            setAuthToken('');
            localStorage.setItem('api-key', '');
        });
         
    }
    function onKeyDown(keyEvent) {
      if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
        keyEvent.preventDefault();
      }
    }
    return (
      <div className="container-fluid p-0">
        <Header  />
        <Formik
          validationSchema={formSchema}
          initialValues={initialValues}
          onSubmit={submit}
        >
          <Form onKeyDown={onKeyDown} className="container key-form__container">
            <h3 className="text-center mb-4">Modificacion de estaciones</h3>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="input_api-key">API-KEY</label>
                  <Field
                    type="text"
                    placeholder="api-key"
                    name="apiKey"
                    className="form-control"
                    id="input_api-key"
                  />
                  <ErrorMessage
                    name="apiKey"
                    component="small"
                    className="field-error text-danger"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="input_id-station">Id Estacion</label>
                  <Field
                    type="text"
                    placeholder="Id de la estacion"
                    name="idStation"
                    className="form-control"
                    id="input_id-station"
                  />
                  <ErrorMessage
                        name='idStation'
                        component='small'
                        className='field-error text-danger'
                    />
                </div>
              </div>
            </div>
            <div className="row mt-4 d-flex justify-content-between">
              <div className="col-1">
                <button type='submit' className="btn btn-primary" onClick={previous}>
                  Anterior
                </button>
              </div>
              <div className="col-1">
                <button
                  type='submit'
                  className="btn btn-primary"
                >
                  Enviar
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    );
}

export default withRouter(Edit);
