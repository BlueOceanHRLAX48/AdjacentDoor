import axios from 'axios';
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
  const [search, setSearch] = React.useState('');
  const [posts, setPosts] = React.useState([]);
  const [group, setGroup] = React.useState({});

  React.useEffect(() => {
    getData();
  });

  const filteredPosts = posts
    .filter((post) => post.tag.toLowerCase().includes(filter.toLowerCase()))
    .filter((post) => post.body.toLowerCase().includes(search.toLowerCase()));

  function getData() {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}/posts/usergroup?user_group_id=${groupId}`
      )
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.error(err));
  }
  return (
    <div className='flex h-screen overflow-y-clip'>
      <LeftBar setFilter={setFilter} filter={filter} />
      <div className='flex flex-col grow'>
        <TopNav setSearch={setSearch} search={search} />
        <div className='flex grow'>
          <div className='flex flex-col overflow-y-scroll h-screen hide-scroll-bar pb-12'>
            <div className='w-[600px] px-4 pt-4'>
              <div className='flex justify-center items-center bg-ghostWhite border rounded h-[400px]'>
                MAP PLACEHOLDER
                {/* <Map group={group} posts={filteredPosts} /> */}
              </div>
            </div>
            <MakePost
              refresh={getData}
              user={props.user}
              currentLocation={props.currentLocation}
            />
            <PostFeed posts={filteredPosts} />
          </div>
          <RightBar user={props.user} />
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;
