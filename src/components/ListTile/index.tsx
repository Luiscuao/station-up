import React from "react";
import { IpropsListTile } from "./interface";
import Tile from '../Tile';

const ListTile = (props: IpropsListTile) => {
  const {list ,onDelete} = props; 
  return (
    <ul className="list-group col-12 mt-4 mb-4">
        {
          list.map((tile,index) =>(
            <Tile title={tile.title} onDelete={onDelete} key={index} />
          ))
        }
    </ul>
  )
};

export default ListTile;
