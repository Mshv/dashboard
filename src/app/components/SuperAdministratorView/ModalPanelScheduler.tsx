import * as React from "react";
import { default as Button } from '@material-ui/core/Button';
import { default as TextField } from '@material-ui/core/TextField';
import { default as Dialog } from '@material-ui/core/Dialog';
import { default as DialogActions } from '@material-ui/core/DialogActions';
import { default as DialogContent } from '@material-ui/core/DialogContent';
import { default as DialogContentText } from '@material-ui/core/DialogContentText';
import { default as DialogTitle } from '@material-ui/core/DialogTitle';
import { default as Divider } from '@material-ui/core/Divider';
import { FormControlLabel, Radio, Checkbox, FormControl, FormLabel, FormHelperText, InputLabel, RadioGroup } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  radio: {
    display: 'flex',
  }
});

// interface IModalPanelScheduler {
//   classes: PropTypes.object.isRequired,
// }

class ModalPanelScheduler extends React.Component<any, any> {

  // static propTypes = {
  //   classes: PropTypes.object.isRequired,
  // };

  state = {
    open: false,

    valueRadioGroupMonths: '',
    checkedJan: '',
    checkedFeb: '',
    checkedMar: '',
    checkedApr: '',
    checkedMay: '',
    checkedJun: '',
    checkedJul: '',
    checkedAug: '',
    checkedSep: '',
    checkedOct: '',
    checkedNov: '',
    checkedDec: '',

    valueRadioGroupDays: '',
    checkedSun: '',
    checkedMon: '',
    checkedTue: '',
    checkedWed: '',
    checkedThr: '',
    checkedFri: '',
    checkedSat: '',

    checked1: '',
    checked2: '',
    checked3: '',
    checked4: '',
    checked5: '',
    checked6: '',
    checked7: '',
    checked8: '',
    checked9: '',
    checked10: '',
    checked11: '',
    checked12: '',
    checked13: '',
    checked14: '',
    checked15: '',
    checked16: '',
    checked17: '',
    checked18: '',
    checked19: '',
    checked20: '',
    checked21: '',
    checked22: '',
    checked23: '',
    checked24: '',
    checked25: '',
    checked26: '',
    checked27: '',
    checked28: '',
    checked29: '',
    checked30: '',
    checked31: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  change = event => {
    this.setState({ value: event.target.value });
  };

  handleChangeRadio = event => {
    this.setState({ value: event.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      // <div>
      //   <img height='100px' width='100px' src={require('../../images/home.png')}/>
      // </div>

      <div>

        <FormLabel>Mapping Trigger Schedule</FormLabel>
        {/* <Box m={0.5} /> // margin: 4px; */}
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} size="small">
          ...
      </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Data Anonymization Schedule</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To Schedule Data Anonymization
          </DialogContentText>

            <div />
            <Divider variant="middle" />
            <DialogContentText>
              Months >
          </DialogContentText>

            <RadioGroup
              aria-label="Months"
              name="month"
              value={this.state.valueRadioGroupMonths}
              className={classes.radio}
              // onChange={this.handleChangeRadio}
              onClick= {this.handleChangeRadio}
            >
              <FormControlLabel value="everyMonth" control={<Radio color="primary" />} label="Every Month" />
              <FormControlLabel value="specificMonths" control={<Radio color="primary" />} label="Specific Months" />
            </RadioGroup>



            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedJan}
                  onChange={this.handleChange('checkedJan')}
                  value="checkedJan"
                />
              }
              label="Jan"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedFeb}
                  onChange={this.handleChange('checkedFeb')}
                  value="checkedFeb"
                />
              }
              label="Feb"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedMar}
                  onChange={this.handleChange('checkedMar')}
                  value="checkedMar"
                />
              }
              label="Mar"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedApr}
                  onChange={this.handleChange('checkedApril')}
                  value="checkedApril"
                />
              }
              label="Apr"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedMay}
                  onChange={this.handleChange('checkedMay')}
                  value="checkedMay"
                />
              }
              label="May"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedJun}
                  onChange={this.handleChange('checkedJun')}
                  value="checkedJun"
                />
              }
              label="Jun"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedJul}
                  onChange={this.handleChange('checkedJul')}
                  value="checkedJul"
                />
              }
              label="Jul"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedAug}
                  onChange={this.handleChange('checkedAug')}
                  value="checkedAug"
                />
              }
              label="Aug"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedSep}
                  onChange={this.handleChange('checkedSep')}
                  value="checkedSep"
                />
              }
              label="Sep"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedOct}
                  onChange={this.handleChange('checkedOct')}
                  value="checkedOct"
                />
              }
              label="Oct"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedNov}
                  onChange={this.handleChange('checkedNov')}
                  value="checkedNov"
                />
              }
              label="Nov"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedDec}
                  onChange={this.handleChange('checkedDec')}
                  value="checkedDec"
                />
              }
              label="Dec"
            />
            <br />
            <Divider variant="middle" />
            <DialogContentText>
              Days >
            </DialogContentText>

            <RadioGroup
              aria-label="Days"
              name="day"
              value={this.state.valueRadioGroupDays}
            // onChange={this.handleChange}
            >
              <FormControlLabel value="everyDay" control={<Radio />} label="Every Day" />
              <FormControlLabel value="specificDaysOfWeek" control={<Radio />} label="Specific Day/s of Week" />
            </RadioGroup>

            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedSun}
                  onChange={this.handleChange('checkedSun')}
                  value="checkedSun"
                />
              }
              label="Sun"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedMon}
                  onChange={this.handleChange('checkedMon')}
                  value="checkedMon"
                />
              }
              label="Mon"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedTue}
                  onChange={this.handleChange('checkedTue')}
                  value="checkedTue"
                />
              }
              label="Tue"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedWed}
                  onChange={this.handleChange('checkedWed')}
                  value="checkedWed"
                />
              }
              label="Wed"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedThr}
                  onChange={this.handleChange('checkedThr')}
                  value="checkedThr"
                />
              }
              label="Thr"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedFri}
                  onChange={this.handleChange('checkedFri')}
                  value="checkedFri"
                />
              }
              label="Fri"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedSat}
                  onChange={this.handleChange('checkedSat')}
                  value="checkedSat"
                />
              }
              label="Sat"
            />
            <br />
            <RadioGroup
              aria-label="Dates"
              name="date"
              value={this.state.valueRadioGroupMonths}
            //onChange={this.handleChange1}
            >
              <FormControlLabel value="specificDaysOfWeek" control={<Radio />} label="Specific Date/s of Month" />
            </RadioGroup>

            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked1}
                  onChange={this.handleChange('checked1')}
                  value="checked1"
                />
              }
              label="1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked2}
                  onChange={this.handleChange('checked2')}
                  value="checked2"
                />
              }
              label="2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked3}
                  onChange={this.handleChange('checked3')}
                  value="checked3"
                />
              }
              label="3"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked4}
                  onChange={this.handleChange('checked4')}
                  value="checked4"
                />
              }
              label="4"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked5}
                  onChange={this.handleChange('checked5')}
                  value="checked5"
                />
              }
              label="5"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked6}
                  onChange={this.handleChange('checked6')}
                  value="checked6"
                />
              }
              label="6"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked7}
                  onChange={this.handleChange('checked7')}
                  value="checked7"
                />
              }
              label="7"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked8}
                  onChange={this.handleChange('checked8')}
                  value="checked8"
                />
              }
              label="8"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked9}
                  onChange={this.handleChange('checked9')}
                  value="checked9"
                />
              }
              label="9"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked10}
                  onChange={this.handleChange('checked10')}
                  value="checked10"
                />
              }
              label="10"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked11}
                  onChange={this.handleChange('checked11')}
                  value="checked11"
                />
              }
              label="11"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked12}
                  onChange={this.handleChange('checked12')}
                  value="checked12"
                />
              }
              label="12"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked13}
                  onChange={this.handleChange('checked13')}
                  value="checked13"
                />
              }
              label="13"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked14}
                  onChange={this.handleChange('checked14')}
                  value="checked13"
                />
              }
              label="14"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked15}
                  onChange={this.handleChange('checked15')}
                  value="checked15"
                />
              }
              label="15"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked16}
                  onChange={this.handleChange('checked16')}
                  value="checked16"
                />
              }
              label="16"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked17}
                  onChange={this.handleChange('checked17')}
                  value="checked17"
                />
              }
              label="17"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked18}
                  onChange={this.handleChange('checked18')}
                  value="checked18"
                />
              }
              label="18"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked19}
                  onChange={this.handleChange('checked19')}
                  value="checked19"
                />
              }
              label="19"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked20}
                  onChange={this.handleChange('checked20')}
                  value="checked20"
                />
              }
              label="20"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked21}
                  onChange={this.handleChange('checked21')}
                  value="checked21"
                />
              }
              label="21"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked22}
                  onChange={this.handleChange('checked22')}
                  value="checked22"
                />
              }
              label="22"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked23}
                  onChange={this.handleChange('checked23')}
                  value="checked23"
                />
              }
              label="23"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked24}
                  onChange={this.handleChange('checked24')}
                  value="checked24"
                />
              }
              label="24"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked25}
                  onChange={this.handleChange('checked25')}
                  value="checked25"
                />
              }
              label="25"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked26}
                  onChange={this.handleChange('checked26')}
                  value="checked26"
                />
              }
              label="26"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked27}
                  onChange={this.handleChange('checked27')}
                  value="checked27"
                />
              }
              label="27"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked28}
                  onChange={this.handleChange('checked28')}
                  value="checked28"
                />
              }
              label="28"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked29}
                  onChange={this.handleChange('checked29')}
                  value="checked29"
                />
              }
              label="29"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked30}
                  onChange={this.handleChange('checked30')}
                  value="checked30"
                />
              }
              label="30"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checked31}
                  onChange={this.handleChange('checked31')}
                  value="checked31"
                />
              }
              label="31"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
          </Button>
          </DialogActions>
        </Dialog>
      </div >
      //   <div>
      //   <GridContainer>
      //     <GridItem xs={12} sm={6} md={3}>
      //       <Card>
      //         <CardHeader color="warning" stats icon>
      //           <CardIcon color="warning">
      //             <Icon>content_copy</Icon>
      //           </CardIcon>
      //           <p >Used Space</p>
      //           <h3 >
      //             49/50 <small>GB</small>
      //           </h3>
      //         </CardHeader>
      //         <CardFooter stats>
      //           <div >

      //             <a href="#pablo" onClick={e => e.preventDefault()}>
      //               Get more space
      //             </a>
      //           </div>
      //         </CardFooter>
      //       </Card>
      //     </GridItem>
      //     <GridItem xs={12} sm={6} md={3}>
      //     </GridItem>
      //     <GridItem xs={12} sm={6} md={3}>
      //     </GridItem>
      //     <GridItem xs={12} sm={6} md={3}>
      //     </GridItem>
      //   </GridContainer>
      // </div>
    )
  }
}

// ModalPanelScheduler.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


export default withStyles(styles)(ModalPanelScheduler);
