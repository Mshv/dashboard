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

import { default as NativeSelect } from "@material-ui/core/NativeSelect";
import { default as FormHelperText } from "@material-ui/core/FormHelperText";
import { default as Button } from "@material-ui/core/Button";
import { default as SendIcon } from "@material-ui/icons/Send";
import {
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import ModalPanelScheduler from "./ModalPanelScheduler";
import CheckboxComponent from "../CheckboxComponent";
import * as Collections from "typescript-collections";
import axios from "axios";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridGap: `${theme.spacing.unit * 3}px`
    },
    formControl: {
      minWidth: 180,
      marginLeft: 20
    },
    root: {
      minHeight: "50vh",
      flexGrow: 1
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

class ManageDataAnonymizationJob extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      jobDescription: "",
      customer: "",
      usecaseName: "",
      bussinessCaseDescription: "",

      dataSourceCategories: [],
      selectedDataSource: "",

      schemas: [],
      selectedSchema: "",

      tables: [],
      selectedTable: "",
      columns: [],

      mappingTriggerSchedule: "",
      outputFormat: "",
      maxRecordSize: "",
      open: false,

      textmask: "    .    .    .    ",
      justify: "center",
      alignItems: "center",
      selectedCheckboxes: new Collections.Set()
    };
    // this.handleDatasourceChange = this.handleDatasourceChange.bind(this);
    // this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push("/jobList");
  };

  componentWillMount() {
    this.setState({ selectedCheckboxes: new Collections.Set() });
  }

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

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleDatasourceChange = (event: any) => {
    this.setState({ selectedDataSource: event.target.value }, function() {
      console.log(
        " Before - selectedDataSource: " + this.state.selectedDataSource
      );
      console.log(process.env.POST_SCHEMAS);
      /* Clear other related elements */
      this.setState({ schemas: [] });
      this.setState({ selectedSchema: "" });
      this.setState({ tables: [] });
      this.setState({ selectedTable: "" });
      this.setState({ columns: [] });
      this.setState({ selectedCheckboxes: new Collections.Set() });

      if(this.state.selectedDataSource !== ""){
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
            console.log(response.data.data.schemas);
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
      }
    });
  };

  handleSchemaChange = (event: any) => {
    this.setState({ selectedSchema: event.target.value }, function() {
      console.log("selectedSchema: " + this.state.selectedSchema);

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
    console.log("handleSchemaChange");
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
    });
    
  };

  handleTableChange = (event: any) => {
    // handleTableChange = (event) => {
    this.setState({ selectedTable: event.target.value }, function() {
      console.log("before: " + this.state.selectedDataSource);
      console.log("before: " + this.state.selectedTable);
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
      console.log("inside: " + sendData);
      var list = [];
      axios
        .post(process.env.POST_COLUMNS, sendData)
        .then(response => {
          response.data.data.map(function(column) {
            list.push(column.columnName);
          });
          this.setState({ columns: list }, function() {
            console.log("inside: " + this.state.columns);
          });
          // this.state = { columns: list };
        })
        .catch(function(error) {
          console.log(error);
        });
    });
    console.log("after: " + this.state.selectedDataSource);
    console.log("after: " + this.state.selectedTable);
    console.log("after: " + this.state.columns);
  };

  handleFormSubmit = formSubmitEvent => {
    if (
      this.state.jobDescription === "" ||
      this.state.customer === "" ||
      this.state.bussinessCaseDescription === "" ||
      this.state.usecaseName === "" ||
      this.state.selectedDataSource === "" ||
      this.state.selectedSchema === "" ||
      this.state.selectedTable === "" ||
      this.state.mappingTriggerSchedule === []
    ) {
      return;
    }

    const sendData = {
      event: {},
      data: {
        description: this.state.jobDescription,
        customer: this.state.customer,
        usecaseName: this.state.usecaseName,
        usecaseDescription: this.state.bussinessCaseDescription,
        datasource: {
          dsId: this.state.selectedDataSource
        },
        schema: this.state.selectedSchema,
        table: this.state.selectedTable,
        columns: this.state.selectedCheckboxes
          .toString()
          .replace("[", "")
          .replace("]", ""),
        jobSchedule: this.state.mappingTriggerSchedule,
        outputFormat: this.state.outputFormat,
        maxRecordSize: this.state.maxRecordSize,
        createdBy: 1
      }
    };
    formSubmitEvent.preventDefault(); //this function is used to stop the page refresh
    console.log(sendData);
    axios
      .post(process.env.POST_JOB_CREATE, sendData)
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
    this.setState({ jobDescription: "" });
    this.setState({ customer: "" });
    this.setState({ usecaseName: "" });
    this.setState({ bussinessCaseDescription: "" });

    this.setState({ dataSourceCategories: [] });
    this.setState({ selectedDataSource: "" });
    this.setState({ schemas: [] });
    this.setState({ selectedSchema: "" });
    this.setState({ tables: [] });
    this.setState({ selectedTable: "" });
    this.setState({ columns: [] });
    this.setState({ mappingTriggerSchedule: "" });
    this.setState({ outputFormat: "" });
    this.setState({ maxRecordSize: "" });

    this.getDataSourceInfo();
  }

  handleFormReset = formSubmitEvent => {
    this.resetForm();
  };

  toggleCheckbox = label => {
    if (this.state.selectedCheckboxes.contains(label)) {
      let local_selectedCheckboxes: any = this.state.selectedCheckboxes;
      local_selectedCheckboxes.remove(label);
      this.setState({ selectedCheckboxes: local_selectedCheckboxes });
    } else {
      let local_selectedCheckboxes: any = this.state.selectedCheckboxes;
      local_selectedCheckboxes.add(label);
      this.setState({ selectedCheckboxes: local_selectedCheckboxes });
      console.log(this.state.selectedCheckboxes);
    }
    console.log(
      "this.state.selectedCheckboxes is : " + this.state.selectedCheckboxes
    );
  };

  createCheckbox = label => (
    <CheckboxComponent
      label={label}
      isCheckedItem={this.state.selectedCheckboxes.contains(label)}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  createCheckboxes = () => this.state.columns.map(this.createCheckbox);

  handleBussinessCaseChange = (event: any) => {
    this.setState({ bussinessCaseDescription: event.target.value }, function() {
      console.log(
        "bussinessCaseDescription: " + this.state.bussinessCaseDescription
      );
    });
  };
  handleCustomerChange = (event: any) => {
    this.setState({ customer: event.target.value }, function() {
      console.log("customer: " + this.state.customer);
    });
  };

  handleJobDescriptionChange = (event: any) => {
    this.setState({ jobDescription: event.target.value }, function() {
      console.log("jobDescription: " + this.state.jobDescription);
    });
  };
  handleUsecaseNameChange = (event: any) => {
    this.setState({ usecaseName: event.target.value }, function() {
      console.log("usecaseName: " + this.state.usecaseName);
    });
  };
  handleOutputFormatChange = (event: any) => {
    this.setState({ outputFormat: event.target.value }, function() {
      console.log("outputFormat: " + this.state.outputFormat);
    });
  };
  handleMaxRecordSizeChange = (event: any) => {
    this.setState({ maxRecordSize: event.target.value }, function() {
      console.log("maxRecordSize: " + this.state.maxRecordSize);
    });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    // const { open } = this.state;

    return (
      <form>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      className={classes.margin}
                      label="Job Description"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-job-description"
                      value={this.state.jobDescription}
                      onChange={e => this.handleJobDescriptionChange(e)}
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
                      label="Customer"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-customer"
                      value={this.state.customer}
                      onChange={e => this.handleCustomerChange(e)}
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
                      label="Bussiness Case"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-bussiness-case"
                      value={this.state.bussinessCaseDescription}
                      onChange={e => this.handleBussinessCaseChange(e)}
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
                      label="UseCase Name"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-usecase-name"
                      value={this.state.usecaseName}
                      onChange={e => this.handleUsecaseNameChange(e)}
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
                      type="number"
                      label="Max Record Size"
                      variant="outlined"
                      id="mui-theme-provider-outlined-input-maxRecordSize"
                      value={this.state.maxRecordSize}
                      onChange={e => this.handleMaxRecordSizeChange(e)}
                      required
                    />
                  </MuiThemeProvider>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs="auto">
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-helper">
                    Output Format
                  </InputLabel>
                  <NativeSelect
                    value={this.state.outputFormat}
                    onChange={e => this.handleOutputFormatChange(e)}
                  >
                    <option value="" />
                    <option value={"CSV_FILE"}>CSV</option>
                    <option value={"TSV_FILE"}>TSV</option>
                  </NativeSelect>
                  <FormHelperText>Select Output Format</FormHelperText>
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
                    Data Source
                  </InputLabel>
                  <NativeSelect
                    value={this.state.selectedDataSource}
                    //   onChange={this.handleDatasourceChange}
                    // onChange={this.handleDatasourceChange.bind(this)}
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
                  <InputLabel htmlFor="age-native-helper">Table</InputLabel>
                  <NativeSelect
                    value={this.state.selectedTable}
                    //   onChange={this.handleTableChange}
                    // onChange={this.handleTableChange.bind(this)}
                    onChange={e => this.handleTableChange(e)}
                    required
                  >
                    {this.state.tables.map(item => (
                      <option
                        key={item.tableName}
                        label={item.tableName}
                        value={item.tableName}
                      />
                    ))}
                  </NativeSelect>
                  <FormHelperText>Select Table</FormHelperText>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs="auto">
              <div />
            </Grid>
            <Grid item xs={8} />
            <Grid item xs="auto" />
            <Grid item xs="auto" />
            <Grid item xs={12} />

            {/* <Grid item xs="auto"> */}
            {/* <Grid item xs="auto"> */}
            {/* <div> */}
            {/* <FormControl className={classes.formControl}> */}
            {this.createCheckboxes()}
            {/* </FormControl> */}
            {/* </div> */}
            {/* </Grid> */}
            {/* </Grid> */}

            <Grid item xs={8} />
            <Grid item xs="auto" />
            <Grid item xs="auto" />
            <Grid item xs={12} />
            <Grid item xs="auto">
              {/* <ModalPanelScheduler /> */}
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
          <DialogTitle id="alert-dialog-title">{"Job Information"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Job Information is submitted successfully.
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

export default withStyles(styles)(ManageDataAnonymizationJob);
