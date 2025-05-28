import { useState } from "react";
import { useFetchContent } from "../CustomHook/useFetchContent";
import { useFetchSharableLink } from "../CustomHook/useFetchSharableLink";
import { SideBarItem } from "../Components/ui/SidebarItem";
import { CreateContentModal } from "../Components/ui/CreateContentModal";
import { Button } from "../Components/ui/Button";
import { PlusIcon } from "../icons/Plus";
import { ShareIcon } from "../icons/Share";
import { Card } from "../Components/ui/Card";
import { div } from "framer-motion/client";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, loading, error, username } = useFetchContent();
  const { fetchLink } = useFetchSharableLink();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-orange-500 p-4 shadow-md flex flex-col">
        <SideBarItem />
      </div>

      {/* Main Content */}
      <div className="w-4/5 bg-black p-6 overflow-y-auto">
        {/* Add Content Modal */}
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {/* Header Section */}
        <div className="flex items-center justify-between p-4 bg-gray-900 rounded-md">
          {/* Welcome Text */}
          <div className="text-white text-lg font-semibold">
            <p>Hey <span className="text-orange-500">{username}</span>,</p>
            <p>Welcome to Second Brain.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
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
          </div>
        </div>

        {/* Loading / Error Messages */}
        {loading && <p className="text-white text-center mt-4">Loading...</p>}
        {error && (
          <div className="text-white bg-red-500 p-4 rounded-md mt-4">
            <p>Server is currenly under maintenance </p>
          </div>
        )}

        {/* Content Grid */}
        {/* Content Grid */}
{!loading && !error && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
    {content.map(({ _id, title, link, type }) => (
      <Card key={_id} title={title} link={link} type={type} id={_id} />
    ))}
  </div>
)}

      </div>
    </div>
  );
}
