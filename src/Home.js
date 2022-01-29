import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';

function Home() {
  return (
    <div className='w-screen flex dark:bg-gray-900 dark:text-white'>
      <div className='hidden sm:flex'>
        <LeftBar />
      </div>
      <div>
        <Feed />
      </div>
      <div>
        <RightBar />
      </div>
    </div>
  );
}

export default Home;
