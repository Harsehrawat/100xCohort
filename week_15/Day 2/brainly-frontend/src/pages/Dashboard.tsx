import { useState } from 'react'

import { Button } from '../Components/ui/Button'
import { PlusIcon } from '../icons/Plus'
import { ShareIcon } from '../icons/Share'


import '../App.css'
import '../index.css' 
import { Card } from '../Components/ui/Card'
import { CreateContentModal } from '../Components/ui/CreateContentModal'

export function Dashboard() {
  const [modalOpen,setModalOpen] = useState(false);

  return <div className='bg-slate-300 h-full w-screen'>
   <div className=' '>
    <CreateContentModal open={modalOpen} onClose={()=>{
      setModalOpen(false);
    }}/>
    <div className='flex justify-end gap-2 p-3 '>
    <Button onClick={ ()=>{
      setModalOpen(true);
    }} variant='primary' text='Add Content' size='sm' startIcon={<PlusIcon/>} endIcon={""} />
    <Button variant='secondary' text='Share Dashboard' size='sm' startIcon={<ShareIcon/>} endIcon={""}/>
    </div>
    <div className='flex flex-wrap gap-2 mx-4 p-4 border-3 border-dashed border-white'>
    <Card title='inspire' type='Tweet' link='https://x.com/harsehrawatPC/status/1751321640070471761'/>
    <Card title='inspire' type='Youtube' link='https://www.youtube.com/watch?v=ND0UeXeHB4A'/>
    <Card title='leetcode' type='Document' link='https://leetcode.com/u/harsehrawat/'/>

    </div>
  </div>
  </div>
  
}


