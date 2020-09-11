import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
export interface IPropsEdit extends RouteComponentProps<any> {}

export const formSchema = Yup.object().shape({
    apiKey: Yup.string()
      .required("Campo Requerido"),
    idStation: Yup.string()
      .required("Campo Requerido"),
  });