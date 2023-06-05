import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { firestore } from '@/config/firebase';
import { DBProblem } from '@/interfaces/problem';

const useGetProblems = (
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [problems, setProblems] = useState<DBProblem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      try {
        setLoadingProblems(true);
        const q = query(
          collection(firestore, 'problems'),
          orderBy('order', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const tmp: DBProblem[] = [];
        querySnapshot.forEach((doc) => {
          tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
        });
        setProblems(tmp);
        setLoadingProblems(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProblems();
    return () => {
      setProblems([]);
    };
  }, [setLoadingProblems]);
  return problems;
};

export default useGetProblems;
