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
    this.props.history.push("/datasourceList");
  };

  findArrayElementByName(array, name) {
    return array.find((element) => {
      return element.name === name;
    })
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault(); //this function is used to stop the page refresh

    let roleItems:any = [];
    this.props.selectedRoleItems.map((item) => {
      roleItems.push(this.findArrayElementByName (this.props.roles,"ADMIN"));
    });
    // console.log("roleItemsm is : "+ JSON.stringify(roleItems));
    
    console.log(this.props.selectedUserIndex);
    console.log(this.props.selectedRoleItems);
    // if (this.props.selectedUserIndex === "" || this.props.selectedRoleItems === "" ) {
    //     return;
    //   }
      if (this.props.selectedUserIndex === "") {
        this.props.setErrorUser (true);
        return;
      }
      if (!this.props.selectedRoleItems && !this.props.selectedRoleItems.length ) {
        this.props.setErrorRole (true);
        return;
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldWNsaWQiLCJzY29wZXMiOiJST0xFX01BVEhFTUFUSUNJQU5TIiwiaWF0IjoxNTY4ODAwMTY1LCJleHAiOjE3NDg4MDAxNjV9.CYwfxIUcWpotDkhlKFLLDR7kgOinWNgmY3H_6qWkh8Q'
      }

      this.props.selectedRoleItems.map((item) => {});
    const sendData = {
    //   {
    //     "event":{},
     
    //      "data": {
    //    "id":10,
    //    "username":"euclid",
    //    "status":"",
    //    "uid":"",
    //    "roles":[{
    //      "id":4
         
    //    },
    //    {
    //      "id":5
         
    //    }
    //    ]
    //      }
    //  }
      id: this.props.users[this.props.selectedUserIndex].id, // user id 
      username: this.props.users[this.props.selectedUserIndex].username, // name of selected user 
      // roles: this.props.selectedRoleItems, // 6,5
      roles: "[ " +this.props.selectedRoleItems.map((item) => {
     
        // console.log("fees" + JSON.stringify(feesItem))
        return {
          " { id :": item.id + "} ," 
        }
        })
       + " ]" 
      };
    console.log(sendData);
    console.log(JSON.stringify(sendData));

    this.props.selectedRoleItems.map((item) => {
     
        // console.log("fees" + JSON.stringify(feesItem))
        return {
          "id": item.id,
        }
        });
     


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


  handleChange = (arr) => {
    // console.log(this.myDatas)
    // var a = arr.map(x=>this.myDatas[x])
    // console.log(arr,"result is :",a);
    this.props.setSelectedRoleItems(arr);
    console.log("handleChange - multiple select : " + this.props.selectedRoleItems);
  }
  resetForm() {
    this.props.setSelectedUserIndex(-1); 
    this.props.setSelectedRoleItems([]); 
  }

  handleSelectedUserIndexChange = (event: any) => {
    console.log("handleSelectedUserIndexChange: " + event.target.value);
    this.props.setSelectedUserIndex(event.target.value);
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
                  <FormControl className={classes.formControl} error={this.props.hasErrorUser}>
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
        
              <MultiSearchSelect 
                    searchable={true} 
                    showTags={true} 
                    multiSelect={true} 
                    width="300px" 
                    onSelect={this.handleChange} 
                    options={this.props.roles.map(x=>x.name)}
              >
              {/* {this.props.roles.map((item) => (
                        <option
                          key={item.id}
                          label={item.name}
                          value={item.name}
                        />
                      ))} */}
              </MultiSearchSelect>

              {/* <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
                <Select
                  multiple
                  value={this.state.name}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-checkbox" />}
                  // renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={this.state.name.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}

              {/* <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
                  <Select
                    multiple
                    value={this.state.selected}
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-checkbox" />}
                    // renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {this.props.roles.map(item => (
                      <MenuItem key={item.id} value={item.name}>
                        <Checkbox checked={this.state.selected.indexOf(item) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
            </FormControl> */}
              {this.props.roles.map((item) => (
                        <div key={item.id}>{item.name}</div>
                        ))}
              
              </Grid>
              {/* <Grid item xs="auto">
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
                    {this.props.hasErrorRole && <FormHelperText>Role is required!</FormHelperText>}
                    </MuiThemeProvider>
                  </FormControl>
                </div>
              </Grid> */}
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

