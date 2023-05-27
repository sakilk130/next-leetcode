import { ProblemsTable } from '@/components/ProblemsTable';
import { Topbar } from '@/components/Topbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-layer-2">
      <Topbar />
      <h1 className="mt-10 mb-5 text-2xl font-medium text-center text-gray-700 uppercase dark:text-gray-400">
        &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
      </h1>
      <div className="relative px-6 pb-10 mx-auto overflow-x-auto">
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
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
          <ProblemsTable />
        </table>
      </div>
    </main>
  );
}
