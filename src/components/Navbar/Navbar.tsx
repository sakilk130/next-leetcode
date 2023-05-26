import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="flex items-center justify-between px-2 sm:px-12 md:px-24">
      <Link href="/" className="flex items-center justify-center h-20">
        <Image src="/logo.png" alt="LeetClone" height={200} width={200} />
      </Link>
      <div className="flex items-center">
        <button
          type="button"
          className="px-2 py-1 text-sm font-medium text-white transition duration-300 ease-in-out border-2 border-transparent rounded-md bg-brand-orange sm:px-4 hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
export { Navbar };
