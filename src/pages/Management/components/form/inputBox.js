import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStarOfLife} from '@fortawesome/free-solid-svg-icons';
import Doce from "../../../../doce";

const inputBox = ({data:{label, value, type, required, error}, onChange}) => {
  return (
    <div key={label} className={error ? "inputBox error" : "inputBox"}>
      {required && <FontAwesomeIcon className="star_icon" size="xs" icon={faStarOfLife}/>}
      <input type={type} className={value === "" ? "" : "input_valid"} value={value} name={label} autoComplete="off" required={required} onChange={onChange}/>
      <label>{Doce.forms[label]}</label>
    </div>
  );
};

export default inputBox;