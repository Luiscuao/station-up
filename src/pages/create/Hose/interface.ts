import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

export interface IPropsHose extends RouteComponentProps<any> {}

export const formSchema = Yup.object().shape({
    name: Yup.number()
    .positive("Debe ingresar numeros positivos")
    .min(1, "El numero debe ser mayor que 0")
    .required("Campo Requerido"),
    tank: Yup.string()
      .required("Campo Requerido"),
    degree: Yup.string()
      .required("Campo Requerido"),
    pump: Yup.string()
      .required("Campo Requerido"),
    face: Yup.string()
      .required("Campo Requerido"),
  });