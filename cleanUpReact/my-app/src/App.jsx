import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  function increaseCount() {
    setCount1((c) => c + 1);
  }

  function decreaseCount() {
    setCount2((c) => c - 1);
  }

  return (
    <div>
      {/* Pass count1 and count2 as props to the Count component */}
      <Count count1={count1} count2={count2} />
      <button onClick={increaseCount}>Increase Count</button>
      <button onClick={decreaseCount}>Decrease Count</button>
    </div>
  );
}

function Count(props) {
  useEffect(() => {
    console.log('mount');
    return () => {
      console.log('unmount');
    };
  }, []); 

  // For decrease
  useEffect(() => {
    console.log('count has changed!');
    return () => {
      console.log('clean up called!');
    };
  }, [props.count1]); 

  // Return of Count function
  return (
    <div>
      Counter1: {props.count1} <br />
      Counter2: {props.count2}
    </div>
  );
}

export default App;
