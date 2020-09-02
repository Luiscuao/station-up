import React from 'react';
import {IPropsTank} from './interface';
import { Formik, Field, Form, ErrorMessage } from "formik";
import {types_tank} from '../../constant/options';

import {unitsToMeters} from '../../utils/units-convertert';
import * as Yup from "yup";
/* 
import {showAlertError} from '../../utils/toast';

import {createTank} from '../../api/services/tankService'; */

import Header from '../../components/Header';
import SelectSearch from '../../components/SelectSearch';
import Stepper from '../../components/Stepper';
const Tank = (props:IPropsTank) => {

    const initialValues = {
        type:"",
        price:"",
        width:"",
        heigth:"",
        actualvalue:"",
        maxHeight:"",
        units_dimension:"",
        units_max_heigth:"",
        min:"",
        max:"",
    }
    const formSchema = Yup.object().shape({
        type: Yup.string()
            .required("Campo Requerido"),
        price: Yup.number()
            .positive("El valor debe ser positivo") 
            .required("Campo Requerido"),
        width: Yup.number()
            .positive("El valor debe ser positivo") 
            .required("Campo Requerido"),
        heigth: Yup.number()
            .positive("El valor debe ser positivo") 
            .required("Campo Requerido"),
        actualvalue: Yup.number()
            .positive("El valor debe ser positivo") 
            .required("Campo Requerido"),
        maxHeight: Yup.number()
            .positive("El valor debe ser positivo") 
            .required("Campo Requerido"),
        units_dimension: Yup.string()
            .required("Campo Requerido"),
        units_max_heigth: Yup.string()
            .required("Campo Requerido"),
        min: Yup.number()
            .positive("El valor debe ser positivo") 
            .required("Campo Requerido"),
        max: Yup.number()
            .positive("El valor debe ser positivo") 
            .required("Campo Requerido"),
      });
    console.log(props); 
    const submit = (values)=>{
        const stationId = localStorage.getItem('idStation'); 
        const {type,price,min,max,actualvalue ,units_dimension,units_max_heigth} = values;
        let {width,heigth,maxHeight} = values;
        heigth = unitsToMeters(heigth,units_dimension);
        width = unitsToMeters(width,units_dimension);
        maxHeight = unitsToMeters(maxHeight,units_max_heigth);
        const newTank = {
            price,
            station:stationId,
            actualvalue,
            capacity:{
                min, 
                max
            },
            type,
            dimension:{
                heigth,
                width
            },
            maxHeight,
        }

        console.log(newTank)
    }
    return (
        <div className='container-fluid p-0'>
            <Header title='Tanque'/>
            <Stepper current={1}/>
            <Formik
                initialValues={initialValues}
                onSubmit={submit}
                validationSchema={formSchema}
            >
                <Form className='container'>
                    <div className='row'>
                            <div className="form-group col-md-6">
                                <label htmlFor="input_type-tank">Tipo de tanque</label>
                                <Field
                                        name="type"
                                        options={types_tank}
                                        component={SelectSearch}
                                        placeholder="Select a language..."
                                        isMulti={false}
                                />
                                <ErrorMessage
                                        name='type'
                                        component='small'
                                        className='field-error text-danger'
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="input_current-gal">Galones Actual</label>
                                    <div className="d-flex">
                                        <Field type="number" 
                                            placeholder="0" 
                                            name='actualvalue' 
                                            className="form-control" 
                                            id="input_current-gal"
                                            />
                                        <div className="input-group-append">
                                            <span className="input-group-text">gal</span>
                                        </div>
                                    </div>
                                    <ErrorMessage
                                        name='actualvalue'
                                        component='small'
                                        className='field-error text-danger'
                                    />
                            </div>
                            
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                                <label>Dimension</label>
                                <div className="d-flex">
                                    <div className="form-group flex-grow-1 ">
                                        <Field type="number" 
                                            placeholder="Ancho" 
                                            name='width' 
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name='width'
                                            component='small'
                                            className='field-error text-danger'
                                        />
                                    </div>
                                    <div className='form-group flex-grow-1 mr-2'>
                                        <Field type="number" 
                                            placeholder="Alto" 
                                            name='heigth' 
                                            className="form-control" 
                                        />
                                        <ErrorMessage
                                            name='heigth'
                                            component='small'
                                            className='field-error text-danger'
                                        /> 
                                    
                                    </div>
                                    <div className="form-group flex-grow-1">
                                    <Field as="select" name="units_dimension" className="form-control">
                                        <option value="">Selecciona...</option>
                                        <option value="cm">CM</option>
                                        <option value="ft">FT</option>
                                        <option value="m">M</option>
                                    </Field>
                                    <ErrorMessage
                                            name='units_dimension'
                                            component='small'
                                            className='field-error text-danger'
                                    />
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6">
                            <label htmlFor="input_min-capacity">Capacidad</label>
                            <div className="d-flex">
                                <div className="form-group flex-grow-1 mr-2">
                                        <div className="d-flex">
                                            <Field type="number" 
                                                placeholder="Minima" 
                                                name='min' 
                                                className="form-control" 
                                                id="input_min-capacity"
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">gal</span>
                                            </div>
                                            
                                        </div>
                                        <ErrorMessage
                                                name='min'
                                                component='small'
                                                className='field-error text-danger'
                                        />
                                    </div>
                                    <div className="form-group flex-grow-1">
                                        <div className="d-flex">
                                            <Field type="number" 
                                                placeholder="Maxima" 
                                                name='max' 
                                                className="form-control" 
                                                id="input_max-capacity"
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">gal</span>
                                            </div>
                                            
                                        </div>
                                        <ErrorMessage
                                                name='max'
                                                component='small'
                                                className='field-error text-danger'
                                        />
                                    </div>    
                            </div>   
                            
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group col-md-6">
                            <label htmlFor="input_price">Precio</label>
                            <Field type="number" 
                                placeholder="0" 
                                name='price' 
                                className="form-control" 
                                id="input_price"
                            />
                            <ErrorMessage
                                name='price'
                                component='small'
                                className='field-error text-danger'
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="input_price">Altura Maxima</label>
                            <div className="d-flex">
                                <div className="form-group flex-grow-1 mr-2">
                                    <Field type="number" 
                                       placeholder="0" 
                                       name='maxHeight' 
                                       className="form-control" 
                                       id="input-max-heigth"
                                    />
                                    <ErrorMessage
                                        name='maxHeight'
                                        component='small'
                                        className='field-error text-danger'
                                    />
                                </div>
                                <div className="form-group flex-grow-1">
                                    <Field as="select" name="units_max_heigth" className="form-control">
                                        <option value="">Selecciona...</option>
                                        <option value="cm">CM</option>
                                        <option value="ft">FT</option>
                                        <option value="m">M</option>
                                    </Field>
                                    <ErrorMessage
                                            name='units_max_heigth'
                                            component='small'
                                            className='field-error text-danger'
                                    />
                                    </div>
                            </div>
                        </div>    
                    </div>
                    <div className="col-12 d-flex justify-content-between mt-4">
                        <button className="btn btn-primary" type="submit">Crear</button>
                        {/* <button className="btn btn-primary" onClick={next}>Siguiente</button>
                     */}
                    </div>

                </Form>
            </Formik>
        </div>                
            
    )
}

export default Tank



/* 

<div className="form-group">
                            <label htmlFor="input-dimension">Dimension</label>
                            <div className="d-flex">
                                <input type="number" 
                                    placeholder="Ancho" 
                                    name='width' 
                                    className="form-control mr-2" 
                                    onChange={onChange}
                                    id="input-dimension"
                                />

                                <input type="number" 
                                    placeholder="Altura" 
                                    name='heigth' 
                                    className="form-control mr-4" 
                                    onChange={onChange}
                                />
                                <select name="units_dimension" 
                                        className="form-control"
                                        onChange={onChange}
                                        >
                                    <option value="">Selecciona...</option>
                                    <option value="cm">CM</option>
                                    <option value="ft">FT</option>
                                    <option value="m">M</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input_current-gal">Galones actual</label>
                            <div className="d-flex">
                            <input type="number" 
                                    placeholder="0" 
                                    name='actualvalue' 
                                    className="form-control" 
                                    id="input_current-gal"
                                    onChange={onChange}
                                />
                                <div className="input-group-append">
                                    <span className="input-group-text">gal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="form-group">
                            <label htmlFor="input_price">Precio</label>
                            <input type="number" 
                                placeholder="0" 
                                name='price' 
                                className="form-control" 
                                id="input_price"
                                onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input_min-capacity">Capacidad</label>
                            <div className="d-flex">
                                <input type="number" 
                                    placeholder="Minima" 
                                    name='min' 
                                    className="form-control" 
                                    id="input_min-capacity"
                                    onChange={onChange}
                                />
                                <div className="input-group-append mr-2">
                                    <span className="input-group-text">gal</span>
                                </div>
                                <input type="number" 
                                    placeholder="Maxima" 
                                    name='max' 
                                    className="form-control" 
                                    onChange={onChange}
                                />
                                <div className="input-group-append">
                                    <span className="input-group-text">gal</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-max-heigth">Altura maxima</label>
                            <div className="d-flex">
                                <input type="number" 
                                    placeholder="0" 
                                    name='maxHeight' 
                                    className="form-control mr-4" 
                                    id="input-max-heigth"
                                    onChange={onChange}
                                />
                                <select name="units_max_heigth" 
                                        className="form-control"
                                        onChange={onChange}
                                        >
                                    <option value="cm">Selecciona...</option>
                                    <option value="cm">CM</option>
                                    <option value="ft">FT</option>
                                    <option value="m">M</option>
                                </select>
                            </div>
                        </div>

*/