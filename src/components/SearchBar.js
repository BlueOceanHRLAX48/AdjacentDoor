function SearchBar(props) {
  const handleSearch = (e) => {
    return e.target.value;
  };

  return (
    <div className='flex justify-center w-[600px]'>
      <input
        className='text-sm p-1 text-center w-11/12 rounded-full outline-none focus:outline-primary dark:bg-gray-900 transition-all duration-150'
        placeholder='Search Adjacent Door'
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
