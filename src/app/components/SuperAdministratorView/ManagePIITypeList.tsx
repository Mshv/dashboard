import * as React from "react";
import axios from "axios";
import Link from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import * as Collections from "typescript-collections";
import {
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  withStyles,
  WithStyles,
  Checkbox,
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "90%",
      marginTop: theme.spacing.unit * 4,
      overflowX: "auto"
    },
    icon: {
      margin: theme.spacing.unit * 2
    },
  });

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16
  },
  body: {
    fontSize: 14,
  }
}))(TableCell);

class ManagePIITypeList extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getPIITypes();
    this.props.setSelectedCheckboxes (new Collections.Set());
  }

  getPIITypes(): any {
    const sendData = {
      event: {},
      data: {}
    };
    axios
      .post(process.env.POST_PII_TYPES, sendData)
      .then(response => {
        this.props.fetch_PIITypes(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  isSelected = index => {
    return this.props.selected.indexOf(index) !== -1;
  };
  handleRowSelection = selectedRows => {
    this.props.setSelected(selectedRows);
  };
  toggleCheckbox = (event: any) => {
    const label = event.target.value;
    if (this.props.selectedCheckboxes.contains(label)) {
      let local_selectedCheckboxes: any = this.props.selectedCheckboxes;
      local_selectedCheckboxes.remove(label);
      this.props.setSelectedCheckboxes (local_selectedCheckboxes);
    } else {
      let local_selectedCheckboxes: any = this.props.selectedCheckboxes;
      local_selectedCheckboxes.add(label);
      this.props.setSelectedCheckboxes (local_selectedCheckboxes);
      console.log(this.props.selectedCheckboxes);
    }
    console.log("this.props.selectedCheckboxes is : " + this.props.selectedCheckboxes);
  };
  handleClick = (event, id) => {
    const { selected } = this.props;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.props.setSelected(newSelected);
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.props.setSelected(state => ({selected: state.data.datasources(row => row.dsId)}))
      return;
    }
    this.props.setSelected([]);
  };

  render() {
    const { classes, numSelected, rowCount } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} padding="dense">
          <TableHead>
            <TableRow style={{ height: "auto !important" }}>
              <CustomTableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={numSelected === rowCount}
                />
              </CustomTableCell>
              <CustomTableCell>Row Id</CustomTableCell>
              <CustomTableCell>PII Type Name</CustomTableCell>
              <CustomTableCell>Data Type</CustomTableCell>
              <CustomTableCell>Sub Type</CustomTableCell>
              <CustomTableCell>Technique</CustomTableCell>
              <CustomTableCell>Technique Type</CustomTableCell>
              <CustomTableCell align="right">
                  <Tooltip title="Add">
                      <Fab color="secondary" size="small" className={classes.fab}>
                        <AddIcon fontSize="small" onClick={() => {this.props.history.push("/ManagePIIType");}}/>
                      </Fab>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Fab color="secondary" size="small" className={classes.fab}>
                        <DeleteIcon  fontSize="small" />
                      </Fab>
                    </Tooltip>
              </CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.piiTypes.map((row, index) => {
              const isSelected = this.isSelected(row.piiTypeId);
              return (
                <TableRow
                  key={row.piiTypeId}
                  selected={isSelected}
                  aria-checked={isSelected}
                  onClick={event => this.handleClick(event, row.piiTypeId)}
                >
                  <CustomTableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      value={row.piiTypeId.toString()}
                      onChange={e => this.toggleCheckbox(e)}
                    />
                  </CustomTableCell>
                  <CustomTableCell>{index + 1}</CustomTableCell>
                  <CustomTableCell>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => { 
                        this.props.history.push({
                          pathname: '/ManagePIIType',
                          state: {piiTypeId: row.piiTypeId},
                        })
                      }}
                    >
                      {row.piiTypeName}
                    </Link>
                  </CustomTableCell>
                  <CustomTableCell>{row.dataType}</CustomTableCell>
                  <CustomTableCell>{row.subType}</CustomTableCell>
                  <CustomTableCell>{row.technique}</CustomTableCell>
                  <CustomTableCell>{row.techniqueType}</CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

//read from state 
const mapStateToProps = state => ({
  piiTypes: state.piiList.piiTypes,
  selected: state.piiList.selected,
  selectedCheckboxes: state.piiList.selectedCheckboxes,
});

// push to state
const mapDispatchToProps = dispatch => ({
  fetch_PIITypes: piiTypes => dispatch({ type: 'piiTypes', piiTypes }),
  setSelected:       selected => dispatch({ type: 'selected', selected }),
  setSelectedCheckboxes: selectedCheckboxes => dispatch({ type: 'selectedCheckboxes', selectedCheckboxes }),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ManagePIITypeList));

