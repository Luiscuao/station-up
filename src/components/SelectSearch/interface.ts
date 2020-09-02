import { FieldProps } from 'formik';
import { OptionsType} from "react-select/src/types";

export interface Option {
    label: string;
    value: string;
  }
  
  export interface IPropsSelectSearch extends FieldProps {
    options: OptionsType<Option>;
    isMulti?: boolean;
    className?: string;
    placeholder?: string;
  }