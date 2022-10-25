import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from "@material-ui/icons/Face";

const styles = theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',  
    margin: theme.spacing(3, 0, 0)
  },
  heading:{
    margin: theme.spacing(1, 0, 1)
  },
  avatar: {
    height: 100,
    width: 100,
    backgroundColor: theme.palette.secondary.main,
  },
  icon:{
    fontSize: 100
  }
});

class LandingPage extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className="LandingPage">


      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
          <FaceIcon  fontSize="large" className={classes.icon}/>
          </Avatar>
          
          <Typography variant="h1" color="primary" align="center" gutterBottom={true} className={classes.heading}>
                 Face Auth
          </Typography>
        </Paper>
      </Container>


      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(LandingPage);