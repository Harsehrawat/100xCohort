import { SideBarItem } from "../Components/ui/SidebarItem";
import { CreateContentModal } from "../Components/ui/CreateContentModal";
import { useFetchSharableLink } from "../CustomHook/useFetchSharableLink";
import { useState } from "react";
import { useFetchContent } from "../CustomHook/useFetchContent";
import { Button } from "../Components/ui/Button";
import { PlusIcon, ShareIcon } from "lucide-react";
import { Card } from "../Components/ui/Card";
import { SharedSideBarItem } from "../pages/SharedSideBarItem";

type TweetDashboardProps = {
  isGuestView: boolean;
};


export function TweetDashboard({isGuestView} : TweetDashboardProps){
  console.log("Inside TweetDashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const { content, loading, error, username,isEmpty } = useFetchContent("Tweet");
  const { fetchLink } = useFetchSharableLink();

  const headingGuest = (
    <>
      <p>You're viewing second brain of <span className="text-orange-500">{username}</span>.</p>
      <p>You can only view the shared content.</p>
    </>
  );
  
  const headingUser = (
    <>
      <p>Hey <span className="text-orange-500">{username}</span>,</p>
      <p>Welcome to Second Brain.</p>
    </>
  );
  
  return (
    <div className="grid grid-cols-10 h-screen">
      {/* Sidebar */}
      <div className="bg-orange-500 h-screen col-span-2 p-4 shadow-md flex flex-col">
        {isGuestView ? <SharedSideBarItem /> : <SideBarItem />}
      </div>

      {/* Main Content */}
      <div className="bg-black h-screen col-span-8 p-6 flex flex-col">
        {/* Add Content Modal */}
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {/* Header Section */}
        <div className="flex items-center justify-between p-4 bg-gray-900 rounded-md">
          {/* Welcome Text */}
          <div className="text-white text-lg font-semibold">
            {isGuestView ? headingGuest : headingUser}
          </div>

          {/* Action Buttons */}
          {!isGuestView && (<div className="flex items-center gap-3">
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add Content"
              size="sm"
              startIcon={<PlusIcon />}
            />
            <Button
              onClick={fetchLink}
              variant="secondary"
              text="Share Dashboard"
              size="md"
              startIcon={<ShareIcon />}
            />
          </div>)}
        </div>

        {/* Loading / Error Messages */}
        {loading && <p className="text-white text-center mt-4">Loading...</p>}
        {error && (
          <div className="text-white bg-red-500 p-4 rounded-md mt-4">
            <p>Server is currenly under maintenance </p>
          </div>
        )}

        {/* Content Grid */}
        {isEmpty && (
            <div className="text-white bg-red-500 p-4 rounded-md mt-4">
            <p> No content of the selected category added yet ! </p>
          </div>
        )
        }

        {!loading && !error && (
          <div className="grid grid-cols-3 gap-4 p-4 flex ">
            {content.map(({ _id, title, link, type }) => (
              <Card key={_id} title={title} link={link} type={type} id={_id} isGuestView = {isGuestView} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}