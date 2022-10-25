import React from "react";
import { ThemeProvider }  from "@material-ui/styles";
import Theme from "theme/AuthTheme";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MenuBar from "components/ManuBar";
import LandingPage from "components/LandingPage";
import LoginPage from "components/LoginPage";
import RegisterPage from "components/RegisterPage";
import Welcome from "components/Welcome";
import { makeStyles } from '@material-ui/styles';
import Background from "assets/background.jpg";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider  theme={Theme}>
      <Router>
        <header className="App-header">
          <MenuBar />
        </header>

          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/" component={LandingPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </ThemeProvider >

    </div>
  );
}

export default App;
