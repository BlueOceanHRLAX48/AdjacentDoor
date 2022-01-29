function SearchBar(props) {
  const handleSearch = (e) => {
    return e.target.value;
  };

  return (
    <>
      <input
        className='text-sm p-1 text-center px-2 ml-4 w-[570px] rounded-full focus:outline-none dark:bg-gray-900'
        placeholder='Search Adjacent Door'
        onChange={handleSearch}
      ></input>
    </>
  );
}

export default SearchBar;
