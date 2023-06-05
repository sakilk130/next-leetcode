import React from 'react';
import Split from 'react-split';

import { Problem } from '@/interfaces/problem';
import { ProblemDescription } from './ProblemDescription';
import { Playground } from './Playground';
import { areEqual } from '@/utils/areEqual';

type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} />
      <Playground problem={problem} />
    </Split>
  );
};

const MemorizedWorkspace = React.memo(Workspace, areEqual);
export { MemorizedWorkspace as Workspace };
