"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-blue-950 text-white px-4 py-3 md:px-6 relative">
      <div className="flex justify-between items-center">
        {/* Left: Logo */}
        <Link
          className="logo font-bold flex items-center text-lg sm:text-xl gap-2"
          href="/"
        >
          <img src="/tea.gif" width={50} alt="logo" className="w-10 h-auto" />
          <span>GetMeaChai</span>
        </Link>

        {/* Right: Support & Auth (Desktop), Support & Menu (Mobile) */}
        <div className="flex items-center gap-3">
          <Link href="/creators">
            <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg">
              Support
            </button>
          </Link>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                    className="bg-blue-700 hover:bg-blue-800 rounded-lg px-3 py-2 text-sm"
                  >
                    Welcome {session.user.email}
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow z-10">
                      <ul className="py-2 text-sm">
                        <li>
                          <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100">
                            Your Page
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => signOut()}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl rounded px-3 py-2 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl rounded px-3 py-2 text-sm">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile: Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 w-full bg-blue-900 z-50 shadow-lg"
        >
          <div className="flex flex-col p-4 gap-3 text-sm">
            {session ? (
              <>
                <span className="text-white font-medium">Welcome {session.user.email}</span>
                <Link href="/dashboard">
                  <span className="block px-2 py-1 rounded hover:bg-blue-800">
                    Dashboard
                  </span>
                </Link>
                <Link href={`/${session.user.name}`}>
                  <span className="block px-2 py-1 rounded hover:bg-blue-800">
                    Your Page
                  </span>
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                  className="bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl rounded px-4 py-2 text-white"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl rounded px-4 py-2 text-white">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
