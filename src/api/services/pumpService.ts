// Dependencies
import axios from "axios";

export const createPump = async (data: any)=>{
    const url = '/station/pump'
    await axios(
        {
            method: "post",
            url: url,
            data
        }
    );
}

export const getPumpByStation = async (id:string)=>{
    const url = '/station/pump/all/'+id
    const response = await axios(
        {
            method: "get",
            url: url,
        }
    );
    return response.data;
}

export const deletePump = async (id:string)=>{
    const url = '/station/pump/'+id
    const response = await axios(
        {
            method: "delete",
            url: url,
        }
    );
    return response.data;
}
