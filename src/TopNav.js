import SearchBar from './components/SearchBar';
import useTheme from './components/useTheme';
import { Link } from 'react-router-dom';
import UserInfo from './LeftBar/UserInfo';

function TopNav() {
  const [nextTheme, setTheme] = useTheme();

  return (
    <div className='inline-flex mt-4 mb-4 items-center '>
      <div>
        <SearchBar />
      </div>
      <div className='flex'>
        <button className='text-sm ml-4' onClick={() => setTheme(nextTheme)}>
          darkmode
        </button>
        <Link to='/my-profile'>
          <div>
            <UserInfo />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TopNav;
