import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faStarOfLife} from '@fortawesome/free-solid-svg-icons';
import Doce from "../../../../doce";

const selectBox = ({data:{label, options, required, error}, onChange}) => {
  return (
    <div key={label} className={error ? "inputBox selectBox error" : "inputBox selectBox"}>
      {required && <FontAwesomeIcon className="star_icon" size="xs" icon={faStarOfLife}/>}
      <div className="select_root">
        <select className="select" aria-invalid="false" name={label} required={required} onChange={onChange}>
          {options.map(item => <option key={item.label} className="select_item" value={item.value}>{item.label}</option>)}
        </select>
        <FontAwesomeIcon className="icon" icon={faCaretDown}/>
      </div>
      <label>{Doce.forms[label]}</label>
    </div>
  );
};

export default selectBox;