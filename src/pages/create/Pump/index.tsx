// Dependencies
import React , {useState,useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";

//Types
import {
  factors,
  statePump,
  serialport
} from "../../../constant/options";
import { formSchema ,IPropsPump } from "./interface";
import {ITile} from '../../../components/ListTile/interface';

//Services
import {getPumpByStation,createPump,deletePump} from '../../../api/services/pumpService';
import {getIslandByStation} from '../../../api/services/islandService';
//Component
import Header from "../../../components/Header";
import Stepper from "../../../components/Stepper";
import SelectSearch from "../../../components/SelectSearch";
import ListTile from '../../../components/ListTile';

//utils
import {showAlertError,showAlertSuccess} from '../../../utils/toast';

const Pump = (props:IPropsPump) => {
  const [pumps, setPumps] = useState<ITile[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [islands, setIslands] = useState([]);
  const initialValues = {
    core: "",
    serialport: "",
    state: "",
    partialvolumefactor: "",
    partialimportfactor: "",
    pricefactor: "",
    inventaryfactor: "",
    island: "",
  };

  useEffect(()=>{

    (async ()=>{
      const id = localStorage.getItem('idStation')||'';
      const responsePump = await getPumpByStation(id);
      const responseIsland = await getIslandByStation(id); 
      const pump = responsePump.map(pump => {
        const name = 'Surtidor '+pump.name;
       return ({
          title:name,
          id:pump._id,
          subtitle:pump.island
        })
      });
      const island = responseIsland.map(island => ({value:island._id,label:island.name}));

      setPumps(pump)
      setIslands(island);
    })();
  },[refresh])

  const submitPump = (values,{resetForm}) => {
    const {
      core,
      serialport,
      state,
      partialvolumefactor,
      partialimportfactor,
      pricefactor,
      inventaryfactor,
      island,
    } = values;
    const station = localStorage.getItem('idStation');
    const newPump = {
      station,
      island,
      core,
      state:Number(state),
      concentrator: {
        serialport,
      },
      factors: {
        partialvolumefactor,
        partialimportfactor,
        pricefactor,
        inventaryfactor,
      },
    };
    createPump(newPump)
    .then(() => {
      resetForm(initialValues)
      setRefresh((refresh) =>refresh+1);
      showAlertSuccess('Creado Exitosamente');
    })
    .catch(() =>{
      showAlertError('El surtidor no pudo ser creado')
    }); 
    
  };
  const onDelete = (id:string) => {
    deletePump(id)
    .then(()=>{
      setRefresh((refresh) =>refresh-1);
      showAlertSuccess('eliminado Exitosamente');
    })
    .catch(()=>{
      showAlertError('El surtidor no pudo ser eliminado')
    })
}
  return (
    <div className="container-fluid p-0 mb-4">
      <Header />
      <Stepper current={4} />
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
              <label htmlFor="input-core">Modulo</label>
              <Field
                type="text"
                placeholder="Ip"
                name="core"
                className="form-control"
                id="input-core"
              />
              <ErrorMessage
                name="core"
                component="small"
                className="field-error text-danger"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Host</label>
              <div className="d-flex">
                {/* <div className="form-group flex-grow-1 mr-2">
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
                </div> */}
                <div className="form-group flex-grow-1">
                  <Field
                    name="serialport"
                    options={serialport}
                    component={SelectSearch}
                    placeholder="Seleccione..."
                    isMulti={false}
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
              <button onClick={()=>props.history.push('/create/island')} type="button" className="btn btn-primary">
                Anterior
              </button>
              <button type="submit" className="btn btn-primary">
                Crear
              </button>
              <button  onClick={()=>props.history.push('/create/hose')} type="button" className="btn btn-primary">
                Siguiente
              </button>
            </div>
          </div>
          <div className="row mb-4 mt-4">
            {   pumps.length?
                <ListTile list={pumps}  onDelete={onDelete}/>
                :
                <div className="col-12">
                    <p className="text-muted text-center mb-4 mt-4 ">No hay Surtidores disponibles</p>
                </div>
            }
                        
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Pump;
