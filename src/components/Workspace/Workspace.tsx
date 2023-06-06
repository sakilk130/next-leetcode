import React, { useState } from 'react';
import Confetti from 'react-confetti';
import Split from 'react-split';

import useWindowSize from '@/hooks/useWindowSize';
import { Problem } from '@/interfaces/problem';
import { Playground } from './Playground';
import { ProblemDescription } from './ProblemDescription';

type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} _solved={solved} />
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

export { Workspace };
