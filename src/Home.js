import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';

function Home() {
  return (
    <div className='flex dark:bg-gray-900 dark:text-white'>
      <div className='hidden sm:flex'>
        <LeftBar />
      </div>
      <div className='h-screen overflow-y-scroll hide-scroll-bar'>
        <div>
          <TopNav />
        </div>
        <div className='flex'>
          <div>
            <Feed />
          </div>
        </div>
      </div>
      <RightBar />
    </div>
  );
}

export default Home;
