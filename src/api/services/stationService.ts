// Dependencies
import axios from "axios";

export const createStation = async (data:any)=> {
    const url = '/stations'
    const station =  await axios(
            {
                method: "post",
                url: url,
                data
            }
        );
        const {id} = station.data;
        localStorage.setItem('idStation', id);
}
export const getStation = async (id:string)=> {
    const url="/stations/"+id
    const station =  await axios.get(
            url
        );
    return station.data;
}