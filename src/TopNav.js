import SearchBar from './components/SearchBar';
import useTheme from './components/useTheme';

function TopNav() {
  const [nextTheme, setTheme] = useTheme();

  return (
    <div className=' flex mt-4 items-center '>
      <>
        <SearchBar />
      </>
      <>
        <button className='text-sm ml-4' onClick={() => setTheme(nextTheme)}>
          darkmode
        </button>
      </>
    </div>
  );
}

export default TopNav;
