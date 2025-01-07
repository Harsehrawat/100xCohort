import { useState } from 'react'
import React from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return <div>
    <ErrorBoundary> <Card1/> </ErrorBoundary>
    <Card2/>
  </div>
}

function Card1(){

  throw new Error("error while rendering");

  return <div style={ {width : '100%',borderRadius : 20 , padding : 20, margin : 20, backgroundColor : 'lightblue'}}>
    Hi There
  </div>
}

function Card2(){

  return <div style={ {width : '100%',borderRadius : 20 , padding : 20, backgroundColor : 'lightblue'}}>
    Hi There
  </div>
}

class ErrorBoundary extends React.Component{
  constructor(props){
    super(props);
    this.state = {hasError : false};
  }

  // now on catching error change state -> return error to system -> return error statement to user
  static getDerivedStateFromError(error){
    return {hasError : true};
  }

  componentDidCatch(error,info){
    console.log("error :",error,info);
  }

  render(){
    if(this.state.hasError){
      return <h1>Something went Wrong</h1>
    }
    return this.props.children;
  }
}

export default App
