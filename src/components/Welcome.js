import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";


class Welcome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fullName: sessionStorage.getItem('fullName')
   };
  }
  
  render() {
    const { fullName } = this.state;
    const values = { fullName }
    return (
      <div className="Welcome">
        <Typography variant="h1" align="center" color="primary" gutterBottom={true}>
          Welcome {values.fullName}
        </Typography>

      </div>
    );
  }
}
export default Welcome;