'use client';
import { useContext } from 'react';
import Image from 'next/image';
import { SearchContext } from '../context/SearchContext';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Navbar as Nav, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

export default function Navbar() {
  const { query, setQuery, handleSearch } = useContext(SearchContext);

  return (
    <Nav isBlurred maxWidth='full'>
      <NavbarContent justify='start'>
        <NavbarBrand className='mr-4'>
          <Link href='/'>
            <Image src="/logo.png" alt="Logo" height={100} width={200} />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify='center'>
        <form onSubmit={handleSearch} className='flex items-center'>
          <Input classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "w-72 p-2 border border-gray-300 rounded",
          }}
            placeholder="Search for a movie..."
            size="sm"
            startContent={<FaSearch size={18} />}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)} />
        </form>
      </NavbarContent>
      <NavbarContent as='div' className='items-center' justify='end'>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              name="Alfonso Aranzazu"
              size="sm"
              src="/avatar.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">alfonso.aranzazu@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Nav>
  );
}