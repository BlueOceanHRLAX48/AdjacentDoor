function SearchBar(props) {
  const handleSearch = (e) => {
    return e.target.value;
  };

  return (
    <>
      <div className='flex justify-center pt-1 pb-3 border-b'>
        <input
          className='text-sm p-1 text-center px-2 w-full rounded-full focus:outline-none focus:ring-secondary  focus:ring-2'
          placeholder='Search Adjacent Door'
          onChange={handleSearch}
        ></input>
      </div>
    </>
  );
}

export default SearchBar;
