// Dependencies
import axios from "axios";

export const createDevice = async (data:any)=> {
    const url = '/devices/create'
    const device =  await axios(
            {
                method: "post",
                url: url,
                data
            }
        );
        const {id} = device.data;
        return id
}

export const getDeviceByStation = async (id: string)=>{
    const url = '/devices/'+id;
    const devices = await axios({
        method: "get",
        url: url,
    })
    return devices.data.devices;
}

export const deleteDevice = async (id: string)=>{
    const url = '/devices/'+id;
    const devices = await axios({
        method: "delete",
        url: url,
    })
    return devices.data.devices;
}