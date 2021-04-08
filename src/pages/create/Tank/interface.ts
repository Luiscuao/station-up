import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

export interface IPropsTank extends RouteComponentProps<any> {}

export const formSchema = Yup.object().shape({
    type: Yup.string()
        .required("Campo Requerido"),
    price: Yup.number()
        .positive("El valor debe ser positivo") 
        .required("Campo Requerido"),
    width: Yup.number()
        .positive("El valor debe ser positivo") 
        .required("Campo Requerido"),
    heigth: Yup.number()
        .positive("El valor debe ser positivo") 
        .required("Campo Requerido"),
    actualvalue: Yup.number()
        .positive("El valor debe ser positivo") 
        .required("Campo Requerido"),
    maxHeight: Yup.number()
        .positive("El valor debe ser positivo") 
        .required("Campo Requerido"),
    units_dimension: Yup.string()
        .required("Campo Requerido"),
    units_max_heigth: Yup.string()
        .required("Campo Requerido"),
    min: Yup.number()
        .positive("El valor debe ser positivo") 
        .required("Campo Requerido"),
    max: Yup.number()
        .positive("El valor debe ser positivo") 
        .required("Campo Requerido"),
  });