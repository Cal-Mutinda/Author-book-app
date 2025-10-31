import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMenuBook } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';

import avatarImg from '../assets/avatar.png';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Orders', href: '/orders' },
  { name: 'Cart Page', href: '/cart' },
  { name: 'Check-Out', href: '/checkout' },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentuser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <nav className="max-w-screen-2xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-5 md:gap-10">
          <Link to="/" className="flex items-center gap-2">
            <MdOutlineMenuBook className="size-12" />
            <span className="text-xl font-semibold "><i>E-book Center</i></span>
          </Link>

          {/* Search Input */}
          {/* <div className="relative sm:w-72 w-40 space-x-2">
            <CiSearch className="absolute inset-y-2 left-3 size-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search here..."
              className="bg-gray-100 w-full py-2 md:px-10 px-6 rounded-md focus:outline-none text-sm"
            />
          </div> */}
        </div>

        {/* Right Side */}
        <div className="relative flex items-center space-x-3 md:space-x-4">
          <div>
            {currentuser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="User Avatar"
                    className={`size-8 rounded-full ${
                      currentuser ? 'ring-2 ring-blue-500' : ''
                    }`}
                  />
                </button>
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <FaRegUserCircle className="size-6 text-gray-600" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block text-gray-600">
            <FaRegHeart className="size-6" />
          </button>

          <Link
            to="/cart"
            className="bg-[#FFCE1A] p-2 sm:px-4 flex items-center rounded-md text-black"
          >
            <FaShoppingCart className="size-5" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;