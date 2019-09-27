//https://github.com/srigar/multiselect-react-dropdown
import * as React from "react";
// import SelectField from 'material-ui-selectfield';
// import SuperSelectField from 'material-ui-superselectfield';
// import Toggle from '@material-ui/';
// import SuperSelectField from 'material-ui-superselectfield';
// import { Select, MenuItem } from "@material-ui/core";
import Select from 'react-select';
// import Multiselect from 'multiselect-dropdown-react';
import { Multiselect } from 'multiselect-react-dropdown';
import Axios from "axios";
import { Grid, FormControl, MuiThemeProvider, InputLabel, NativeSelect, FormHelperText, DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle } from "@material-ui/core";
import { connect } from 'react-redux';
import { default as Button } from "@material-ui/core/Button";
import { default as SendIcon } from "@material-ui/icons/Send";
import { green } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: { useNextVariants: true }
});

class UserRolePrivilage extends React.Component<any, any> {

  componentDidMount() {
    this.getUsersList();
    this.getRolesList();
  }

  getUsersList(): any {
    const headers = {
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldWNsaWQiLCJzY29wZXMiOiJST0xFX01BVEhFTUFUSUNJQU5TIiwiaWF0IjoxNTY4Nzg5NjE5LCJleHAiOjE1NzA1ODk2MTl9.YKKDO_wasSTJ--rZoqjc3vfO7JFN9TAO_OxMv6PocYo'
    }
    Axios
      .post(process.env.GET_LIST_USERS, {headers: headers})
      .then(response => {
        console.log(response);
        console.log(response.data);
      this.props.setUsers(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getRolesList(): any {
    const headers = {
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldWNsaWQiLCJzY29wZXMiOiJST0xFX01BVEhFTUFUSUNJQU5TIiwiaWF0IjoxNTY4Nzg5NjE5LCJleHAiOjE1NzA1ODk2MTl9.YKKDO_wasSTJ--rZoqjc3vfO7JFN9TAO_OxMv6PocYo'
    }
    Axios
      .post(process.env.GET_LIST_ROLES, {headers: headers})
      .then(response => {
        this.props.setRoles(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  onSelect(optionsList, selectedItem) {
    this.props.assingSelectedRole(selectedItem)
    console.log(selectedItem)
  }

  onRemove(optionList, removedItem) {
    this.props.unAssignSelectedRole(removedItem)
    console.log(removedItem);
  }
  handleOpen = () => {
    this.props.setOpen(true);
    // this.setState({ open: true });
  };

  handleClose = () => {
    this.props.setOpen(false);
    this.props.history.push("/datasourceList");
  };
  handleFormSubmit = formSubmitEvent => {
    if (this.props.selectedUserIndex === -1 || this.props.selectedRoleItems === "" ) {
        return;
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldWNsaWQiLCJzY29wZXMiOiJST0xFX01BVEhFTUFUSUNJQU5TIiwiaWF0IjoxNTY4Nzg5NjE5LCJleHAiOjE1NzA1ODk2MTl9.YKKDO_wasSTJ--rZoqjc3vfO7JFN9TAO_OxMv6PocYo'
      }
    const sendData = {
      id: this.props.users[this.props.selectedUserIndex].id, // user id 
      username: this.props.users[this.props.selectedUserIndex].username, // name of selected user 
      status:"active",
      uid:"uid3",
      roles: this.props.selectedRoleItems,
    };
    formSubmitEvent.preventDefault(); //this function is used to stop the page refresh
    console.log(sendData);
    Axios
      .post(process.env.POST_ADD_ROLES, sendData, {headers: headers})
      .then(response => {
        console.log(response);
        if (response.data.event.eventStatus === "OK") {
          this.props.setOpen(true);
          console.log("Sucessfully Inserted.");
          this.resetForm();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  resetForm() {
    this.props.setSelectedUserIndex(-1); 
    this.props.setSelectedRoleItems([]); 
  }
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container}>
        <div className={classes.root}>
          <Grid container spacing={24}>
          <Grid item xs="auto">
                <div>
                  <FormControl className={classes.formControl} error={this.state.hasErrorUsers}>
                    <InputLabel htmlFor="age-native-helper">
                      Users
                    </InputLabel>
                    <NativeSelect
                      value={this.props.selectedUserIndex}
                      required
                    >
                      {this.props.users.map((item, index) => (
                        <option
                          key={item.id}
                          label={item.username}
                          value={index}
                        />
                      ))}
                    </NativeSelect>
                    {this.state.hasErrorUsers && <FormHelperText>User is required!</FormHelperText>}
                    <FormHelperText>Select User</FormHelperText>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs="auto">
                <div>
                  <FormControl className={classes.formControl} fullWidth error={this.state.hasErrorDriver}>
                    <MuiThemeProvider theme={theme}>
                    <Multiselect
                      options={this.props.roles}
                      placeholder="Select Any"
                      displayValue="name"
                      onSelect={this.onSelect}
                      onRemove={this.onRemove}
                      />
                    {this.state.hasErrorDriver && <FormHelperText>Driver is required!</FormHelperText>}
                    </MuiThemeProvider>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs="auto">
                <Button
                  variant="contained"
                  size="small"
                  // className={classes.submit}
                  className={classes.button}
                  type="submit"
                  onClick={this.handleFormSubmit}
                >
                  <SendIcon />
                  Submit
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.submit}
                  onClick={this.handleClose}
                >
                  <SendIcon />
                  Cancel
                </Button>
              </Grid>
            <Grid item xs={12} />
          </Grid>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"User Role Information "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              User Role Information is submitted successfully.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
}

//read from state 
const mapStateToProps = state => ({
  users: state.userRolePrivilage.users,
  roles: state.userRolePrivilage.roles,
  selectedUserName : state.userRolePrivilage.selectedUserName,
  selectedUserId : state.userRolePrivilage.selectedUserId,
  selectedRoleItems: state.userRolePrivilage.selectedRoleItems,
});

// push to state
const mapDispatchToProps = dispatch => ({
  setUsers : users => dispatch({ type: 'SET_USERS', users }),
  setRoles : roles => dispatch({ type: 'SET_ROLES', roles }),
  
  setSelectedUserIndex: value => dispatch({ type: 'USER_INDEX', value }),
  setSelectedRoleItems: value => dispatch({ type: 'ROLE_ITEMS', value }),

  assingSelectedRole: selectedRoleItem => dispatch({ type: 'ASSIGN_ROLE_TO_USER', selectedRoleItem }),
  unAssignSelectedRole: removeRoleItem => dispatch({ type: 'UNASSIGN_ROLE_TO_USER', removeRoleItem }),
  
  setOpen: value => dispatch({ type: 'DIALOG', value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRolePrivilage);
