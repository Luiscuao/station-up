import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {ITile} from './interface';
const Tile = (props:ITile) => {
    const { title,onDelete} = props;
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center mb-2">
          <div className="m-0">
            <h6 className="m-0">{title}</h6>
          </div>
          <button type="button"  onClick={onDelete}  className="btn btn-danger btn-sm">
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </li>
    )
}

export default Tile
