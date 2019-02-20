import * as React from "react";

// import CardBody from "./Card/CardBody";

import { default as Icon } from "@material-ui/core/Icon";
// @material-ui/icons


import { default as Button } from '@material-ui/core/Button';
import { default as TextField } from '@material-ui/core/TextField';
import { default as Dialog } from '@material-ui/core/Dialog';
import { default as DialogActions } from '@material-ui/core/DialogActions';
import { default as DialogContent } from '@material-ui/core/DialogContent';
import { default as DialogContentText } from '@material-ui/core/DialogContentText';
import { default as DialogTitle } from '@material-ui/core/DialogTitle';
import { default as Divider } from '@material-ui/core/Divider';
import { RadioGroup, FormControlLabel, Radio, Checkbox, FormControl, FormLabel, FormHelperText } from "@material-ui/core";

class CronJob extends React.Component {

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

  render() {

    return (
      // <div>
      //   <img height='100px' width='100px' src={require('../../images/home.png')}/>
      // </div>

      <div>



{/*         <Button variant="outlined" color="primary" onClick={this.handleClickOpen} size="small">
          ...
      </Button> */}
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
              //onChange={this.handleChange1}
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
              <FormControlLabel value="specificDaysOfWeek" control={<Radio />} label="Specific Days of Week" />
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


            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
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


export default CronJob;
