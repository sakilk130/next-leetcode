import React, { memo } from 'react';
import { Toaster } from 'react-hot-toast';

interface ToastProviderProps {}

const ToastProvider: React.FC<ToastProviderProps> = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={true}
      toastOptions={{
        success: {
          style: {
            background: '#10B981',
            color: '#fff',
          },
        },
        error: {
          style: {
            background: '#EF4444',
            color: '#fff',
          },
        },
      }}
    />
  );
};

const MemorizedToastProvider = memo(ToastProvider);
export { MemorizedToastProvider as ToastProvider };
