import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return <div>
    <LightBulb/> 
  </div>  
}

function LightBulb(){
  const [bulbOn,setbulbOn] = useState(true);  // use it here as it's the LCA for the components used in this project.

  return <div>
    <BulbState bulbOn={bulbOn}/>
    <ToggleBulb setbulbOn = {setbulbOn}/>
  </div>
}

function BulbState( {bulbOn}){
  return <div>
    {bulbOn ?  "Bulb on" : "Bulb off"}
  </div>
}


function ToggleBulb({setbulbOn}){
  return <div>
    <button onClick={ ()=>{ setbulbOn(c=>!c) }}>Toggle</button>
  </div>
}

export default App
