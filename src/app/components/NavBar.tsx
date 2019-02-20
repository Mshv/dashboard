import * as React from 'react';
import {default as AppBar} from '@material-ui/core/AppBar'
import {default as Toolbar} from '@material-ui/core/Toolbar'
import {default as Typography} from '@material-ui/core/Typography'
import { render } from 'react-dom';
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';


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

//   const theme = createMuiTheme({
//     typography: {
//       useNextVariants: true,
//     },
//   });


 class NavBar extends React.Component {
    render(){
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        React & Material-UI Sample Application
            </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
}

export default withRoot((NavBar));
// export default withStyles(styles)(NavBar);
