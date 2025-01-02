import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [currentTodo,setCurrentTodo] = useState(1);
  const [todoData,setTodoData] = useState({}); // initially empty
  const [loadingBar, setLoadingBar] = useState(true); 

  useEffect(()=>{
    setLoadingBar(true);
    fetch("https://jsonplaceholder.typicode.com/todos/"+currentTodo)
    .then(
      async res =>{
        const data = await res.json();
        setTodoData(data);
        setLoadingBar(false);
      }
    )
  } ,[currentTodo]);

  return <div>
    <button onClick={ ()=>{
      setCurrentTodo(1);
    }} style={ {color : currentTodo == 1 ? 'red' : 'black'}}>ToDo #1</button>
    <button onClick={ ()=>{
      setCurrentTodo(2);
    }} style={ {color : currentTodo == 2 ? 'red' : 'black'}}>ToDo #2</button>
    <button onClick={ ()=>{
      setCurrentTodo(3);
    }} style={ {color : currentTodo == 3 ? 'red' : 'black'}}>ToDo #3</button>
    <button onClick={()=>{
      setCurrentTodo(4);
    }} style={ {color : currentTodo == 4 ? 'red' : 'black'}}>ToDo #4</button>
    <div> {loadingBar ? "loading..." : todoData.title } </div>
  </div>
  
}

export default App
