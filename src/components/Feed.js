import React from 'react';
import SearchBar from './SearchBar';

function Feed(props) {
  return (
    <div className='w-[600px] bg-antiqueWhite min-h-screen p-4'>
      <div>
        <SearchBar />
      </div>
      <div>FEED STUFF</div>
    </div>
  );
}

export default Feed;
