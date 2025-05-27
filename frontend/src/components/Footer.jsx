import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { GiBookshelf } from "react-icons/gi";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">About</a></li>
            <li><a href="#" className="hover:text-yellow-400">Books</a></li>
            <li><a href="#" className="hover:text-yellow-400">Contacts</a></li>
          </ul>
        </div>

        {/* Subscribe Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Subscribe for Updates</h2>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white p-2 rounded-md text-gray-900"
              required
            />
            <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-all">Subscribe</button>
          </form>
        </div>

        {/* Footer Credits and Social Icons */}
        <div className="text-center md:text-right">
          <GiBookshelf  size={60} className="flex items-center mx-auto mb-2 text-yellow-500" />
          <h2 className="text-xl font-semibold mb-4">Developed by Caleb</h2>
          <p>&copy; {new Date().getFullYear()} Caleb. All rights reserved.</p>
          <div className="flex px-6 justify-center gap-4 mt-4">
            <a href="#" className="text-white-500 hover:text-blue-600"><FaFacebook size={24} /></a>
            <a href="#" className="text-white-400 hover:text-blue-500"><FaXTwitter  size={24} /></a>
            <a href="#" className="text-white-600 hover:text-pink-700"><FaInstagram size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
