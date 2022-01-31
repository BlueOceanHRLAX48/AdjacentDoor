import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';

function Home() {
  return (
    <div className='w-screen flex dark:bg-gray-900 dark:text-white'>
      <div className='hidden sm:flex'>
        <LeftBar />
      </div>
      <div>
        <div className='hidden sm:flex'>
          <TopNav />
        </div>
        <div>
          <div>
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
