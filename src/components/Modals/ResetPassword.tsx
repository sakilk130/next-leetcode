import React, { useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';

import { auth } from '@/config/firebase';

import { LoadingCircle } from '../Icons';

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);
    if (success) {
      toast.success('Password reset email sent');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <form
      className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
      onSubmit={handleReset}
    >
      <h3 className="text-xl font-medium text-white">Reset Password</h3>
      <p className="text-sm text-white ">
        Forgotten your password? Enter your e-mail address below, and we&apos;ll
        send you an e-mail allowing you to reset it.
      </p>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Your email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s disabled:opacity-50 disabled:cursor-progress"
        disabled={sending}
      >
        <span className="flex items-center justify-center">
          {sending && <LoadingCircle />}
          Reset Password
        </span>
      </button>
    </form>
  );
};
export { ResetPassword };
