import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {IPropsCreateIsland} from './interface';

/* import {createIsland} from '../../api/services/islandService' */
import Header from '../../components/Header';
import Stepper from 'src/components/Stepper';
const CreateIsland = (props: IPropsCreateIsland) => {
    const initialValues = {
        name:"",
    }
    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required("Campo Requerido"),
      });
    const submit = async(values)=>{
        const station = localStorage.getItem('idStation');

        const newIsland = {
            station,
            name:values.name
        }
        console.log(newIsland)
       /*  await createIsland(newIsland); */
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
                            <button className="btn btn-primary"onClick={()=>props.history.push('/island')}>Siguiente</button>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
        </>
    )
}

export default CreateIsland
