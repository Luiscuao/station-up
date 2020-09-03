
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
export interface IPropsPump extends RouteComponentProps<any> {}

export const formSchema = Yup.object().shape({
    module: Yup.string()
      .required("Campo Requerido"),
    serialport: Yup.string()
      .required("Campo Requerido"),
    protocolConcentrator: Yup.string()
      .required("Campo Requerido"),
    state: Yup.string()
      .required("Campo Requerido"),
    partialvolumefactor: Yup.string()
      .required("Campo Requerido"),
    partialimportfactor: Yup.string()
      .required("Campo Requerido"),
    pricefactor: Yup.string()
    .required("Campo Requerido"),
    inventaryfactor: Yup.string()
    .required("Campo Requerido"),
    island: Yup.string()
    .required("Campo Requerido"),
    
  });