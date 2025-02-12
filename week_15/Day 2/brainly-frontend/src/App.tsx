import { useState } from 'react'

import { Button } from './Components/ui/Button'
import { PlusIcon } from './icons/Plus'
import { ShareIcon } from './icons/Share'


import './App.css'
import './index.css' 
import { Card } from './Components/ui/Card'
import { CreateContentModal } from './Components/ui/CreateContentModal'

function App() {
  const [modalOpen,setModalOpen] = useState(false);

  return <div className=''>
    <CreateContentModal open={modalOpen} onClose={()=>{
      setModalOpen(false);
    }}/>
    <div className='flex justify-end gap-2'>
    <Button onClick={ ()=>{
      setModalOpen(true);
    }} variant='primary' text='Add Content' size='sm' startIcon={<PlusIcon/>} endIcon={""} />
    <Button variant='secondary' text='Share' size='md' startIcon={<ShareIcon/>} endIcon={""}/>
    </div>
    <div className='flex gap-2 p-8'>
    <Card title='inspire' type='tweet' link='https://x.com/PsycheWizard/status/1800499471530238189'/>
    <Card title='inspire' type='youtube' link='https://www.youtube.com/watch?v=ND0UeXeHB4A'/>
    </div>
    
  </div>
  
}

export default App
