import React from 'react';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  return (
    <form className="px-4 pb-4 space-y-6">
      <h3 className="text-xl font-medium text-white">Sign in to LeetClone</h3>
      <>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Your Email
        </label>
        <input
          //   onChange={handleInputChange}
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
          //   onChange={handleInputChange}
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
        Log In
      </button>
      <a
        href="#"
        className="block text-sm text-right  text-brand-orange hover:underline"
      >
        Forgot Password?
      </a>
      <div className="text-sm font-medium text-gray-300">
        Not Registered?{' '}
        <a href="#" className="text-blue-700 hover:underline">
          Create account
        </a>
      </div>
    </form>
  );
};
export { Login };
