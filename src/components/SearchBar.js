function SearchBar(props) {
  const handleSearch = (e) => {
    return e.target.value;
  };

  return (
    <>
      <input
        className='text-sm p-1 text-center px-2 w-80 rounded-full focus:outline-none focus:ring-secondary  focus:ring-2 dark:bg-gray-900'
        placeholder='Search Adjacent Door'
        onChange={handleSearch}
      ></input>
    </>
  );
}

export default SearchBar;
