import { useEffect, useState } from 'react';

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

export default useHasMounted;
