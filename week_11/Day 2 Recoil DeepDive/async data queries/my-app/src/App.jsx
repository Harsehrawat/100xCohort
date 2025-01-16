import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot,useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import axios from 'axios';
import { allNotificationsAtom, jobsAtom, meSelector } from './Atoms'

function App(){
  return (
    <RecoilRoot>
      <MainApp/>
    </RecoilRoot>
  )
  
}

function MainApp() {

  const notificationCount = useRecoilValue(allNotificationsAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const meCount = useRecoilValue(meSelector);

  return(
  <>
    <button>Network ({notificationCount.network}) </button>
    <button>Jobs ({jobsCount}) </button>
    <button>Message ({notificationCount.message}) </button>
    <button>Notification ({notificationCount.notification >99 ? "99+" : notificationCount.notification}) </button>
    <button>Me ({meCount}) </button>
  </>
  )
}

export default App
