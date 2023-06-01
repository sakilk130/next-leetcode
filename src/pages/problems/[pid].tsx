import { Topbar } from '@/components/Topbar';
import React from 'react';

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
  return (
    <div>
      <Topbar problemPage />
    </div>
  );
};
export default ProblemPage;
