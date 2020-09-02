import {length} from 'units-converter';

export const unitsToMeters = (value:number,units: string) =>{
    return length(value).from(units).to('cm').value;
}