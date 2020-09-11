import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
export interface IPropsStation extends RouteComponentProps<any> {}

export const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Campo Requerido"),
    address: Yup.string()
      .required("Campo Requerido"),
    NIT: Yup.string()
      .required("Campo Requerido"),
    bankaccount: Yup.string()
      .required("Campo Requerido"),
    slogan: Yup.string()
      .required("Campo Requerido"),
    currency: Yup.string()
      .required("Campo Requerido"),
    latitude: Yup.string()
        .required("Campo Requerido"),
    longitude: Yup.string()
    .required("Campo Requerido"),
  });