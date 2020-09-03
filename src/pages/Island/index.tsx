// Dependencies
import React , {useState,useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";

//Types
import {IPropsCreateIsland,formSchema} from './interface';
import {ITile} from '../../components/ListTile/interface';

//services
/* import {createIsland} from '../../api/services/islandService' */

//components
import Header from '../../components/Header';
import Stepper from 'src/components/Stepper';
import ListTile from 'src/components/ListTile';



const CreateIsland = (props: IPropsCreateIsland) => {
    const [island, setIsland] = useState<ITile[]>([]);
    const [refresh, setRefresh] = useState(0);
    const initialValues = {
        name:"",
    }

    useEffect(()=>{

        (async ()=>{
            setIsland([{title:'Isla 1'},{title:'Isla 2'},{title:'Isla 3'}])
            console.log('refresh render')
        })();
    },[refresh])
    const submit = async(values)=>{
        const station = localStorage.getItem('idStation');

        const newIsland = {
            station,
            name:values.name
        }
        console.log(newIsland)
       /*  await createIsland(newIsland); */
    }
    const onDelete = () => {
        setRefresh((refresh) =>refresh-1);
    }
    return (
        <>
        <Header title="Island"/>
        <Stepper current={2}/>
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
                                type="text"
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
                            <button className="btn btn-primary"  type="button" onClick={()=>props.history.push('/tank')}>Anterior</button>
                            <button className="btn btn-primary" type="submit">Crear</button>
                            <button className="btn btn-primary"onClick={()=>props.history.push('/pump')}>Siguiente</button>
                        </div>
                    </div>
                </div>
                <div className="row mb-4 mt-4">
                        {   island.length?
                            <ListTile list={island}  onDelete={onDelete}/>
                            :
                            <div className="col-12">
                                <p className="text-muted text-center mb-4 mt-4 ">No hay Tanques disponibles</p>
                            </div>
                        }
                        
                    </div>
            </Form>
        </Formik>
        </>
    )
}

export default CreateIsland
