// Dependencies
import React ,{useState,useEffect} from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import {IPropsDevice,formSchema} from './interface';
//Types
import {ITile} from '../../../components/ListTile/interface';

//Components
import Header from '../../../components/Header';
import ListTile from '../../../components/ListTile';

//services

import {getDeviceByStation,createDevice,deleteDevice} from '../../../api/services/deviceService'

//utils
import {showAlertError,showAlertSuccess} from '../../../utils/toast';

const Device = (props: IPropsDevice) => {
    const initialValues={
        androidModel:"",
        androidBrand:"",
        androidDevice:"",
        androidId:"",
    }

    const [island, setIsland] = useState<ITile[]>([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(()=>{
        (async ()=>{
            const id = localStorage.getItem('idStation')||'';
            const response = await getDeviceByStation(id);
            const device = response.map(device => {
                const name = `${device.androidDevice}`
                return ({
                    title:name,
                    id:device._id,
                    subtitle:`Id: ${device.androidId}`
                })
            })
            setIsland(device)
        })();
    },[refresh]);

    const submit = (values) =>{
        const {androidModel,androidBrand,androidDevice,androidId} = values
        const station = localStorage.getItem('idStation');
        const newDevice = {
            station,
            androidModel,
            androidBrand,
            androidDevice,
            androidId 
        }
        
        createDevice(newDevice).then(() =>{
            showAlertSuccess('Creado Exitosamente')
            setRefresh((refresh) =>refresh+1);
        }).catch(() =>{
            showAlertError('error al crear dispositivo')
        })
       
    }

    const onDelete = (id:string) => {
        deleteDevice(id).then(() =>{
            setRefresh((refresh) =>refresh-1);
            showAlertSuccess('Eliminado exitosamente')
        })
        .catch(() =>{
            showAlertError('error al eliminar dispositivo')
        })   
    }

    return (
      <div className="container-fluid p-0">
        <Header />

        <Formik
                    validationSchema={formSchema}
                    initialValues={initialValues}
                    onSubmit={submit}
                >
                    <Form className='container'>
                        <h1 className="mt-4 mb-4">Dispositivos</h1>
                        <div className='row'>
                            <div className="form-group col-md-6">
                                    <label htmlFor="input-android-model">Modelo</label>
                                    <Field 
                                        type="text" 
                                        placeholder="" 
                                        name='androidModel' 
                                        className="form-control" 
                                        id="input-android-model"
                                    />
                                <ErrorMessage
                                    name='androidModel'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                            <div className="form-group col-md-6">
                                    <label htmlFor="input-android-brand">Marca</label>
                                    <Field 
                                        type="text" 
                                        placeholder="" 
                                        name='androidBrand' 
                                        className="form-control" 
                                        id="input-android-brand"
                                    />
                                <ErrorMessage
                                    name='androidBrand'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-md-6">
                                    <label htmlFor="input_android_device">Android Device</label>
                                    <Field 
                                        type="text" 
                                        placeholder="" 
                                        name='androidDevice' 
                                        className="form-control" 
                                        id="input_android_device"
                                    />
                                <ErrorMessage
                                    name='androidDevice'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                            <div className="form-group col-md-6">
                                    <label htmlFor="input-android-id">Android ID</label>
                                    <Field 
                                        type="text" 
                                        placeholder="" 
                                        name='androidId' 
                                        className="form-control" 
                                        id="input-android-id"
                                    />
                                <ErrorMessage
                                    name='androidId'
                                    component='small'
                                    className='field-error text-danger'
                                />
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-between mt-4">
                            <button className="btn btn-primary" onClick={()=>props.history.push('/edit')}>Atras</button>
                            <button className="btn btn-primary" type='submit'>Crear</button>
                        </div>
                        <div className="row mb-4 mt-4">
                        {   island.length?
                            <ListTile list={island}  onDelete={onDelete}/>
                            :
                            <div className="col-12">
                                <p className="text-muted text-center mb-4 mt-4 ">No hay Dispositivos disponibles</p>
                            </div>
                        }
                        
                </div>
                    </Form>
                </Formik>
      </div>
    );
}

export default Device
