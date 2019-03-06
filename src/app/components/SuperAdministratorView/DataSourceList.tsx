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
  Icon,
  SvgIcon,
  Switch,
  Checkbox,
  IconButton
} from "@material-ui/core";
import * as React from "react";
import axios from "axios";
import { withRouter, Route } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import * as Collections from "typescript-collections";
import Link from '@material-ui/core/Link';
import DataSource from "./DataSource";


let id = 0;
const createData = (name, calories, fat, carbs, protein) => {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
};

// create a styles object using a theme. The createStyles function is
// needed to placate the TS compiler.
const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "90%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto"
    },
    table: {
      // minWidth: "80%",
    },
    icon: {
      margin: theme.spacing.unit * 2
    }
    // specific: {
    //   width: "1%"
    // }
  });

// declare props as an extension of the interface we just defined in the 'styles' variable. Any
// other props can appear here. I've put one in as an example of how to use it.
interface Props extends WithStyles<typeof styles> {
  hi: string;
}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function PlusIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    </SvgIcon>
  );
}

class DataSourceList extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataSources: [],
      selected: [],
      selectedCheckboxes: new Collections.Set()
    };
  }

  // const DataSourceList: React.SFC<Props> = props => {
  componentWillMount() {
    // will trigger the callback function whenever a new Route renders a component
    //(as long as this component stays mounted as routes change)
    this.props.history.listen(() => {
      // view new URL
      console.log(" << New URL >>", this.props.history.location.pathname);
    });
  }
  componentDidMount() {
    this.getDataSourceCategories();
  }

  getDataSourceCategories(): any {
    const sendData = {
      event: {},
      data: {}
    };

    axios
      .post(process.env.POST_DATASOURCES, sendData)
      .then(response => {
        this.setState({ dataSources: response.data.data });
        console.log("dataSources");
        console.log(this.state.dataSources);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  isSelected = index => {
    return this.state.selected.indexOf(index) !== -1;
  };
  handleRowSelection = selectedRows => {
    this.setState({
      selected: selectedRows
    });
  };
  toggleCheckbox = (event: any) => {
    const label = event.target.value;
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
  handleClick = (event, id) => {
    const { selected } = this.state;
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

    this.setState({ selected: newSelected });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({
        selected: state.data.dataSources(row => row.dsId)
      }));
      return;
    }
    this.setState({ selected: [] });
  };

  render() {
    const { classes, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <Paper className={classes.root}>
        {/* <p>List Of DataSoures: {this.props.hi}</p> */}
        <Table className={classes.table} padding="dense">
          <TableHead>
            <TableRow style={{ height: "auto !important" }}>
              <CustomTableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={numSelected === rowCount}
                  // onChange={handleSelectAllClick}
                />
              </CustomTableCell>
              <CustomTableCell>ID</CustomTableCell>
              <CustomTableCell>DS Identifier</CustomTableCell>
              <CustomTableCell>DS Name</CustomTableCell>
              <CustomTableCell>Driver</CustomTableCell>
              <CustomTableCell>
                <HomeIcon
                  className={classes.icon}
                  color="secondary"
                  onClick={() => {
                    console.log("onClick");
                  }}
                />
                <PlusIcon
                  className={classes.icon}
                  color="secondary"
                  onClick={() => {
                    this.props.history.push("/datasource");
                  }}
                />
                <DeleteIcon color="secondary" className={classes.icon} />
              </CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.dataSources.map((row, index) => {
              const isSelected = this.isSelected(row.dsId);
              return (
                <TableRow
                  key={row.dsId}
                  selected={isSelected}
                  aria-checked={isSelected}
                  onClick={event => this.handleClick(event, row.dsId)}
                >
                  <CustomTableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      value={row.dsId.toString()}
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
                          pathname: '/datasource',
                          state: {dsId: row.dsId},
                        })
                      }}
                    >
                      {row.dsIdentifier}
                    </Link>
                  </CustomTableCell>
                  <CustomTableCell>{row.dsName}</CustomTableCell>
                  <CustomTableCell>{row.driver}</CustomTableCell>`{" "}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default withRouter(withStyles(styles)(DataSourceList));
