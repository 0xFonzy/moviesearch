'use client';
import { ChangeEvent, useCallback, useContext, useEffect } from 'react';
import Image from 'next/image';
import { SearchContext } from '../context/SearchContext';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Navbar as Nav, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { debounce } from 'lodash';

export default function Navbar() {
  const { query, setQuery, handleSearch } = useContext(SearchContext);

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  const handleMovieSearch = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setQuery(value);
    debouncedSearch(value);
  }, [setQuery, debouncedSearch]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    }
  }, [debouncedSearch])

  return (
    <Nav isBlurred maxWidth='full'>
      <NavbarContent justify='start'>
        <NavbarBrand className='mr-4'>
          <Link href='/'>
            <Image src="/logo.png" alt="Logo" priority height={100} width={200} style={{ width: 'auto', height: 'auto' }} />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify='center'>
        <Input classNames={{
          base: "max-w-full h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper: "w-full p-2 border border-gray-300 rounded",
        }}
          placeholder="Search for a movie..."
          size="sm"
          startContent={<FaSearch size={18} />}
          type="search"
          value={query}
          onChange={handleMovieSearch} />
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
            <DropdownItem key="settings">Profile</DropdownItem>
            <DropdownItem key="team_settings">Settings</DropdownItem>
            <DropdownItem key="configurations">Owned Movies</DropdownItem>
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