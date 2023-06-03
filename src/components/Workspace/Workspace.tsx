import React from 'react';
import Split from 'react-split';

import { ProblemDescription } from './ProblemDescription';

type WorkspaceProps = {};

const Workspace: React.FC<WorkspaceProps> = () => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription />
      <div className="">Code Editor</div>
    </Split>
  );
};

export { Workspace };
