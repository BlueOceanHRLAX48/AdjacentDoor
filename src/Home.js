import { useState, useEffect } from 'react';
import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';
import axios from 'axios';

function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/posts/defaultgroup?group_id=${user.default_group.id}`)
      .then(({ data }) => {
        setPosts(data.posts);
      });
  }, []);

  return (
    <div className='flex w-screen h-screen overflow-hidden dark:bg-gray-900 dark:text-white'>
      <div id='left-bar' className='hidden sm:flex'>
        <LeftBar user={user} userGroup={user.user_group} />
      </div>
      <div>
        <div className='hidden sm:flex'>
          <TopNav
            posts={posts}
            setPosts={setPosts}
            filteredPosts={filteredPosts}
            setFilteredPosts={setFilteredPosts}
          />
        </div>
        <div className='sm:flex'>
          <div className='h-screen overflow-y-scroll hide-scroll-bar'>
            <Feed
              posts={posts}
              setPosts={setPosts}
              filteredPosts={filteredPosts}
              setFilteredPosts={setFilteredPosts}
              user={user}
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
