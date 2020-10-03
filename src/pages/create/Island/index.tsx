// Dependencies
import React , {useState,useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";

//Types
import {IPropsCreateIsland,formSchema} from './interface';
import {ITile} from '../../../components/ListTile/interface';

//services
import {getIslandByStation,createIsland,deleteIslandByStation} from '../../../api/services/islandService'

//components
import Header from '../../../components/Header';
import Stepper from '../../../components/Stepper';
import ListTile from '../../../components/ListTile';

//utils
import {showAlertError,showAlertSuccess} from '../../../utils/toast';


const CreateIsland = (props: IPropsCreateIsland) => {
    const [island, setIsland] = useState<ITile[]>([]);
    const [refresh, setRefresh] = useState(0);

    const initialValues = {
        name:"",
    }

    useEffect(()=>{
        (async ()=>{
            const id = localStorage.getItem('idStation')||'';
            const response = await getIslandByStation(id);
            const island = response.map(island => ({title:`Isla ${island.name}`,id:island._id}))
            setIsland(island)
        })();
    },[refresh]);

    const submit = (values,{resetForm})=>{
        const station = localStorage.getItem('idStation');

        const newIsland = {
            station,
            name:values.name
        }
        createIsland(newIsland).then(() => {
            setRefresh((refresh) =>refresh+1);
            showAlertSuccess('Creado Exitosamente');
            resetForm(initialValues);
        }).catch(() =>{
            showAlertError('Error al crear la isla');
        });
    }
    const onDelete = (id:string) => {
        deleteIslandByStation(id).then(() =>{
            setRefresh((refresh) =>refresh-1);
            showAlertSuccess('Eliminado Exitosamente');
        }).catch(() =>{
            showAlertError('Error al Eliminar la isla');
        });
        
    }
    return (
        <>
        <Header />
        <Stepper current={3}/>
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={formSchema}
        >
            
            <Form className="container">
                
                <div className="row">
                    <div className="col-12">
                        <div className="form-group mt-5">
                            <label htmlFor="input_name-island">Nombre</label>
                            <Field 
                                type="number"
                                placeholder="Nombre de la isla." 
                                name='name' 
                                className="form-control" 
                                id="input_name-island"/>
                            <ErrorMessage
                                name='name'
                                component='small'
                                className='field-error text-danger'
                            /> 
                        </div>
                        <div className="col-12 d-flex justify-content-between mt-4 p-0">
                            <button className="btn btn-primary"  type="button" onClick={()=>props.history.push('/create/tank')}>Anterior</button>
                            <button className="btn btn-primary" type="submit">Crear</button>
                            <button className="btn btn-primary"onClick={()=>props.history.push('/create/pump')}>Siguiente</button>
                        </div>
                    </div>
                </div>
                <div className="row mb-4 mt-4">
                        {   island.length?
                            <ListTile list={island}  onDelete={onDelete}/>
                            :
                            <div className="col-12">
                                <p className="text-muted text-center mb-4 mt-4 ">No hay Islas disponibles</p>
                            </div>
                        }
                        
                </div>
            </Form>
        </Formik>
        </>
    )
}

export default CreateIsland
