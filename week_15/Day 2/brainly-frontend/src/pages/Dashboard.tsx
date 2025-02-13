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

  return <div className='h-screen w-full'>
   <div className=''>
    <CreateContentModal open={modalOpen} onClose={()=>{
      setModalOpen(false);
    }}/>
    <div className='flex justify-end gap-2 '>
    <Button onClick={ ()=>{
      setModalOpen(true);
    }} variant='primary' text='Add Content' size='sm' startIcon={<PlusIcon/>} endIcon={""} />
    <Button variant='secondary' text='Share' size='md' startIcon={<ShareIcon/>} endIcon={""}/>
    </div>
    <div className='flex flex-wrap gap-2 p-8'>
    <Card title='inspire' type='tweet' link='https://x.com/harsehrawatPC/status/1801921427815186856'/>
    <Card title='inspire' type='youtube' link='https://www.youtube.com/watch?v=ND0UeXeHB4A'/>

    {/* <Card title='inspire' type='instagram' link='https://www.instagram.com/p/DEfuKoWTlRk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='/> */}
    </div>
  </div>
  </div>
  
}


