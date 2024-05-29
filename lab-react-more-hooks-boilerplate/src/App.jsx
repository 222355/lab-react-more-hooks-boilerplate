import React from "react";
import { useReducer } from "react";
import { useRef } from "react";
import "./App.css";

export default function App() {
  const initialTodo = {
    inputValue: "",
    tasks: [],
  };
  const todoReducer = (state, action) => {
    switch (action.type) {
      case "SET_INPUT":
        return { ...state, inputValue: action.value };
      case "ADD_TASK":
        return {
          ...state,
          tasks: [
            ...state.tasks,
            { id: Date.now(), text: state.inputValue, hidden: false },
          ],
          inputValue: "",
        };
      case "TOGGLE_TASK":
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.id ? { ...task, hidden: !task.hidden } : task
          ),
        };
      default:
        return state;
    }
  };
  const [todo, dispatch] = useReducer(todoReducer, initialTodo);
  const inputRef = useRef(null);
  const handleInput = (event) => {
    dispatch({ type: "SET_INPUT", value: event.target.value });
  };
  const handleTask = (event) => {
    if (event.key == "Enter") {
      dispatch({ type: "ADD_TASK" });
    }
  };
  const toggleTask = (id) => {
    dispatch({ type: "TOGGLE_TASK", id });
  };

  return (
    <div className="page">
      <hr className="horizontalLine" />
      <input
        ref={inputRef}
        className="inputText"
        type="text"
        value={todo.inputValue}
        onChange={handleInput}
        onKeyDown={handleTask}
      />
      <ul>
        {todo.tasks.map((task) => (
          <li className="todoTask" key={task.id}>
            <button className="task-btn" onClick={() => toggleTask(task.id)}>
              Toggle
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          inputRef.current.scrollIntoView({ behavior: "smooth" });
          inputRef.current.focus();
        }}
      >
        Scroll Up
      </button>
    </div>
  );
}
