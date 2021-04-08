import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

export interface IPropsDevice extends RouteComponentProps<any> {}

export const formSchema = Yup.object().shape({
    androidModel: Yup.string()
      .required("Campo Requerido"),
    androidBrand: Yup.string()
      .required("Campo Requerido"),
    androidDevice: Yup.string()
      .required("Campo Requerido"),
    androidId: Yup.string()
      .required("Campo Requerido"),
  });
