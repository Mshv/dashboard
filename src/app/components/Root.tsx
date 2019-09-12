import * as React from "react";
import { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import SignIn from "./auth/SignIn";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./layout/Dashboard";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Auth from "./auth/AuthService2";

class Root extends React.Component<any,any> {
// class Root extends Component {
  constructor(props) {
    super(props);  
  }
  render() {
    console.log(" this.props: " , this.props);
    return (
     
        <BrowserRouter>
          <Switch>
            {/* <PrivateRoute exact path="/dashboard" component={Dashboard} isAuthenticated={Auth.getToken2}/> */}
            <PrivateRoute exact path="/dashboard" component={Dashboard} sendProps={this.props} />
            <Route exact path="/" component={SignIn} />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.login.userName,
  password: state.login.password,
  token:state.login.token,
})
// const mapStateToProps = state => ({ isAuthenticated:state.login.isAuthenticated });
export default connect(mapStateToProps)(Root);
// export default Root;
