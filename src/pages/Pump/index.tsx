// Dependencies
import React , {useState,useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";

//Types
import {
  islands,
  factors,
  statePump,
  protocolConcentrator,
} from "../../constant/options";
import { formSchema ,IPropsPump } from "./interface";
import {ITile} from '../../components/ListTile/interface';

//Services
/* import {createPump} from '../../api/services/pumpService'; */

//Component
import Header from "../../components/Header";
import Stepper from "../../components/Stepper";
import SelectSearch from "../../components/SelectSearch";
import ListTile from 'src/components/ListTile';

const Pump = (props:IPropsPump) => {
  const [pumps, setPumps] = useState<ITile[]>([]);
  const [refresh, setRefresh] = useState(0);
  const initialValues = {
    module: "",
    serialport: "",
    protocolConcentrator: "",
    state: "",
    partialvolumefactor: "",
    partialimportfactor: "",
    pricefactor: "",
    inventaryfactor: "",
    island: "",
  };

  useEffect(()=>{

    (async ()=>{
      setPumps([{title:'Surtidor 1'},{title:'Surtidor 2'},{title:'Surtidor 3'},{title:'Surtidor 4'} ])
        console.log('refresh render')
    })();
  },[refresh])

  const submitPump = (values) => {
    const {
      module,
      protocolConcentrator,
      serialport,
      state,
      partialvolumefactor,
      partialimportfactor,
      pricefactor,
      inventaryfactor,
      island,
    } = values;
    const newPump = {
      island,
      module,
      state,
      concentrator: {
        serialport,
        protocolConcentrator,
      },
      factors: {
        partialvolumefactor,
        partialimportfactor,
        pricefactor,
        inventaryfactor,
      },
    };
    /* createPump(newPump);  */
    console.log(newPump);
    setRefresh((refresh) =>refresh+1);
  };
  const onDelete = () => {
    setRefresh((refresh) =>refresh-1);
}
  return (
    <div className="container-fluid p-0 mb-4">
      <Header title="Isla" />
      <Stepper current={3} />
      <Formik
        initialValues={initialValues}
        onSubmit={submitPump}
        validationSchema={formSchema}
      >
        <Form className="container">
          <div className="row">
            <div className="form-group col-md-6">
              <label>Isla</label>
              <Field
                name="island"
                options={islands}
                component={SelectSearch}
                placeholder="Select a language..."
                isMulti={false}
              />
              <ErrorMessage
                name="island"
                component="small"
                className="field-error text-danger"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="input-module">Modulo</label>
              <Field
                type="text"
                placeholder="nombre"
                name="module"
                className="form-control"
                id="input-module"
              />
              <ErrorMessage
                name="module"
                component="small"
                className="field-error text-danger"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
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
                    name="protocolConcentrator"
                    component="small"
                    className="field-error text-danger"
                  />
                </div>
                <div className="form-group flex-grow-1">
                  <Field
                    type="text"
                    placeholder="Puerto serial"
                    name="serialport"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="serialport"
                    component="small"
                    className="field-error text-danger"
                  />
                </div>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label>Estado</label>
              <Field
                name="state"
                options={statePump}
                component={SelectSearch}
                placeholder="Seleccione..."
                isMulti={false}
              />
              <ErrorMessage
                name="state"
                component="small"
                className="field-error text-danger"
              />
            </div>
          </div>
          <h4 className="mb-3">Factores</h4>
          <div className="row">
            <div className="form-group col-md-3">
              <label>Volumen Parcial</label>
              <Field
                name="partialvolumefactor"
                options={factors}
                component={SelectSearch}
                placeholder="Seleccione..."
                isMulti={false}
              />
              <ErrorMessage
                name="partialvolumefactor"
                component="small"
                className="field-error text-danger"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Importe Parcial</label>
              <Field
                name="partialimportfactor"
                options={factors}
                component={SelectSearch}
                placeholder="Seleccione..."
                isMulti={false}
              />
              <ErrorMessage
                name="partialimportfactor"
                component="small"
                className="field-error text-danger"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Factor Precio</label>
              <Field
                name="pricefactor"
                options={factors}
                component={SelectSearch}
                placeholder="Seleccione..."
                isMulti={false}
              />
              <ErrorMessage
                name="pricefactor"
                component="small"
                className="field-error text-danger"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Inventario</label>
              <Field
                name="inventaryfactor"
                options={factors}
                component={SelectSearch}
                placeholder="Seleccione..."
                isMulti={false}
              />
              <ErrorMessage
                name="inventaryfactor"
                component="small"
                className="field-error text-danger"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-between mt-4">
              <button onClick={()=>props.history.push('/island')} type="button" className="btn btn-primary">
                Anterior
              </button>
              <button type="submit" className="btn btn-primary">
                Crear
              </button>
              <button  onClick={()=>props.history.push('/hose')} type="button" className="btn btn-primary">
                Siguiente
              </button>
            </div>
          </div>
          <div className="row mb-4 mt-4">
            {   pumps.length?
                <ListTile list={pumps}  onDelete={onDelete}/>
                :
                <div className="col-12">
                    <p className="text-muted text-center mb-4 mt-4 ">No hay Tanques disponibles</p>
                </div>
            }
                        
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Pump;
