// Dependencies
import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

//Types
import { IPropsHose, formSchema } from "./interface";
import { factors } from "../../constant/options";
import { ITile } from "../../components/ListTile/interface";

//Services
import setAuthToken from "../../api/setAuthToken";

//Components
import SelectSearch from "../../components/SelectSearch";
import Header from "../../components/Header";
import Stepper from "../../components/Stepper";
import ListTile from "src/components/ListTile";

const Hose = (props: IPropsHose) => {
  const [hose, setHose] = useState<ITile[]>([]);
  const [face , setFace] = useState([{}]);
  const [pump , setPump] = useState([{}]);
  const [currentPump , setCurrentePump] = useState('');
  const [refresh, setRefresh] = useState(0);
  console.log(pump,setCurrentePump)
  const initialValues = {
    name_hose: "",
    tank: "",
    port_reader: "",
    dir_ip_reader: "",
    degree: "",
    pump: "",
    face: "",
  };

  const submitHose = (values) => {
    const {
      name_hose,
      tank,
      port_reader,
      dir_ip_reader,
      degree,
      pump,
      face,
    } = values;
    const newHose = {
      name_hose,
      tank,
      port_reader,
      dir_ip_reader,
      degree,
      pump,
      face,
    };

    /* createPump(newHose); */
    console.log(newHose);
    setRefresh((refresh) => refresh + 1);
  };
  const onDelete = () => {
    setRefresh((refresh) => refresh - 1);
  };
  
  useEffect(() => {
    (async () => {
      setHose([
        { title: "Manguera 1 " },
        { title: "Manguera 2" },
        { title: "Manguera 3" },
        { title: "Manguera 4" },
      ]);
      setPump([
        {value:'0',label:'Cara 1'},  
        {value:'1',label:'Cara 2'},
        {value:'2',label:'Cara 3'},
        {value:'3',label:'Cara 4'}
    ]);
      console.log("refresh render");
    })();
  }, [refresh]);

  useEffect(()=>{
    (async () => {
        setFace([
            {value:'0',label:'Cara 1'},  
            {value:'1',label:'Cara 2'},
            {value:'2',label:'Cara 3'},
            {value:'3',label:'Cara 4'}
        ]);
        console.log("refresh render");
      })();
  },[currentPump])
  const finished = () => {
    localStorage.setItem("api-key", "");
    setAuthToken("");
    props.history.push("/");
  };
  return (
    <div className="container-fluid p-0 mb-4">
      <Header title="Isla" />
      <Stepper current={4} />
      <Formik
        initialValues={initialValues}
        onSubmit={submitHose}
        validationSchema={formSchema}
      >
        <Form className="container">
          <div className="row">
            <div className="form-group col-md-6">
              <label>Tanque</label>
              <Field
                name="tank"
                options={factors}
                component={SelectSearch}
                placeholder="Seleccione..."
                isMulti={false}
              />
              <ErrorMessage
                name="tank"
                component="small"
                className="field-error text-danger"
              />
            </div>
            <div className="form-group col-md-6">
              <label>Surtidor</label>
              <Field
                as="select"
                name="pump"
                placeholder="Favorite Color"
                className="form-control"

                >
                    <option value="">Seleccione...</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                </Field>
              <ErrorMessage
                name="pump"
                component="small"
                className="field-error text-danger"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Cara</label>
              <Field
                name="face"
                options={face}
                component={SelectSearch}
                placeholder="Seleccione..."
                isMulti={false}
              />
              <ErrorMessage
                name="face"
                component="small"
                className="field-error text-danger"
              />
            </div>
            <div className="form-group col-md-6">
              <label>Grado</label>
              <Field
                name="degree"
                options={factors}
                component={SelectSearch}
                placeholder="Seleccione..."
                isMulti={false}
              />
              <ErrorMessage
                name="degree"
                component="small"
                className="field-error text-danger"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12  d-flex justify-content-between">
              <button
                type="button"
                onClick={() => props.history.push("/pump")}
                className="btn btn-primary"
              >
                Anterior
              </button>
              <button type="submit" className="btn btn-primary">
                Crear
              </button>
            </div>
          </div>
          <div className="row mb-4 mt-4">
            {hose.length ? (
              <ListTile list={hose} onDelete={onDelete} />
            ) : (
              <div className="col-12">
                <p className="text-muted text-center mb-4 mt-4 ">
                  No hay Tanques disponibles
                </p>
              </div>
            )}
          </div>
          <div className="row justify-content-center">
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary btn-lg "
                onClick={finished}
              >
                Finalizar
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Hose;
