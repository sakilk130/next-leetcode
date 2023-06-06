import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { firestore } from '@/config/firebase';
import { DBProblem } from '@/interfaces/problem';

const useGetCurrentProblem = (problemId: string) => {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [problemDifficultyClass, setProblemDifficultyClass] =
    useState<string>('');

  useEffect(() => {
    // Get problem from DB
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(firestore, 'problems', problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
        // easy, medium, hard
        setProblemDifficultyClass(
          problem.difficulty === 'Easy'
            ? 'bg-olive text-olive'
            : problem.difficulty === 'Medium'
            ? 'bg-dark-yellow text-dark-yellow'
            : ' bg-dark-pink text-dark-pink'
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemId]);

  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
};

export default useGetCurrentProblem;
