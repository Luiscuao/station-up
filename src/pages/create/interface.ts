import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
export interface IPropsCreate extends RouteComponentProps<any> {}

export const formSchema = Yup.object().shape({
    apiKey: Yup.string()
      .required("Campo Requerido")
      .matches(/^([1-9A-Z]{4,4}([-])){3,3}([1-9A-Z]{4,4})$/,'Api Key no valida'),
    ip: Yup.string()
      .required("Campo Requerido")
  });