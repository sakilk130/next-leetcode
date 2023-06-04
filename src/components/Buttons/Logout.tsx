import React, { memo, useCallback } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';

import { auth } from '@/config/firebase';

const Logout: React.FC = () => {
  const [signOut] = useSignOut(auth);

  const handleLogout = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <button
      type="button"
      className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange"
      onClick={handleLogout}
      aria-label="logout button"
    >
      <FiLogOut />
    </button>
  );
};

const MemorizedLogout = memo(Logout);

export { MemorizedLogout as Logout };
