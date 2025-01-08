import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const timer = useRef();

  function startTimer(){
    // take the count and increase it.
    let val = setInterval(()=>{
      setCount(c => c+1);
    }, 1000);

    timer.current = val;
  }

  function stopTimer(){
    clearInterval(timer.current);
  }

  return <div>
    {count}
    <button onClick={startTimer}> Start </button>
    <button onClick={stopTimer}> Stop </button>
  </div>
}

export default App
