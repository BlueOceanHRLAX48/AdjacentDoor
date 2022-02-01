import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';

function Home({ leftClass }) {
  return (
    <div className='flex w-screen h-screen overflow-hidden dark:bg-gray-900 dark:text-white'>
      <div className={leftClass ? 'sm:flex' : 'hidden sm:flex'}>
        <LeftBar />
      </div>
      <div>
        <div className='hidden sm:flex'>
          <TopNav />
        </div>
        <div className='sm:flex'>
          <div className='h-screen overflow-y-scroll hide-scroll-bar'>
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
