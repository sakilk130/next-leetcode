import cls from 'classnames';
import Link from 'next/link';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { AiFillYoutube } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import YouTubePlayer from 'react-youtube';

import { areEqual } from '@/utils/areEqual';
import useGetProblems from '@/hooks/useGetProblems';
import useGetSolvedProblems from '@/hooks/useGetSolvedProblems';

interface ProblemsTableProps {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProblemsTable: FC<ProblemsTableProps> = ({ setLoadingProblems }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<{
    show: boolean;
    videoId: string;
  }>({
    show: false,
    videoId: '',
  });
  const problems = useGetProblems(setLoadingProblems);
  const solvedProblems = useGetSolvedProblems();
  const closeModal = useCallback(() => {
    setShowVideo({ show: false, videoId: '' });
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, [mounted]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  return (
    <>
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
                {solvedProblems.includes(problem.id) && (
                  <BsCheckCircle fontSize={'18'} width="18" />
                )}
              </td>
              <td className="px-6 py-4">
                {problem.link ? (
                  <Link
                    href={problem.link}
                    className="cursor-pointer hover:text-blue-600"
                    target="_blank"
                  >
                    {problem.title}
                  </Link>
                ) : (
                  <Link
                    className="cursor-pointer hover:text-blue-600"
                    href={`/problems/${problem.id}`}
                  >
                    {problem.title}
                  </Link>
                )}
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
                    onClick={() =>
                      setShowVideo({
                        show: true,
                        videoId: problem.videoId as string,
                      })
                    }
                  />
                ) : (
                  <p className="text-gray-400">Coming soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      {mounted && showVideo.show && (
        <tfoot className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen">
          <div
            className="absolute top-0 left-0 z-10 w-screen h-screen bg-black opacity-70"
            onClick={closeModal}
          ></div>
          <div className="relative z-50 w-full h-full max-w-4xl px-6">
            <div className="relative flex items-center justify-center w-full h-full">
              <div className="relative w-full">
                <IoClose
                  fontSize={'35'}
                  className="absolute right-0 cursor-pointer -top-16"
                  onClick={closeModal}
                />
                <YouTubePlayer
                  videoId={showVideo.videoId}
                  loading="lazy"
                  iframeClassName="w-full min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </tfoot>
      )}
    </>
  );
};

const MemorizedProblemsTable = memo(ProblemsTable, areEqual);
export { MemorizedProblemsTable as ProblemsTable };
