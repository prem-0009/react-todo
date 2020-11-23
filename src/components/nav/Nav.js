import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default class Nav extends Component {
  state = {
    isAuth: false,
    user: null,
  };

  componentDidMount = () => {
    
    const token = localStorage.getItem("jwtToken");
    
    if (token) {
      let decoded = jwtDecode(token);
      console.log('decoded',decoded);

      this.setState({
        isAuth: true,
        user: {
          email: decoded.email,
          _id: decoded._id,
        },
      });
    }
  };

  logout = () => {
    localStorage.removeItem("jwtToken");
    // console.log(this.props);
    // this.props.logout();
  };

  render() {
    let nav;
    if (this.state.isAuth) {
      nav = (
        <ul>
          <li>
            <Link to="/signup">{this.state.user.email}</Link>
          </li>
          <br />
          <li>
            <Link to="/logout" onClick={this.logout}>
              log out
            </Link>
          </li>
        </ul>
      );
    } else {
      nav = (
        <div>
          <Link to="/signup">sign up here</Link>
          {<br />}
          {<br />}

          <Link to="/signin">sign in here</Link>
        </div>
      );
    }
    // console.log(this.props);

    return <div>{nav}</div>;
  }
}
