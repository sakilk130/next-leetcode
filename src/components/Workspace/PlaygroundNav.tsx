import React, { useCallback, useEffect, useState } from 'react';
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from 'react-icons/ai';

import { ISettings } from './Playground';
import { areEqual } from '@/utils/areEqual';

type PlaygroundNavProps = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PlaygroundNav: React.FC<PlaygroundNavProps> = ({
  setSettings,
  settings,
}) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleFullScreen = useCallback(() => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen]);

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener('fullscreenchange', exitHandler);
      document.addEventListener('webkitfullscreenchange', exitHandler);
      document.addEventListener('mozfullscreenchange', exitHandler);
      document.addEventListener('MSFullscreenChange', exitHandler);
    }
  }, [isFullScreen]);

  return (
    <div className="flex items-center justify-between w-full bg-dark-layer-2 h-11 ">
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2 dark:text-dark-label-2">
              JavaScript
            </div>
          </div>
        </button>
      </div>
      <div className="flex items-center m-2">
        <button
          className="preferenceBtn group"
          onClick={() =>
            setSettings({ ...settings, settingsModalIsOpen: true })
          }
        >
          <div className="w-4 h-4 text-lg font-bold text-dark-gray-6">
            <AiOutlineSetting />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>
        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="w-4 h-4 text-lg font-bold text-dark-gray-6">
            {!isFullScreen ? (
              <AiOutlineFullscreen />
            ) : (
              <AiOutlineFullscreenExit />
            )}
          </div>
          <div className="preferenceBtn-tooltip">Full Screen</div>
        </button>
      </div>
      {/*  */}
    </div>
  );
};
const MemorizedPlaygroundNav = React.memo(PlaygroundNav, areEqual);

export { MemorizedPlaygroundNav as PlaygroundNav };
