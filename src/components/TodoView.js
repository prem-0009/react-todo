import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";
import Todo from "./Todo";

console.clear();
class TodoView extends Component {
  state = {
    todoList: [
      {
        id: uuidv4(),
        todo: "water the plant",
        toggle: false,
      },
      {
        id: uuidv4(),
        todo: "laundry",
        toggle: false,
      },
    ],
    todoValue: "",
    isBlank: false,
    message: "",
    editValue: '',
    disabledEditButton:false,
    
  };

  handleOnChange = (event) => {

    this.setState({
      isBlank: false,
      todoValue: event.target.value,
    });
    // console.log(event.target)
  };

  handleOnAdd = () => {
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
    // console.log('new',newTodo.todo)
    let newArr = [...this.state.todoList, newTodo];

    this.setState({
      todoList: newArr,
      todoValue: "",
      ////???????????how's this working disappearing the text from input bar
    });
  };

  handleOnDelete = (targetId) => {
    const copiedArr = [...this.state.todoList];

    const newArr = copiedArr.filter((item) => {
      return item.id !== targetId;
    });

    this.setState(
      {
        todoList: newArr,
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

    let newArr = copiedArr.map((item)=>{
      if(item.id === targetId){
        item.toggle= true;//
        editTodoValue=item.todo;//to save the item.todo value for later use
      }
      return item;
    })
    this.setState({
      todoList: newArr,
      
      editValue: editTodoValue,//assign' the todo value for later use in func handleOnEditChange
      disabledEditButton: true,//to disable edit buttons
    })
    console.log(newArr)
  };

  
  handleOnEditChange = (event) =>{
    // console.log('value',event.target.value)
    this.setState({
    [event.target.name]:event.target.value
    })
    
  }

  handleOnUpdate = (targetId)=>{
    let copiedArr = [...this.state.todoList];
    
    let newArr = copiedArr.map((item)=>{
      if(item.id === targetId){
        item.toggle = false;
        item.todo = this.state.editValue;
        
      }
      return item;
    })

    this.setState({
      todoList:newArr,
      disabledEditButton:false,//undisable the edit button
    })
    
    

  }

  render() {
    const { todoList, isBlank, message, editToggle, editValue,disabledEditButton } = this.state;

    return (
      <div>
        <input
          type="text"
          name="todoValue"
          value={this.state.todoValue}
          onChange={this.handleOnChange}
        />

        <button onClick={this.handleOnAdd}>add</button>

        {isBlank ? ( //------------no word in input
          <div>{message}</div>
        ) : null}

        <Todo
          // handleOnChange={this.handleOnChange}
          todoList={todoList}
          handleOnDelete={this.handleOnDelete}
          // isTrue={isTrue}
          message={message}
          handleOnEdit={this.handleOnEdit}
          editToggle={editToggle}
          handleInputUpdate={this.handleInputUpdate}
          editValue={editValue}
          handleOnChange={this.handleOnChange}
          handleOnEditChange={this.handleOnEditChange}
          handleOnUpdate={this.handleOnUpdate}
          disabledEditButton={disabledEditButton}
        />

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

export default TodoView;
