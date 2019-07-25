import * as React from "react";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import { default as InputLabel } from "@material-ui/core/InputLabel";
import { default as FormControl } from "@material-ui/core/FormControl";
import * as Collections from "typescript-collections";

import { default as Input } from "@material-ui/core/Input";
import { default as NativeSelect } from "@material-ui/core/NativeSelect";
import { default as FormHelperText } from "@material-ui/core/FormHelperText";
import { default as Button } from "@material-ui/core/Button";
import { default as SendIcon } from "@material-ui/icons/Send";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Paper,
  FormControlLabel,
  Avatar,
  Typography,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import MaskedInput from "react-text-mask";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { FormErrors } from "./../FormErrors";

import { Validation, fieldValidatorCore } from "react-validation-framework";

const styles = createStyles({
  root: {
    minHeight: "50vh",
    // display: 'flex',
    // flexWrap: 'wrap',
    flexGrow: 1
  },
  formControl: {
    minWidth: 150,
    marginLeft: 20
    //  minHeight: 50
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
    //  overflowX: 'auto',
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: { useNextVariants: true }
});

var selectedObjectValues = {
  ds: "",
  tb: {}
};

// function TextMaskCustom(props) {
//     const { inputRef, ...other } = props;

//     return (
//         <MaskedInput
//             {...other}
//             ref={ref => {
//                 inputRef(ref ? ref.inputElement : null);
//             }}
//             mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
//             placeholderChar={'\u2000'}
//             showMask
//         />
//     );
// }

class DataSource extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataSourceCategories: [],
      selectedDataSourceCategory: "",

      dataSourceTypes: [],
      selectedDataSourceType: "",

      identifier: "",
      dataSourceName: "",
      driver: "",
      protocol: "",
      ip: "",
      port: "",
      version: "",
      user: "",
      password: "",

      open: false,

      formErrors: { identifier: "", dataSourceName: "" },
      identifierValid: false,
      dataSourceNameValid: false,
      formValid: false,

      textmask: "    .    .    .    ",
      justify: "center",
      alignItems: "center",
      datasources: [],
      isEdit: false,
      dsId: ""
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push("/datasourceList");
  };

  componentWillMount() {}

  componentDidMount() {
    console.log(this.props);
    // console.log(this.props.history.location.state != null? "undefined": "defined");
    // console.log(this.props.history.location.state.dsId == null? "undefined dsId": "defined dsId");
    this.getDataSourceCategories();

    if (this.props.history.location.state != null) {
      this.props.history.location.state.dsId == null
        ? ""
        : this.loadDataSourceInfo(this.props.history.location.state.dsId);
    }
  }
  loadDataSourceInfo(dsId: any): any {
    this.setState({ dsId: dsId });
    this.setState({ isEdit: true });
    const sendData = {
      event: {},
      data: {
        dsId: this.props.history.location.state.dsId
      }
    };

    axios
      .post(process.env.POST_DATASOURCE_BY_ID, sendData)
      .then(response => {
        console.log(response);
        console.log(response.data.data);
        this.setState({ selectedDataSourceType: response.data.data.dsTypeId });
        this.setState({ identifier: response.data.data.dsIdentifier });
        this.setState({ dataSourceName: response.data.data.dsName });
        this.setState({ port: response.data.data.dsPort });
        this.setState({ ip: response.data.data.dsIp });
        this.setState({ driver: response.data.data.driver });
        this.setState({ protocol: response.data.data.protocol });
        this.setState({ version: response.data.data.version });
        this.setState({ user: response.data.data.dsUser });
        this.setState({ password: response.data.data.password });
        // datasources.forEach( (res) =>  {
        //   this.setState({ driver: res.driver }),
        //   this.setState({ protocol: res.protocol })
        //  } );
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  getDataSourceCategories(): any {
    const sendData = {
      event: {},
      data: {}
    };

    axios
      .post(process.env.POST_DATASOURCE_CATEGORIES, sendData)
      .then(response => {
        // console.log(response.data.data);

        this.setState({
          dataSourceCategories: [{ dsCategory: "", categoryId: "" }].concat(
            response.data.data
          )
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  validateForm() {
    this.setState({
      formValid: this.state.identifier && this.state.dataSourceName
    });
  }
  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let identifierValid = this.state.identifier;
    let dataSourceNameValid = this.state.dataSourceName;

    switch (fieldName) {
      case "identifier":
        identifierValid = value.length > 0;
        fieldValidationErrors.identifier = identifierValid
          ? ""
          : "Identifier is Mandatory";
        break;
      case "dataSourceName":
        dataSourceNameValid = value.length > 0;
        fieldValidationErrors.dataSourceName = dataSourceNameValid
          ? ""
          : "Data Source Name is Mandatory";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        identifierValid: identifierValid,
        dataSourceNameValid: dataSourceNameValid
      },
      this.validateForm
    );
  };

  handleChange = name => event => {
    let value = event.target.value;
    console.log("event.target.value: " + value);
    this.setState({ [name]: value }, () => {
      this.handler(name, value);
    });
  };

  handler(name, value: any): any {
    if (name == "selectedDataSourceCategory") {
      this.state = { selectedDataSourceCategory: value };
      this.setState({ selectedDataSourceType: "" });

      const sendData = {
        event: {},
        data: {
          dsCategoryId: this.state.selectedDataSourceCategory
        }
      };
      //   console.log("SendData");
      //   console.log(sendData);
      axios
        .post(process.env.POST_DATASOURCE_TYPES, sendData)
        .then(response => {
          console.log("urlPostDataSourceTypes");
          //   console.log(response);
          console.log(response.data.data);
          this.setState({
            dataSourceTypes: [{ dsTypeId: "", dsType: "" }].concat(
              response.data.data
            )
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
  handleFormSubmit = formSubmitEvent => {
    /*     this.validateField("identifier", this.state.identifier);
    if (this.state.identifier === "") {
      return;
    } */
    if (
      this.state.driver === "" ||
      this.state.ip === "" ||
      this.state.dataSourceName === "" ||
      this.state.port === "" ||
      this.state.user === "" ||
      this.state.password === "" ||
      this.state.protocol === "" ||
      this.state.version === ""
    ) {
      return;
    }

    if (this.state.isEdit == false) {
      if (
        this.state.selectedDataSourceCategory === "" ||
        this.state.dsTypeId === ""
      ) {
        return;
      }
    }

    const sendData = {
      event: {},
      data: {
        ...(this.state.isEdit == true ? { dsId: this.state.dsId } : {}),
        dsTypeId: this.state.selectedDataSourceType,
        dsIdentifier: this.state.identifier,
        dsName: this.state.dataSourceName,
        dsIp: this.state.ip,
        dsPort: this.state.port,
        driver: this.state.driver,
        protocol: this.state.protocol,
        version: this.state.version,
        dsUser: this.state.user,
        password: this.state.password,
        createdBy: 1
      }
    };
    formSubmitEvent.preventDefault(); //this function is used to stop the page refresh
    console.log(sendData);
    axios
      .post(process.env.POST_DATASOURCE_CREATE, sendData)
      .then(response => {
        console.log(response);
        if (response.data.event.eventStatus === "OK") {
          this.setState({ open: true });
          console.log("Sucessfully Inserted.");
          this.resetForm();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // errorClass(error) {
  //   return(error.length === 0 ? '' : 'has-error');
  // }
  resetForm() {
    this.setState({ dataSourceCategories: [] });
    this.setState({ selectedDataSourceCategory: "" });
    this.setState({ dataSourceTypes: [] });
    this.setState({ selectedDataSourceType: "" });
    this.setState({ identifier: "" });
    this.setState({ dataSourceName: "" });
    this.setState({ driver: "" });
    this.setState({ protocol: "" });
    this.setState({ ip: "" });
    this.setState({ port: "" });
    this.setState({ version: "" });
    this.setState({ user: "" });
    this.setState({ password: "" });
    this.setState({ identifierValid: false });
    this.setState({ dataSourceNameValid: false });
    this.setState({ formValid: false });
    this.setState({ formErrors: { identifier: "", dataSourceName: "" } });
    this.setState({ isEdit: false });
    this.getDataSourceCategories();
  }
  handleFormReset = formSubmitEvent => {
    this.resetForm();
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    console.log("this.state.isEdit: " + this.state.isEdit);
    const button = this.state.isEdit === true ? "Edit" : "Create";

    return (
      // <Paper className={classes.rootPaper}>
      <form className={classes.container}>
        <div className={classes.isError}>
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={classes.root}>
          <Grid container spacing={24}>
            {this.state.isEdit ? null : (
              <Grid item xs="auto">
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-helper">
                      Data Source Category
                    </InputLabel>
                    <NativeSelect
                      style={{ width: 225 }}
                      value={this.state.selectedDataSourceCategory}
                      onChange={this.handleChange("selectedDataSourceCategory")}
                      required
                    >
                      {this.state.dataSourceCategories.map(item => (
                        <option
                          key={item.categoryId}
                          label={item.dsCategory}
                          value={item.categoryId}
                        />
                      ))}
                    </NativeSelect>
                    <FormHelperText>Select Data Source category</FormHelperText>
                  </FormControl>
                </div>
              </Grid>
            )}
            {this.state.isEdit ? null : (
              <Grid item xs="auto">
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-helper">
                      Data Source Type
                    </InputLabel>
                    <NativeSelect
                      value={this.state.selectedDataSourceType}
                      onChange={this.handleChange("selectedDataSourceType")}
                      required
                    >
                      {this.state.dataSourceTypes.map(item => (
                        <option
                          key={item.dsTypeId}
                          label={item.dsType}
                          value={item.dsTypeId}
                        />
                      ))}
                    </NativeSelect>
                    <FormHelperText>Select Data Source Type</FormHelperText>
                  </FormControl>
                </div>
              </Grid>
            )}
            <Grid item xs={8} />
            <Grid item xs="auto" />
            <Grid item xs="auto" />
            <Grid item xs={12} />
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      className={classes.textField}
                      label="Data Source Name"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-dataSourceName"
                      value={this.state.dataSourceName}
                      onChange={this.handleChange("dataSourceName")}
                      required
                    />
                  </MuiThemeProvider>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl} required fullWidth>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      className={classes.margin}
                      label="Driver"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-driver"
                      value={this.state.driver}
                      onChange={this.handleChange("driver")}
                      required
                    />
                  </MuiThemeProvider>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={8} />
            <Grid item xs="auto" />
            <Grid item xs="auto" />
            <Grid item xs={12} />
            <Grid item xs="auto">
              <FormControl className={classes.formControl}>
                <MuiThemeProvider theme={theme}>
                  <TextField
                    className={classes.textField}
                    required
                    label="Protocol"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input-protocol"
                    value={this.state.protocol}
                    onChange={this.handleChange("protocol")}
                  />
                </MuiThemeProvider>
              </FormControl>
            </Grid>
            {/* <Grid item xs>
                        <InputLabel htmlFor="age-native-helper">:</InputLabel>
                    </Grid> */}
            <Grid item xs="auto">
              <FormControl className={classes.formControl}>
                <MuiThemeProvider theme={theme}>
                  <TextField
                    className={classes.textField}
                    label="Identifier"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input-identifier"
                    value={this.state.identifier}
                    onChange={this.handleChange("identifier")}
                    required
                    // error={this.state.identifier === ""}
                    // helperText={
                    //   this.state.identifier === ""
                    //     ? "Empty identifier field!"
                    //     : " "
                    // }
                  />
                </MuiThemeProvider>
              </FormControl>
            </Grid>
            <Grid item xs={8} />
            <Grid item xs="auto" />
            <Grid item xs="auto" />
            <Grid item xs={12} />
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      className={classes.margin}
                      label="IP/Host Name"
                      // type="number"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-dataSourceIP"
                      value={this.state.ip}
                      onChange={this.handleChange("ip")}
                      required
                    />
                  </MuiThemeProvider>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      className={classes.margin}
                      label="Port"
                      type="number"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-port"
                      value={this.state.port}
                      onChange={this.handleChange("port")}
                      required
                    />
                  </MuiThemeProvider>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={8} />
            <Grid item xs="auto" />
            <Grid item xs="auto" />
            <Grid item xs={12} />
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      className={classes.margin}
                      label="Version"
                      type="number"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-version"
                      value={this.state.version}
                      onChange={this.handleChange("version")}
                    />
                  </MuiThemeProvider>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={8} />
            <Grid item xs="auto" />
            <Grid item xs="auto" />
            <Grid item xs={12} />
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      className={classes.margin}
                      label="Data Source User"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-user"
                      value={this.state.user}
                      onChange={this.handleChange("user")}
                      required
                    />
                  </MuiThemeProvider>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <TextField
                    style={{ width: 225 }}
                    id="outlined-adornment-password"
                    // className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    type={this.state.showPassword ? "text" : "password"}
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
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
                {button}
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                size="small"
                className={classes.submit}
                onClick={this.handleFormReset}
              >
                <SendIcon />
                Reset
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
            {"Data Source Information"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Data Source Information is submitted successfully.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      // </Paper>
    );
  }
}
export default withStyles(styles)(DataSource);
