import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

export interface IPropsCreateIsland extends RouteComponentProps<any> {}

 export const formSchema = Yup.object().shape({
    name: Yup.string()
        .required("Campo Requerido"),
  });