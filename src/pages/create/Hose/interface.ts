import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

export interface IPropsHose extends RouteComponentProps<any> {}

export const formSchema = Yup.object().shape({
    tank: Yup.string()
      .required("Campo Requerido"),
    degree: Yup.string()
      .required("Campo Requerido"),
    pump: Yup.string()
      .required("Campo Requerido"),
    face: Yup.string()
      .required("Campo Requerido"),
  });