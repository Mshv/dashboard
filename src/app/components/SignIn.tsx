import * as React from 'react';
import { default as Avatar } from '@material-ui/core/Avatar';
import { default as Button } from '@material-ui/core/Button';
import { default as CssBaseline } from '@material-ui/core/CssBaseline';
import { default as FormControl } from '@material-ui/core/FormControl';
import { default as FormControlLabel } from '@material-ui/core/FormControlLabel';
import { default as Checkbox } from '@material-ui/core/Checkbox';
import { default as Input } from '@material-ui/core/Input';
import { default as InputLabel } from '@material-ui/core/InputLabel';
import { default as LockIcon } from '@material-ui/icons/LockOutlined';
import { default as Paper } from '@material-ui/core/Paper';
import { default as Typography } from '@material-ui/core/Typography';
import { Theme, createStyles, withStyles } from '@material-ui/core';
import { withRouter } from "react-router-dom";

const styles = (theme: Theme) => createStyles({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isAuthenticated: false,
    }
    this.userNameKepUp = this.userNameKepUp.bind(this);
    this.passwordKepUp = this.passwordKepUp.bind(this);
  }

  componentWillMount() {
    // will trigger the callback function whenever a new Route renders a component
    //(as long as this component stays mounted as routes change)
    this.props.history.listen(() => {
      // view new URL
      console.log(' << New URL >>', this.props.history.location.pathname);
    });
  }

  handleFormSubmit = formSubmitEvent => {
    //formSubmitEvent.preventDefault();  // prevent form submission
    console.log(formSubmitEvent.userName);
    console.log(' Sign in button is clicked ....', ' UserName ....', this.state.userName, 'Password ....', this.state.password);

        // if (!this.state.userName.value.trim() || !this.state.userName.password.trim()) {
        //   console.log("Checking");
          
        //   return;
        // }

    if (this.state.userName !== '' && this.state.password !== '') {
      if (this.state.userName === 'admin') {
        this.state = { isAuthenticated: true };
        localStorage.setItem('isAuthenticated', this.state.isAuthenticated === true ? "1" : "0");
        this.props.history.push("/dashboard");
      } else {
        this.props.history.push("/");
      }
    }
  };

  userNameKepUp(ev) {
    console.log("userNameKepUp - ev.target.value ", ev.target.value);
    this.setState({ userName: ev.target.value });
  }
  passwordKepUp(ev) {
    console.log("password - ev.target.value ", ev.target.value);
    this.setState({ password: ev.target.value });
  }

  render() {
    const { classes } = this.props;
    console.log(" this sign in URL ", this.props.location);
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper} >
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="userName">User Name</InputLabel>
              <Input
                id="userName"
                name="userName"
                value={this.state.userName}
                autoComplete="userName"
                autoFocus
                onChange={this.userNameKepUp} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                autoComplete="current-password"
                onChange={this.passwordKepUp}
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
              onClick={this.handleFormSubmit}>
              Sign in
          </Button>
          </form>
        </Paper>
      </main>
    );
  }
}
// export default withStyles(styles)(SignIn);
export default withRouter((withStyles(styles)(SignIn)));

