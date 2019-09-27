//https://github.com/srigar/multiselect-react-dropdown
import * as React from "react";
// import SelectField from 'material-ui-selectfield';
// import SuperSelectField from 'material-ui-superselectfield';
// import Toggle from '@material-ui/';
// import SuperSelectField from 'material-ui-superselectfield';
// import { Select, MenuItem } from "@material-ui/core";
import Select from 'react-select';
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

// import MultiSelect from "@khanacademy/react-multi-select";

// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

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

class UserRolePrivilage extends React.Component<any, any> {
 

  state = {
    selected: [],
   
  }
  async componentDidMount() {
    console.log("componentDidMount");
    // this.getUsersList();
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
    this.props.history.push("/datasourceList");
  };
  handleFormSubmit = formSubmitEvent => {
    if (this.props.selectedUserIndex === -1 || this.props.selectedRoleItems === "" ) {
        return;
      }
      if (this.props.selectedUserIndex === -1) {
        this.props.setErrorUser (true);
      }
      if (!this.props.selectedRoleItems && !this.props.selectedRoleItems.length ) {
        this.props.setErrorRole (true);
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldWNsaWQiLCJzY29wZXMiOiJST0xFX01BVEhFTUFUSUNJQU5TIiwiaWF0IjoxNTY4ODAwMTY1LCJleHAiOjE3NDg4MDAxNjV9.CYwfxIUcWpotDkhlKFLLDR7kgOinWNgmY3H_6qWkh8Q'
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
    console.log("this.props.users");
    console.log(this.props.users);
    const {selected} = this.state;
    return (
      <form className={classes.container}>
        <div className={classes.root}>
          <Grid container spacing={24}>
          <Grid item xs="auto">
                <div>
                  <FormControl className={classes.formControl} error={this.props.hasErrorUser}>
                    <InputLabel htmlFor="age-native-helper">
                      Users
                    </InputLabel>
                    <NativeSelect
                      value={this.props.selectedUserIndex}
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

              <Select
                multiple
                // value={personName}
                // onChange={handleChange}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => (selected as string[]).join(', ')}
                // MenuProps={MenuProps}
              >
                {this.props.roles.map(item => (
                  <MenuItem key={item.id} value={item.name}>
                    <Checkbox />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
              </div>
              <div>
              {this.props.roles.map((item) => (
                        <div key={item.id}>{item.name}</div>
                        ))}
              </div>
              </Grid>
              <Grid item xs="auto">
                <div>
                  <FormControl className={classes.formControl} fullWidth error={this.props.hasErrorRole}>
                    <MuiThemeProvider theme={theme}>
                     <Multiselect
                      // options={this.props.roles}
                      placeholder="Select Any"
                      displayValue="name"
                      onSelect={this.onSelect}
                      onRemove={this.onRemove}
                      textField="text"
                      dataItemKey="id"
                      >
                      
                      {this.props.roles.map((item) => (
                        <option
                          key={item.id}
                          label={item.name}
                          value={item.name}
                        />
                      ))}
                      </Multiselect> 
{/* 
                      <MultiSelect
                        // options={this.props.roles}
                        // options={this.props.roles.map(o =>{o.name})}
                        selected={selected}
                        onSelectedChanged={selected => this.setState({selected})}>
                        {this.props.roles.map((item) => (
                        <option
                          key={item.id}
                          label={item.name}
                          value={item.name}
                        />
                      ))}
                      </MultiSelect>  */}
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
  selectedUserName : state.userRolePrivilage.selectedUserName,
  selectedUserId : state.userRolePrivilage.selectedUserId,
  selectedRoleItems: state.userRolePrivilage.selectedRoleItems,
  open : state.userRolePrivilage.open,
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

// export default connect(mapStateToProps, mapDispatchToProps)(UserRolePrivilage);
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserRolePrivilage));

