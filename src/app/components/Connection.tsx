import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

import { default as InputLabel} from '@material-ui/core/InputLabel';
import { default as FormControl} from '@material-ui/core/FormControl';
import { default as Select} from '@material-ui/core/Select';
import { FormGroup } from '@material-ui/core';

// const styles = theme => ({
//   root: {
//     display: 'flex',
//   },
//   paper: {
//     marginRight: theme.spacing.unit * 2,
//   },
// });

const styles = createStyles({
    root: {
      minHeight: '100vh',
    },
    '@media (min-width: 960px)': {
      root: {
        display: 'flex',
      },
    },
  });


class Connection extends React.Component<any, any>  {

    state = {
        age: '',
        open: false,
        //dropdown
        teams: [],
        selectedTeam: "",
        teamTables: [],
        validationError: "",
        selectedOption2: "",
      }
      componentDidMount() {
        fetch("http://localhost:8080/getDataSourceInfo")
          .then((response) => {
            return response.json();
          })
          .then(data => {
            let teamsFromApi = data.map(team => { return {value: team, display: team} })
            this.setState({ teams: [{value: '', display: '(Select your favourite Datasource)'}].concat(teamsFromApi) });
          }).catch(error => {
            console.log(error);
          });
      }

      selectedTeamChange = (value ) =>{
        alert(value);
      }
      
      handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
      };

      handleChange = event => {

        console.log(event);
        console.log(event.target);
        console.log(event.target.name);
        console.log(event.target.value);   

        this.setState({[event.target.name]:event.target.value});
        console.log(this.state.selectedTeam);
        console.log(this.state);


        fetch("http://localhost:8080/getTablesInfo?ds="+event.target.value)
        .then((response) => {
          return response.json();
        })
        .then(data => {
          let teamsFromApi = data.map(team => { return {value: team, display: team} })
          this.setState({ teamTables: teamsFromApi });
        }).catch(error => {
          console.log(error);
        });

      };
       
      handleOpen = () => {
        this.setState({ open: true });
      };

      handleClose = event => {
        // if (this.anchorEl.contains(event.target)) {
        //   return;
        // }
    
        this.setState({ open: false });
      };

      handleChange2 = (value) => {
        this.setState({selectedOption2: value})
      }

    render(){
        const { classes } = this.props;
        const { open } = this.state;

      
return (


    // <form className={classes.root} autoComplete="off">
    <FormControl>

    <div>
    <p>Connections:</p>
      <select value={this.state.selectedTeam} name="selectedTeam" 
              onChange= {this.handleChange}>
        {this.state.teams.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
      </select>
      {/* <label>{this.state.selectedTeam}</label> */}
    </div>
    <div style={{color: 'red', marginTop: '5px'}}>
        {this.state.validationError}
      </div>

    <p>Tables:</p>
        <select
          name="form-field-name" 
          value={this.state.selectedOption2}
          onChange={this.handleChange2}
          > {this.state.teamTables.map((table) => <option key={table.value} value={table.value}>{table.display}</option>)} 
      </select>
    <FormGroup>

        
        {/* <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">RDBMS</InputLabel>
        <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
            name: 'age',
            id: 'demo-controlled-open-select',
            }}
        >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            <MenuItem value={10}>SQL</MenuItem>
            <MenuItem value={20}>POstgresql</MenuItem>
            <MenuItem value={30}>Oracle</MenuItem>
            <MenuItem value={30}>Hadoop</MenuItem>

        </Select>
        </FormControl> */}
        
        {/* <Button className={classes.button} onClick={this.handleOpen}>
        DataSource
        </Button>  */}

 {/* <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">Table</InputLabel>
        <Select
            open={this.state.open1}
            onClose={this.handleCloseTabel}
            onOpen={this.handleOpenTabel}
            value={this.state.age}
            onChange={this.handleChangeTabel}
            inputProps={{
            name: 'age',
            id: 'demo-controlled-open-select',
            }}
        >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            <MenuItem value={10}>SQL</MenuItem>
            <MenuItem value={20}>POstgresql</MenuItem>
            <MenuItem value={30}>Oracle</MenuItem>
            <MenuItem value={30}>Hadoop</MenuItem>

        </Select>

     </FormControl> */}
        {/* </form> */}
        </FormGroup>
        </FormControl>
    
 
  );
}
}


export default withStyles(styles)(Connection);

{/* <div className={classes.root}>
//  <Paper className={classes.paper}>
//   <MenuList>
//     <MenuItem>Profile</MenuItem>
//     <MenuItem>My account</MenuItem>
//     <MenuItem>Logout</MenuItem>
//   </MenuList>
// </Paper> 
<div>
  Datasource:  
  <Button
    buttonRef={node => {
     // this.anchorEl = node;
    }}
    aria-owns={open ? 'menu-list-grow' : undefined}
    aria-haspopup="true"
    onClick={this.handleToggle}
  >
    ::::::
  </Button>
  <Popper open={open}  transition disablePortal>
    {({ TransitionProps, placement }) => (
      <Grow
        {...TransitionProps}
      //  id="menu-list-grow"
        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
      >
        <Paper>
          <ClickAwayListener onClickAway={this.handleClose}>
            <MenuList>
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
    )}
  </Popper>
</div>
</div> */}