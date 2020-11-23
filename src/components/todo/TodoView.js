import React from "react";
import PropTypes from "prop-types";
import { arrayOf, shape, string } from "prop-types";

import "./Todo.css";

console.clear();

const TodoView = ({//-----------------------function
  todoList,
  handleOnDelete,
  handleOnUpdate,
  editValue,
  handleOnEdit,
  handleOnEditChange,
  disabledEditButton,
  isAuth,
}) => {
  // console.log(todoList);
  return (
    // {isAuth ?
    
    <ul>

      {todoList.map(({ id, todo, toggle }) => {
       return (
        <li key={id}>
        
        {toggle ? (
          <input
            type="text"
            //why event is needed earlier-- onChange={(event)=>handleOnEditChange(event)}
            onChange={(event) => handleOnEditChange(event)}
            name="editValue"
            value={editValue}
          />
        ) : (
          <span>{todo}</span>
        )}
        {/* --------------------edit */}
        
        {toggle ? (
          <span
            className="edit-button"
            //why onClick={(id)=>handleOnUpdate(id)} doesn't work
            onClick={() => handleOnUpdate(id)}
          >
            update
          </span>
        ) : (
          <span
            className={`edit-button 
              ${disabledEditButton ? "disable" : ""}`}
            onClick={() => handleOnEdit(id)}
          >
            edit
          </span>
        )}
        {/* -------------------------------edit */}{" "}
        <span className="delete-button " onClick={() => handleOnDelete(id)}>
          {"  "}
          delete
        </span>
      </li>
       )
      })}
    </ul>
  );
};

// Todo.propTypes = {
//  todoList:PropTypes.arrayOf(
//    PropTypes.shape({
//     id:PropTypes.string.isRequired,
//     todo: PropTypes.number.isRequired,
//    })
//  )
// }

//all the logic here

export default TodoView;
