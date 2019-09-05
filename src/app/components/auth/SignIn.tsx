import * as React from "react";
import { default as Avatar } from "@material-ui/core/Avatar";
import { default as Button } from "@material-ui/core/Button";
import { default as CssBaseline } from "@material-ui/core/CssBaseline";
import { default as FormControl } from "@material-ui/core/FormControl";
import { default as FormControlLabel } from "@material-ui/core/FormControlLabel";
import { default as Checkbox } from "@material-ui/core/Checkbox";
import { default as Input } from "@material-ui/core/Input";
import { default as InputLabel } from "@material-ui/core/InputLabel";
import { default as LockIcon } from "@material-ui/icons/LockOutlined";
import { default as Paper } from "@material-ui/core/Paper";
import { default as Typography } from "@material-ui/core/Typography";
import { Theme, createStyles, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "axios";
import { connect } from 'react-redux';
import {
  AUTH_USER,
  AUTH_PASSWORD,
  AUTH_OPEN_MODAL_LOGIN_ERROR,
  AUTH_AUTHENTICATED,
  AUTH_TOKEN,
  AUTH_ROLES
} from '../../../constants/ActionTypes';
import Auth from "./AuthService";
import AuthService from "./AuthService";
import { login } from ".";


const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing.unit
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    }
  });

class SignIn extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.userNameKepUp = this.userNameKepUp.bind(this);
    this.passwordKepUp = this.passwordKepUp.bind(this);
    
  }

  userNameKepUp(ev) {
    this.props.onChangeUserName(ev.target.value);
  }
  passwordKepUp(ev) {
    this.props.onChangePassword(ev.target.value)
  }
  handleClose = () => {
    this.props.openModal(false);
  };

  componentWillMount() {
    this.props.history.listen(() => {
    });
  }

  handleFormSubmit = async formSubmitEvent => {
    formSubmitEvent.preventDefault();
    // if (await AuthService.isUserAuthenticated(this.props)) { 
      let response:any = await login(this.props);
      if (response !== null) { 
      // console.log("Signin - AuthService.isUserAuthenticated(this.props) : " );
      this.props.authToken(response.data.token);
      this.props.isAuthenticated(response.data.user.status === 'active' ? true : false);
      for (const [index, value] of response.data.user.roles.entries()) {
        this.props.setRoles(value.name);
      }
    this.props.history.push("/dashboard");
    } else {
    formSubmitEvent.preventDefault(); //this function is used to stop the page refresh
    this.props.openModal(true);
       }
};


render() {
    const {classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
           <div>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="userName">User Name</InputLabel>
              <Input
                id="userName"
                name="userName"
                value={this.props.userName}
                autoComplete="userName"
                autoFocus
                onChange={this.userNameKepUp}
                // onChange={e => this.userNameKepUp(e)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={this.props.password}
                autoComplete="current-password"
                onChange={this.passwordKepUp}
                // onChange={e => this.passwordKepUp(e)}

              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleFormSubmit}
            >
              Sign in
            </Button>
            </div>
            <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Login Alert"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Wrong User Name or Password, Try again ...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
          </form>
        </Paper>
      </main>
    );
  }
}
//read from state 
const mapStateToProps = state => ({
  userName: state.login.userName,
  password: state.login.password,
  token:state.login.token,
  isAuthenticated: state.login.isAuthenticated,
  open: state.login.open,
  // role: state.login.role,
  // ...state.login
});

// push to state
const mapDispatchToProps = dispatch => ({
  onChangeUserName: value => dispatch({ type: AUTH_USER, key: 'userName', value }),
  onChangePassword: value => dispatch({ type: AUTH_PASSWORD, key: 'password', value }),
  openModal:        value => dispatch({ type: AUTH_OPEN_MODAL_LOGIN_ERROR, key: 'open', value }),
  isAuthenticated:  isAuthenticated => dispatch({ type: AUTH_AUTHENTICATED, isAuthenticated }),
  authToken: token => dispatch({ type: AUTH_TOKEN,  token }),
  setRoles:  value => dispatch({ type: AUTH_ROLES,  value }),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn)));
