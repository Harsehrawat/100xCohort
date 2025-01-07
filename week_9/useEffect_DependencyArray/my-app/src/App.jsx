import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  
  return <div>
    <CounterComponent></CounterComponent>
  </div>
  
}

function CounterComponent(){
  const [count,setCount] = useState(0);

  // useEffect with count as dependency
  useEffect( ()=>{
    console.log("Counter useEffect called!");
  },[count] );

  // useEffect with no dependency called
  useEffect( ()=>{
    console.log("Component MOunted");

    return()=>{
      console.log("Component UnMounted");
    }
  } ,[])

  function Increment(){
    setCount(count+1);
  }

  return(
    <div>
      <p>Counter : {count}</p>
      <button onClick={Increment}>Increase Count</button>
    </div>
  )

}

export default App
