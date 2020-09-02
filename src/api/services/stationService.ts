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