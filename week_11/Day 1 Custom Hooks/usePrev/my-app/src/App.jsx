import { useState } from 'react'
import './App.css'
import { usePrev } from './hooks/usePrev';


function App() {
  const [state,setState] = useState(0);
  const prev = usePrev(state);

  return <>
  <p> {state} </p>
  <button onClick={ ()=>setState(c=>c+1) }>Increase Count</button>
  <p> The previous count was {prev}</p>
  </>
}

export default App
