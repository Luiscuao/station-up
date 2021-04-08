import React from 'react'

import Select from 'react-select';

import { ValueType } from "react-select/src/types";
import {IPropsSelectSearch,Option} from './interface'

const SelectSearch  = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false
}:IPropsSelectSearch) => {

  const onChange = (option: ValueType<Option | Option[]>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  const getValue = () => {
    const optionsList = [{value:"",label:"Seleccione ...",},...options]
    if (optionsList) {
      return isMulti
        ? optionsList.filter(option => field.value.indexOf(option.value) >= 0)
        : optionsList.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  const colourStyles = {
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocused ? 0 : 0,
      borderColor: state.isFocused ? "#357DCA" : base.borderColor,
      "&:hover": {
        borderColor: state.isFocused ? "#357DCA" : base.borderColor
      }
    }),
    
  };
    const optionsList = [{value:"",label:"Seleccione ...",},...options]
    return (
      <Select
          className={className}
          defaultValue= {optionsList[0]}
          name={field.name}
          value={getValue()}
          onChange={onChange}
          placeholder={placeholder}
          options={optionsList}
          isMulti={isMulti}
          styles={colourStyles}/>
    )
}

export default SelectSearch
