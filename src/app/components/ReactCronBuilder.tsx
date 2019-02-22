import * as React from "react";
import CronBuilder from "react-cron-builder";
import "react-cron-builder/dist/bundle.css";

class ReactCronBuilder extends React.Component {
  state = {};

  //   handleClose = () => {
  //     this.setState({ open: false });
  //   };
  function = e => {
    console.log(e);
  };

  render() {
    return (
      <div>
        <div>
          (minute) (hour) (day of month) (month of year) (day of week)
        </div>
        <CronBuilder
          cronExpression="*/4 2,12,22 * * 1-5"
          //   onChange={() => {console.log()}}
          //   onChange={::this.function}
          onChange={this.function.bind(this)}
          showResult={true}
          
        />
      </div>
    );
  }
}
export default ReactCronBuilder;
