import axios from "axios";

export const validateKey = async ()=> {
    const url = '/keys'
   return  await axios(
        {
            method: "get",
            url: url,
        }
    )
}