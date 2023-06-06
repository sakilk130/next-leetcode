import React from 'react';
import { BsChevronUp } from 'react-icons/bs';

type PlaygroundFooterProps = {
  handleSubmit: () => void;
};

const PlaygroundFooter: React.FC<PlaygroundFooterProps> = ({
  handleSubmit,
}) => {
  return (
    <div className="absolute bottom-0 z-10 flex w-full bg-dark-layer-1">
      <div className="mx-5 my-[10px] flex justify-between w-full">
        <div className="flex items-center flex-1 mr-2 space-x-4 flex-nowrap">
          <button className="px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2">
            Console
            <div className="flex items-center ml-1 transition transform">
              <BsChevronUp className="mx-1 fill-gray-6 fill-dark-gray-6" />
            </div>
          </button>
        </div>
        <div className="flex items-center ml-auto space-x-4">
          <button
            className="px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3  hover:bg-dark-fill-2 text-dark-label-2 rounded-lg"
            onClick={handleSubmit}
          >
            Run
          </button>
          <button
            className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export { PlaygroundFooter };
