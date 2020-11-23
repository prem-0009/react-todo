import React, { Component } from "react";
// import validator from "validator";
// import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from 'jwt-decode'

import Todo from "./components/todo/Todo.js";
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


  componentDidMount = () => {
    
    const token = localStorage.getItem("jwtToken");
    
    if (token) {
      let decoded = jwtDecode(token);
      // console.log('decoded',decoded);

      this.setState({
        isAuth: true,
        user: {
          email: decoded.email,
          _id: decoded._id,
        },
      });
    }
  };

  auth = ()=>{
    const token = localStorage.getItem("jwtToken");
    
    if (token) {
      let decoded = jwtDecode(token);
      // console.log('decoded',decoded);

      this.setState({
        isAuth: true,
        user: {
          email: decoded.email,
          _id: decoded._id,
        },
      });
    }

  }

  logout = () => {
    localStorage.removeItem("jwtToken");
    // console.log(this.props);
    // this.props.logout();
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
    // console.log('app',this.props)
    return (
      <Router>
        {/* {isAuth ? 
          <Todo/>:null
          
        }  */}
        <Nav isAuth={this.state.isAuth} user={this.state.user}/>
        <Switch>
          
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/todo" component={Todo} />
          {/* <Route exact path="/nav" component={Nav} /> */}
        </Switch>

      </Router>
    );
  }
}

export default App;
