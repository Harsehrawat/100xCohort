import { useState } from "react";
import { motion } from "framer-motion"; // Import animations
import { Button } from "../Components/ui/Button";
import { CreateContentModal } from "../Components/ui/CreateContentModal";
import { SideBarItem } from "../Components/ui/SidebarItem";
import { PlusIcon, ShareIcon } from "lucide-react";
import { BookOpenIcon, UserIcon, FilePlusIcon, LinkIcon, TrashIcon, GridIcon } from "lucide-react";
import { useFetchContent } from "../CustomHook/useFetchContent";
import { useFetchSharableLink } from "../CustomHook/useFetchSharableLink";

export function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { username, loading } = useFetchContent();
  const { fetchLink } = useFetchSharableLink();
  const [guestViewer,setGuestViewer] = useState(false);

  return (
    <div className="grid grid-cols-10 h-screen bg-black">
      {/* Sidebar */}
      <div className="bg-orange-500 h-full col-span-2 p-6 shadow-xl flex flex-col">
        <div className="bg-orange-500 h-screen col-span-2 p-6 shadow-xl flex flex-col fixed top-0 left-0 w-1/5">
          <SideBarItem />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-black h-full col-span-8 pl-6 pr-6 flex flex-col space-y-6">
        {/* Add Content Modal */}
        {/* <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} /> */}

        {/* Header Section */}
        <div className="flex items-center justify-between p-6 bg-gray-900 rounded-lg shadow-lg ">
          <div className="text-white text-lg font-bold">
            <p>
              Hey <span className="text-orange-400">{username}</span>,
            </p>
            <p>Welcome to <span className="text-orange-400">Second Brain</span>.</p>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex items-center gap-4">
            <div>
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add Content"
                size="md"
                startIcon={<PlusIcon />}
              />
            </div>

            <div>
              <Button
                onClick={fetchLink}
                variant="secondary"
                text="Share Dashboard"
                size="md"
                startIcon={<ShareIcon />}
              />
            </div>
          </div> */}
        </div>

        {/* Loading Message */}
        {loading && <p className="text-gray-300 text-center font-semibold animate-pulse">Loading...</p>}
      </div>
    </div>
  );
}

