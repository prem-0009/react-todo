import React, { Component } from "react";
// import validator from "validator";
// import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import TodoView from "./components/todo/TodoView.js";
import SignIn from "./components/signin/Signin";
import SignUp from "./components/signup/Signup";
import Nav from "./components/nav/Nav";

console.clear();
class App extends Component {
  state = {
    isAuth: false,
    email: "",
    password: "",
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    isSigned: false,
    signedUpMessage: "",
  };

  render() {
    const {
      isAuth,
      email,
      password,
      emailError,
      emailErrorMessage,
      passwordError,
      passwordErrorMessage,
    } = this.state;
    console.log('app',this.props)
    return (
      <Router>
      <Nav />
        {/* {isAuth ?  */}
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
        
        //  {/* } */}

      </Router>
    );
  }
}

export default App;
