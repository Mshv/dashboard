import * as React from "react";
// import { Component } from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import { AUTH_AUTHENTICATED, AUTH_ROLES, AUTH_TOKEN } from '../../../constants/ActionTypes';
import { any } from "prop-types";

// type NoticeProps = {
//   userName: string
// }

//  class Auth extends React.Component<any,any> {
  class AuthService extends React.Component<any,any> {
  // export class Auth extends Component {
  // class Auth extends Component {
  // class Auth  {
  constructor(props) {
    super(props);
  }

  
  // static generateToken = async (username: string, password: string): Promise<any> => {
  //   const sendData = {
  //     username: this.props.userName,
  //     password: this.props.password,
  //     token:this.props.token
  //   };
  //   console.log(" sendData : ", sendData);
  //   let paramRequestBody = "grant_type=password";
  //   paramRequestBody += "&password=" + password;
  //   paramRequestBody += "&username=" + username;

  //   try {
  //     const response = await axios.post(process.env.POST_AUTH_CALL, sendData);

  //     if (response.data.status === '"Authorized User !!!"') {
  //       this.props.authToekn(response.data.token);
  //     for (const [index, value] of response.data.user.roles.entries()) {
  //       this.props.setRoles(value.name);
  //       // localStorage.setItem("roles"+index,value);
  //       // localStorage.getItem("roles"+index);
  //     }
  //     localStorage.setItem(this.props.userName, response.data.user.username);
  //     localStorage.setItem("isAuthenticated", "1");
  //     this.props.isAuthenticated(response.data.user.status === 'active' ? true : false);
  //     // this.props.history.push("/dashboard");
  //     return "active";
  //   } else {
  //     //Client not authenticated please login
  //     return "inactive";
  //   }
  //   } catch (error) {
  //     console.log("ERR ", error.response);
  //     return error.response;
  //   }
  // };


    /*
    static async isUserAuthenticated (props) {
      console.log(" AuthService - isUserAuthenticated");
      console.log(props);
      const sendData = {
        username: props.userName,
        password: props.password,
        token:props.token
      };
    console.log(" sendData isUserAuthenticated : ", sendData);
    axios
    .post(process.env.POST_AUTH_CALL, sendData)
    .then(response => {
      console.log(response);
      if (response.data.status === 'Authorized User !!!') {
        console.log("Authorized User");
        props.authToken(response.data.token);
      for (const [index, value] of response.data.user.roles.entries()) {
        props.setRoles(value.name);
      }
      localStorage.setItem(props.userName, response.data.user.username);
      localStorage.setItem("isAuthenticated", "1");
      props.isAuthenticated(response.data.user.status === 'active' ? true : false);
      return true;
    } else {
      //Client not authenticated please login
      return false;
    }
    })
    .catch(function(error) {
      console.log(error);
    });
  }
*/
  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  userName:state.login.userName,
  password:state.login.password,
  token:state.login.token
});

// push to state
const mapDispatchToProps = dispatch => ({
  isAuthenticated:  isAuthenticated => dispatch({ type: AUTH_AUTHENTICATED, isAuthenticated }),
  authToken: token => dispatch({ type: AUTH_TOKEN,  token }),
  setRoles:  value => dispatch({ type: AUTH_ROLES,  value }),
});
export default connect(mapStateToProps,mapDispatchToProps)(AuthService);
// export default AuthService;
