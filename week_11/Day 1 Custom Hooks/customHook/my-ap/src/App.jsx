import { useState } from 'react';
import './App.css';

function useCounter() {
  const [count, setCount] = useState(0);

  function IncreaseCount() {
    setCount((c) => c + 1);
  }

  return {
    count, 
    IncreaseCount,
  };
}

function App() {
  const { count, IncreaseCount } = useCounter(); // Destructure as an object

  return (
    <div>
      <p>Count: {count}</p> {/* Display the count */}
      <button onClick={IncreaseCount}>Increase Count</button>
    </div>
  );
}

export default App;
