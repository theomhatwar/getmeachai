"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-950 text-white flex items-center justify-between px-4 py-3 md:px-6 relative">
      {/* Logo */}
      <Link
        className="logo font-bold flex items-center text-xl sm:text-2xl gap-2"
        href="/"
      >
        <img src="/tea.gif" width={50} alt="logo" className="w-12 h-auto" />
        <span>GetMeaChai</span>
      </Link>

      {/* Right buttons - Mobile */}
      <div className="flex items-center md:hidden gap-2">
        <Link href="/creators">
          <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg">
            Support a Creator
          </button>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-blue-900 md:hidden z-50 shadow-lg">
          <div className="flex flex-col p-4 gap-3 text-sm">
            {session ? (
              <>
                <span className="text-white font-medium">
                  Welcome {session.user.email}
                </span>
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

      {/* Desktop view */}
      <div className="hidden md:flex items-center gap-4">
        {session ? (
          <>
            {/* Welcome dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                onBlur={() =>
                  setTimeout(() => {
                    setShowDropdown(false);
                  }, 100)
                }
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center"
              >
                Welcome {session.user.email}
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown */}
              <div
                className={`${
                  showDropdown ? "" : "hidden"
                } absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-md z-10`}
              >
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.name}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
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
            </div>

            {/* Logout + Support */}
            <button
              onClick={() => signOut()}
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-4 py-2"
            >
              LogOut
            </button>
            <Link href="/creators">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                Support a Creator
              </button>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-4 py-2">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
