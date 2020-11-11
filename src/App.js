import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Todo from './components/Todo.js'
import TodoView from './components/TodoView.js';



class App extends Component {
  
  render() {
    
    return (
      <div>
        

      <TodoView/>
      <Todo/>


        
      </div>
    )
  }
}


export default App;
