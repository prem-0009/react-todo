import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
// import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
// import axios from "axios";
import "./Todo.css";
import TodoView from "./TodoView";
import jwtDecode from "jwt-decode";
import axios from "axios";
// import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";

console.clear();
class Todo extends Component {
  state = {
    todoList: [],
    todoValue: "",
    isBlank: true,
    message: "",
    editValue: "",
    disabledEditButton: false,
    isAuth: false,
  };

  // componentDidMount = () => {
  //   const token = localStorage.getItem("jwtToken");

  //   if (token) {
  //     let decoded = jwtDecode(token);
  //     // console.log(decoded);

  //     this.setState({
  //       isAuth: true,
  //       user: {
  //         email: decoded.email,
  //         _id: decoded._id,
  //       },
  //     });
  //   }
  //   console.log(this.state.isAuth)
  // };
  async componentDidMount() {
    
    fetch(`http://localhost:4000/api/todo/get-todo`)
    .then(res=>res.json())
    .then((result)=>{
      let todoArray = result.map((item)=>{
        // console.log(item.todo)
        // todoList.id=item._id;
        return item
      })
      console.log(todoArray)
      this.setState({
        todoList:todoArray

      })
    })
    
    
    return;
    try {
      
      let allTodo = await `http://localhost:4000/api/todo/get-todo`;
      
      let todoArray = allTodo.map((todo) => {
        console.log(todo)
        return todo;
      });
      
      this.setState({
        todoList: todoArray,
      });

      console.log(this.state.todoList)

    } catch (e) {
      console.log(e);
    }
  }

  handleOnChange = (event) => {
    this.setState({
      isBlank: false,
      todoValue: event.target.value,
    });
    // console.log(event.target)
  };

  handleOnAdd = async () => {
    console.log(this.state.todoValue);
    let success = await axios.post(
      "http://localhost:4000/api/todo/create-todo",
      {
        // id: uuidv4(),
        todo: this.state.todoValue,
      }
    );
    return;
    let newTodo = {
      id: uuidv4(),
      todo: this.state.todoValue,
    };
    if (newTodo.todo === "") {
      this.setState({
        isBlank: "true",
        message: "write something",
      });
      return;
    }

    let newArr = [...this.state.todoList, newTodo];

    this.setState({
      todoList: newArr,
      todoValue: "",
    });

    // console.log(success);
  };

  handleOnDelete = (targetId) => {
    const copiedArr = [...this.state.todoList];

    const newArr = copiedArr.filter((item) => {
      return item.id !== targetId;
    });

    this.setState(
      {
        todoList: newArr,
        disabledEditButton: false,
      },
      () => {
        if (newArr.length === 0) {
          this.setState({
            isBlank: "true",
            message: "write something",
          });
        }
      }
    );
  };

  handleOnEdit = (targetId) => {
    let copiedArr = [...this.state.todoList];

    let editTodoValue;

    let newArr = copiedArr.map((item) => {
      if (item.id === targetId) {
        item.toggle = true; //
        editTodoValue = item.todo; //to save the item.todo value for later use
      }
      return item;
    });
    this.setState({
      todoList: newArr,

      editValue: editTodoValue, //assign' the todo value for later use in func handleOnEditChange
      disabledEditButton: true, //to disable edit buttons
    });
    console.log(newArr);
  };

  handleOnEditChange = (event) => {
    // console.log('value',event.target.value)
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOnUpdate = (targetId) => {
    let copiedArr = [...this.state.todoList];

    let newArr = copiedArr.map((item) => {
      if (item.id === targetId) {
        item.toggle = false;
        item.todo = this.state.editValue;
      }
      return item;
    });

    this.setState({
      todoList: newArr,
      disabledEditButton: false, //undisable the edit button
    });
  };

  render() {
    const {
      isAuth,
      todoList,
      isBlank,
      message,
      // editToggle,
      editValue,
      disabledEditButton,
    } = this.state;
    // console.log(this.props.isAuth);
    return (
      <div style={{ marginTop: "15%", textAlign: "center" }}>
        {/* //------------no word in input */}
        {isBlank ? <div>{message}</div> : null}
        {/* {isAuth ? <div> */}
        <input
          type="text"
          name="todoValue"
          value={this.state.todoValue}
          onChange={this.handleOnChange}
        />

        <button onClick={this.handleOnAdd}>add</button>

        <TodoView
          // handleOnChange={this.handleOnChange}
          todoList={todoList}
          handleOnDelete={this.handleOnDelete}
          // isTrue={isTrue}
          message={message}
          handleOnEdit={this.handleOnEdit}
          // editToggle={editToggle}
          handleInputUpdate={this.handleInputUpdate}
          editValue={editValue}
          handleOnChange={this.handleOnChange}
          handleOnEditChange={this.handleOnEditChange}
          handleOnUpdate={this.handleOnUpdate}
          disabledEditButton={disabledEditButton}
          componentDidMount={this.componentDidMount}
          isAuth={isAuth}
        />
        {/* </div>
           :
           null
           }  */}

        {/* <ul>
          {todoList.map(({id, todo}) => (
            <li key={id}>{todo}{'  '}
            <span
                className="edit-button"
                
            >edit</span>{'  '}
            <span
                className="delete-button"
                onClick={this.handleOnDelete}
                id={id}
            >delete</span>
            </li>
            
            
          ))} */}
        {/* </ul> */}
      </div>
    );
  }
}

export default Todo;
