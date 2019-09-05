import * as React from "react";
import { connect } from 'react-redux';
import { AUTH_LOG_OUT } from "../../../constants/ActionTypes";

class Logout extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
render() {
    this.props.logout("");
    return null;
}
}
//read from state 
const mapStateToProps = state => ({
  userName: state.login.userName,
  password: state.login.password,
  token:state.login.token,
});

// push to state
const mapDispatchToProps = dispatch => ({
  logout: token => dispatch({ type: AUTH_LOG_OUT,  token }),
});
export default connect(mapStateToProps,mapDispatchToProps)(Logout);

