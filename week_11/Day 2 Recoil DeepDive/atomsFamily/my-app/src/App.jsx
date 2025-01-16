import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {RecoilRoot , useRecoilValue} from 'recoil'
import { todoAtomFamily } from './Atom'

function App() {
  return <RecoilRoot>
    <TodoFunction id ={1}/>
    <TodoFunction id ={2}/>
  </RecoilRoot>
}

const TodoFunction =({id}) =>{

  const fetchTodo = useRecoilValue(todoAtomFamily(id));

  return <>
    <p>{fetchTodo.title}</p>
    <p>{fetchTodo.description}</p>
  </>
}

export default App
