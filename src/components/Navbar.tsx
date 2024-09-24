"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-lg p-4 z-50">
      <div className="container mx-auto flex items-center justify-between md:w-[80%] w-[100%]">
        <div className="text-black text-2xl font-bold">
          <Link href={"/"}>
            <Image src="/logo.png" width={50} height={50} alt="logo" className="" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-16">
          <Link href="/" className="text-black">
            Home
          </Link>
          <Link href="/upload" className="text-black">
            Upload
          </Link>
          <Link href="#features" className="text-black">
            Features
          </Link>
          <Link href="#footer" className="text-black">
            Contact
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleDrawer}>
            {isOpen ? (
              <FaTimes className="text-black text-2xl" />
            ) : (
              <FaBars className="text-black text-2xl" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-[100vh] w-[100%] bg-white p-6 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button onClick={toggleDrawer} className="text-black text-2xl mb-6">
          <FaTimes />
        </button>
        <nav className="space-y-6">
          <Link href="/" className="block text-black">
            Home
          </Link>

          <Link href="/" className="block text-black">
            Features
          </Link>
          <Link href="/" className="block text-black">
            Contact
          </Link>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
