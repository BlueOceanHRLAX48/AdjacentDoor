import SearchBar from './components/SearchBar';
import useTheme from './components/useTheme';

function TopNav() {
  const [nextTheme, setTheme] = useTheme();

  return (
    <div className='flex mt-4 items-center'>
      <SearchBar />
      <button className='text-sm ml-auto ring-1 ring-primary rounded px-2'>
        User Info
      </button>
    </div>
  );
}

export default TopNav;
