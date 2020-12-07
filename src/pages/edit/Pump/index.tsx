// Dependencies
import React , {useState,useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";

//Types
import {
  factors,
  statePump,
  protocol,
} from "../../../constant/options";
import { formSchema, IPropsPump } from "./interface";
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
import {stepsEdit} from "../../../constant/steps";

const Pump = (props:IPropsPump) => {
  const [pumps, setPumps] = useState<ITile[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [islands, setIslands] = useState([]);
  const initialValues = {
    name:"",
    island: "",
    state: "",
    core: "",
    protocol:"",
    hostName:"",
    serialPort:"",
    faceA:"",
    faceB:"",
    faceC:"",
    faceD:"",
    partialvolumefactor: "",
    partialimportfactor: "",
    pricefactor: "",
    inventaryfactor: "",
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
          subtitle:`Isla ${pump.island} | ${pump.core}`
        })
      });
      const island = responseIsland.map(island => ({value:island._id,label:'Isla '+island.name}));

      setPumps(pump)
      setIslands(island);
    })();
  },[refresh])

  const submitPump = (values,{resetForm}) => {
    const {
      name,
      island,
      state,
      core,
      protocol,
      hostName,
      serialPort,
      faceA,
      faceB,
      faceC,
      faceD,
      partialvolumefactor,
      partialimportfactor,
      pricefactor,
      inventaryfactor,
    } = values;
    const station = localStorage.getItem('idStation');
    const newPump = {
      name,
      state,
      station,
      island,
      core,
      protocol,
      hostName,
      serialPort,
      faceA,
      faceB,
      factors: {
        partialvolumefactor,
        partialimportfactor,
        pricefactor,
        inventaryfactor,
      },
    };
    if(faceC){
      //@ts-ignore
      newPump.faceC = faceC
    }
    if(faceD){
      //@ts-ignore
      newPump.faceD = faceD
    }
    console.log(newPump);
    createPump(newPump)
    .then(() => {
      resetForm(initialValues)
      setRefresh((refresh) =>refresh+1);
      showAlertSuccess('Creado Exitosamente');
    })
    .catch(() =>{
      showAlertError('El surtidor no pudo ser creado')
    }); 
    /* 
    const newPump = {
      station,
      island,
      core,
      state:Number(state),
      factors: {
        partialvolumefactor,
        partialimportfactor,
        pricefactor,
        inventaryfactor,
      },
    };
     */
    
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
function onKeyDown(keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}
  return (
    <div className="container-fluid p-0 mb-4">
      <Header />
      <Stepper  steps={stepsEdit} current={1} />
      <Formik
        initialValues={initialValues}
        onSubmit={submitPump}
        validationSchema={formSchema}
      >
        <Form onKeyDown={onKeyDown} className="container">
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Nombre</label>
              <Field
                type="number"
                placeholder="Nombre"
                name="name"
                className="form-control"
                id="name"
              />
              <ErrorMessage
                name="name"
                component="small"
                className="field-error text-danger"
              />
            </div>
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
            
          </div>
          <div className="row">
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
            <div className="form-group col-md-4">
                <label>Protocolo</label>
                <Field
                  name="protocol"
                  options={protocol}
                  component={SelectSearch}
                  placeholder="Seleccione..."
                  isMulti={false}
                />
                <ErrorMessage
                  name="protocol"
                  component="small"
                  className="field-error text-danger"
                  />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="input-hostname">Host Name</label>
              <Field
                type="text"
                placeholder=""
                name="hostName"
                className="form-control"
                id="input-hostname"
              />
              <ErrorMessage
                name="hostName"
                component="small"
                className="field-error text-danger"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="input-serialport">Puerto Serial</label>
              <Field
                type="number"
                placeholder=""
                name="serialPort"
                className="form-control"
                id="input-serialport"
              />
              <ErrorMessage
                name="serialPort"
                component="small"
                className="field-error text-danger"
              />
            </div>
              
          </div>
          <h4 className="mb-3">Caras</h4>
          <div className="row">
          <div className="form-group col-md-3">
              <label htmlFor="input-face-a">Cara A (Obligatorio)</label>
              <Field
                type="number"
                placeholder=""
                name="faceA"
                className="form-control"
                id="input-face-a"
              />
              <ErrorMessage
                name="faceA"
                component="small"
                className="field-error text-danger"
              />
            </div>  
            <div className="form-group col-md-3">
              <label htmlFor="input-face-b">Cara B (Obligatorio)</label>
              <Field
                type="number"
                placeholder=""
                name="faceB"
                className="form-control"
                id="input-face-b"
              />
              <ErrorMessage
                name="faceB"
                component="small"
                className="field-error text-danger"
              />
            </div>  
            <div className="form-group col-md-3">
              <label htmlFor="input-face-c">Cara C</label>
              <Field
                type="number"
                placeholder=""
                name="faceC"
                className="form-control"
                id="input-face-c"
              />
              <ErrorMessage
                name="faceC"
                component="small"
                className="field-error text-danger"
              />
            </div>  
            <div className="form-group col-md-3">
              <label htmlFor="input-face-d">Cara D</label>
              <Field
                type="number"
                placeholder=""
                name="faceD"
                className="form-control"
                id="input-face-d"
              />
              <ErrorMessage
                name="faceD"
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
              <button onClick={()=>props.history.push('/edit/device')} type="button" className="btn btn-primary">
                Anterior
              </button>
              <button type="submit" className="btn btn-primary">
                Crear
              </button>
              <button  onClick={()=>props.history.push('/edit/hose')} type="button" className="btn btn-primary">
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
