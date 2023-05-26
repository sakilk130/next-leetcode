import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';

import { authModalAtom } from '@/atoms/authModalAtom';
import { useCloseModal } from '@/hooks/useCloseModal';
import { Login } from './Login';
import { ResetPassword } from './ResetPassword';
import { SignUp } from './SignUp';

type AuthProps = {};

const Auth: React.FC<AuthProps> = () => {
  const { mode } = useRecoilValue(authModalAtom);
  const closeModal = useCloseModal();

  return (
    <>
      <div
        className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-60"
        onClick={closeModal}
      ></div>
      <div className="w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative flex items-center justify-center w-full h-full mx-auto">
          <div className="relative w-full mx-6 bg-white rounded-lg shadow bg-gradient-to-b from-brand-orange to-slate-900">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white"
                onClick={closeModal}
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
            {mode === 'login' ? (
              <Login />
            ) : mode === 'register' ? (
              <SignUp />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export { Auth };
