import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import cls from 'classnames';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import Split from 'react-split';

import { auth, firestore } from '@/config/firebase';
import { problems } from '@/data/problems';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Problem } from '@/interfaces/problem';
import { PlaygroundFooter } from './PlaygroundFooter';
import { PlaygroundNav } from './PlaygroundNav';

type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({
  problem,
  setSuccess,
  setSolved,
}) => {
  const [user] = useAuthState(auth);
  const {
    query: { pid },
  } = useRouter();
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  let [userCode, setUserCode] = useState<string>(problem.starterCode);
  const [fontSize, setFontSize] = useLocalStorage('lcc-fontSize', '16px');
  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please login to submit your code');
      return;
    }
    try {
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${userCode}`)();
      const handler = problems[pid as string].handlerFunction;

      if (typeof handler === 'function') {
        const success = handler(cb);
        if (success) {
          toast.success('Congrats! All tests passed!');
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);
          const userRef = doc(firestore, 'users', user.uid);
          await updateDoc(userRef, {
            solvedProblems: arrayUnion(pid),
          });
          setSolved(true);
        }
      }
    } catch (error: any) {
      console.log(error.message);
      if (
        error.message.startsWith(
          'AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:'
        )
      ) {
        toast.error('Oops! One or more test cases failed');
      } else {
        toast.error(error.message);
      }
    }
  };

  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    if (user) {
      setUserCode(code ? JSON.parse(code) : problem.starterCode);
    } else {
      setUserCode(problem.starterCode);
    }
  }, [pid, user, problem.starterCode]);

  return (
    <div className="relative flex flex-col overflow-x-hidden bg-dark-layer-1">
      <PlaygroundNav settings={settings} setSettings={setSettings} />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            onChange={onChange}
            extensions={[javascript()]}
            style={{ fontSize: settings.fontSize }}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          <div className="flex items-center h-10 space-x-6">
            <div className="relative flex flex-col justify-center h-full cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>
          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                className="items-start mt-2 mr-2"
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={cls(
                      'font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap',
                      activeTestCaseId === index
                        ? 'text-white'
                        : 'text-gray-500'
                    )}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="my-4 font-semibold">
            <p className="mt-4 text-sm font-medium text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="mt-4 text-sm font-medium text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
      <PlaygroundFooter handleSubmit={handleSubmit} />
    </div>
  );
};

export { Playground };
