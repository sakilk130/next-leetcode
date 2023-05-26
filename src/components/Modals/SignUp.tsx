import React from 'react';

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
  return (
    <form className="px-4 pb-4 space-y-6">
      <h3 className="text-xl font-medium text-white">Register to LeetClone</h3>
      <>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Your Email
        </label>
        <input
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
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="*******"
        />
      </>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        Register
      </button>
      <div className="text-sm font-medium text-gray-300">
        Already have an account?{' '}
        <a href="#" className="text-blue-700 hover:underline">
          Log In
        </a>
      </div>
    </form>
  );
};
export { SignUp };
