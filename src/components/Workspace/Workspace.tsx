import React, { useState } from 'react';
import Split from 'react-split';
import Confetti from 'react-confetti';

import { Problem } from '@/interfaces/problem';
import { ProblemDescription } from './ProblemDescription';
import { Playground } from './Playground';
import { areEqual } from '@/utils/areEqual';
import useWindowSize from '@/hooks/useWindowSize';

type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} />
      <div className="bg-dark-fill-2">
        <Playground
          problem={problem}
          setSuccess={setSuccess}
          setSolved={setSolved}
        />
        {success && (
          <Confetti
            gravity={0.3}
            tweenDuration={4000}
            width={width - 1}
            height={height - 1}
          />
        )}
      </div>
    </Split>
  );
};

const MemorizedWorkspace = React.memo(Workspace, areEqual);
export { MemorizedWorkspace as Workspace };
