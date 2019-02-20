import * as React from "react";
import { default as FormControlLabel } from "@material-ui/core/FormControlLabel";
import { default as Checkbox } from "@material-ui/core/Checkbox";
import green from "@material-ui/core/colors/green";
import { withStyles } from "@material-ui/core/styles";
import { Grid, FormControl } from "@material-ui/core";

interface CheckboxProps {
  handleCheckboxChange: any;
  label: string;
  isCheckedItem: boolean;
}

const styles = {
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  rootGrid: {
    flexGrow: 1,
  },
  checked: {}
};

class CheckboxComponent extends React.Component<any, any> {
  state = {
    isChecked: this.props.isCheckedItem
  };

  toggleCheckboxChange = () => {
    console.log("toggleCheckboxChange");
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));
    handleCheckboxChange(label, !this.state.isChecked);
  };

  render() {
    const { label } = this.props;
    // const { isChecked } = this.state;
    const { isCheckedItem } = this.props;
    const { classes } = this.props;
    console.log("CheckboxComponent");

    return ( 
      <Grid item xs={3}>
        <FormControl className={classes.formControl}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedItem}
                onChange={this.toggleCheckboxChange}
                value={label}
                classes={{
                  root: classes.root,
                  checked: classes.checked
                }}
              />
            }
            label={label}
          /> 
        </FormControl>
      </Grid>
    );
  }
}
export default withStyles(styles)(CheckboxComponent);
