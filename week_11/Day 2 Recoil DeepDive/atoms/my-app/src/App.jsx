import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { connectionAtom, jobsAtom, messageAtom, myCountSelector, notificationAtom } from './Atom'
import { RecoilRoot, useRecoilValue, useRecoilState } from 'recoil'

function App(){
  return <RecoilRoot> 
    <MainApp/>
  </RecoilRoot>
}

function MainApp() {
  const connectionsCount = useRecoilValue(connectionAtom); // atom used
  const jobsCount = useRecoilValue(jobsAtom);
  const [messageCount , setMessageCount] = useRecoilState(messageAtom);
  const notificationsCount = useRecoilValue(notificationAtom);
  const myCount = useRecoilValue(myCountSelector); // selector used .
  
  
  return ( 
  <>
    <button>Home</button>
    <button>Connections ({connectionsCount}) </button>
    <button>Jobs ({jobsCount}) </button>
    <button onClick={()=>setMessageCount(messageCount+1)}>Message ({messageCount}) </button>
    <button>Notificaitons ({ notificationsCount >= 100 ? "99+" : notificationsCount}) </button>
    <button>Me ({myCount}) </button>
  </>
  )
}

export default App
