import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Route, Switch, Link } from "react-router-dom";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Settings from "@material-ui/icons/Settings";
import Apps from "@material-ui/icons/Apps";
import DataUsage from "@material-ui/icons/DataUsage";
import HomeIcon from "@material-ui/icons/Home";
import Assessment from "@material-ui/icons/Assessment";
import { grey, red } from "@material-ui/core/colors";

import DataSource from "../SuperAdministratorView/DataSource";
import PIISetting from "../SuperAdministratorView/PIISetting";
import PIISettingList from "../SuperAdministratorView/PIISettingList";
import Job from "../SuperAdministratorView/Job";
import JobList from "../SuperAdministratorView/JobList";
import Home from "../Home";
import SignIn from "../auth/SignIn";
import DataSourceList from "../SuperAdministratorView/DataSourceList";
import SystemLogs from "../SuperAdministratorView/SystemLogs";
import Administrators from "../SuperAdministratorView/UserRolePrivilage";
// import drawerImage from "./../../images/Axiata_Logo.png";
import classNames from 'classnames';
import Configuration from "../Configuration";
import PrivateRoute from "../auth/PrivateRoute";
import Logout from "../auth/Logout";
import UserRolePrivilage from "../SuperAdministratorView/UserRolePrivilage";


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -8,
  },
/*   drawerPaper: {
    width: drawerWidth,
    backgroundImage: "url(" + require("./../../images/homeEdit.jpg") + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "270px",
    backgroundPosition: "center"    
  }, */
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route {...rest} render={props => (
//           // localStorage.getItem("isAuthenticated") === "1" ?
//           auth.isAuthenticated === true ? 
//           (<Component {...props} />) : 
//           (this.props.history.push("/"))
//         // (
//         //   <Redirect
//         //     to={{
//         //       pathname: "/",
//         //       // state: { from: props.location }
//         //     }}
//         //   />
//         // )
//     )}
//     />
//   );
// }

// function ClippedDrawer(props) {
class ClippedDrawer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    console.log("xx", props);
    console.log("ClippedDrawer sendProps from Dashboard", props.sendProps);
  }

  handleFormLogout = formSubmitEvent => {
    console.log("handle Form Logout is clicked, ", formSubmitEvent);
    localStorage.setItem("isAuthenticated", "0");
    this.props.history.push("/");
    window.location.reload();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{ backgroundColor: "grey", backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.2), rgba(191, 191, 191, 1))' }}          
        >
          <Toolbar>

            <Typography variant="h6" color="inherit" noWrap>
              Data Annonymization
              {/* <Button color="inherit" id="login" onClick={this.handleFormLogout} className={classes.menuButton}>Logout</Button> */}
            </Typography>

            <section className={classes.rightToolbar}>
            {/* <img
              height="50px"
              width="80px"
              src={require("../../assets/img/Axiata_Logo.png")}
            /> */}
            </section>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem
              component={props => <Link to="/Home" {...props} />}
              button
            >
              <ListItemIcon>
                <HomeIcon  color="primary" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem
              component={props => <Link to="/dataSourceList" {...props} />}
              button
            >
              <ListItemIcon>
                <DataUsage  color="secondary"/>
              </ListItemIcon>
              <ListItemText primary="Data Source" />
            </ListItem>

            <ListItem
              component={props => <Link to="/PIISettingList" {...props} />}
              button
            >
              <ListItemIcon>
                <Apps style={{color: 'green'}} />
              </ListItemIcon>
              <ListItemText primary="PII Setting" />
            </ListItem>

            <ListItem
              component={props => <Link to="/jobList" {...props} />}
              button
            >
              <ListItemIcon>
                <Assessment  color="error"/>
              </ListItemIcon>
              <ListItemText primary="Job" />
            </ListItem>

            <ListItem component={props => <Link to="/systemLogs" {...props} />} button>
              <ListItemIcon>
                <InboxIcon style={{color: 'orange'}} />
              </ListItemIcon>
              <ListItemText primary="System Logs" />
            </ListItem>

            <ListItem component={props => <Link to="/userRolePrivilage" {...props} />} button>
              <ListItemIcon>
                <AssignmentInd  style={{color: 'yellow'}}/>
              </ListItemIcon>
              <ListItemText primary="User Role Privilage" />
            </ListItem>

            <ListItem
              component={props => <Link to="/configuration" {...props} />}
              button
            >
              <ListItemIcon>
                <Settings style={{color: 'black'}} />
              </ListItemIcon>
              <ListItemText primary="Configuration" />
            </ListItem>
            {/* {['manageDataSources', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          </List>
          <Divider />
          <List>
            <ListItem
              component={props => <Link to="/logout" {...props} />}
              button
              onClick={this.handleFormLogout}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>

            {/* {["Log Out"].map((text, index) => (
              <ListItem button key={text} onClick={this.handleFormLogout}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
          </List>
        </Drawer>
        <main className={classes.content} >
          <div className={classes.toolbar} />
          <Switch>
            <PrivateRoute path="/dataSourceList"   component={DataSourceList} sendProps={this.props.sendProps}/>
            <PrivateRoute path="/dataSource"       component={DataSource}     sendProps={this.props.sendProps} />
            <PrivateRoute path="/dataSource/:dsId" component={DataSource}     sendProps={this.props.sendProps}/>
            <PrivateRoute path="/PIISettingList"   component={PIISettingList} sendProps={this.props.sendProps}/>
            <PrivateRoute path="/PIISettingList"   component={PIISetting}     sendProps={this.props.sendProps}/>
            <PrivateRoute path="/configuration"    component={Configuration}  sendProps={this.props.sendProps}/>
            <PrivateRoute path="/job"              component={Job}            sendProps={this.props.sendProps}/>
            <PrivateRoute path="/jobList"          component={JobList}        sendProps={this.props.sendProps}/>
            <PrivateRoute path="/userRolePrivilage"component={UserRolePrivilage} sendProps={this.props.sendProps}/>
            <PrivateRoute path="/systemLogs"       component={SystemLogs}     sendProps={this.props.sendProps}/>
            <PrivateRoute path="/logout"           component={Logout}/>
            <Route path="/home" exact component={Home} />
            <Route path="/" exact component={SignIn} />
          </Switch>
          {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
        </main>
      </div>
    );
  }
}



// ClippedDrawer.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export default withStyles(styles)(ClippedDrawer);
// export default withStyles(styles)(connect(mapStateToProps)(ClippedDrawer));

