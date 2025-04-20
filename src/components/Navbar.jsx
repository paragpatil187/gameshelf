"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Navbar({ searchQuery, onSearch }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="sticky top-0 z-[1000] bg-zinc-900 px-4 py-3 sm:px-6 shadow-md">
      <div className="flex flex-wrap justify-between items-center max-w-[1600px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/gameLogo.png"
            alt="Game Store Logo"
            className="h-10 w-10 object-cover rounded-md"
          />
          <span className="text-white text-lg font-semibold hidden sm:inline">
            GameShelf
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 max-w-xl w-full">
          <input
            type="search"
            placeholder="Search games..."
            value={searchQuery}
            onInput={(e) => onSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full px-4 py-2 text-sm rounded-full bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-sky-400 transition-all"
          />
        </div>

        {/* Navigation + Auth Buttons */}
        <div className="flex items-center gap-4 mt-3 sm:mt-0">
          {/* Nav Links */}
          <div className="hidden sm:flex gap-4 text-white text-sm">
            <Link
              href="/browse"
              className="text-opacity-80 hover:text-opacity-100 transition-opacity"
            >
              Browse
            </Link>
            <Link
              href="/library"
              className="text-opacity-80 hover:text-opacity-100 transition-opacity"
            >
              Library
            </Link>
          </div>

          {/* Auth Section */}
          {session?.user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-400 overflow-hidden flex items-center justify-center text-black font-bold">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    session.user.name.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="text-sm text-white hidden sm:inline">
                  {session.user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-zinc-700 text-white rounded hover:bg-zinc-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 text-sm bg-sky-400 text-black rounded hover:bg-sky-300 transition-colors">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
