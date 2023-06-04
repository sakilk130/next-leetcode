import cls from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsList } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';

import { authModalAtom } from '@/atoms/authModalAtom';
import { auth } from '@/config/firebase';
import { areEqual } from '@/utils/areEqual';

import { Logout } from '../Buttons';
import { Timer } from '../Timer';

interface TopbarProps {
  problemPage?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const authModal = useSetRecoilState(authModalAtom);

  const handleClick = useCallback(() => {
    authModal((prev) => ({ ...prev, isOpen: true, mode: 'login' }));
  }, [authModal]);

  const handleProblemChange = useCallback((isNext: boolean) => {}, []);

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div
        className={cls(
          'flex w-full items-center justify-between',
          !problemPage && 'max-w-[1200px] mx-auto'
        )}
      >
        <Link href="/" className="h-[22px] flex-1">
          <Image
            src="/logo-full.png"
            alt="Logo"
            height={100}
            width={100}
            loading="lazy"
          />
        </Link>
        {problemPage && (
          <div className="flex items-center justify-center flex-1 gap-4">
            <div
              className="flex items-center justify-center w-8 h-8 rounded cursor-pointer bg-dark-fill-3 hover:bg-dark-fill-2"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
            >
              <div>
                <BsList />
              </div>
              <p>Problem List</p>
            </Link>
            <div
              className="flex items-center justify-center w-8 h-8 rounded cursor-pointer bg-dark-fill-3 hover:bg-dark-fill-2"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight />
            </div>
          </div>
        )}
        <div className="flex items-center justify-end flex-1 space-x-4">
          <div>
            <a
              href="https://www.buymeacoffee.com/"
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
                <Image
                  src="/avatar.png"
                  alt="Avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div className="absolute z-40 p-2 mx-auto transition-all duration-300 ease-in-out scale-0 rounded shadow-lg top-10 left-2/4 -translate-x-2/4 bg-dark-layer-1 text-brand-orange group-hover:scale-100">
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
              {problemPage && <Timer />}
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
const MemorizedTopbar = memo(Topbar, areEqual);

export { MemorizedTopbar as Topbar };
