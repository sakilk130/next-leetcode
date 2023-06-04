import { useRouter } from 'next/router';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';

import { authModalAtom } from '@/atoms/authModalAtom';
import { auth } from '@/config/firebase';
import { LoadingCircle } from '../Icons';

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
  let toastId: string = '';
  const authModal = useSetRecoilState(authModalAtom);
  const router = useRouter();

  const [inputs, setInputs] = useState<{
    email: string;
    displayName: string;
    password: string;
  }>({
    email: '',
    displayName: '',
    password: '',
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = useCallback(() => {
    authModal((prev) => ({ ...prev, mode: 'login' }));
  }, [authModal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.displayName || !inputs.password) {
      return toast.error('Please fill in all fields.');
    }

    try {
      toastId = toast.loading('Creating your account...');
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      // TODO: userData value is never used
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Something went wrong! Please try again.');
    }
  }, [error]);

  return (
    <form className="px-4 pb-4 space-y-6" onSubmit={handleSubmit}>
      <h3 className="text-xl font-medium text-white">Register to LeetClone</h3>
      <>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Your Email
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
        />
      </>
      <>
        <label
          htmlFor="displayName"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Display Name
        </label>
        <input
          onChange={handleChangeInput}
          type="displayName"
          name="displayName"
          id="displayName"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="John Doe"
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
          onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="*******"
        />
      </>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s disabled:opacity-50 disabled:cursor-wait"
        disabled={loading}
      >
        <span className="flex items-center justify-center">
          {loading && <LoadingCircle />}
          Register
        </span>
      </button>
      <div className="text-sm font-medium text-gray-300">
        Already have an account?{' '}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={handleClick}
        >
          Log In
        </a>
      </div>
    </form>
  );
};
const MemorizedSignUp = memo(SignUp);
export { MemorizedSignUp as SignUp };
