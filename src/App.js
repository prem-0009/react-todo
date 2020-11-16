import React, { Component } from "react";


// import Todo from "./components/Todo.js";
import TodoView from "./components/TodoView.js";
import validator from "validator";
// import validator from "validator";

class App extends Component {
  state = {
    isAuth: false,
    email:'',
    password:'',
    emailError:false,
    emailErrorMessage:'',
    passwordError:false,
    passwordErrorMessage:'',
  };

  handleOnSubmit = ()=>{
    
  }

  handleOnChangeEmail = (event)=>{
    // console.log(event)
    this.setState({

      [event.target.name]:event.target.value,
    },()=>{
      const {email}= this.state;
      let isEmail = validator.isEmail(email);
      if(!isEmail){
        this.setState({
          emailError:true,
          emailErrorMessage:'put correct email',
        })
      } else if (isEmail){
        this.setState({
          emailError: false,
          emailErrorMessage:'',
        })
      }
      
    })
  }
  
  handleOnChangePassword=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    },()=>{
      let {password} = this.state;
      let  regularExpression = `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/`;
      let isPassword = validator.matches(password, 
        regularExpression
        )
      
      if(!isPassword ){
        this.setState({
          passwordError:true,
          passwordErrorMessage:'enter correct format'
        })
      } else if(password){
        this.setState({
          passwordError:false,
          passwordErrorMessage:''
        })
      }

    })
  }


  render() {
    const { isAuth,email,password,emailError
    ,emailErrorMessage,passwordError,
  passwordErrorMessage, } = this.state;
    return (
      <div>
        {emailError ? 
        (<div>  {emailErrorMessage}  </div>):(null)}
        
        {passwordError ? 
        <div>{passwordErrorMessage}</div>:  null   }

        {isAuth ? (
          <TodoView />
        ) : (
          <form 
            onSubmit={this.handleOnSubmit}
            style={{ textAlign: "center", marginTop: "100px" }}>
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
            password<br/>
            <button onClick={this.handleOnSubmit}>sign up</button>
          </form>
        )}
      </div>
    );
  }
}

export default App;
