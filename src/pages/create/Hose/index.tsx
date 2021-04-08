// Dependencies
import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

//Types
import { IPropsHose, formSchema } from "./interface";

import { ITile } from "../../../components/ListTile/interface";

//Services
import setAuthToken from "../../../api/setAuthToken";
import { getPumpByStation } from "../../../api/services/pumpService";
import { getTankByStation } from "../../../api/services/tankService";
import {
  getHoseByStation,
  createHose,
  deleteHose,
} from "../../../api/services/hoseService";
import { finishConfigurationService } from "../../../api/services/finishConfigurationService";

//Components
import SelectSearch from "../../../components/SelectSearch";
import Header from "../../../components/Header";
import Stepper from "../../../components/Stepper";
import ListTile from "../../../components/ListTile";
import Modal from "../../../components/Modal";

//utils
import { showAlertError, showAlertSuccess } from "../../../utils/toast";
import {stepsCreate} from "../../../constant/steps"
//Assets
import iconColor from "../../../assets/icon/gas-station-color.png";
import iconBalck from "../../../assets/icon/gas-black.png";

const Hose = (props: IPropsHose) => {
  const [hose, setHose] = useState<ITile[]>([]);
  const [face, setFace] = useState([{}]);
  const [pump, setPump] = useState([{}]);
  const [tank, setTank] = useState([{}]);
  const [modalFinish, setModalFinish] = useState(false);
  const [modalPrintData, setModalPrintData] = useState(false);
  const [currentPump, setCurrentPump] = useState("");
  const [refresh, setRefresh] = useState(0);
  const initialValues = {
    name: "",
    tank: "",
    degree: "",
    pump: "",
    face: "",
  };
  const toggleFinish = () => setModalFinish(!modalFinish);
  const togglePrintData = () => setModalPrintData(!modalPrintData);
  const submitHose = (values,{ resetForm }) => {
    const { tank, degree, pump, face, name} = values;
    const station = localStorage.getItem("idStation");
    const newHose = {
      station,
      name,
      fuel: tank,
      grade: Number(degree),
      pump,
      face,
    };
    createHose(newHose)
      .then(() => {
        resetForm(initialValues);
        showAlertSuccess("Creado Exitosamente");
        setRefresh((refresh) => refresh + 1);
      })
      .catch(() => {
        showAlertError("Error al crear Manguera");
      });
  };
  const onDelete = (id: string) => {
    deleteHose(id)
      .then(() => {
        showAlertSuccess("Elimanado Exitosamente");
        setRefresh((refresh) => refresh - 1);
      })
      .catch(() => {
        showAlertError("Error al eliminar Manguera");
      });
  };

  useEffect(() => {
    (async () => {
      const id = localStorage.getItem("idStation") || "";
      const responsePump = await getPumpByStation(id);
      const responseTank = await getTankByStation(id);
      const responseHose = await getHoseByStation(id);
      const pump = responsePump.map((pump) => ({
        label: "Surtidor " + pump.name,
        value: pump._id,
      }));
      const tank = responseTank.map((tank) => ({
        label: tank.name,
        value: tank._id,
        family: tank.family,
      }));
      const hose = responseHose.map((hose) => {
        const pump = "Surtidor " + hose.pump;
        const degree = "Grado " + hose.grade;
        const face = "Cara " + hose.face;
        const fuel = "Tipo " + hose.fuel;
        console.log(hose);
        return {
          title: "Manguera " + hose.name,
          subtitle: `${pump} | ${degree} | ${face} | ${fuel}  `,
          id: hose._id,
        };
      });
      setTank(tank);
      setHose(hose);
      setPump(pump);
    })();
  }, [refresh]);

  useEffect(() => {
    (async () => {
      const id = localStorage.getItem("idStation") || "";
      const responsePump = await getPumpByStation(id);
      const pump = responsePump.filter((pump) => pump._id === currentPump)[0];
      if (pump) {
        const faces:any[] = [];
        const faceA =  { label: "Cara " + pump.faceAjump.name, value: pump.faceAjump.name };
        const faceB =  { label: "Cara " + pump.faceBjump.name, value: pump.faceBjump.name };
        const faceC =  pump.faceCjump;
        const faceD =  pump.faceDjump;
        faces.push(faceA)
        faces.push(faceB)
        if(faceC){
          faces.push({ label: "Cara " + pump.faceCjump.name, value: pump.faceCjump.name });
        }
        if(faceD){
          faces.push({ label: "Cara " + pump.faceDjump.name, value: pump.faceDjump.name });
        }
        
        setFace(faces);
      }
    })();
  }, [currentPump]);

  const finished = () => {
    const socketIp = localStorage.getItem("ip")||"";
    const socketIpFormat = socketIp.split(':')[1].substring(2);
    finishConfigurationService(socketIpFormat);
    toggleFinish();
    togglePrintData();
  };
  const backToHome = () => {
    togglePrintData();
    setAuthToken("");
    localStorage.setItem("api-key", "");
    localStorage.setItem("idStation", ""); 
    localStorage.setItem("ip", "");
    props.history.push("/");
  };
  const previous = () => props.history.push("/create/pump");

  const getTanksAndStation = () => {
    const id = localStorage.getItem("idStation") || "";
    const station = `EZ_STATION_ID=${id}`;

    const tanks = tank.map((tank: any) => {
      switch (tank.family) {
        case 1:
          return `EZ_FUEL_CRR_ID=${tank.value}`;
        case 3:
          return `EZ_FUEL_EXTRA_ID=${tank.value}`;
        case 5:
          return `EZ_FUEL_ACPM_ID=${tank.value}`;
        default:
          return "";
      }
    });
    console.log([station, ...tanks]);
    return [station, ...tanks];
  };
  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }
  return (
    <div className="container-fluid p-0 mb-4">
      <Header />
      <Stepper steps={stepsCreate} current={5} />

      <Modal
        modal={modalFinish}
        cancel={true}
        toggle={toggleFinish}
        confirm={finished}
      >
        <strong>¿Deseas Finalizar la Instalacion?</strong>
      </Modal>

      <Modal
        modal={modalPrintData}
        toggle={togglePrintData}
        confirm={backToHome}
        message={"hola \n jfdkf"}
      >
        {getTanksAndStation().map((t) => (
          <p className="font-weight-bold">{t}</p>
        ))}
      </Modal>

      <Formik
        initialValues={initialValues}
        onSubmit={submitHose}
        validationSchema={formSchema}
      >
        {(props) => {
          return (
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
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Tanque</label>
                  <Field
                    name="tank"
                    options={tank}
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
                    className="form-control"
                    onChange={(event) => {
                      setCurrentPump(event.target.value);
                      props.setFieldValue("pump", event.target.value);
                      props.setFieldValue("face", "");
                    }}
                  >
                    <option value="">Seleccione...</option>
                    {pump.map((pump: any, index: number) => (
                      <option value={pump.value} key={index}>
                        {pump.label}
                      </option>
                    ))}
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
                <div className="form-group col-md-6 ">
                  <label>Grados</label>
                  <div className="d-flex align-items-end">
                    <label className="m-0">
                      <Field
                        type="radio"
                        name="degree"
                        value="0"
                        className="d-none"
                      />
                      {props.values.degree === "0" ? (
                        <img className="image-icon" src={iconColor} alt="" />
                      ) : (
                        <img className="image-icon" src={iconBalck} alt="" />
                      )}
                    </label>
                    <label className="m-0">
                      <Field
                        type="radio"
                        name="degree"
                        value="1"
                        className="d-none"
                      />
                      {props.values.degree === "1" ? (
                        <img className="image-icon" src={iconColor} alt="" />
                      ) : (
                        <img className="image-icon" src={iconBalck} alt="" />
                      )}
                    </label>
                    <label className="m-0">
                      <Field
                        type="radio"
                        name="degree"
                        value="2"
                        className="d-none"
                      />
                      {props.values.degree === "2" ? (
                        <img className="image-icon" src={iconColor} alt="" />
                      ) : (
                        <img className="image-icon" src={iconBalck} alt="" />
                      )}
                    </label>
                    <label className="m-0">
                      <Field
                        type="radio"
                        name="degree"
                        value="3"
                        className="d-none"
                      />
                      {props.values.degree === "3" ? (
                        <img
                          className="image-icon"
                          src="https://res.cloudinary.com/ds8crblmm/image/upload/v1599775291/gas-station_2_nimm42.png"
                          alt=""
                        />
                      ) : (
                        <img
                          className="image-icon"
                          src="https://res.cloudinary.com/ds8crblmm/image/upload/v1599775281/gas_vibtuz.png"
                          alt=""
                        />
                      )}
                    </label>
                  </div>
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
                    onClick={previous}
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
                      No hay Mangueras disponibles
                    </p>
                  </div>
                )}
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-12 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg "
                      onClick={toggleFinish}
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Hose;
