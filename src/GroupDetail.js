import React from 'react';
import { useParams } from 'react-router-dom';
import MakePost from './components/MakePost';
import PostFeed from './components/PostFeed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';

function GroupDetail(props) {
  const groupId = useParams().groupId;

  const [filter, setFilter] = React.useState('');

  const samplePosts = [
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      type: 'general',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      type: 'forsale',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      type: 'forsale',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      type: 'safety',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      type: 'general',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
  ];

  const filteredPosts = samplePosts.filter((post) =>
    post.type.toLowerCase().includes(filter.toLowerCase())
  );

  function getData() {
    //axios request for data using groupId
  }
  return (
    <div className='flex h-screen overflow-y-clip'>
      <LeftBar setFilter={setFilter} filter={filter} user={props.user} />
      <div className='flex flex-col grow'>
        <TopNav />
        <div className='flex grow'>
          <div className='flex flex-col h-screen pb-12 overflow-y-scroll hide-scroll-bar'>
            <div className='w-[600px] px-4 pt-4'>
              <div className='flex justify-center items-center bg-ghostWhite border rounded h-[400px]'>
                MAP PLACEHOLDER
              </div>
            </div>
            <MakePost refresh={getData} />
            <PostFeed posts={filteredPosts} />
          </div>
          <RightBar />
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;
