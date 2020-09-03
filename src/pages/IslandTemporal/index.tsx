import React,{useEffect} from 'react';
import {IPropsIsland} from './interface';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
/* import * as Yup from "yup"; */
/* import {factors,statePump,pumps,face ,types_tank} from '../../constant/options';
 */
/* import {islands,factors,statePump,protocolConcentrator} from '../../constant/options'; */
import {factors} from '../../constant/options';
import setAuthToken from '../../api/setAuthToken';
/* import {getIslandByStation} from '../../api/services/islandService'; */
/* import {createPump} from '../../api/services/pumpService'; */

import SelectSearch from '../../components/SelectSearch';
import Header from '../../components/Header';
import Stepper from '../../components/Stepper';
const Island = ( props: IPropsIsland ) => {

      const formSchema = Yup.object().shape({
        tank: Yup.string()
          .required("Campo Requerido"),
        degree: Yup.string()
          .required("Campo Requerido"),
        pump: Yup.string()
          .required("Campo Requerido"),
        face: Yup.string()
          .required("Campo Requerido"),
      });
    const initialStateHose = {name_hose:"",tank:"",port_reader:"",dir_ip_reader:"", degree:"",pump:"",face:""}
    /* */
   /* 
     */
    /* const [islands, setIslands] = useState(); */

    /* const [hose,setHose] = useState(initialStateHose); */
 
    /* const [pump,setPump] = useState(initialStatePump) */

    /*  const islandSelect = (option:any,name:string) =>{
            setIslands({
                ...islands,
                [name]:option.value
            });
        }

        const pumpSelect = (option:any,name:string) =>{
            setPump({
                ...pump,
                [name]:option.value
            });
        }

        const hoseSelect = (option:any,name:string) =>{
            setHose({
                ...hose,
                [name]:option.value
            });
        } */
   /*  const onChange = (event:any,state:any,setState:any) =>{
        const {value, name} = event.target
        console.log(value, name)
        setState({
            ...state,
            [name]:value
        });
    } */

    /* const submitPump = (values)=>{
        const {module,protocolConcentrator,serialport,state,partialvolumefactor,partialimportfactor,pricefactor,inventaryfactor,island} = values;
        const newPump = {
            island,
            module,
            state,
            concentrator:{
                serialport,
                protocolConcentrator
            },
            factors:{
                partialvolumefactor,partialimportfactor,pricefactor,inventaryfactor
            }
        }
        createPump(newPump); 
        console.log(newPump);
    } */ 
       

     const submitHose = (values)=>{
        const {name_hose,tank,port_reader,dir_ip_reader,degree,pump,face} = values;
        const newPump = {
            name_hose,tank,port_reader,dir_ip_reader,degree,pump,face
        }
        /* createPump(newPump); */
        console.log(newPump);
    } 

    const finished = ()=>{
        localStorage.setItem('api-key', '');
        setAuthToken('');
        props.history.push('/');
    }
    //get islands
    useEffect(() => {
        (async () => {
            /* const station = localStorage.getItem('idStation') || "";

            const islandsResponse= await getIslandByStation(station);
            const islands = islandsResponse.map((island)=>({value: island._id ,label:island.name}));
            setIslands(islands); */
            /* const tanksResponse = await getTankByStation(station);
            const tanks = tanksResponse.map((tank) =>({value: tank._id ,label:tank.name}));
            setHose({tanks}); */
          })(); 
      },[]);
    //Get Pumps
    /* useEffect(() => {
        (async () => {
            console.log("recargar surtidores")
          })(); 
      },[islands]); */
   /*  console.log(props, setHose) */
    return (
        <div className='container-fluid p-0 mb-4'>
            <Header title='Isla'/>
            <Stepper current={3}/>
            <div className='container'>
                {/* <Formik
                    initialValues={initialValues}
                    onSubmit={submitPump}
                    validationSchema={formSchema}
                >
                    <Form className='container'>
                        <h2 className='mb-4 mt-4'>Surtidor</h2>
                        <div className='row'>
                            <div className='form-group col-md-6'>
                            <label>Isla</label>
                                <Field
                                    name="island"
                                    options={islands}
                                    component={SelectSearch}
                                    placeholder="Select a language..."
                                    isMulti={false}
                                />
                                <ErrorMessage
                                    name='island'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="input-module">Modulo</label>
                                    <Field type="text" 
                                        placeholder="nombre" 
                                        name='module' 
                                        className="form-control" 
                                        id="input-module"
                                    />
                                    <ErrorMessage
                                    name='module'
                                    component='small'
                                    className='field-error text-danger'
                                    />
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-md-6'>
                                <label>Concentrador</label>
                                <div className="d-flex">
                                    <div className="form-group flex-grow-1 mr-2">
                                        <Field
                                            name="protocolConcentrator"
                                            options={protocolConcentrator}
                                            component={SelectSearch}
                                            placeholder="Protocolo"
                                            isMulti={false}
                                        />
                                        <ErrorMessage
                                            name='protocolConcentrator'
                                            component='small'
                                            className='field-error text-danger'
                                        />
                                    </div>
                                    <div className="form-group flex-grow-1">
                                        <Field      
                                            type="text" 
                                            placeholder="Puerto serial" 
                                            name='serialport' 
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name='serialport'
                                            component='small'
                                            className='field-error text-danger'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='form-group col-md-6'>
                                <label>Estado</label>
                                <Field
                                    name="state"
                                    options={statePump}
                                    component={SelectSearch}
                                    placeholder="Seleccione..."
                                    isMulti={false}
                                />
                                <ErrorMessage
                                    name='state'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                        </div>
                        <h4 className='mb-3'>Factores</h4>
                        <div className="row">
                        <div className='form-group col-md-3'>
                                <label>Volumen Parcial</label>
                                <Field
                                    name="partialvolumefactor"
                                    options={factors}
                                    component={SelectSearch}
                                    placeholder="Seleccione..."
                                    isMulti={false}
                                />
                                <ErrorMessage
                                    name='partialvolumefactor'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                            <div className='form-group col-md-3'>
                                <label>Importe Parcial</label>
                                <Field
                                    name="partialimportfactor"
                                    options={factors}
                                    component={SelectSearch}
                                    placeholder="Seleccione..."
                                    isMulti={false}
                                />
                                <ErrorMessage
                                    name='partialimportfactor'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                            <div className='form-group col-md-3'>
                                <label>Factor Precio</label>
                                <Field
                                    name="pricefactor"
                                    options={factors}
                                    component={SelectSearch}
                                    placeholder="Seleccione..."
                                    isMulti={false}
                                />
                                <ErrorMessage
                                    name='pricefactor'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                            <div className='form-group col-md-3'>
                                <label>Inventario</label>
                                <Field
                                    name="inventaryfactor"
                                    options={factors}
                                    component={SelectSearch}
                                    placeholder="Seleccione..."
                                    isMulti={false}
                                />
                                <ErrorMessage
                                    name='inventaryfactor'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-12">
                         <button type="submit" className="btn btn-primary" >Crear</button>
                        </div>
                        </div>
                    </Form>
                </Formik> */}
                <Formik
                    initialValues={initialStateHose}
                    onSubmit={submitHose}
                    validationSchema={formSchema}
                >
                    <Form className='container'>
                        <h2 className='mb-4 mt-4'>Mangueras</h2>
                        <div className='row'>
                            <div className='form-group col-md-6'>
                                <label>Tanque</label>
                                <Field
                                    name="tank"
                                    options={factors}
                                    component={SelectSearch}
                                    placeholder="Seleccione..."
                                    isMulti={false}
                                />
                                <ErrorMessage
                                    name='tank'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                            <div className='form-group col-md-6'>
                                <label>Surtidor</label>
                                <Field
                                    name="pump"
                                    options={factors}
                                    component={SelectSearch}
                                    placeholder="Seleccione..."
                                    isMulti={false}
                                />
                                <ErrorMessage
                                    name='pump'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='form-group col-md-6'>
                                <label>Cara</label>
                                <Field
                                    name="face"
                                    options={factors}
                                    component={SelectSearch}
                                    placeholder="Seleccione..."
                                    isMulti={false}
                                />
                                <ErrorMessage
                                    name='face'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                            <div className='form-group col-md-6'>
                                <label>Grado</label>
                                <Field
                                    name="degree"
                                    options={factors}
                                    component={SelectSearch}
                                    placeholder="Seleccione..."
                                    isMulti={false}
                                />
                                <ErrorMessage
                                    name='degree'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Crear</button>
                            </div>
                        </div>
                    </Form>
                </Formik> 
                <div className="row justify-content-center">
                    <div className="col-1">
                        <button type="button" className="btn btn-primary btn-lg " onClick={finished}>Finalizar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Island







/* 
<h2 className='mb-4 mt-4'>Mangueras</h2>
                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="input-name-hose">Nombre</label>
                            <div className="d-flex">
                                <input type="text" 
                                    placeholder="nombre" 
                                    name='name_hose' 
                                    className="form-control" 
                                    onChange={(event)=>onChange(event,hose,setHose)}
                                    id="input-name-hose"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                        <label htmlFor='input-port-reader'>Lector</label>
                            <div className="d-flex">
                                <div className="form-group mb-0">
                                    <input type="text" 
                                        placeholder="puerto" 
                                        name='port_reader' 
                                        className="form-control" 
                                        onChange={(event)=>onChange(event,hose,setHose)}
                                        id="input-port-reader"
                                    />
                                </div>
                                <div className="form-group flex-grow-1  mb-0">
                                        <input type="text" 
                                            placeholder="ip" 
                                            name='dir_ip_reader' 
                                            className="form-control" 
                                            onChange={(event)=>onChange(event,hose,setHose)}
                                        />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Grado</label>
                            <input type="number" 
                                placeholder="0" 
                                name='degree' 
                                className="form-control" 
                                onChange={(event)=>onChange(event,hose,setHose)}
                            />
                        </div>
                        
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="input-tank">Tanque</label>
                            {/* <SelectSearch 
                                    options={types_tank} 
                                    name="tank"  
                                    onChange={hoseSelect}
                            /> 
                            </div>
                            <div className="form-group">
                                <label htmlFor="input-pump">Surtidor</label>
                                {/* <SelectSearch 
                                        options={pumps} 
                                        name="pump"  
                                        onChange={hoseSelect}
                                /> 
                            </div>
                            <div className="form-group">
                                <label htmlFor="input-pump">Cara</label>
                                {/* <SelectSearch 
                                        options={face} 
                                        name="face"  
                                        onChange={hoseSelect}
                                /> 
                            </div>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" >Crear</button>
                        </div>
                    </div>


*/