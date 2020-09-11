// Dependencies
import React , {useState,useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";

//Types
import {types_tank} from '../../../constant/options';
import {IPropsTank,formSchema} from './interface';
import {ITile} from '../../../components/ListTile/interface';

//Components
import Header from '../../../components/Header';
import SelectSearch from '../../../components/SelectSearch';
import Stepper from '../../../components/Stepper';
import ListTile from '../../../components/ListTile';

//utils

import {showAlertError,showAlertSuccess} from '../../../utils/toast';

import {unitsToMeters} from '../../../utils/units-convertert';
//Services
import {getTankByStation,deleteTankByStation,createTank} from '../../../api/services/tankService'; 


const Tank = (props:IPropsTank) => {
    console.log(props)
    const [tanks, setTanks] = useState<ITile[]>([]);
    const [refresh, setRefresh] = useState(0);
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

    useEffect(()=>{

        (async ()=>{
            const id = localStorage.getItem('idStation')||'';
            const response = await getTankByStation(id);
            const ids =response.map((tank)=>{
                switch (tank.family) {
                    case 1:
                      return `EZ_FUEL_CRR_ID=${tank._id}`
                    case 3:
                      return `EZ_FUEL_EXTRA_ID=${tank._id}`;
                    case 5:
                      return  `EZ_FUEL_ACPM_ID=${tank._id}`;
                    default:
                      return "";
                  }
            })
            console.log(ids)
            const tanks = response.map(t => ({title:t.name,id:t._id}))
            setTanks(tanks);
        })();
    },[refresh])
    const getNameTank = (idTank:number)=>{
        switch (idTank) {
          case 1:
            return "CORRIENTE";
          case 3:
            return "EXTRA";
          case 5:
            return "ACPM";
          default:
            return "";
        }
    }
    const submit = (values,{resetForm})=>{
        const stationId = localStorage.getItem('idStation'); 
        const {price,min,max,actualvalue ,units_dimension,units_max_heigth,type} = values;
        const name = getNameTank(type);
        let {width,heigth,maxHeight} = values;
        heigth = unitsToMeters(heigth,units_dimension);
        width = unitsToMeters(width,units_dimension);
        maxHeight = unitsToMeters(maxHeight,units_max_heigth);
        const newTank = {
            name,
            price,
            family:type,
            station:stationId,
            actualvalue,
            capacity:{
                min, 
                max
            },
            dimension:{
                heigth,
                width
            },
            maxHeight,
        }
        
         createTank(newTank).then(()=>{
            setRefresh((refresh) =>refresh+1);
            resetForm(initialValues);
            showAlertSuccess('Creado Exitosamente');
        })
        .catch(()=>{
            showAlertError('Error en la creacion de Tanques');
        });
        
        
    }

    const onDelete =  (id:string) => {
        deleteTankByStation(id).then(()=>{
            setRefresh((refresh) =>refresh-1);
            showAlertSuccess('Eliminado Exitosamente');
        }).catch(() =>{
            showAlertError('Error en la eliminacion de Tanques');
        });
        
    }
    const previus = ()=>{
        props.history.push('/create/device')
    }
    const next = ()=>{
        props.history.push('/create/island')
    }

    return (
        <div className='container-fluid p-0'>
            <Header />
            <Stepper current={2}/>
            <Formik
                initialValues={initialValues}
                onSubmit={submit}
                validationSchema={formSchema}
                validateOnChange={false}
                validateOnBlur={false}
            >
                { 
                    (props)=>{
                        return (
                            <Form className='container'>
                    <h1 className='mb-4 mt-4'>Tanques</h1>
                    <div className='row'>
                            <div className="form-group col-md-6">
                                <label htmlFor="input_type-tank">Tipo de tanque</label>
                                <Field  type="number" 
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
                                            validate={(value) => {
                                                let error;
                                                if(value<props.values.min && props.values.min.length!==0)
                                                    error = `El galon actual es menor a la capacidad minima`

                                                if(value>props.values.max && props.values.max.length!==0)
                                                    error = `El galon actual es mayor a la capacidad maxima`

                                                return error;
                                            }}
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
                                        <option value="">Seleccione...</option>
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
                                                validate={(value) => {
                                                    let error;
                                                    if(value>props.values.max && props.values.max.length!==0)
                                                        error = `El valor minimo  es incorreto`
                                                    return error;
                                                }}
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
                                                validate={(value) => {
                                                    let error;
                                                    if(props.values.min>value && props.values.min.length!==0)
                                                        error = `El valor maximo  es incorreto`
                                                    return error;
                                                }}
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
                                       validate={(value) => {
                                        let error;
                                        if(value>props.values.heigth && props.values.heigth.length!==0)
                                            error = `La altura maxima es incorreta`
                                        return error;
                                    }}
                                    />
                                    <ErrorMessage
                                        name='maxHeight'
                                        component='small'
                                        className='field-error text-danger'
                                    />
                                </div>
                                <div className="form-group flex-grow-1">
                                    <Field as="select" name="units_max_heigth" className="form-control">
                                        <option value="">Seleccione...</option>
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
                    <div className="col-12 d-flex justify-content-between mt-4 mb-4">
                        <button className="btn btn-primary" type="button" onClick={previus}>Anterior</button>
                        <button className="btn btn-primary" type="submit">Crear</button>
                        <button className="btn btn-primary" type="button" onClick={next}>Siguiente</button>
                    </div>

                    <div className="row mb-4 mt-4">
                        {   tanks.length?
                            <ListTile list={tanks}  onDelete={onDelete}/>
                            :
                            <div className="col-12">
                                <p className="text-muted text-center mb-4 mt-4 ">No hay Tanques disponibles</p>
                            </div>
                        }
                         
                    </div>

                   

                </Form>
                        )
                    }
                }
            </Formik>
        </div>                
            
    )
}

export default Tank;