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
