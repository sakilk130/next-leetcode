import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { authModalAtom } from '@/atoms/authModalAtom';
import { auth } from '@/config/firebase';

import { Logout } from '../Buttons';

interface TopbarProps {}

const Topbar: React.FC<TopbarProps> = () => {
  const [user] = useAuthState(auth);
  const authModal = useSetRecoilState(authModalAtom);

  const handleClick = useCallback(() => {
    authModal((prev) => ({ ...prev, isOpen: true, mode: 'login' }));
  }, [authModal]);

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div className="flex w-full items-center justify-between max-w-[1200px] mx-auto">
        <Link href="/" className="h-[22px] flex-1">
          <Image
            src="/logo-full.png"
            alt="Logo"
            height={100}
            width={100}
            loading="lazy"
          />
        </Link>
        <div className="flex items-center justify-end flex-1 space-x-4">
          <div>
            <a
              href="https://www.buymeacoffee.com/burakorkmezz"
              target="_blank"
              rel="noreferrer"
              className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
            >
              Premium
            </a>
          </div>
          {user ? (
            <>
              <div className="relative cursor-pointer group">
                <img
                  src="/avatar.png"
                  alt="user profile"
                  className="w-8 h-8 rounded-full"
                />
                <div className="absolute z-40 p-2 mx-auto transition-all duration-300 ease-in-out scale-0 rounded shadow-lg top-10 left-2/4 -translate-x-2/4 bg-dark-layer-1 text-brand-orange group-hover:scale-100">
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
              <Logout />
            </>
          ) : (
            <Link href="/auth" onClick={handleClick}>
              <button className="px-2 py-1 rounded cursor-pointer bg-dark-fill-3 ">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export { Topbar };
