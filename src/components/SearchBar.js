import { useRef } from 'react';

function SearchBar(props) {
  const searchInput = useRef(null);

  // let content = searchInput.current.value;

  return (
    <>
      <input
        className='text-sm p-1 text-center px-2 ml-4 w-[570px] rounded-full focus:outline-none dark:bg-gray-900'
        placeholder='Search Adjacent Door'
        ref={searchInput}
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = 'Search Adjacent Door')}
      ></input>
    </>
  );
}

export default SearchBar;
