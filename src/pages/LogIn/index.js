import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import Doce from "../../doce";
import AuthContext from "../../context/AuthContext";
import './LogIn.scss';
const LogIn = (props) => {
  let history = useHistory();
  const contextVal = useContext(AuthContext);
  const {logInHandler, authState} = contextVal;
  const [account, setAccount] = useState({
    label: "account",
    value: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    logInHandler(account.value)
  }
  const handleChange = ({target}) => {
    const {name, value} = target;
    switch (name) {
      case "account":
        setAccount(prevState => ({...prevState, value}))
        break;
      default:
        return;
    }
  }
  useEffect(() => {
    authState && history.push("/management");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[authState])
  return (
    <div className="LogIn">
      <div className="content">
        <h1 className="logIn_main_title">{Doce.logIn.main_title}</h1>
        <div className="logIn_form_block">
          <h2 className="title">{Doce.logIn.title}</h2>
          <form className="logIn_form" onSubmit={handleSubmit}>
            <div key="account" className="inputBox">
              <input type="text" value={account.value} name="account" required="required" onChange={handleChange}/>
              <label>{Doce.logIn.forms.account}</label>
            </div>
            <input type="submit" className="submit_btn" value={Doce.button.logIn}/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;

