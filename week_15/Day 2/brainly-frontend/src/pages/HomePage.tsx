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

  return (
    <div className="grid grid-cols-10 h-screen bg-black">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-orange-500 h-full col-span-2 p-6 shadow-xl flex flex-col"
      >
    <div className="bg-orange-500 h-screen col-span-2 p-6 shadow-xl flex flex-col fixed top-0 left-0 w-1/5">
    <SideBarItem />
  </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-black h-full col-span-8 pl-6 pr-6 flex flex-col space-y-6"
      >
        {/* Add Content Modal */}
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        {/* Header Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex items-center justify-between p-6 bg-gray-900 rounded-lg shadow-lg "
        >
          <div className="text-white text-lg font-bold">
            <p>
              Hey <span className="text-orange-400">{username}</span>,
            </p>
            <p>Welcome to <span className="text-orange-400">Second Brain</span>.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add Content"
                size="md"
                startIcon={<PlusIcon />}
              />
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                onClick={fetchLink}
                variant="secondary"
                text="Share Dashboard"
                size="md"
                startIcon={<ShareIcon />}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Message */}
        {loading && <p className="text-gray-300 text-center font-semibold animate-pulse">Loading...</p>}

        {/* 📌 Enhanced Description Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gray-900 p-8 rounded-lg shadow-lg text-white"
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-orange-500 mb-4 flex items-center gap-2">
            <BookOpenIcon className="w-8 h-8 text-orange-400" />
            What is <span className="text-white">Second Brain?</span>
          </h2>

          {/* Introduction Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-gray-800 p-5 rounded-lg shadow-md text-lg leading-relaxed mb-6"
          >
            "Second Brain" is a concept popularized by Tiago Forte in his book <i>Building a Second Brain</i>.
            It’s a **personal knowledge management system** that helps you store, organize, and retrieve
            information effortlessly, allowing your **mind to focus on creativity**.
          </motion.div>

          {/* 🚀 Features Section */}
          <h3 className="text-2xl font-semibold text-orange-400 mt-6 mb-4 flex items-center gap-2">
            <GridIcon className="w-7 h-7 text-orange-400" />
            Key Features
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {/* Feature Cards */}
            <FeatureCard
              icon={<UserIcon className="text-orange-400 w-6 h-6" />}
              title="Create & Access"
              description="Sign up and manage your personal Second Brain account."
            />
            <FeatureCard
              icon={<FilePlusIcon className="text-orange-400 w-6 h-6" />}
              title="Add Content"
              description="Store tweets, videos, and notes in one place."
            />
            <FeatureCard
              icon={<LinkIcon className="text-orange-400 w-6 h-6" />}
              title="Share Dashboard"
              description="Generate a unique link to share your saved content."
            />
            <FeatureCard
              icon={<TrashIcon className="text-orange-400 w-6 h-6" />}
              title="Delete Content"
              description="Easily remove outdated or unnecessary entries."
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* Feature Card Component */
function FeatureCard({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255, 165, 0, 0.5)" }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 p-4 rounded-lg shadow-md flex items-start gap-4"
    >
      <div className="p-2 bg-orange-500 rounded-full">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
