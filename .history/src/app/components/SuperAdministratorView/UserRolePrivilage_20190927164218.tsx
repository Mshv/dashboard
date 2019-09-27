//https://github.com/srigar/multiselect-react-dropdown
import * as React from "react";
// import SelectField from 'material-ui-selectfield';
// import SuperSelectField from 'material-ui-superselectfield';
// import Toggle from '@material-ui/';
// import SuperSelectField from 'material-ui-superselectfield';
// import { Select, MenuItem } from "@material-ui/core";


// import Select from 'react-select';
// import { Select } from 'react-material-ui-super-select';
import Select from '@material-ui/core/Select';

import Axios from "axios";
import { Grid, FormControl, MuiThemeProvider, InputLabel, NativeSelect, FormHelperText, DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle, Checkbox, ListItemText, Input } from "@material-ui/core";
import { connect } from 'react-redux';
import { default as Button } from "@material-ui/core/Button";
import { default as SendIcon } from "@material-ui/icons/Send";
import { green } from "@material-ui/core/colors";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Multiselect } from 'multiselect-react-dropdown';
import MenuItem from '@material-ui/core/MenuItem';
import MultipleSelect from "../MultipleSelect";
import MultiSearchSelect from "react-search-multi-select";

const options = [
  {label: "One", value: 1},
  {label: "Two", value: 2},
  {label: "Three", value: 3},
];

const styles = createStyles({
  root: {
    minHeight: "50vh",
    flexGrow: 1
  },
  formControl: {
    minWidth: 150,
    marginLeft: 20
  },
  "@media (min-width: 960px)": {
    root: {
      display: "flex"
    }
  },
  isError: {
    color: "#D8000C",
    backgroundColor: "#FFD2D2",
    width: 350
  },
  rootPaper: {
    width: "60%",
    marginTop: "2%"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: { useNextVariants: true }
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class UserRolePrivilage extends React.Component<any, any> {

  async componentDidMount() {
    this.clearForm();
    this.getUsersList();
    this.getRolesList();
  }

  async getUsersList() {
    console.log("getUsersList - Start");
    const headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldWNsaWQiLCJzY29wZXMiOiJST0xFX01BVEhFTUFUSUNJQU5TIiwiaWF0IjoxNTY4Nzg5NjE5LCJleHAiOjE1NzA1ODk2MTl9.YKKDO_wasSTJ--rZoqjc3vfO7JFN9TAO_OxMv6PocYo'
    }
    const sendData = {
      event: {},
      data: {}
    };
    await Axios
      .post(process.env.GET_LIST_USERS, sendData, {headers: headers})
      .then(response => {
        console.log("getUsersList");
        console.log(response.data);
        // this.props.setUsers([{ id: "", username: "",status:"",uid:"",roles:[] }].concat(response.data.data));
        this.props.setUsers(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log("getUsersList - End");

  }

  async getRolesList() {
    const headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldWNsaWQiLCJzY29wZXMiOiJST0xFX01BVEhFTUFUSUNJQU5TIiwiaWF0IjoxNTY4ODAwMTY1LCJleHAiOjE3NDg4MDAxNjV9.CYwfxIUcWpotDkhlKFLLDR7kgOinWNgmY3H_6qWkh8Q'
    }
    const sendData = {
      event: {},
      data: {}
    };
    await Axios
      .post(process.env.GET_LIST_ROLES, sendData, {headers: headers})
      .then(response => {
        console.log("getRolesList");
        console.log(response.data);
        // let options = response.data.map( item => ({ id: item.id, name: item.name }));
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
    this.props.history.push("/dashboard");
  };

  handleChange = (arr) => {
    // console.log(this.myDatas)
    // var a = arr.map(x=>this.myDatas[x])
    console.log("result is :",arr);
    this.props.setSelectedRoleItems(arr);
    if (arr.length === 0){
    this.props.setErrorRole(true);
    } else {
    this.props.setErrorRole(false);
    }
  }
  findArrayElementByName(array, name) {
    return array.find((element) => {
      return element.name === name;
    })
  }

  handleFormSubmit = formSubmitEvent => {

    if (this.props.selectedUserIndex === -1) {
      this.props.setErrorUser (true);
      return;
    }
    if (this.props.selectedRoleItems.length === 0) {
      this.props.setErrorRole (true);
      return;
    }


    let roleItems:any = [];
    this.props.selectedRoleItems.map((item) => {
      roleItems.push(this.findArrayElementByName (this.props.roles,item));
    });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldWNsaWQiLCJzY29wZXMiOiJST0xFX01BVEhFTUFUSUNJQU5TIiwiaWF0IjoxNTY4ODAwMTY1LCJleHAiOjE3NDg4MDAxNjV9.CYwfxIUcWpotDkhlKFLLDR7kgOinWNgmY3H_6qWkh8Q'
    }

      const sendData = {
      event:{},
      data: {
      id: this.props.users[this.props.selectedUserIndex].id, // user id 
      username: this.props.users[this.props.selectedUserIndex].username, // name of selected user 
      roles: roleItems.map((item) => {
             return { id: item.id }
        }),
      }
    };
    formSubmitEvent.preventDefault(); 
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


  // handleChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  // myDatas =  this.props.roles.reduce((x,y)=>{ x[y.name]=y; return x },{});

  clearForm() {
    this.props.setSelectedUserIndex(-1); 
    this.props.setSelectedRoleItems([]); 
    this.props.setOpen(false);
    this.props.setErrorUser(false);
    this.props.setErrorRole(false);
  }
  resetForm() {
    this.clearForm();
  }

  handleSelectedUserIndexChange = (event: any) => {
    console.log("handleSelectedUserIndexChange: " + event.target.value);
    this.props.setSelectedUserIndex(event.target.value);
    this.props.setErrorUser(false);
    console.log("this.props.selectedUserIndex ");
    console.log(event.target.value);
    console.log(this.props.users[event.target.value]);
     
  };

  render() {
    console.log("findArrayElementByName");
    console.log(this.findArrayElementByName(this.props.roles,"ADMIN"));
    const { classes } = this.props;
    console.log("this.props.users");
    console.log(this.props.users);
    return (
      <form className={classes.container}>
        <div className={classes.root}>
          <Grid container spacing={24}>
          <Grid item xs="auto">
                <div>
                  <FormControl className={classes.formControl} error={this.props.hasErrorUser} required fullWidth>
                    <InputLabel htmlFor="age-native-helper">
                      Users
                    </InputLabel>
                    <NativeSelect
                      value={this.props.selectedUserIndex}
                      onChange={e => this.handleSelectedUserIndexChange(e)}
                      required
                    >
                    <option value="" />
                      {this.props.users.map((item, index) => (
                        <option
                          key={item.id}
                          label={item.username}
                          value={index}
                        />
                      ))}
                    </NativeSelect>
                    {this.props.hasErrorUser && <FormHelperText>User is required!</FormHelperText>}
                    <FormHelperText>Select User</FormHelperText>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs="auto">
                <div>
                  <FormControl className={classes.formControl} required fullWidth error={this.props.hasErrorRole}>
                    <MuiThemeProvider theme={theme}>
                    <MultiSearchSelect 
                    primaryColor= "#FDFDFD"
                    searchPlaceholder= "Select Roles ..."
                    optionsContainerHeight="60vh"
                    searchable={true} 
                    showTags={true} 
                    multiSelect={true} 
                    width="300px" 
                    onSelect={this.handleChange} 
                    options={this.props.roles.map(x=>x.name)}
                    required
               />
                    {this.props.hasErrorRole && <FormHelperText>Role is required!</FormHelperText>}
                    </MuiThemeProvider>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={8} />
              <Grid item xs="auto" />
              <Grid item xs="auto" />
              <Grid item xs={12} />
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
          open={this.props.open}
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
  selectedUserIndex: state.userRolePrivilage.selectedUserIndex,
  selectedRoleItems: state.userRolePrivilage.selectedRoleItems,
  open : state.userRolePrivilage.open,
  hasErrorUser: state.userRolePrivilage.hasErrorUser,
  hasErrorRole: state.userRolePrivilage.hasErrorRole,
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
  setErrorUser: value => dispatch({ type: 'ERROR_USER', value }),
  setErrorRole: value => dispatch({ type: 'ERROR_ROLE', value }),
  
});
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserRolePrivilage));

