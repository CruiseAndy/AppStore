import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";

const PrivateRoute = ({exact, path, component: Component, authState, ...props}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        authState
        ? <Component {...props}/>
        : <Redirect to={{pathname: '/', state: { from: routeProps.location}}}/>
      )}
    />
  );
}

export default PrivateRoute;