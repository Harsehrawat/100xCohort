import { TwitterIcon } from "../../icons/Tweet";
import { YTICON } from "../../icons/YouTube";
import { DocumentIcon } from "../../icons/Document";
import { Button } from "./Button";
import { useState } from "react";
import { LogoutIcons } from "../../icons/LogOut";
import { AboutIcon } from "../../icons/About";
import { Navigate, useNavigate } from "react-router-dom";
import { nav } from "framer-motion/client";

export function SideBarItem() {
    const [activeCategory, setActiveCategory] = useState<string>("About");
    const [showLogOutModal, setShowLogOutModal] = useState(false);  // Controls logout confirmation modal
    const navigate = useNavigate();

    function handleCategory(category: string) {
        setActiveCategory(category);
        fetchCategoryData(category);
    }

    function fetchCategoryData(category: string) {
        // ToDo: Fetch data from backend based on category
        if(category === "About"){
            navigate("/homePage");
        }
        else if(category === "Tweet"){
            console.log("navigate called to :"+category)
            navigate("/content/Tweet");
        }
        else if(category === "Document"){
            navigate("/content/document");
        }
        else if(category === "YouTube"){
            navigate("/content/youtube");
        }
    }

    function makeLogOut() {
        console.log("Logging out...");
        localStorage.removeItem("token");  // Remove authentication token
        sessionStorage.clear();  // Clear session data
        // Redirect to login
        window.location.href = "/";
    }

    function handleLogOut() {
        setShowLogOutModal(true);  // Show logout confirmation modal
    }

    function closeLogOutModal() {
        setShowLogOutModal(false);  // Close modal without logging out
    }

    return (
        <div className="flex flex-col h-full items-center justify-between">
            {/* Category Section */}
            <div className="w-full flex-grow flex flex-col items-center">
                <div className="pb-10 pt-5">
                    <p className="text-black font-medium underline underline-offset-8">Category</p>
                </div>
                <div className="p-5 w-full">
                    <ul className="flex flex-col gap-4">
                        <li>
                            <Button
                                onClick={()=>handleCategory("About")}
                                variant={activeCategory === "About" ? "active-category" : "category"}
                                text="About"
                                startIcon={<AboutIcon/>}
                            />
                        </li>
                        <li>
                            <Button
                                onClick={() => handleCategory("Tweet")}
                                variant={activeCategory === "Tweet" ? "active-category" : "category"}
                                text="Tweets"
                                startIcon={<TwitterIcon />}
                            />
                        </li>
                        <li>
                            <Button
                                onClick={() => handleCategory("YouTube")}
                                variant={activeCategory === "YouTube" ? "active-category" : "category"}
                                text="YouTube"
                                startIcon={<YTICON />}
                            />
                        </li>
                        <li>
                            <Button
                                onClick={() => handleCategory("Document")}
                                variant={activeCategory === "Document" ? "active-category" : "category"}
                                text="Documents"
                                startIcon={<DocumentIcon />}
                            />
                        </li>
                    </ul>
                </div>
            </div>

            {/* Logout Button at Bottom */}
            <div className="pb-5 w-full flex justify-center">
                <Button
                    onClick={handleLogOut}
                    text="Log Out"
                    variant="log-out"
                    startIcon={<LogoutIcons />}
                />
            </div>

            {/* Logout Confirmation Modal */}
            {showLogOutModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <p className="text-lg text-black font-semibold">Are you sure you want to log out?</p>
                        <div className="flex gap-4 mt-4">
                            <Button onClick={makeLogOut} text="Yes" variant="primary" />
                            <Button onClick={closeLogOutModal} text="No" variant="secondary" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
