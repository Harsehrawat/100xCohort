import { useEffect, useState } from 'react'

import { Button } from '../Components/ui/Button'
import { PlusIcon } from '../icons/Plus'
import { ShareIcon } from '../icons/Share'


import '../App.css'
import '../index.css' 
import { Card } from '../Components/ui/Card'
import { CreateContentModal } from '../Components/ui/CreateContentModal'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useFetchContent } from '../CustomHook/useFetchContent'
import { Link } from 'react-router-dom'
import { useFetchSharableLink } from '../CustomHook/useFetchSharableLink'
import { SideBarItem } from '../Components/ui/SidebarItem'


// on opening of dashboard i'sud retrieve contents already added by user .

export function Dashboard() {
  const [modalOpen,setModalOpen] = useState(false);
  const [sharableLink,setSharableLink] = useState("");
  const [data ,setData] = useState("");

  const { content,loading, error, username } = useFetchContent();
  const { link,fetchLink} = useFetchSharableLink();
  

  
  return (
  <div className="grid grid-cols-10 h-full">
      {/* Sidebar */}
      <div className="bg-orange-500 h-full col-span-2 p-4 shadow-md">
        <SideBarItem/>
        {/* Add your sidebar content here */}
      </div>
  
      {/* Main Content */}
      <div className="bg-black h-full col-span-8 p-4">
        {/* handling add content current state */}
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />

        {/* handling header text and buttons */}
        <div className="flex items-center justify-end gap-2 ml-0 p-4">
          {/* handling header text */}
          <div className='text-xl text-white font-extrabold '>
            <div className='flex items-center'>
              <p>Hey </p>
              <p className='text-orange-500 px-1'>{username}</p>
            </div>
            <p>welcome to Second Brain.</p>
          </div>

          <div className="flex items-center gap-2 ">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="primary"
            text="Add Content"
            size="sm"
            startIcon={<PlusIcon />}
            endIcon={""}
          />
          <Button
            onClick={fetchLink}
            variant="secondary"
            text="Share Dashboard"
            size="md"
            startIcon={<ShareIcon />}
            endIcon={""}
          />
          </div>
        </div>
  
        {loading && <p>Loading...</p>}
        {error && (
          <div className="flex flex-wrap gap-2 mx-4 p-4 border-3 border-dashed border-white">
            {error}
          </div>
        )}
  
        {!loading && !error && (
          <div className="flex flex-wrap gap-2 mx-4 p-4 border-1 border-dashed border-white">  
            {content.map(({_id ,title, link, type }) => (
              <Card title={title} link={link} type={type} id={_id}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  
}


