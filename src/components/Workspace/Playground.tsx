import React from 'react';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';

import { PlaygroundNav } from './PlaygroundNav';
import { PlaygroundFooter } from './PlaygroundFooter';

type PlaygroundProps = {};

const Playground: React.FC<PlaygroundProps> = () => {
  return (
    <div className="relative flex flex-col overflow-x-hidden bg-dark-layer-1">
      <PlaygroundNav />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value="console.log('Hello World!');"
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
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
            {[1, 3, 4].map((example, index) => (
              <div className="items-start mt-2 mr-2" key={index}>
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										
									`}
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
              voluptate exercitationem tempora laboriosam molestias ad totam
              maxime deserunt quasi sint veritatis nulla nostrum iure,
              accusantium provident recusandae sequi asperiores officiis?
            </div>
            <p className="mt-4 text-sm font-medium text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              nesciunt voluptatibus accusantium ducimus et non ut, cupiditate
              repellat praesentium repudiandae hic odio similique, sapiente quos
              ipsa vel inventore optio pariatur.
            </div>
          </div>
        </div>
      </Split>
      <PlaygroundFooter />
    </div>
  );
};
export { Playground };
