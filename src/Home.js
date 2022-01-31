import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';
import { MdMenu } from 'react-icons/md';
import { useState } from 'react';

function Home() {
  const [leftClass, setLeftClass] = useState(false);

  const showMenu = () => {
    setLeftClass(!leftClass);
  };

  return (
    <div className='flex w-screen h-screen overflow-hidden dark:bg-gray-900 dark:text-white'>
      <div className='relative bg-white'>
        <div className='bg-white sm:hidden'>
          <MdMenu className='absolute inset-x-0 bottom-0 h-16' size='30' onClick={showMenu} />
        </div>
        <div className={leftClass ? 'sm:flex' : 'hidden sm:flex'}>
          <LeftBar />
        </div>
      </div>
      <div>
        <div className='hidden sm:flex'>
          <TopNav />
        </div>
        <div>
          <div className='h-screen overflow-y-scroll hide-scroll-bar'>
            <Feed />
          </div>
          <div></div>
          <div className='hidden sm:flex'>
            <RightBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
