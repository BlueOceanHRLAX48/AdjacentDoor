import { useState } from 'react';
import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';

function Home() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Something ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'different ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
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
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
  ]);

  const [filteredPosts, setFilteredPosts] = useState([]);

  return (
    <div className='flex w-screen h-screen overflow-hidden dark:bg-gray-900 dark:text-white'>
      <div id='left-bar' className='hidden sm:flex'>
        <LeftBar />
      </div>
      <div>
        <div className='hidden sm:flex'>
          <TopNav
            search={search}
            setSearch={setSearch}
            posts={posts}
            setPosts={setPosts}
            filteredPosts={filteredPosts}
            setFilteredPosts={setFilteredPosts}
          />
        </div>
        <div className='sm:flex'>
          <div className='h-screen overflow-y-scroll hide-scroll-bar'>
            <Feed
              search={search}
              setSearch={setSearch}
              posts={posts}
              setPosts={setPosts}
              filteredPosts={filteredPosts}
              setFilteredPosts={setFilteredPosts}
            />
          </div>
          <div className='hidden sm:flex'>
            <RightBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
