import * as React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ClippedDrawer from '../layout/ClippedDrawer';
import { connect } from 'react-redux';

class Dashboard extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <ClippedDrawer sendProps={this.props}/>
            </Router>
        )
    }
}

//read from state 
const mapStateToProps = state => ({
    userName: state.login.userName,
    password: state.login.password,
    token: state.login.token,
  });

// export default withRouter((Dashboard));
export default (connect(mapStateToProps)(Dashboard));
