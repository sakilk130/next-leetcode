import { atom } from 'recoil';

export type ModeType = 'login' | 'register' | 'forgotPassword';

interface AuthModalState {
  isOpen: boolean;
  mode: ModeType;
}

const initialState: AuthModalState = {
  isOpen: false,
  mode: 'login',
};

export const authModalAtom = atom({
  key: 'authModalAtom',
  default: initialState,
});
