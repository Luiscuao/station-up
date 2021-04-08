import React from "react";
import { IpropsListTile } from "./interface";
import Tile from '../Tile';

const ListTile = (props: IpropsListTile) => {
  const {list ,onDelete,isDelete=true} = props; 
  return (
    <ul className="list-group col-12 mt-4 mb-4">
        {
          list.map((tile,index) =>(
            <Tile title={tile.title} subtitle={tile.subtitle} id={tile.id} onDelete={onDelete} key={index} isDelete={isDelete}/>
          ))
        }
    </ul>
  )
};

export default ListTile;
