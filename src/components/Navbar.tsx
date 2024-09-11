"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  // State variables to manage the visibility of mobile menu, search modal, and account popup
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to change navbar style on scroll
  const searchInputRef = useRef<HTMLInputElement>(null); // Reference to the search input field
  const modalRef = useRef<HTMLDivElement>(null); // Reference to the search modal
  const accountPopupRef = useRef<HTMLDivElement>(null); // Reference to the account popup

  // Toggle function for the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Toggle function for the search modal
  const toggleSearchModal = () => {
    setIsSearchModalOpen((prev) => !prev);
  };

  // Toggle function for the account popup
  const toggleAccountPopup = () => {
    setIsAccountPopupOpen((prev) => !prev);
  };

  // Focus on the search input when the search modal opens
  useEffect(() => {
    if (isSearchModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchModalOpen]);

  // Effect to handle closing of modals when clicking outside or pressing the escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchModalOpen(false);
        setIsAccountPopupOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        (modalRef.current && !modalRef.current.contains(event.target as Node)) &&
        (accountPopupRef.current && !accountPopupRef.current.contains(event.target as Node))
      ) {
        setIsSearchModalOpen(false);
        setIsAccountPopupOpen(false);
      }
    };

    if (isSearchModalOpen || isAccountPopupOpen) {
      document.addEventListener('keydown', handleKeyDown); // Listen for Escape key to close modals
      document.addEventListener('mousedown', handleClickOutside); // Listen for clicks outside to close modals
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchModalOpen, isAccountPopupOpen]);

  // Effect to change navbar style based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Set scrolled state when scroll position is greater than 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-20 transition-colors duration-300 ${
          isScrolled ? 'bg-black text-white shadow-md' : 'bg-transparent text-white'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-2 py-2 md:py-4">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden mr-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-8 w-8" /> // Close icon when menu is open
              ) : (
                <Bars3Icon className="h-8 w-8" /> // Menu icon when menu is closed
              )}
            </button>

            {/* Logo */}
            <a
              href="#"
              target=""
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Image
                src="/transkriptor-text-logo.png"
                alt="Transkriptor Logo"
                className="dark:invert"
                width={150}
                height={40}
                priority
              />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {['Home', 'Movies', 'Series', 'Popular', 'New', 'My List'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:bg-white hover:text-black transition rounded px-2 py-1"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button onClick={toggleSearchModal} aria-label="Search">
              <MagnifyingGlassIcon className="h-8 w-8 text-white hover:bg-white hover:text-black rounded-full p-1 transition" />
            </button>

            {/* Account Button */}
            <button onClick={toggleAccountPopup} aria-label="Account">
              <UserCircleIcon className="h-10 w-10 text-white hover:bg-white hover:text-black rounded-full p-1 transition" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black shadow-md">
            <div className="flex flex-col items-start p-4 space-y-2">
              {['Home', 'Movies', 'Series', 'Popular', 'New', 'My List'].map((link) => (
                <a key={link} href="#" className="text-white hover:bg-white hover:text-black transition rounded px-2 py-1">
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-20 pt-16">
          <div
            ref={modalRef}
            className="bg-black rounded-lg p-6 w-full max-w-md shadow-lg mt-2"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              onClick={toggleSearchModal}
              aria-label="Close Search"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className="w-full p-3 border border-gray-700 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      )}

      {/* Account Popup */}
      {isAccountPopupOpen && (
        <div
          ref={accountPopupRef}
          className="fixed top-16 right-4 bg-black text-white rounded-lg shadow-lg p-4 z-20 transform -translate-x-1/2"
        >
          <ul className="space-y-2">
            <li><a href="#" className="hover:bg-gray-700 p-2 rounded">Profile</a></li>
            <li><a href="#" className="hover:bg-gray-700 p-2 rounded">Settings</a></li>
            <li><a href="#" className="hover:bg-gray-700 p-2 rounded">Logout</a></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
