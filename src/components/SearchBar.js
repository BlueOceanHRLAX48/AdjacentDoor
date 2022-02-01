import { useEffect, useState } from 'react';

function SearchBar({ search, setSearch, posts, setPosts }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  // let content = searchInput.current.value;
  useEffect(() => {
    if (searchInput && searchInput.length) {
      let filteredPosts =
        posts &&
        posts.filter((post) => post['post_text'].toUpperCase().includes(searchInput.toUpperCase()));
      setPosts(filteredPosts);
    } else {
      setPosts(posts);
    }
  }, [searchInput]);

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
