// Dependencies
import axios from "axios";

export const createTank = async (data: any)=>{
    const url = '/station/fuel'
    await axios(
        {
            method: "post",
            url: url,
            data
        }
    );
}

export const getTankByStation = async (id:string)=>{
    const url = `/station/fuel/search/${id}`;
    const response =   await axios(
        {
            method: "get",
            url: url,
        }
    );
    return response.data
}

export const deleteTankByStation = async (id:string)=>{
    const url = '/station/fuel/'+id;
    const response =   await axios(
        {
            method: "delete",
            url: url,
        }
    );
    return response.data
}