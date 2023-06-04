import React from 'react';

import { Topbar } from '@/components/Topbar';
import { Workspace } from '@/components/Workspace';
import { problems } from '@/data/problems';
import { Problem } from '@/interfaces/problem';
import useHasMounted from '@/hooks/useHasMounted';

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  return (
    <>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </>
  );
};
export default ProblemPage;

export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) => ({
    params: { pid: key },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = problems[pid];
  if (!problem) {
    return {
      notFound: true,
    };
  }
  problem.handlerFunction = problem.handlerFunction.toString();
  return {
    props: {
      problem,
    },
  };
}
