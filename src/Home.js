import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';
import { MdGroups, MdHealthAndSafety, MdHome } from 'react-icons/md';

function Home() {
  const [leftClass, setLeftClass] = useState(false);

  const showMenu = () => {
    setLeftClass(!leftClass);
  };

  return (
    <div className='flex w-screen h-screen overflow-hidden dark:bg-gray-900 dark:text-white'>
      <div className={leftClass ? 'sm:flex' : 'hidden sm:flex'}>
        <LeftBar />
      </div>

      <div>
        <div className='hidden sm:flex'>
          <TopNav />
        </div>
        <div className='flex'>
          <div className='h-screen overflow-y-scroll hide-scroll-bar'>
            <Feed />
          </div>
          <div className='fixed bottom-0 flex items-center justify-between w-screen px-4 py-2 bg-white sm:hidden'>
            <MdHome className='' size='30' onClick={showMenu} />
            <MdHealthAndSafety className='' size='30' onClick={showMenu} />
            <MdGroups className='' size='30' onClick={showMenu} />
            <MdMenu className='' size='30' onClick={showMenu} />
          </div>
          <div className='hidden sm:flex'>
            <RightBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
