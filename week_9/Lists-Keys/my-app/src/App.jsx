import { useState } from 'react';
import './App.css';

function App() {
  const todos = [
    { title: "Keys should be passed whenever passing array of state var.", status: "true" },
    { title: "Upload this to GitHub", status: "false" },
  ];

  // Pass the state to Todo Component by mapping each array item with a unique key
  return (
    <div>
      {todos.map((currTodo, index) => (
        <Todo key={index} todos={currTodo} />
      ))}
    </div>
  );
}

// Pass the todos as props to the Todo component
const Todo = ({ todos }) => {
  return (
    <div>
      {todos.title} - {todos.status === "true" ? "Done" : "Pending"}
    </div>
  );
};

export default App;
