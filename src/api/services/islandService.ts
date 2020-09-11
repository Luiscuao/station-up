// Dependencies
import axios from "axios";

export const createIsland = async (data:any)=> {
    const url = '/station/island'
    const island =  await axios(
            {
                method: "post",
                url: url,
                data
            }
        );
        const {id} = island.data;
        return id
}

export const getIslandByStation = async (id:string)=> {
    const url = `/station/island/${id}`
    const response =   await axios(
            {
                method: "get",
                url: url,
            }
        );
    const islands = response.data;
    return islands;
}

export const deleteIslandByStation = async (id:string)=> {
    const url = `/station/island/${id}`
    await axios(
            {
                method: "delete",
                url: url,
            });
}