import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { authModalAtom } from '@/atoms/authModalAtom';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const auth = useSetRecoilState(authModalAtom);

  const handleClick = useCallback(() => {
    auth((prev) => ({ ...prev, isOpen: true, mode: 'login' }));
  }, [auth]);

  return (
    <div className="flex items-center justify-between px-2 sm:px-12 md:px-24">
      <Link href="/" className="flex items-center justify-center h-20">
        <Image src="/logo.png" alt="LeetClone" height={200} width={200} />
      </Link>
      <div className="flex items-center">
        <button
          type="button"
          className="px-2 py-1 text-sm font-medium text-white transition duration-300 ease-in-out border-2 border-transparent rounded-md bg-brand-orange sm:px-4 hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange"
          onClick={handleClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
const MemorizedNavbar = memo(Navbar);
export {MemorizedNavbar as Navbar };
