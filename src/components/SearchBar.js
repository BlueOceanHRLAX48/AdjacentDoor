import { useEffect, useState } from 'react';

function SearchBar({
  search,
  setSearch,
  posts,
  setPosts,
  filteredPosts,
  setFilteredPosts,
  userGroup,
}) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (searchInput.length) {
      let filtered =
        posts &&
        posts.filter((post) => post['body'].toUpperCase().includes(searchInput.toUpperCase()));
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, searchInput, setFilteredPosts]);

  return (
    <div className='flex justify-center w-[600px]'>
      <input
        className='w-11/12 p-1 text-sm text-center transition-all duration-150 rounded-full outline-none focus:outline-primary dark:bg-gray-900'
        placeholder='Search Adjacent Door'
        onChange={handleSearchInput}
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = 'Search Adjacent Door')}
      ></input>
    </div>
  );
}

export default SearchBar;
