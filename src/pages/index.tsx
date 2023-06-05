import { useState } from 'react';

import { ProblemsTable } from '@/components/ProblemsTable';
import { Topbar } from '@/components/Topbar';
import useHasMounted from '@/hooks/useHasMounted';

export default function Home() {
  const hasMounted = useHasMounted();

  const [loadingProblems, setLoadingProblems] = useState<boolean>(true);

  if (!hasMounted) return null;

  return (
    <main className="min-h-screen bg-dark-layer-2">
      <Topbar />
      <h1 className="mt-10 mb-5 text-2xl font-medium text-center text-gray-700 uppercase dark:text-gray-400">
        &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
      </h1>
      <div className="relative px-6 pb-10 mx-auto overflow-x-auto">
        {loadingProblems && (
          <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
            {[...Array(10)].map((_, idx) => (
              <LoadingSkeleton key={idx} />
            ))}
          </div>
        )}
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
          {!loadingProblems && (
            <thead className="text-xs text-gray-700 uppercase border-b dark:text-gray-400 ">
              <tr>
                <th scope="col" className="w-0 px-1 py-3 font-medium">
                  Status
                </th>
                <th scope="col" className="w-0 px-6 py-3 font-medium">
                  Title
                </th>
                <th scope="col" className="w-0 px-6 py-3 font-medium">
                  Difficulty
                </th>

                <th scope="col" className="w-0 px-6 py-3 font-medium">
                  Category
                </th>
                <th scope="col" className="w-0 px-6 py-3 font-medium">
                  Solution
                </th>
              </tr>
            </thead>
          )}
          <ProblemsTable setLoadingProblems={setLoadingProblems} />
        </table>
      </div>
    </main>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center px-6 mt-4 space-x-12">
      <div className="w-6 h-6 rounded-full shrink-0 bg-dark-layer-1"></div>
      <div className="w-32 h-4 rounded-full sm:w-52 bg-dark-layer-1"></div>
      <div className="w-32 h-4 rounded-full sm:w-52 bg-dark-layer-1"></div>
      <div className="w-32 h-4 rounded-full sm:w-52 bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
