import * as React from "react";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
  Theme
} from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import { default as InputLabel } from "@material-ui/core/InputLabel";
import { default as FormControl } from "@material-ui/core/FormControl";

import { default as Input } from "@material-ui/core/Input";
import { default as NativeSelect } from "@material-ui/core/NativeSelect";
import { default as FormHelperText } from "@material-ui/core/FormHelperText";
import { default as Button } from "@material-ui/core/Button";
import { default as SendIcon } from "@material-ui/icons/Send";
import {
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ModalPanelScheduler from "./ModalPanelScheduler";
import PropTypes from "prop-types";
import axios from "axios";



// const styles = createStyles({
const styles = (theme: Theme) =>
  createStyles({
    root: {
      minHeight: "50vh",
      // display: 'flex',
      // flexWrap: 'wrap',
      flexGrow: 1
    },
    // container: {
    //   display: "grid",
    //   gridTemplateColumns: "repeat(12, 1fr)",
    //   gridGap: `${theme.spacing.unit * 3}px`
    // },
    formControl: {
      //  margin: theme.spacing.unit,
      minWidth: 180,
      marginLeft: 20
    },

    "@media (min-width: 960px)": {
      root: {
        display: "flex"
      }
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

class PIISetting extends React.Component<any, any> {
  // propTypes = {
  //     classes: PropTypes.object.isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = {
      dataSourceCategories: [],
      selectedDataSource: "",

      schemas: [],
      selectedSchema: "",

      tables: [],
      selectedTable: "",

      columns: [],
      selectedColumn: "",

      selectedPIIType: "",
      selectedSecurityType: "Hash",
      selectedSecurityKeyType: "",
      selectedSecurityRefrence: "",
      mappingTriggerSchedule: "",

      open: false,

      textmask: "    .    .    .    ",
      justify: "center",
      alignItems: "center"
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push("/configurationList");
  };

  componentWillMount() {}

  componentDidMount() {
    this.getDataSourceInfo();
  }
  getDataSourceInfo(): any {
    const sendData = {
      event: {},
      data: {}
    };
    axios
      .post(process.env.POST_DATASOURCES, sendData)
      .then(response => {
        console.log(response.data.data);
        this.setState({
          dataSourceCategories: [{ dsName: "", dsId: "" }].concat(
            response.data.data
          )
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleDatasourceChange = (event: any) => {
    this.setState({ selectedDataSource: event.target.value }, function() {
      console.log("selectedDataSource: " + this.state.selectedDataSource);

      /* Clear other related elements */
      this.setState({ schemas: [] });
      this.setState({ selectedSchema: "" });

      this.setState({ tables: [] });
      this.setState({ selectedTable: "" });

      this.setState({ columns: [] });
      this.setState({ selectedColumn: "" });

      const sendData = {
        event: {},
        data: {
          dsId: this.state.selectedDataSource
        }
      };
      console.log(sendData);
      axios
        .post(process.env.POST_SCHEMAS, sendData)
        .then(response => {
          if (response != null) {
            // console.log(response);
            this.setState({
              schemas: [{ schemaName: "" }].concat(response.data.data.schemas)
            });
          } else {
            console.log("response: " + response);
            this.setState({ schemas: [] });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  };

  handleSchemaChange = (event: any) => {
    this.setState({ selectedSchema: event.target.value }, function() {
      console.log("selectedSchema: " + this.state.selectedSchema);
    });
    /* Clear other related elements */
    this.setState({ tables: [] });
    this.setState({ selectedTable: "" });
    this.setState({ columns: [] });
    this.setState({ selectedColumn: "" });

    const sendData = {
      event: {},
      data: {
        dsId: this.state.selectedDataSource,
        schemas: [
          {
            schemaName: this.state.selectedSchema
          }
        ]
      }
    };
    console.log(sendData);
    axios
      .post(process.env.POST_TABLES, sendData)
      .then(response => {
        if (response != null) {
          console.log(response);
          this.setState({
            tables: [{ tableName: "" }].concat(response.data.data)
          });
        } else {
          console.log("response: " + response);
          this.setState({ tables: [] });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleTableChange = (event: any) => {
    this.setState({ selectedTable: event.target.value }, function() {
      console.log("selectedTable: " + this.state.selectedTable);
      const sendData = {
        event: {},
        data: {
          dsId: this.state.selectedDataSource,
          schemas: [
            {
              schemaName: this.state.selectedSchema
            }
          ],
          tables: [
            {
              tableName: this.state.selectedTable
            }
          ]
        }
      };
      console.log(sendData);
      axios
        .post(process.env.POST_COLUMNS, sendData)
        .then(response => {
          this.setState({
            columns: [{ columnName: "" }].concat(response.data.data)
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  };

  handleColumnChange = (event: any) => {
    this.setState({ selectedColumn: event.target.value }, function() {
      console.log("selectedColumn: " + this.state.selectedColumn);
    });
  };

  handlePIITypeChange = (event: any) => {
    this.setState({ selectedPIIType: event.target.value }, function() {
      console.log("selectedPIIType: " + this.state.selectedPIIType);
    });
  };
  handleSecurityTypeChange = (event: any) => {
    this.setState({ selectedSecurityType: event.target.value }, function() {
      console.log("selectedSecurityType: " + this.state.selectedSecurityType);
    });
  };

  handleSecurityKeyTypeChange = (event: any) => {
    this.setState({ selectedSecurityKeyType: event.target.value }, function() {
      console.log(
        "selectedSecurityKeyType: " + this.state.selectedSecurityKeyType
      );
    });
  };

  handleSecurityRefrenceChange = (event: any) => {
    this.setState({ selectedSecurityRefrence: event.target.value }, function() {
      console.log(
        "selectedSecurityRefrence: " + this.state.selectedSecurityRefrence
      );
    });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleFormSubmit = formSubmitEvent => {
    if (
      this.state.selectedDataSource === "" ||
      this.state.selectedSchema === "" ||
      this.state.selectedTable === "" ||
      this.state.selectedColumn === "" ||
      this.state.selectedPIIType === "" ||
      this.state.selectedSecurityKeyType === "" ||
      this.state.selectedSecurityRefrence === "" ||
      this.state.mappingTriggerSchedule === ""
    ) {
      return;
    }
    const sendData = {
      event: {},
      data: {
        piiKey: this.state.selectedColumn,
        piiType: this.state.selectedPIIType,
        secType: this.state.selectedSecurityType,
        secKeyType: this.state.selectedSecurityKeyType,
        secKeyReference: this.state.selectedSecurityRefrence,
        datasource: { dsId: this.state.selectedDataSource },
        datastoreParam: this.state.selectedTable,
        schema: this.state.selectedSchema,
        mappingTriggerSchedule: this.state.mappingTriggerSchedule,
        createdBy: 1
      }
    };
    formSubmitEvent.preventDefault(); //this function is used to stop the page refresh
    console.log(sendData);
    axios
      .post(process.env.POST_PII_SETTINGS_CREATE, sendData)
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

  resetForm() {
    this.setState({ schemas: [] });
    this.setState({ selectedSchema: "" });
    this.setState({ dataSourceCategories: [] });
    this.setState({ selectedDataSource: "" });
    this.setState({ tables: [] });
    this.setState({ selectedTable: "" });
    this.setState({ columns: [] });
    this.setState({ selectedColumn: "" });

    this.setState({ selectedPIIType: "" });
    this.setState({ selectedSecurityType: "Hash" });
    this.setState({ selectedSecurityKeyType: "" });
    this.setState({ selectedSecurityRefrence: "" });
    this.setState({ mappingTriggerSchedule: "" });
    this.getDataSourceInfo();
  }
  handleFormReset = formSubmitEvent => {
    this.resetForm();
  };
  render() {
    const { classes } = this.props;
    // const { open } = this.state;

    return (
      <form className={classes.container}>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-helper">
                    Data Source
                  </InputLabel>
                  <NativeSelect
                    value={this.state.selectedDataSource}
                    onChange={e => this.handleDatasourceChange(e)}
                    required
                  >
                    {this.state.dataSourceCategories.map(item => (
                      <option
                        key={item.dsId}
                        label={item.dsName}
                        value={item.dsId}
                      />
                    ))}
                  </NativeSelect>
                  <FormHelperText>Select Data Source</FormHelperText>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-helper">
                    DataSource Schema
                  </InputLabel>
                  <NativeSelect
                    value={this.state.selectedSchema}
                    onChange={e => this.handleSchemaChange(e)}
                    required
                  >
                    {this.state.schemas.map((item,index) => (
                      <option
                        key={index}
                        label={item.schemaName}
                        value={item.schemaName}
                      />
                    ))}
                  </NativeSelect>
                  <FormHelperText>Select Data Source Schema</FormHelperText>
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
                  <InputLabel htmlFor="age-native-helper">
                    Data Store Parameter
                  </InputLabel>
                  <NativeSelect
                    value={this.state.selectedTable}
                    onChange={e => this.handleTableChange(e)}
                    required
                  >
                    {this.state.tables.map(item => (
                      <option
                        //key={item.tableName}
                        label={item.tableName}
                        value={item.tableName}
                      />
                    ))}
                  </NativeSelect>
                  <FormHelperText>Select Data Store Parameter</FormHelperText>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-helper">PII Key</InputLabel>
                  <NativeSelect
                    value={this.state.selectedColumn}
                    onChange={e => this.handleColumnChange(e)}
                    required
                  >
                    {this.state.columns.map(item => (
                      <option
                        // key={item.columnName}
                        label={item.columnName}
                        value={item.columnName}
                      />
                    ))}
                  </NativeSelect>
                  <FormHelperText>Select PII Key</FormHelperText>
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
                  <InputLabel htmlFor="age-native-helper">PII Type</InputLabel>
                  <NativeSelect
                    value={this.state.selectedPIIType}
                    onChange={e => this.handlePIITypeChange(e)}
                    required
                  >
                    <option value="" />
                    <option value={"MSISDN"}>MSISDN</option>
                    <option value={"EMAIL"}>Email</option>
                    <option value={"IP"}>IP</option>
                    <option value={"CUSTOMER_NAME"}>Customer Name</option>
                    <option value={"EMI"}>EMI</option>
                    <option value={"IMSI"}>IMSI</option>
                    <option value={"ADDRESS"}>Address</option>
                  </NativeSelect>
                  <FormHelperText>Select PII Type</FormHelperText>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs="auto">
              <div>
                {/* <FormControl className={classes.formControl} disabled>
                <InputLabel htmlFor="native-disabled">Name</InputLabel>
                <NativeSelect
                  value={this.state.selectedSecurityType}
                  onChange={this.handleChange("selectedSecurityType")}
                  input={<Input name="selectedSecurityType" id="selectedSecurityType-native-disabled" />}
                >
                  <option value="" />
                  <optgroup label="Author"> 
                    <option id="" value="hai">Hai</option>
                  </optgroup>
                  <optgroup label="Contributors">
                    <option  value="olivier">Olivier</option>
                    <option value="kevin">Kevin</option>
                  </optgroup>
                </NativeSelect>
                <FormHelperText>Disabled</FormHelperText>
              </FormControl> */}
                <FormControl className={classes.formControl} disabled>
                  <InputLabel htmlFor="age-native-helper">
                    Security Type
                  </InputLabel>
                  <NativeSelect
                    value={this.state.selectedSecurityType}
                    onChange={e => this.handleSecurityTypeChange(e)}
                    // name="selectedSecurityType"
                    // input={<Input id="selectedSecurityType-native-disabled" />}
                  >
                    {/* <option value="" /> */}
                    <option value={"HASH"}>Hash</option>
                    <option value={"ENCRYPTION"}>Encryption</option>
                  </NativeSelect>
                  <FormHelperText>Select Security Type</FormHelperText>
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
                  <InputLabel htmlFor="age-native-helper">
                    Security Key Type
                  </InputLabel>
                  <NativeSelect
                    value={this.state.selectedSecurityKeyType}
                    onChange={e => this.handleSecurityKeyTypeChange(e)}
                    required
                  >
                    <option value="" />
                    <option value={"SHA1"}>SHA1</option>
                    <option value={"SHA256"}>SHA256</option>
                    <option value={"SHA384"}>SHA384</option>
                    <option value={"SHA512"}>SHA512</option>
                  </NativeSelect>
                  <FormHelperText>Select Security Key Type</FormHelperText>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-helper">
                    Security Reference
                  </InputLabel>
                  <NativeSelect
                    value={this.state.selectedSecurityRefrence}
                    onChange={e => this.handleSecurityRefrenceChange(e)}
                    required
                  >
                    <option value="" />
                    <option value={1}>Key Reference 1</option>
                    <option value={2}>Key Reference 2</option>
                  </NativeSelect>
                  <FormHelperText>Select Security Key Reference</FormHelperText>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={8} />
            <Grid item xs="auto" />
            <Grid item xs="auto" />
            <Grid item xs={12} />
            <Grid item xs="auto">
              {/* <ModalPanelScheduler /> */}
              {/*             0 10 0,1,2,3,4,5,10,11,12,1,2,13,14,15,16,17,18,19,20,21,22,23 ? * SUN,MON,TUE,WED,THU,FRI,SAT *
               */}{" "}
              <div>
                <FormControl className={classes.formControl}>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      className={classes.margin}
                      label="Mapping Trigger Schedule"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-mapping-trigger"
                      value={this.state.mappingTriggerSchedule}
                      onChange={this.handleChange("mappingTriggerSchedule")}
                      required
                    />
                  </MuiThemeProvider>
                  <FormHelperText>
                    Seconds Minutes Hours Day-Of-Month Month Day-Of-Week Year
                  </FormHelperText>

                  <FormHelperText>
                    0 10
                    0,1,2,3,4,5,10,11,12,1,2,13,14,15,16,17,18,19,20,21,22,23 ?
                    * SUN,MON,TUE,WED,THU,FRI,SAT *
                  </FormHelperText>
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
                Submit
              </Button>
            </Grid>
            <Grid item xs="auto">
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
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Data Source Setting"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Data Source Setting is submitted successfully.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(PIISetting);
