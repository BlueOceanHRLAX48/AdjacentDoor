import { Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import useTheme from './components/useTheme';
import { Avatar } from '@mui/material';

function TopNav({ search, setSearch, posts, setPosts }) {
  const [nextTheme, setTheme] = useTheme();

  return (
    <div className='flex items-center justify-between w-full mt-4 mb-4 '>
      <div>
        <SearchBar search={search} setSearch={setSearch} posts={posts} setPosts={setPosts} />
      </div>
      <div className='flex justify-end'>
        <button className='text-sm' onClick={() => setTheme(nextTheme)}>
          darkmode
        </button>
        <Link to='/my-profile'>
          <div className='ml-4'>
            <Avatar
              alt='Remy Sharp'
              src='/static/images/avatar/1.jpg'
              sx={{ width: 35, height: 35 }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TopNav;
