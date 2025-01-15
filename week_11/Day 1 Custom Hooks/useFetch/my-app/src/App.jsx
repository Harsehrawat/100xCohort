import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import { useFetch, usePostTitle } from './hooks/useFetch';

function App() {
  const [post,setPost] = useState(1);

  const postTitle = usePostTitle();

  const { finalData } = useFetch("https://jsonplaceholder.typicode.com/todos/"+ post);

  return <div>
    <button onClick={ ()=>{setPost(1)} }>1</button>
    <button onClick={ ()=>{setPost(2)} }>2</button>
    <button onClick={ ()=>{setPost(3)} }>3</button>
    <p>{postTitle}</p>
    <p>{JSON.stringify(finalData)}</p>
  </div>
}

export default App
