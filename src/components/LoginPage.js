import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Webcam from "react-webcam";
import { FaceAuthLogin } from 'api/ApiUrls'
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from "components/SnackbarContentWrapper";

const styles  = theme => ({
  webcam:{
    width:"95%",
    height:"95%",
    margin: theme.spacing(1, 1, 1),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatarProgress: {
    position: 'absolute',
    zIndex: 1,
    top: -6,
    left: -6
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
});

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      dataUri: "",
      loading: false,    
      isError: false,
      errorMessage: ""
   };
  }
  
  handleError = (response) => {
    if (!response.ok) {

        this.setState({
          isError: true,     
          loading: false
        })
    }
};

  setRef = webcam => {
    this.webcam = webcam;
  };
 
  capture = () => {

  let dataUri = this.webcam.getScreenshot()

  this.setState({
    loading: true
    })

  fetch(FaceAuthLogin, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      DataUri: dataUri,
      Email: this.state.email
    })
  })
  .then(response => {
    this.handleError(response);
    return response.json()
  })
  .then(data => {

    this.setState({
    loading: false
    })

    if(this.state.isError){
      this.setState({
        errorMessage: data
       })
    }

    if(!this.state.isError){
    sessionStorage.setItem("fullName",data.userData)
    this.props.history.push("/welcome")
    }    

  })
  .catch(error => {
    this.handleError(error)
    console.error(error)
  });
  
  };
 
  handleChange = input => e => {
    this.setState({
        [input]: e.target.value
    });
  }

  handleClose = () => {
    this.setState({
      isError: false
    });
  }

  render(){
    const {email} = this.state;
    const values = {email}

    const { classes } = this.props;


    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
  
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.wrapper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>         
          { this.state.loading && <CircularProgress size={68} className={classes.avatarProgress}/> }
        </div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Paper>
              <Webcam
                audio={false}
                imageSmoothing={true}
                ref={this.setRef}
                className={classes.webcam}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints} />
          </Paper>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={this.handleChange("email")}
            defaultValue={values.email}
            autoComplete="email"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.capture}
            className={classes.submit}
          >
            Sign In
          </Button>
          { 
            this.state.isError && 
            <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            onClose={this.handleClose}
            open={this.state.isError}
            autoHideDuration={6000}>
            <SnackbarContentWrapper
              variant="error"
              className={classes.margin}
              message={this.state.errorMessage}
            />
          </Snackbar>           
          }
        </form>
      </div>
    </Container>
    );
  } 
} 

export default withStyles(styles, { withTheme: true })(LoginPage);