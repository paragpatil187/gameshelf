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
    <nav className="flex sticky top-0 items-center px-6 py-0 bg-zinc-900 h-[72px] z-[1000] max-sm:px-4 max-sm:py-0">
      <div className="flex gap-6 items-center mx-auto my-0 w-full max-w-[1600px]">
        <img
          src="https://images.pexels.com/photos/1447253/pexels-photo-1447253.jpeg"
          alt="Game Store Logo"
          className="object-cover overflow-hidden w-full h-10 aspect-square"
        />
        <div className="relative flex-1 max-w-[600px]">
          <input
            className="px-4 py-0 w-full h-10 text-sm rounded-3xl bg-zinc-700 border-[none] text-[white]"
            type="search"
            placeholder="Search games..."
            value={searchQuery}
            onInput={(event) => onSearch(event.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            aria-label="Search games"
          />
        </div>
        <nav className="flex gap-6 max-sm:hidden">
          <a
            className="text-sm no-underline text-white text-opacity-80 hover:text-opacity-100"
            href="/browse"
          >
            Browse
          </a>
          <a
            className="text-sm no-underline text-white text-opacity-80 hover:text-opacity-100"
            href="/library"
          >
            Library
          </a>
        </nav>
        {session?.user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 max-sm:hidden">
              <div className="w-8 h-8 rounded-full bg-sky-400 flex items-center justify-center text-black font-medium overflow-hidden">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  session.user.name.charAt(0)
                )}
              </div>
              <span className="text-sm text-white">{session.user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium bg-zinc-700 rounded cursor-pointer border-[none] text-white hover:bg-zinc-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className="px-4 py-2 text-sm font-medium bg-sky-400 rounded cursor-pointer border-[none] text-[black] hover:bg-sky-300 transition-colors">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
