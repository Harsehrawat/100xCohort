import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';

const useDebounce =(val,delay)=>{
  const [debouncedValue, setDebouncedValue] = useState(val);

  useEffect( ()=>{

    let currClock = setTimeout( ()=>{
      setDebouncedValue(val);
    }, delay );

    return ()=>{
      clearTimeout(currClock);
    }

  }, [val,delay] );

  return debouncedValue;
}

function App() {
  const [inputVal,setInputVal] = useState(" ");
  const debouncedValue = useDebounce(inputVal,200);

  function change(e){
    setInputVal(e.target.value); 
  }

  useEffect( ()=>{
    console.log("search called for "+debouncedValue )
  },[debouncedValue]);


  return <>
  <input type="text" onChange={change} />
  </>
}

export default App
