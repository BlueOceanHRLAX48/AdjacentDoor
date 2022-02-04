import axios from 'axios';
import { useEffect, useState } from 'react';
import Feed from './components/Feed';
import MakePost from './components/MakePost';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopNav from './TopNav';

function Home({ user, setUser, currentLocation }) {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    axios
      .get(`${process.env.REACT_APP_SERVER}/posts/defaultgroup?group_id=${user?.default_group?.id}`)
      .then(({ data }) => {
        setPosts(data.posts);
      });
  }

  const filteredPosts = posts
    .filter((post) => post.tag.toLowerCase().includes(filter.toLowerCase()))
    .filter((post) => post.body.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className='flex h-screen overflow-y-clip dark:bg-gray-900 dark:text-white'>
      <div>
        <LeftBar user={user} filter={filter} setFilter={setFilter} />
      </div>
      <div>
        <div>
          <TopNav
            posts={posts}
            setPosts={setPosts}
            filteredPosts={filteredPosts}
            search={search}
            setSearch={setSearch}
            user={user}
            setUser={setUser}
          />
        </div>
        <div className='sm:flex'>
          <div className='h-screen overflow-y-scroll hide-scroll-bar'>
            <div>
              <MakePost user={user} currentLocation={currentLocation} refresh={getPosts} />
            </div>

            <Feed
              filteredPosts={filteredPosts}
              user={user}
              getPosts={getPosts}
              currentLocation={currentLocation}
            />
          </div>
          <div>
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
