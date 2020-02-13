import React, {useState, useEffect} from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Cookies from 'js-cookie';
import { PrivateRoute } from "./components";
import { Management, LogIn} from "./pages";
import { Provider } from "./context/AuthContext";
import "./App.scss";


const App = (props) => {
  const [ authState, setAuthState ] = useState(false);
  const logInHandler = (val) => {
    Cookies.set('user', `${val}`);
  }
  const logOutHandler = () => {
    Cookies.remove('user');
  }
  useEffect(() => {
    let timer = null;
    timer = setInterval(() => {
      if (Cookies.get('user')) {
        setAuthState(true);
      } else {
        setAuthState(false);
      }
    }, 100);
    return () => {
      clearInterval(timer);
    }
  })
  return (
    <div className="App">
      <Provider value={{authState, logInHandler, logOutHandler}}>
        <Router>
          <Switch>
            <Route exact path="/" component={Management}/>
            {false && (<Route exact path="/" component={LogIn}/>)}
            {false && (<PrivateRoute exact path="/management" authState={authState} component={Management}/>)}
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;