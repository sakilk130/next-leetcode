import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { authModalAtom } from '@/atoms/authModalAtom';

const useCloseModal = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);

  const closeModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false, type: 'login' }));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return closeModal;
};

export { useCloseModal };
