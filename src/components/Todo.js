import React from "react";
import PropTypes from "prop-types";
import './Todo.css'

console.clear();
const Todo = (props) => {
  const {
    todoList,
    handleOnChange,
    handleOnDelete,
    isTrue,
    message,
    handleOnEdit,
    editToggle,
    handleOnUpdate,
    handleInputUpdate,
    editValue,
    handleOnEditChange,
  } = props;
  // console.log(todoList)
  return (
    <div>
      <ul>
        {todoList.map(({ id, todo, toggle }) => (
          <li
            // why is this necessary
            key={id}
          >
            
            {toggle ?
            (
              <input
                type="text"
                //why event is needed earlier-- onChange={(event)=>handleOnEditChange(event)}
                onChange={(event)=>handleOnEditChange(event)}
                name="editValue"
                value={editValue}
              />
            ):(
              <span
                className="disabled"
              >{todo}</span>
              
            )}

            
            {/* --------------------edit */}
            {toggle ?
              (
                <span 
                className="edit-button "
                //why onClick={(id)=>handleOnUpdate(id)} doesn't work
                onClick={()=>handleOnUpdate(id)}

                
                >update
              </span>
              ):
              (
              <span 
                className="edit-button disabled"
                onClick={()=>handleOnEdit(id)}
              >edit
              </span>

              )
            }
            {/* -------------------------------edit */ }
            {' '}
            <span className="delete-button" onClick={() => handleOnDelete(id)}>
              {'  '}
              delete
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Todo.propTypes = {

// }

//all the logic here

export default Todo;
