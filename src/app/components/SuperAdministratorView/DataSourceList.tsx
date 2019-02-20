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
  Switch
} from "@material-ui/core";
import * as React from "react";
import axios from "axios";
import { red } from "@material-ui/core/colors";
import { withRouter,Route } from "react-router-dom";
import DataSource from "./DataSource";

let id = 0;
const createData = (name, calories, fat, carbs, protein) => {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
};

const urlPostdataSourceAll =
  "http://localhost:8080/axiata-security-gateway-1.0/datasource/all";

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
    },
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
      dataSources: []
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
      .post(urlPostdataSourceAll, sendData)
      .then(response => {
        this.setState({ dataSources: response.data.data });
        console.log("dataSources");
        console.log(this.state.dataSources);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        {/* <p>List Of DataSoures: {this.props.hi}</p> */}
        <Table className={classes.table} padding="dense">
          <TableHead>
            <TableRow style={{ height: "auto !important" }}>
              <CustomTableCell>DS Identifier</CustomTableCell>
              <CustomTableCell>DS Name</CustomTableCell>
              <CustomTableCell>Driver</CustomTableCell>
              <CustomTableCell style={{ width: "17%" }}>
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
              </CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.dataSources.map(row => {
              return (
                <TableRow key={row.dsId}>
                  <CustomTableCell>{row.dsIdentifier}</CustomTableCell>
                  <CustomTableCell>{row.dsName}</CustomTableCell>
                  <CustomTableCell>{row.driver}</CustomTableCell>
                  <CustomTableCell style={{ width: "17%" }} ></CustomTableCell>
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
