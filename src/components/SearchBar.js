import { useEffect, useState } from 'react';

function SearchBar({ search, setSearch }) {
  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='flex justify-center w-[600px]'>
      <input
        className='w-11/12 p-1 text-sm text-center transition-all duration-150 rounded-full outline-none focus:outline-primary dark:bg-gray-900'
        placeholder='Search Adjacent Door'
        value={search}
        onChange={handleSearchInput}
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = 'Search Adjacent Door')}
      ></input>
    </div>
  );
}

export default SearchBar;
