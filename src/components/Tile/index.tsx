import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {ITile} from './interface';
const Tile = (props:ITile) => {
    const { title,id="",subtitle,onDelete,isDelete=true} = props;
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center mb-2">
        <div className="m-0">
          <h5 className="m-0">{title}</h5>
          <p className="m-0">{subtitle}</p>
        </div>
        {isDelete ? (
          <button
            type="button"
            onClick={() => onDelete(id)}
            className="btn btn-danger btn-sm"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        ) : null}
      </li>
    );
}

export default Tile
