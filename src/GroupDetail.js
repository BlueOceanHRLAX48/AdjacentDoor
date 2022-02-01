import React from 'react';
import { useParams } from 'react-router-dom';
import MakePost from './components/MakePost';
import PostFeed from './components/PostFeed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';

function GroupDetail(props) {
  const groupId = useParams().groupId;

  function getData() {
    //axios request for data using groupId
  }
  return (
    <div className='flex h-screen'>
      <LeftBar />
      <div className='flex flex-col h-full grow'>
        <TopNav />
        <div className='flex'>
          <div className='flex flex-col overflow-y-scroll hide-scroll-bar'>
            <div className='w-[600px] px-4 pt-4'>
              <div className='flex justify-center items-center bg-ghostWhite border rounded h-[400px]'>
                MAP PLACEHOLDER
              </div>
            </div>
            <MakePost refresh={getData} />
            <PostFeed />
          </div>
          <RightBar />
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;
