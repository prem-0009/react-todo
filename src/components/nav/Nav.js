import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default class Nav extends Component {
  state = {
    isAuth: false,
    user: null,
  };

  // componentDidMount = () => {
  //   const token = localStorage.getItem("jwtToken");

  //   if (token) {
  //     let decoded = jwtDecode(token);
  //     console.log("decoded", decoded);

  //     this.setState({
  //       isAuth: true,
  //       user: {
  //         email: decoded.email,
  //         _id: decoded._id,
  //       },
  //     });
  //   }
  //   // console.log("hi");
  //   console.log('props did monunt',this.props)
  // };

  //   componentDidUpdate=()

  // logout = () => {
  //   localStorage.removeItem("jwtToken");
  //   this.setState({
  //     isAuth: false,
  //     user: null,
  //   });

  //   // console.log(this.props);
  //   // this.props.logout();
  // };

  logout = ()=>{
    this.props.logout();
  }

  render() {
    let nav;
    // console.log('props nav',this.props)
    if (this.props.isAuth && this.props.user !== null) {
      nav = (
        <ul style={{ listStyle: "none" }}>
          <li style={{ display: "inline" }}>
            <Link to="/signup">{this.props.user.email}</Link>
          </li>

          <li style={{ display: "inline", marginLeft: 15 }}>
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
