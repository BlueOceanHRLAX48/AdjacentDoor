import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';

function Home(props) {
  return (
    <div className='flex dark:bg-gray-900 dark:text-white'>
      <div className='hidden sm:flex'>
        <LeftBar user={props.user} />
      </div>
      <div className='h-screen flex flex-col'>
        <TopNav />
        <div className='overflow-y-scroll hide-scroll-bar'>
          <Feed />
        </div>
      </div>
      <RightBar user={props.user} />
    </div>
  );
}

export default Home;
