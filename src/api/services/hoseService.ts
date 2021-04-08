// Dependencies
import axios from "axios";

export const getHoseByStation = async (id:string)=> {
    const url = `/station/hose/station/${id}`
    const response =   await axios(
            {
                method: "get",
                url: url,
            }
        );
    const hose = response.data;
    return hose;
}

export const createHose = async (data:any)=> {
    const url = '/station/hose'
    const hose =  await axios(
            {
                method: "post",
                url: url,
                data
            }
        );
        const {id} = hose.data;
        return id
}
export const deleteHose = async (id:string)=> {
    const url = '/station/hose/'+id
    const hose =  await axios(
            {
                method: "delete",
                url: url,
            }
        );
        return  hose.data.id;
        
}