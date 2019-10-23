
import * as React from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { default as Button } from "@material-ui/core/Button";
import { default as SendIcon } from "@material-ui/icons/Send";
import { green } from "@material-ui/core/colors";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import {
  Grid, 
  FormControl, 
  MuiThemeProvider, 
  InputLabel, 
  NativeSelect, 
  FormHelperText, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Dialog, 
  DialogTitle, 
  Checkbox,
  TextField } from "@material-ui/core";

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

class ManagePIIType extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.clearForm();
  }

  async componentDidMount() {
    this.clearForm();
    this.getDataTypes();
    this.getAnonymizationTechniques();

    if (this.props.history.location.state != null) {
      this.props.history.location.state.piiTypeId == null
        ? ""
        : this.loadPIITypeInfo(this.props.history.location.state.piiTypeId);
    }
  }
  
  async getDataTypes() {
    const sendData = {
      event: {},
      data: {}
    };
    await Axios
      .post(process.env.POST_DATA_TYPES, sendData)
      .then(response => {
        this.props.setDataTypes(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  async loadSubDataTypes(value){
    const sendData = {
      event: {},
      data: {
        dataTypeId: value
      }
    };
    await Axios
      .post(process.env.POST_SUB_DATA_TYPES, sendData)
      .then(response => {
        if (response != null) {
          this.props.setSubDataTypes(response.data.data);
        } else {
          this.props.setSubDataTypes([]);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  async loadPIITypeInfo(piiTypeId: any){
    this.props.setPIITypeID(piiTypeId);
    this.props.setEdit(true);

    const sendData = {
      event: {},
      data: {
        piiTypeId: this.props.history.location.state.piiTypeId
      }
    };
    await Axios
      .post(process.env.POST_PII_TYPE, sendData)
      .then(async response => {
        if (response.data.event.eventStatus === "OK") { 
        this.props.setPIITypeName(response.data.data[0]['piiTypeName']);
        this.props.setDataTypeName(this.props.dataTypes.filter(obj => obj['dataTypeName'] === response.data.data[0]["dataType"])[0]['dataTypeId']);
        await this.loadSubDataTypes(this.props.dataTypes.filter(obj => obj['dataTypeName'] === response.data.data[0]["dataType"])[0]['dataTypeId']);
        this.props.setSubDataType(this.props.subDataTypes.filter(obj => obj['subDataTypeName'] === response.data.data[0]["subType"])[0]['subDataTypeName']);
        this.props.setTechnique(response.data.data[0]["technique"]);
        await this.loadSecurityTypes(response.data.data[0]["technique"]);
        this.props.setSecurityType( response.data.data[0]["techniqueType"]);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
  async getAnonymizationTechniques() {
    const sendData = {
      event: {},
      data: {}
    };
    await Axios
      .post(process.env.POST_TECHNIQUES, sendData)
      .then(response => {
        this.props.setTechniques(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handlePIITypeNameChange = (event: any) => {
    this.props.setPIITypeName(event.target.value); 
    this.props.setErrorPIIType(false);
  };



  handleDataTypesChange = (event: any) => {
    this.props.setDataTypeName(event.target.value); 
    this.loadSubDataTypes(event.target.value);
    this.props.setErrorDataType(false);
  };
  
  handleSubDataTypesChange = (event: any) => {
      this.props.setSubDataType (event.target.value);
  };

 async loadSecurityTypes(techniqueId) {

  const sendData = {
    event: {},
    data: {
      techniqueId: techniqueId
    }
  };
  console.log(sendData);
  Axios
    .post(process.env.POST_TECHNIQUES_KEY, sendData)
    .then(async response => {
      if (response != null) {
        await this.props.setSecurityTypes(response.data.data.techniqueType.split(','));
      } else {
        this.props.setSecurityTypes([]);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

  handleAnonymizationTechniqueChange(event) {
    this.props.setTechnique(event.target.value);
    this.loadSecurityTypes(event.target.value);
    this.props.setErrorTechnique(false);
  };

  handleSecurityTypeChange = (event: any) => {
    this.props.setSecurityType (event.target.value);
  };

  handleClose = () => {
    this.props.setOpen(false);
    this.props.history.push("/dashboard");
  };

  clearForm() {
    this.props.setPIITypeName(""); 
    this.props.setErrorPIIType(false); 

    this.props.setDataTypeName("");
    this.props.setErrorDataType(false);
    this.props.setDataTypes([]);

    this.props.setSubDataTypes([]); 
    this.props.setSubDataType(""); 

    this.props.setTechniques([]);
    this.props.setTechnique("");
    this.props.setErrorTechnique(false);

    this.props.setSecurityTypes([]);
    this.props.setSecurityType("");
    this.props.setErrorSecurityType(false);

    this.props.setOpen(false);
    this.props.setEdit(false);

    this.getDataTypes();
    this.getAnonymizationTechniques();
  }
  
  handleFormReset = formSubmitEvent => {
    this.clearForm();
  };

  handleFormSubmit = formSubmitEvent => { 
    formSubmitEvent.preventDefault();
    if (!this.props.piiTypeName) {
      this.props.setErrorPIIType(true);
    }
    if (!this.props.dataTypeId) {
      this.props.setErrorDataType(true);
    }
    if (!this.props.subDataTypeName) {
      this.props.setErrorSubDataType(true);
    }
    if (!this.props.technique) {
      this.props.setErrorTechnique(true);
    }
    if (!this.props.securityType) {
      this.props.setErrorSecurityType(true);
    }
    if (
      this.props.piiTypeName === "" ||
      this.props.dataType === "" ||
      this.props.subDataType === "" ||
      this.props.technique === "" ||
      this.props.securityType === "" 
    ) {
      return;
    }

    const sendData = {
    event:{},
    data: {
      piiTypeId: this.props.history.location.state === undefined ? 0 : this.props.history.location.state.piiTypeId,  
      piiTypeName: this.props.piiTypeName ,  
      dataType: this.props.dataTypes.filter(obj => obj['dataTypeId'] === parseInt(this.props.dataTypeId) )[0]['dataTypeName'],  
      subType: this.props.subDataTypeName ,  
      subTypeValue: "" ,  
      isDeleted: "" ,  
      technique: this.props.technique ,  
      techniqueType: this.props.securityType ,  
      status: "active"  
     }
   };
  Axios
    .post(process.env.POST_CREATE_PII_TYPE, sendData)
    .then(response => {
      if (response.data.event.eventStatus === "OK") {
         this.props.setOpen(true);
         this.props.history.push("/ManagePIITypeList")
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  render() {
    const { classes } = this.props;
    const button = this.props.isEdit === true ? "Edit" : "Create";
    return (
      <form>
      <div className={classes.root}>
        <Grid container spacing={24}>
        <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl} error={this.props.hasErrorPIIType} >
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      className={classes.textField}
                      label="PII Type"
                      variant="outlined"
                      id="piiTypeName"
                      value={this.props.piiTypeName}
                      onChange={e => this.handlePIITypeNameChange(e)}
                      required
                    />
                    {this.props.hasErrorPIIType && <FormHelperText>PII Type is required.!</FormHelperText>}
                  </MuiThemeProvider>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs="auto">
            <div>
              <FormControl className={classes.formControl} error={this.props.hasErrorDataType}>
                <InputLabel htmlFor="age-native-helper">
                  Data Types
                </InputLabel>
                <NativeSelect
                  value={this.props.dataTypeId}
                  // value={this.props.dataTypes[this.state.selectedIndex].dataTypeId}
                  onChange={e => this.handleDataTypesChange(e)}
                  required
                >
                   <option value="" ></option>
                  {this.props.dataTypes.map((item, index) => (
                    <option
                      key={item.dataTypeId}
                      label={item.dataTypeName}
                      value={item.dataTypeId}
                    />
                  ))}
                </NativeSelect>
                {this.props.hasErrorDataType && <FormHelperText>Data Type is required!</FormHelperText>}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={8} />
          <Grid item xs="auto" />
          <Grid item xs="auto" />
          <Grid item xs={12} />
          <Grid item xs="auto">
            <div>
              <FormControl className={classes.formControl} error={this.props.hasErrorSubDataType}>
                <InputLabel htmlFor="age-native-helper">
                  Sub Data Types
                </InputLabel>
                <NativeSelect
                  value={this.props.subDataTypeName}
                  onChange={e => this.handleSubDataTypesChange(e)}
                  required
                >
                    <option value="" />
                  {this.props.subDataTypes.map(item => (
                    <option
                      key={item.subDataTypeId}
                      label={item.subDataTypeName}
                      value={item.subDataTypeName}
                    />
                  ))}
                </NativeSelect>
                {this.props.hasErrorSubDataType && <FormHelperText>Sub Data Type is required!</FormHelperText>}
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
                <InputLabel htmlFor="age-native-helper">Status</InputLabel>
                <Checkbox
                  disabled
                  checked
                  value="checkedE"
                  inputProps={{
                    'aria-label': 'disabled checked checkbox',
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
          <div>
            <FormControl className={classes.formControl} error={this.props.hasErrorTechnique}>
              <InputLabel htmlFor="age-native-helper">
              Technique
              </InputLabel>
              <NativeSelect
                value={this.props.technique}
                onChange={e => this.handleAnonymizationTechniqueChange(e)}
                required
              >
                  <option value="" />
                {this.props.techniques.map(item => (
                  <option
                    key={item.techniqueId}
                    label={item.techniqueName}
                    value={item.techniqueId}
                  />
                ))}
              </NativeSelect>
              {this.props.hasErrorTechnique && <FormHelperText>Anonymization Technique is required!</FormHelperText>}
            </FormControl>
            </div>
          </Grid>
          <Grid item xs="auto">
            <div>
            <FormControl className={classes.formControl} error={this.props.hasErrorSecurityType}>
              <InputLabel htmlFor="age-native-helper">
              Sec Technique Type
              </InputLabel>
              <NativeSelect
                value={this.props.securityType}
                onChange={e => this.handleSecurityTypeChange(e)}
                required
              >
                  <option value="" />
                {this.props.securityTypes.map(item => (
                  <option
                    key={item}
                    label={item}
                    value={item}
                  />
                ))}
              </NativeSelect>
              {this.props.hasErrorSecurityType && <FormHelperText>Security Technique Type is required!</FormHelperText>}
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
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Job Information"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            PII Type is submitted successfully.
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
  piiTypeName: state.piiType.piiTypeName,
  hasErrorPIIType: state.piiType.hasErrorPIIType,
  
  dataTypeId: state.piiType.dataTypeId,
  hasErrorDataType: state.piiType.hasErrorDataType,
  dataTypes: state.piiType.dataTypes,

  subDataTypes: state.piiType.subDataTypes,
  subDataTypeName : state.piiType.subDataTypeName,

  techniques: state.piiType.techniques,
  technique : state.piiType.technique,
  hasErrorTechnique : state.piiType.hasErrorTechnique,
  
  securityTypes: state.piiType.securityTypes,
  securityType: state.piiType.securityType,
  hasErrorSecurityType :state.piiType.hasErrorSecurityType,

  open:      state.piiType.open,
  piiTypeId: state.piiType.piiTypeId,
  isEdit:    state.piiType.isEdit,
});

// push to state
const mapDispatchToProps = dispatch => ({
  setPIITypeName   : piiTypeName  => dispatch({ type: 'SET_PII_TYPE_NAME', piiTypeName }),
  setErrorPIIType  : value        => dispatch({ type: 'ERROR_PII_TYPE', value }),

  setDataTypeName  : dataTypeId   => dispatch({ type: 'SET_DATA_TYPE', dataTypeId }),
  
  setErrorDataType : value        => dispatch({ type: 'ERROR_DATA_TYPE', value }),
  setDataTypes     : dataTypes    => dispatch({ type: 'SET_DATA_TYPES', dataTypes }),
  
  setSubDataTypes  : subDataTypes   => dispatch({ type: 'SET_SUB_DATA_TYPES', subDataTypes }),
  setSubDataType   : subDataTypeName=> dispatch({ type: 'SET_SUB_DATA_TYPE', subDataTypeName }), 
  setErrorSubDataType: value        => dispatch({ type: 'ERROR_SUB_DATA_TYPE', value }),

  setTechniques    : techniques   => dispatch({ type: 'SET_TECHNIQUES', techniques }),
  setTechnique     : techniqueItem=> dispatch({ type: 'SET_TECHNIQUE', techniqueItem }),
  setErrorTechnique: value        => dispatch({ type: 'ERROR_TECHNIQUE', value }),

  setSecurityTypes : securityTypes=> dispatch({ type: 'SET_SECURITY_TYPES', securityTypes }),
  setSecurityType  : securityType => dispatch({ type: 'SET_SECURITY_TYPE' , securityType }),  
  setErrorSecurityType: value     => dispatch({ type: 'ERROR_SECURITY_TYPE', value }),

  setOpen:          open  => dispatch({ type: 'DIALOG_STATE', open }),
  setPIITypeID: piiTypeId => dispatch({ type: 'PII_TYPE_ID', piiTypeId }),
  setEdit:         isEdit => dispatch({ type: 'IS_EDIT_MODE', isEdit }),
  });

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ManagePIIType));


