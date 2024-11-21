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
          <Link to="/email-templates" className='hover:text-cyan-700'>Email Templates</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
 

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//   const location = useLocation();

//   const navItems = [
//     { name: 'Dashboard', path: '/posts' },
//     { name: 'All Posts', path: '/allposts' },
//     { name: 'Create Posts', path: '/dashboard' },
//   ];

//   return (
//     <div className="bg-gray-200 w-2/4 h-screen p-4 sticky top-0">
//       <h2 className="font-bold text-xl mb-6 text-center">Admin Dashboard</h2>
//       <ul className="space-y-4">
//         {navItems.map((item) => (
//           <li key={item.path}>
//             <Link
//               to={item.path}
//               className={`block p-2 rounded hover:bg-blue-200 ${
//                 location.pathname === item.path ? 'bg-blue-300' : ''
//               }`}
//             >
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
