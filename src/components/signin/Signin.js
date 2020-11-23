import React, { Component } from "react";
import validator from "validator";
import axios from "axios";
import jwtDecode from "jwt-decode";

import Todo from "../todo/Todo";

console.clear();

class SignIn extends Component {
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
    //   console.log(this.props)
    const token = localStorage.getItem("jwtToken");

    if (token) {
      let decoded = jwtDecode(token);
    //   console.log(decoded);

      this.setState({
        isAuth: true,
        user: {
          email: decoded.email,
          _id: decoded._id,
        },
      });
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    if (!validator.isEmail(email)) {
      this.setState({
        emailError: true,
        emailErrorMessage: "enter the correct email",
      });
      return;
    } else if (validator.isEmpty(email)) {
      this.setState({
        emailError: true,
        emailErrorMessage: "enter the email",
      });
      return;
    } else if (validator.isEmpty(password)) {
      this.setState({
        passwordError: true,
        passwordErrorMessage: "enter the password",
      });
      return;
    }

    try {
      let sendToBack = await axios.post(
        "http://localhost:4000/api/user/logged-in",
        {
          email: email,
          password: password,
        }
      );
      //   this.setState({
      //     isSigned: true,
      //     // signedUpMessage://do later----------------???????????????
      //   });
      // console.log(localStorage)
      localStorage.setItem("jwtToken", sendToBack.data.token);
      console.log(localStorage);
      this.setState({
          isAuth:true,

      },()=>{
          this.props.history.push('/todo')
          console.log('props', this.props)

      })
      console.log('props2',this.state)
      //   console.log("sendback", sendToBack);
    } catch (e) {
      console.log(e);
      //   if (e && e.response.status === 409){
      //   this.setState({
      //     emailError:true,
      //     emailErrorMessage:e.response.data.message,
      //   })
      // }
    }

    // console.log("hi");
  };

  handleOnChangeEmail = (event) => {
    // console.log(event)
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        const { email } = this.state;
        let isEmail = validator.isEmail(email);
        if (!isEmail) {
          this.setState({
            emailError: true,
            emailErrorMessage: "put correct email",
          });
          return;
        } else {
          this.setState({
            emailError: false,
            emailErrorMessage: "",
          });
        }
      }
    );
  };

  handleOnChangePassword = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        let { password } = this.state;
        let regularExpression = `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/`;
        let isPassword = validator.matches(password);

        if (!isPassword) {
          this.setState({
            passwordError: true,
            passwordErrorMessage: "enter correct format",
          });
        } else if (password) {
          this.setState({
            passwordError: false,
            passwordErrorMessage: "",
          });
        }
      }
    );
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
    return (
      <div style={{ marginTop: "20%", textAlign: "center" }}>
        {emailError ? <div> {emailErrorMessage} </div> : null}

        {passwordError ? <div>{passwordErrorMessage}</div> : null}

        {/* {isAuth ? (
          <Todo />
        ) : ( */}
          <form>
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.handleOnChangeEmail}
            />
            email
            <br />
            <input
              type="text"
              name="password"
              value={password}
              onChange={this.handleOnChangePassword}
            />
            password
            <br />
            <button onClick={(event) => this.handleOnSubmit(event)}>
              sign in
            </button>
          </form>
        {/* )} */}
      </div>
    );
  }
}

export default SignIn;
