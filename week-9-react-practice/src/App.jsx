import { useEffect } from "react";
import { useState } from "react";


function App() {
  let [counterVisibility,setCounterVisibility] = useState(true);

  // now create a useEffect of setCounterVisibility that will turn it true and false in every 5 seconmds
  useEffect( () => {
    const visibility = setInterval( () => {
      setCounterVisibility( currState => !currState);
    },5000);

    return() => {
      clearInterval(visibility);
    }
  },[] );

  return <div>
    Hi There !
    { counterVisibility ? <Counter></Counter> : null}
  </div>
}



function Counter(){
  // first define return function {components of html to be on webPage}
  // then try writing counter useState and to display count+1 with each second use useEffect
  const [counter,setCount] = useState(0);
  
  useEffect( () => {
    console.log("Mounted");
    const clock = setInterval( () => {
      setCount(counter => counter+1);
    },1000 );

    return () => {
      clearInterval(clock);  // will then clear the cycle of counter
      console.log("Unmounted!");
    }
  },[] );

  return <div>
    <h1>{counter}</h1>
    <button onClick={()=> setCount((counter) => counter+1)}>Increase Count</button>
  </div>
}

export default App

