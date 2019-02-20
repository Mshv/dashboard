import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import { Route, Switch, Redirect } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import Home from "./Home";

function PrivateRoute({ component: Component, ...rest }) {
  console.log(
    " <<<<<<>>>>>localStorage.getItem isAuthenticated --- ",
    localStorage.getItem("isAuthenticated")
  );
  return (
    <Route
      {...rest}
      render={
        props =>
          localStorage.getItem("isAuthenticated") === "1" ? (
            <Component {...props} />
          ) : (
            // console.log("**PrivateRoute** is Authenticated - localStorage : ", localStorage.getItem("isAuthenticated")) :
            console.log(
              "**PrivateRoute** is not Authenticated - localStorage: ",
              localStorage.getItem("isAuthenticated")
            )
          )
        // (
        //     <Redirect
        //         to={{
        //             pathname: "/",
        //             // state: { from: props.location }
        //         }}
        //     />
        // )
      }
    />
  );
}
// const store = createStore(() => [],{}, applyMiddleware());
// const store = createStore((state = {}, action) => state);

class Root extends React.Component {
  render() {
    return (
     
        <BrowserRouter>
          <Switch>
            {/* <PrivateRoute exact path="/dashboard" component={AppNavBar} /> */}
            {/* <PrivateRoute exact path="/dashboard" component={AppNavBar} /> */}
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={SignIn} />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
    
    );
  }
}
export default Root;
