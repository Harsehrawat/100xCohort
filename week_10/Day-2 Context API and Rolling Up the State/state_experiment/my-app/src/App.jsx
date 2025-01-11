import React, { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react';

const BulbContext = React.createContext();
function BulbProvider ({children}){
  const [bulbOn,setbulbOn] = useState(true);

  return <BulbContext.Provider value={{
    bulbOn : bulbOn,
    setbulbOn : setbulbOn
  }}>
    {children}  
    {/* // return the children with values set in Provider */}
  </BulbContext.Provider>
}

function App() {
  const [bulbOn,setbulbOn] = useState(true);

  return <div>
    <BulbProvider>
      <LightBulb/>
    </BulbProvider>
  </div>  
}

function LightBulb(){
  return <div>
    <BulbState />
    <ToggleBulb  />
  </div>
}

function BulbState(){
  const {bulbOn} = useContext(BulbContext);
  return <div>
    {bulbOn ?  "Bulb on" : "Bulb off"}
  </div>
}


function ToggleBulb(){
  const {setbulbOn} = useContext(BulbContext);
  return <div>
    <button onClick={ ()=>{ setbulbOn(c=>!c) }}>Toggle</button>
  </div>
}

export default App
