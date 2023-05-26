import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Login } from './Login';

type AuthProps = {};

const Auth: React.FC<AuthProps> = () => {
  return (
    <>
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-60"></div>
      <div className="w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative flex items-center justify-center w-full h-full mx-auto">
          <div className="relative w-full mx-6 bg-white rounded-lg shadow bg-gradient-to-b from-brand-orange to-slate-900">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};
export { Auth };
