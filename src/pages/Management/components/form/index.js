import React from 'react';
import InputBox from "./inputBox";
import SelectBox from "./selectBox";
import FileBox from "./fileBox"
import Doce from "../../../../doce";

const Form = ({data: {title, ...lists}, onSubmit, onChange}) => {
  return ([
    <h2 key="form_title" className="form_title">{Doce[title].name}</h2>,
    <form key="form_content" className="form_content" onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}>
      {Object.keys(lists).map(key => {
        if (lists[key].type === "select") {
          return <SelectBox key={key} data={{title, label: key, ...lists[key]}} onChange={(event) => onChange({activeType: title, ...event})}/>;
        } else if (lists[key].type === "file") {
          return <FileBox key={key} data={{title, label: key, ...lists[key]}} onChange={(event) => onChange({activeType: title, ...event})}/>
        } else {
          return <InputBox key={key} data={{title, label: key, ...lists[key]}} onChange={(event) => onChange({activeType: title, ...event})}/>
        }
      })}
      <input type="submit" className="submit_btn" value={Doce[title].button.sublime}/>
    </form>
  ]);
};

export default Form;