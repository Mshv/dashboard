import * as React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ClippedDrawer from './ClippedDrawer';

class Dashboard extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <ClippedDrawer/>
            </Router>
        )
    }
}
export default withRouter((Dashboard));
