import { useState, useEffect } from 'react';
import Feed from './components/Feed';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';
import axios from 'axios';

function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/posts/defaultgroup?group_id=${user.default_group.id}`)
      .then(({ data }) => {
        setPosts(data.posts);
      });
  }, []);

  const filteredPosts = posts
    .filter((post) => post.tag.toLowerCase().includes(filter.toLowerCase()))
    .filter((post) => post.body.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className='w-screen h-screen overflow-hidden sm:flex dark:bg-gray-900 dark:text-white'>
      <div id='left-bar' className='hidden sm:flex'>
        <LeftBar user={user} filter={filter} setFilter={setFilter} />
      </div>
      <div>
        <div className='hidden sm:flex'>
          <TopNav
            posts={posts}
            setPosts={setPosts}
            filteredPosts={filteredPosts}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <div className='sm:flex'>
          <div className='h-screen overflow-y-scroll hide-scroll-bar'>
            <Feed filteredPosts={filteredPosts} user={user} />
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
