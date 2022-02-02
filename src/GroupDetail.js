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
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getData();
  });

  const filteredPosts = posts.filter((post) =>
    post.tag.toLowerCase().includes(filter.toLowerCase())
  );

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
      <LeftBar setFilter={setFilter} filter={filter} user={props.user} />
      <div className='flex flex-col grow'>
        <TopNav user={props.user} />
        <div className='flex grow'>
          <div className='flex flex-col h-screen pb-12 overflow-y-scroll hide-scroll-bar'>
            <div className='w-[600px] px-4 pt-4'>
              <div className='flex justify-center items-center bg-ghostWhite border rounded h-[400px]'>
                MAP PLACEHOLDER
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
