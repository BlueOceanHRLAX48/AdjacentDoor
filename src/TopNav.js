import { Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import useTheme from './components/useTheme';
import UserInfo from './LeftBar/UserInfo';

function TopNav() {
  const [nextTheme, setTheme] = useTheme();

  return (
    <div className='flex items-center justify-between w-full mt-4 mb-4 '>
      <div>
        <SearchBar />
      </div>
      <div className='flex justify-end'>
        <button className='text-sm' onClick={() => setTheme(nextTheme)}>
          darkmode
        </button>
        <Link to='/my-profile'>
          <div className='ml-4'>
            <UserInfo />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TopNav;
