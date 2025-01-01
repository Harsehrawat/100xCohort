import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [count, setCount] = useState(1);

  // i've to set count to incr. every 1 second.
  useEffect(() => {
    console.log("setInterval called");
    setInterval(increaseCount,1000);
  },[])

  function increaseCount(){
    console.log("increaseCount Called");
    setCount(c => c+1); // this is same as setCount(function(c){ return c+1 })
  }

  return <div>
    <div style={ {paddingTop: 8,paddingBottom : 8, borderRadius:15, backgroundColor : 'lightblue' , fontSize : 10}}>
      {count}
    </div>
    <img src="https://static-00.iconduck.com/assets.00/notification-icon-1837x2048-zgg2xntn.png" style={{height : 50,width : 40}} />
  </div>
}

export default App
