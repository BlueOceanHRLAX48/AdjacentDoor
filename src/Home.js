import { useState, useEffect } from 'react';
import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';
import axios from 'axios';

function Home(props) {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/defaultgroup?group_id=1`).then(({ data }) => {
      setPosts(data.posts);
    });
  }, []);

  const [filteredPosts, setFilteredPosts] = useState([]);

  return (
    <div className='flex w-screen h-screen overflow-hidden dark:bg-gray-900 dark:text-white'>
      <div id='left-bar' className='hidden sm:flex'>
        <LeftBar user={props.user} />
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
