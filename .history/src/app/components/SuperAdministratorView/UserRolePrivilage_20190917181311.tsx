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
import { Grid, FormControl, MuiThemeProvider, Button, InputLabel, NativeSelect, FormHelperText, DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle } from "@material-ui/core";
import { connect } from 'react-redux';

/*
 * assuming the API returns something like this:
 *   const json = [
 *      { value: 'one', label: 'One' },
 *      { value: 'two', label: 'Two' }
 *   ]
 */

var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];



function logChange(val) {
  console.log("Selected: " + val);
}

   var getOptions = function(input, callback) {
    setTimeout(function() {
      callback(null, {
        options: [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' }
        ],
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      });
    }, 500);
  }
class UserRolePrivilage extends React.Component<any, any> {
  state = {
    selectedValues : [],
    options: [{name: 'Srigar', id: 1},{name: 'Sam', id: 2}]
};

getUsersList(): any {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldWNsaWQiLCJzY29wZXMiOiJST0xFX01BVEhFTUFUSUNJQU5TIiwiaWF0IjoxNTY4NzA0NDYwLCJleHAiOjE1Njg3MjI0NjB9.oZ5VU0fEl33IWmmznYpxaannx2Sgq5n5qBETLr5sWRE '
  }
  Axios
    .post(process.env.GET_LIST_USERS, {headers: headers})
    .then(response => {
      this.setState({
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

getRolesList(): any {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldWNsaWQiLCJzY29wZXMiOiJST0xFX01BVEhFTUFUSUNJQU5TIiwiaWF0IjoxNTY4NzA0NDYwLCJleHAiOjE1Njg3MjI0NjB9.oZ5VU0fEl33IWmmznYpxaannx2Sgq5n5qBETLr5sWRE '
  }
  Axios
    .post(process.env.GET_LIST_ROLES, {headers: headers})
    .then(response => {
      this.setState({
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}
onSelect(optionsList, selectedItem) {
  console.log(selectedItem)
}

onRemove(optionList, removedItem) {
  console.log(removedItem);
}

  render() {
    const { classes } = this.props;
    return (
      <Multiselect
      options={options}
      placeholder="Select Any"
      displayValue="value"
      selectedValues={this.state.selectedValues}
      />
      // <form className={classes.container}>
      //   <div className={classes.root}>
      //     <Grid container spacing={24}>
      //     <Grid item xs="auto">
      //           <div>
      //             <FormControl className={classes.formControl} error={this.state.hasErrorDataSourceType}>
      //               <InputLabel htmlFor="age-native-helper">
      //                 Data Source Type
      //               </InputLabel>
      //               <NativeSelect
      //                 value={this.state.selectedDataSourceType}
      //                 onChange={this.handleChange("selectedDataSourceType")}
      //                 required
      //               >
      //                 {this.state.dataSourceTypes.map(item => (
      //                   <option
      //                     key={item.dsTypeId}
      //                     label={item.dsType}
      //                     value={item.dsTypeId}
      //                   />
      //                 ))}
      //               </NativeSelect>
      //               {this.state.hasErrorDataSourceType && <FormHelperText>User is required!</FormHelperText>}
      //               <FormHelperText>Select User</FormHelperText>
      //             </FormControl>
      //           </div>
      //         </Grid>
              
      //       <Grid item xs="auto">
      //         <div>
      //           <FormControl className={classes.formControl} fullWidth error={this.state.hasErrorDriver}>
      //             <MuiThemeProvider theme={theme}>
      //               <TextField
      //                 className={classes.margin}
      //                 label="Driver"
      //                 variant="outlined"
      //                 id="mui-theme-provider-outlined-input-driver"
      //                 value={this.state.driver}
      //                 onChange={this.handleChange("driver")}
      //                 required
      //               />
      //              {this.state.hasErrorDriver && <FormHelperText>Driver is required!</FormHelperText>}
      //             </MuiThemeProvider>
      //           </FormControl>
      //         </div>
      //       </Grid>
      //       <Grid item xs="auto">
      //         <Button
      //           variant="contained"
      //           size="small"
      //           // className={classes.submit}
      //           className={classes.button}
      //           type="submit"
      //           onClick={this.handleFormSubmit}
      //         >
      //           <SendIcon />
      //           {button}
      //         </Button>
      //       </Grid>
      //       <Grid item xs>
      //         <Button
      //           variant="contained"
      //           size="small"
      //           className={classes.submit}
      //           onClick={this.handleFormReset}
      //         >
      //           <SendIcon />
      //           Reset
      //         </Button>
      //       </Grid>
      //       <Grid item xs={12} />
      //     </Grid>
      //   </div>
      //   <Dialog
      //     open={this.state.open}
      //     onClose={this.handleClose}
      //     aria-labelledby="alert-dialog-title"
      //     aria-describedby="alert-dialog-description"
      //   >
      //     <DialogTitle id="alert-dialog-title">
      //       {"User Role Information "}
      //     </DialogTitle>
      //     <DialogContent>
      //       <DialogContentText id="alert-dialog-description">
      //         User Role Information is submitted successfully.
      //       </DialogContentText>
      //     </DialogContent>
      //     <DialogActions>
      //       <Button onClick={this.handleClose} color="primary">
      //         Okay
      //       </Button>
      //     </DialogActions>
      //   </Dialog>
      // </form>
    );
  }
}

//read from state 
const mapStateToProps = state => ({
  userName: state.login.userName,
});

// push to state
const mapDispatchToProps = dispatch => ({
  fetch_userName: userName => dispatch({ type: 'authenticated', userName }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRolePrivilage);
