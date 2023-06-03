import React from 'react';
import Split from 'react-split';

import { ProblemDescription } from './ProblemDescription';
import { Playground } from './Playground';

type WorkspaceProps = {};

const Workspace: React.FC<WorkspaceProps> = () => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription />
      <Playground />
    </Split>
  );
};

export { Workspace };
