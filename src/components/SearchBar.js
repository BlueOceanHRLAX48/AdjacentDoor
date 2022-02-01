import { useEffect, useState } from 'react';

function SearchBar({ search, setSearch, posts, setPosts, filteredPosts, setFilteredPosts }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (searchInput.length) {
      let filtered =
        posts &&
        posts.filter((post) => post['post_text'].toUpperCase().includes(searchInput.toUpperCase()));
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  });

  return (
    <>
      <input
        className='text-sm p-1 text-center px-2 ml-4 w-[570px] rounded-full focus:outline-none dark:bg-gray-900'
        placeholder='Search Adjacent Door'
        onChange={handleSearchInput}
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = 'Search Adjacent Door')}
      ></input>
    </>
  );
}

export default SearchBar;
