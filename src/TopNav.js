import SearchBar from './components/SearchBar';
import useTheme from './components/useTheme';

function TopNav() {
  const [nextTheme, setTheme] = useTheme();

  return (
    <div className='inline-flex mt-4 mb-4 items-center '>
      <div>
        <SearchBar />
      </div>
      <div className=''>
        <button className='text-sm ml-4' onClick={() => setTheme(nextTheme)}>
          darkmode
        </button>
      </div>
    </div>
  );
}

export default TopNav;
