import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        // backgroundColor: 'gray',
        // color: 'white',
        // padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card>
        <div>
          <h1>Another Card</h1>
          <input type="text" placeholder="Enter your name" />
          <div>This card has some content</div>
        </div>
      </Card>
      <div>
        <Card children={'Hi There'} />
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '20px',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor : 'lightblue'
      }}
    >
      {children}
    </div>
  );
}

export default App;
