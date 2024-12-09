import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-200 w-2/5 md:w-1/5 h-screen text-black p-4 sticky top-0">
      <h2 className="font-bold mb-6 text-center md:text-left text-xl md:text-xl">
        Admin Dashboard
      </h2>
      <ul className="space-y-4 ">
        <li>
          <Link to="/posts" className="hover:text-cyan-700">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/allposts" className="hover:text-cyan-700">
            All Posts
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-cyan-700">
            Create Posts
          </Link>
        </li>
        <li>
          <Link to="/gallery" className="hover:text-cyan-700">
            Gallery
          </Link>
        </li>
        <li>
          <Link to="/email-templates" className="hover:text-cyan-700">
            Email Templates
          </Link>
        </li>
         <li>
            <Link to="/subscription" className="hover:text-cyan-700">
            Create Plans
            </Link> 
        </li>
        <li>
            <Link to="/slide8" className="hover:text-cyan-700">
            Reviews
            </Link> 
        </li>
        <li>
            <Link to="/advertisement" className="hover:text-cyan-700">
            Advertisement
            </Link> 
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
