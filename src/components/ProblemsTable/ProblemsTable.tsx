import React from 'react';
import cls from 'classnames';
import { BsCheckCircle } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';

import { problems } from '@/data/mockData';
import Link from 'next/link';

interface ProblemsTableProps {}

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
  return (
    <tbody className="text-white">
      {problems.map((problem, index) => {
        const difficultyColor =
          problem.difficulty === 'Easy'
            ? 'text-dark-green-s'
            : problem.difficulty === 'Medium'
            ? 'text-dark-yellow'
            : 'text-dark-pink';
        return (
          <tr
            key={problem.id}
            className={cls(
              index % 2 === 0 ? 'bg-dark-layer-1' : 'bg-dark-layer-2'
            )}
          >
            <td className="px-2 py-3 font-medium whitespace-nowrap text-dark-green-s">
              <BsCheckCircle fontSize={'18'} width="18" />
            </td>
            <td className="px-6 py-4">
              <Link
                href={`/problem/${problem.id}`}
                className="cursor-pointer hover:text-blue-600"
                target="_blank"
              >
                {problem.title}
              </Link>
            </td>
            <td className={cls('px-6 py-4', difficultyColor)}>
              {problem.difficulty}
            </td>
            <td className={'px-6 py-4'}>{problem.category}</td>
            <td className={'px-6 py-4'}>
              {problem.videoId ? (
                <AiFillYoutube
                  fontSize={'28'}
                  className="cursor-pointer hover:text-red-600"
                />
              ) : (
                <p className="text-gray-400">Coming soon</p>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
export { ProblemsTable };
