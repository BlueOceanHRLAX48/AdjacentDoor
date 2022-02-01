import React from 'react';
import { useParams } from 'react-router-dom';
import MakePost from './components/MakePost';
import PostFeed from './components/PostFeed';
import LeftBar from './LeftBar';

function GroupDetail(props) {
  return (
    <div className='flex h-screen'>
      <LeftBar />
      <div className=''>
        <MakePost />
        <PostFeed />
      </div>
    </div>
  );
}

export default GroupDetail;
