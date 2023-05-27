import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

import { authModalAtom } from '@/atoms/authModalAtom';
import { Auth } from '@/components/Modals';
import { Navbar } from '@/components/Navbar';
import { auth } from '@/config/firebase';

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const { isOpen } = useRecoilValue(authModalAtom);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const [pageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) router.push('/');
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);

  if (pageLoading) return null;

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-600 to-black">
      <div className="mx-auto max-w-7xl">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)]  pointer-events-none select-none">
          <Image
            src="/hero.png"
            alt="Hero img"
            width={700}
            height={700}
            loading="lazy"
            blurDataURL="/hero.png"
            placeholder="blur"
          />
        </div>
        {isOpen && <Auth />}
      </div>
    </div>
  );
};
export default AuthPage;
