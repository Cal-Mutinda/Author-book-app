import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiOutlineBookOpen, HiOutlinePlusSm, HiOutlineCog, HiOutlineLogout } from "react-icons/hi"; // More elegant icons
import { BiBookContent } from "react-icons/bi"; 

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <section className="flex min-h-screen bg-gray-50 font-sans antialiased text-gray-800"> {/* Lighter, softer background */}
      {/* Sidebar - Refined Colors and Structure */}
      <aside className="hidden sm:flex sm:flex-col w-64 bg-gray-800 shadow-xl rounded-r-lg py-6 transition-all duration-300 ease-in-out">
        {/* Brand/Logo Area */}
        <div className="flex items-center justify-center h-20 px-4 mb-8">
          <Link to="/" className="inline-flex items-center text-white text-3xl font-bold tracking-tight">
            {/* You can replace this with your actual book/author logo */}
            <span className="text-red-400">Book</span> <br></br>Shelf
          </Link>
        </div>

        {/* Navigation - Modern & Classy */}
        <nav className="flex flex-col flex-grow px-4">
          {/* Dashboard Link - Active State */}
          <Link
            to="/dashboard"
            className="flex items-center p-3 text-purple-300 bg-gray-700 rounded-lg transition-colors duration-200 hover:bg-gray-600 hover:text-purple-200 mb-2"
          >
            <HiOutlineBookOpen className="h-6 w-6 mr-3" />
            <span className="font-medium">Dashboard</span>
          </Link>

          {/* Add New Book Link */}
          <Link
            to="/dashboard/add-new-book"
            className="flex items-center p-3 text-gray-300 rounded-lg transition-colors duration-200 hover:bg-gray-700 hover:text-white mb-2"
          >
            <HiOutlinePlusSm className="h-6 w-6 mr-3" />
            <span className="font-medium">Add New Book</span>
          </Link>

          {/* Manage Books Link */}
          <Link
            to="/dashboard/manage-books"
            className="flex items-center p-3 text-gray-300 rounded-lg transition-colors duration-200 hover:bg-gray-700 hover:text-white mb-2"
          >
            <BiBookContent className="h-6 w-6 mr-3" />
            <span className="font-medium">Manage Books</span>
          </Link>
        </nav>

        {/* Settings & Logout - Bottom Section */}
        <div className="mt-auto px-4 pt-4 border-t border-gray-700">
          <button className="flex items-center w-full p-3 text-gray-300 rounded-lg transition-colors duration-200 hover:bg-gray-700 hover:text-white mb-2">
            <HiOutlineCog className="h-6 w-6 mr-3" />
            <span className="font-medium">Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-gray-300 rounded-lg transition-colors duration-200 hover:bg-gray-700 hover:text-red-400"
          >
            <HiOutlineLogout className="h-6 w-6 mr-3" />
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Header - Classy & Functional */}
        <header className="flex items-center h-20 px-8 bg-white shadow-sm border-b border-gray-200">
          {/* Mobile Menu Toggle - More subtle */}
          <button className="sm:hidden relative flex-shrink-0 p-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <span className="sr-only">Menu</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>

          {/* Search Bar - Integrated & Clean */}
          <div className="relative flex-grow max-w-md ml-4 sm:ml-0">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="absolute h-5 w-5 top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              role="search"
              placeholder="Search books, authors, categories..."
              className="py-2 pl-10 pr-4 w-full border border-gray-300 focus:border-purple-400 focus:ring-purple-400 focus:ring-1 outline-none rounded-lg transition-all duration-200"
            />
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center ml-auto space-x-4">
            <button className="inline-flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg group">
              <div className="hidden md:flex md:flex-col md:items-end md:leading-tight mr-3">
                <span className="font-semibold text-sm">Admin</span>
                <span className="text-xs text-gray-500">Author Admin</span> 
              </div>
              <span className="h-10 w-10 overflow-hidden rounded-full border-2 border-gray-200 group-hover:border-purple-400 transition-colors duration-200">
                <img src="#" alt="user profile" className="h-full w-full object-cover"/>
              </span>
            </button>
            
            {/* Notifications Icon (Optional, can be removed if not needed) */}
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 hover:text-purple-600 rounded-full">
              <span className="sr-only">Notifications</span>
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow p-8 sm:p-10 bg-gray-50 overflow-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between items-start mb-8">
            <div className="mr-6">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">Dashboard</h1>
              <h2 className="text-lg text-gray-600">Manage your literary world with ease.</h2>
            </div>
            {/* Action Buttons - Grouped & Styled */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/dashboard/manage-books"
                className="inline-flex items-center px-6 py-3 border border-purple-500 text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded-lg text-base font-medium transition-colors duration-200"
              >
                <BiBookContent className="flex-shrink-0 h-5 w-5 mr-2" />
                Manage Books
              </Link>
              <Link
                to="/dashboard/add-new-book"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded-lg text-base font-medium transition-colors duration-200 shadow-md"
              >
                <HiOutlinePlusSm className="flex-shrink-0 h-6 w-6 mr-2" />
                Add New Book
              </Link>
            </div>
          </div>
          {/* Dynamic Content Outlet */}
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;