import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { ModeType, authModalAtom } from '@/atoms/authModalAtom';
import { auth } from '@/config/firebase';
import { LoadingCircle } from '../Icons';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const authModal = useSetRecoilState(authModalAtom);
  const router = useRouter();
  let toastId: string = '';
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [inputs, setInputs] = useState({ email: '', password: '' });
  const handleClick = useCallback(
    (mode: ModeType) => {
      authModal((prev) => ({ ...prev, mode }));
    },
    [authModal]
  );
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      return toast.error('Please fill in all fields.');
    }
    try {
      toastId = toast.loading('Logging in...');
      const user = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!user) return;
      toast.success('Logged in successfully!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <form className="px-4 pb-4 space-y-6" onSubmit={handleSubmit}>
      <h3 className="text-xl font-medium text-white">Sign in to LeetClone</h3>
      <>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Your Email
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
        />
      </>
      <>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Your Password
        </label>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="*******"
        />
      </>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s disabled:opacity-50 disabled:cursor-progress"
        disabled={loading}
      >
        <span className="flex items-center justify-center">
          {loading && <LoadingCircle />}
          Log In
        </span>
      </button>
      <a
        href="#"
        className="block text-sm text-right text-brand-orange hover:underline"
        onClick={() => handleClick('forgotPassword')}
      >
        Forgot Password?
      </a>
      <div className="text-sm font-medium text-gray-300">
        Not Registered?{' '}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick('register')}
        >
          Create account
        </a>
      </div>
    </form>
  );
};
export { Login };
