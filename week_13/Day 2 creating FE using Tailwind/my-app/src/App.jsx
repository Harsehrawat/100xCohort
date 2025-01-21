import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SideBarClass1 } from './components/answers/1-basic-project'
import { SideBarToggle } from './components/icons/sideBarToggle'


function App() {
  const [sideBarOpen,setSideBarOpen] = useState(true);

  return (
  <div className='flex h-screen'>
    <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
    <MainContent/>
  </div>
  )
}
function SideBar({sideBarOpen,setSideBarOpen}){
  
  if(!sideBarOpen){
    return(
      <div className='bg-yellow-300 w-6 h-screen '>
        <SideBarToggle sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
      </div>
    )
  }
  
  return (
    <div className='bg-yellow-300 w-60 h-screen '>
      <SideBarToggle sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
    </div>
  )
}

function MainContent(){
  return(
    <div className='w-full'>
    <div className='bg-slate-300 h-24 hidden md:block'></div>
    <div className='grid grid-cols-10 m-2 gap-3'>
      <div className='h-60 bg-blue-300 rounded drop-shadow-lg md:col-span-3 md:-translate-y-12 col-span-10 '>

      </div>
      <div className='h-96 bg-pink-300 rounded md:col-span-5 col-span-10'>

      </div>
      <div className='h-80 bg-red-300 rounded drop-shadow-lg md:col-span-2 col-span-10 translate-y-4'>

      </div>
  </div>
  </div>

  )

}

export default App
