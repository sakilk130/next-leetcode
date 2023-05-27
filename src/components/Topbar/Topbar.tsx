import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TopbarProps {}

const Topbar: React.FC<TopbarProps> = () => {
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
          <Link href="/auth">
            <button className="px-2 py-1 rounded cursor-pointer bg-dark-fill-3 ">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export { Topbar };
