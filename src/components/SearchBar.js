function SearchBar(props) {
  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className='flex justify-center pt-1 pb-3 border-b'>
        <input
          className='text-sm p-1 px-2 w-3/4 rounded-full focus:outline-none focus:ring-secondary  focus:ring-2'
          placeholder='Search Adjacent Door'
          onChange={handleSearch}
        ></input>
      </div>
    </>
  );
}

export default SearchBar;
