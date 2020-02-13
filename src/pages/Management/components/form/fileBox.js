import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStarOfLife, faSearch} from '@fortawesome/free-solid-svg-icons';
import Doce from "../../../../doce";

const fileBox = ({data:{title, label, value, type, required, error}, onChange}) => {
  return (
    <div key={label} className={error ? "inputBox fileBox error" : "inputBox fileBox"}>
      {required && <FontAwesomeIcon className="star_icon" size="xs" icon={faStarOfLife}/>}
      <input type={type} id="input_file" name={label} autoComplete="off" required={required} onChange={onChange}/>
      <div className="inputFile_root">
        <div className="inputFile_val">{value.name}</div>
        <label htmlFor="input_file">
          <FontAwesomeIcon className="icon" size="sm" icon={faSearch}/>
        </label>
      </div>
      <label>{Doce.forms[label]}</label>
    </div>
  );
};

export default fileBox;