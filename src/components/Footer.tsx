"use client";

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Importing social media icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Left Section: Footer Links */}
          <div className="flex flex-col md:flex-row md:space-x-8 mb-4 md:mb-0">
            <a href="#" className="hover:text-gray-400 text-sm">About Us</a>
            <a href="#" className="hover:text-gray-400 text-sm">Contact Us</a>
            <a href="#" className="hover:text-gray-400 text-sm">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 text-sm">Terms of Service</a>
          </div>

          {/* Right Section: Social Media Icons */}
          <div className="flex space-x-4">
            {/* Each icon is wrapped in an anchor tag to link to respective social media pages */}
            <a href="#" className="text-white hover:text-gray-400">
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaInstagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaLinkedinIn className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom Section: Copyright Info */}
        <div className="text-center text-sm text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} Ali Arda Akkız. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
