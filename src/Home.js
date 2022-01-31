import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';
import { MdMenu } from 'react-icons/md';

function Home() {
  const showMenu = () => {};

  return (
    <div className='w-screen h-screen overflow-hidden flex dark:bg-gray-900 dark:text-white'>
      <div className='h-screen'>
        <MdMenu className='sm:hidden' size='30' onClick={showMenu} />
        <LeftBar className='hidden sm:flex' />
      </div>
      <div className='h-screen'>
        <div className='hidden sm:flex'>
          <TopNav />
        </div>
        <div>
          <div className='h-screen hide-scroll-bar overflow-y-scroll'>
            <Feed />
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
