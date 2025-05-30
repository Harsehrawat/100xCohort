import { Card } from "../Components/ui/Card";
import { PlusIcon, ShareIcon } from "lucide-react";
import { Button } from "../Components/ui/Button";
import { CreateContentModal } from "../Components/ui/CreateContentModal";
import { SideBarItem } from "../Components/ui/SidebarItem";
import { SharedSideBarItem } from "../pages/SharedSideBarItem";
import { useFetchSharableLink } from "../CustomHook/useFetchSharableLink";
import { useFetchContent } from "../CustomHook/useFetchContent";
import { useState } from "react";

type DocumentDashboardProp = {
  isGuestView: boolean;
};

export function DocumentDashboard({ isGuestView }: DocumentDashboardProp) {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, loading, error, username, isEmpty } = useFetchContent("Document");
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-orange-500 p-4 shadow-md flex flex-col">
        {isGuestView ? <SharedSideBarItem /> : <SideBarItem />}
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
            {isGuestView ? headingGuest : headingUser}
          </div>

          {/* Action Buttons */}
          {!isGuestView && (
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
          )}
        </div>

        {/* Loading / Error Messages */}
        {loading && <p className="text-white text-center mt-4">Loading...</p>}
        {error && (
          <div className="text-white bg-red-500 p-4 rounded-md mt-4">
            <p> {error} </p>
          </div>
        )}

        {/* Empty State */}
        {isEmpty && (
          <div className="text-white bg-red-500 p-4 rounded-md mt-4">
            <p>No content of the selected category added yet!</p>
          </div>
        )}

        {/* Content Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {content.map(({ _id, title, link, type }) => (
              <Card
                key={_id}
                title={title}
                link={link}
                type={type}
                id={_id}
                isGuestView={isGuestView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
