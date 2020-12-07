import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
export interface IPropsPump extends RouteComponentProps<any> {}

export const formSchema = Yup.object().shape({
  name: Yup.number()
    .positive("Debe ingresar numeros positivos")
    .min(1, "El numero debe ser mayor que 0")
    .required("Campo Requerido"),
  island: Yup.string(),
  state: Yup.number().required("Campo Requerido"),
  core: Yup.string().required("Campo Requerido"),
  protocol: Yup.string().required("Campo Requerido"),
  hostName: Yup.string().required("Campo Requerido"),
  serialPort: Yup.number()
    .positive("Debe ingresar numeros positivos")
    .min(1, "El numero debe ser mayor que 0")
    .required("Campo Requerido"),
  faceA: Yup.number()
    .positive("Debe ingresar numeros positivos")
    .min(1, "El numero debe ser mayor que 0")
    .required("Campo Requerido"),
  faceB: Yup.number()
    .positive("Debe ingresar numeros positivos")
    .min(1, "El numero debe ser mayor que 0")
    .required("Campo Requerido"),
  faceC: Yup.number()
    .positive("Debe ingresar numeros positivos")
    .min(1, "El numero debe ser mayor que 0"),
  faceD: Yup.number()
    .positive("Debe ingresar numeros positivos")
    .min(1, "El numero debe ser mayor que 0"),
  partialvolumefactor: Yup.string().required("Campo Requerido"),
  partialimportfactor: Yup.string().required("Campo Requerido"),
  pricefactor: Yup.string().required("Campo Requerido"),
  inventaryfactor: Yup.string().required("Campo Requerido"),
});
