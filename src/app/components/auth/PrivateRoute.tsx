import * as React from "react";
import { Route, Redirect  } from "react-router-dom";
// import AuthService from './AuthService';
import { connect } from 'react-redux';
import { AUTH_AUTHENTICATED, AUTH_ROLES, AUTH_TOKEN } from '../../../constants/ActionTypes';
const jwtDecode = require('jwt-decode');

function PrivateRoute({ component: Component, sendProps, ...rest }) {
    console.log(" PrivateRoute: ");
    console.log(sendProps);

    /*  
   const authenticate = function (props) {
        console.log(" Satrting in authenticate() method ... ");
        let response:any = await login(props);
        console.log("response:any");
        console.log(response);
        if (response === null) {
          console.log("resposne is null");
          return false;
        }else {
          console.log("resposne is not null");
          this.props.authToekn(response.data.token);
          this.props.isAuthenticated(response.data.user.status === 'active' ? true : false);
          for (const [index, value] of response.data.user.roles.entries()) {
            this.props.setRoles(value.name);
          }
          // localStorage.setItem(props.userName, response.data.user.username);
          // localStorage.setItem("isAuthenticated", "1");
          return true;
        }
      };
*/


const isAuthenticated = function () {
  if (!this._jwtToken || this._jwtToken == "null") {
    return false;
  }
  const decodeJWT = jwtDecode(this.jwtToken);
  var date = new Date();
  var currTime: number = date.getTime();
  var expiryTime = decodeJWT["exp"] * 1000;

  if (currTime < expiryTime) {
    return true;
  }
  clearToken();
  return false;
}

const clearToken = function () {
  this.jwtToken = "";
  // StorageService.remove(AUTH_TOKEN);
  this.props.authToken("");
}

      // let response:any = await login(props);
      // if (response === null) return false;
      // else {
      //   this.props.authToekn(response.data.token);
      //   this.props.isAuthenticated(response.data.user.status === 'active' ? true : false);
      //   for (const [index, value] of response.data.user.roles.entries()) {
      //     this.props.setRoles(value.name);
      //   }
      //   return true;
      // }
    

    // const handle = async (sendProps) => {
    //   try {
    //     const response = await authenticate(sendProps);
    //     if (response === true) return true;
    //     else return false;
    //   } catch (error) {
    //     console.log('Error thrown by axios');
    //   }
    // };

    return (
      <Route {...rest} render={ props => 
        true //isAuthenticated()
        ? <Component {...props} /> 
        : props.history.push("/") //<Redirect to="/login" />
        }
      />
    );
  }

  const mapStateToProps = state => ({
    userName:state.login.userName,
    password:state.login.password,
    token:state.login.token,
    roles:state.login.roles
  });
  
  // push to state
  const mapDispatchToProps = dispatch => ({
    isAuthenticated:  isAuthenticated => dispatch({ type: AUTH_AUTHENTICATED, isAuthenticated }),
    authToken: token => dispatch({ type: AUTH_TOKEN,  token }),
    setRoles:  value => dispatch({ type: AUTH_ROLES,  value }),
  });
  export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute);
  // export default PrivateRoute;
