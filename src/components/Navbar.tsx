'use client';
import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchContext } from '../context/SearchContext';

export default function Navbar() {
  const { query, setQuery, handleSearch } = useContext(SearchContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
      <div className="text-2xl font-bold">Movie App</div>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="text-black w-72 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="hidden">Search</button>
      </form>
      <div className="relative">
        <div
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Image
            src="/avatar.png"
            alt="Profile"
            height={50}
            width={50}
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
              <Link href="/profile" className='block px-4 py-2 hover:bg-gray-200'>
                Profile
              </Link>
              <Link href="/settings" className='block px-4 py-2 hover:bg-gray-200'>
                Settings
              </Link>
              <Link href="/logout" className='block px-4 py-2 hover:bg-gray-200'>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}