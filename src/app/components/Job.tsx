import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { default as InputLabel } from '@material-ui/core/InputLabel';
import { default as FormControl } from '@material-ui/core/FormControl';
import CheckboxComponent from './CheckboxComponent';
import * as Collections from 'typescript-collections';

import { default as Input } from '@material-ui/core/Input';
import { default as NativeSelect } from '@material-ui/core/NativeSelect';
import { default as FormHelperText } from '@material-ui/core/FormHelperText';
import { default as Button } from '@material-ui/core/Button';
import { default as SendIcon } from '@material-ui/icons/Send';
import axios from 'axios';

const urlGetDataSourceInfo = 'http://localhost:8080/getDataSourceInfo';
const urlGetTablesInfo = 'http://localhost:8080/getTablesInfo';
const urlGetColumnsInfo = 'http://localhost:8080/getColumnsInfo';

const styles = createStyles({
  root: {
    minHeight: '50vh',
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 180,
    minHeight: 50
  },
  '@media (min-width: 960px)': {
    root: {
      display: 'flex',
    },
  },
});

var selectedObjectValues = {
  ds: '',
  tb: {}
};

class Job extends React.Component<any, any>  {

  constructor(props) {
    super(props);
    this.state = {
      age: '',
      open: false,
      dataSourceList: [],
      selectedDataSource: "",
      tableList: [],
      selectedTable: "",
      columnList: [],
      selectedCheckboxes: new Collections.Set(),
      validationError: "",
    }
  }

  componentWillMount() {
    this.setState({ selectedCheckboxes: new Collections.Set() });
  }

  componentDidMount() {
    axios.get(urlGetDataSourceInfo)
      .then(response => {
        console.log("axios response: ", response.data);
        this.setState({ columnList: [] });
        let dataSourceListFromApi = response.data.map(dataSource => { return { value: dataSource, display: dataSource } })
        this.setState({ dataSourceList: [{ value: '', display: '' }].concat(dataSourceListFromApi) });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleDataSourceChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    axios.get(urlGetTablesInfo, {
      params: {
        ds: event.target.value
      }
    })
      .then(response => {
        console.log(response);
        this.setState({ selectedObjectValues: {} });
        this.setState({ selectedCheckboxes: new Collections.Set() });
        let TableListFromApi = response.data.map(table => { return { value: table, display: table } })
        this.setState({ tableList: [{ value: '', display: '' }].concat(TableListFromApi) });
        this.setState({ columnList: [] });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleTableChange = event => {
    this.setState({ selectedTable: event.target.value });
    if (typeof selectedObjectValues[event.target.value] === "undefined") {
      axios.get(urlGetColumnsInfo, {
        params: {
          selectedTbl: event.target.value
        }
      })
        .then(response => {
          this.setState({ columnList: response.data });
          console.log(this.state.columnList);
          //insert the table and column information in the json.
          response.data.forEach(element => {
            selectedObjectValues[element] = { "columnList": response.data };
            selectedObjectValues[element] = { "checkedList": [] };
          })
        }).catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ columnList: selectedObjectValues[event.target.value]["columnList"] });
      this.setState({ selectedCheckboxes: selectedObjectValues[event.target.value]["checkedList"] });
    }
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    this.state.selectedCheckboxes.forEach(element => {
      console.log(' - DS: ', this.state.selectedDataSource,
        ' - TB: ', this.state.selectedTable,
        ' - ChkBx: ', element, 'is selected.', );
    });
  }

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
    console.log('this.state.selectedCheckboxes is : ' + this.state.selectedCheckboxes);
  }

  createCheckbox = label => (
    <CheckboxComponent
      label={label}
      isCheckedItem={this.state.selectedCheckboxes.contains(label)}
      handleCheckboxChange={this.toggleCheckbox}
      key={label} />
  )

  createCheckboxes = () => (
    this.state.columnList.map(this.createCheckbox)
  )

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-helper">Use Case</InputLabel>
          <NativeSelect>
            <option value="" />
            <option value={1}>Use Case 1</option>
            <option value={2}>Use Case 2</option>
            <option value={3}>Use Case 3</option>
          </NativeSelect>
          <FormHelperText>Select Use Case</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl} />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-helper">Data Source Category</InputLabel>
          <NativeSelect>
            <option value="" />
            <option value={1}>RDBMS</option>
            <option value={2}>NoSQL</option>
          </NativeSelect>
          <FormHelperText>Select Data Source Category</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl} />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-helper">Data Source Type</InputLabel>
          <NativeSelect
            value={this.state.selectedDataSource}
            name="selectedDataSource"
            onChange={this.handleDataSourceChange}
            input={<Input name="selectedDataSource" id="age-native-helper" />}
          >
            {this.state.dataSourceList.map((dataSource) => <option key={dataSource.value} value={dataSource.value}>{dataSource.display}</option>)}
          </NativeSelect>
          <FormHelperText>Select Data Source Connect</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl} />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-helper">SID</InputLabel>
          <NativeSelect>
            <option value="" />
            <option value={1}>ChatBot</option>
            <option value={2}>Annonymization</option>
          </NativeSelect>
          <FormHelperText>Select SID</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl} />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-helper">Table</InputLabel>
          <NativeSelect
            value={this.state.selectedTable}
            name="selectedTable"
            onChange={this.handleTableChange}
            input={<Input name="selectedTable" id="age-native-helper" />}
          >
            {this.state.tableList.map((table) => <option key={table.value} value={table.value}>{table.display}</option>)}
          </NativeSelect>
          <FormHelperText>Select Table</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl} />

        <FormControl className={classes.formControl}>
          {this.createCheckboxes()}
        </FormControl>

        <FormControl>
          <Button variant="contained" size="small" className={classes.button} onClick={this.handleFormSubmit}>
            <SendIcon />
            Send
          </Button>
          {/* <button className="btn btn-default" type="submit" onClick={this.handleFormSubmit}>Send</button> */}
        </FormControl>
      </div>
    );
  }
}
export default withStyles(styles)(Job);


