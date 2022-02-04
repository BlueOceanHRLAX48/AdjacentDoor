import axios from 'axios';
import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Feed from './components/Feed';
import MakePost from './components/MakePost';
import LeftBar from './LeftBar';
import Map from './Map';
import RightBar from './RightBar';
import TopNav from './TopNav';

function GroupDetail(props) {
  const groupId = useParams().groupId;

  const [filter, setFilter] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [posts, setPosts] = React.useState([]);
  const [group, setGroup] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    getData();
  }, [groupId]);

  React.useEffect(() => {
    if (
      group?.privacy &&
      group?.userjoined?.indexOf(props.user.network_id) === -1
    ) {
      navigate('/groups');
    }
  }, [group]);

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

    axios
      .get(`${process.env.REACT_APP_SERVER}/groups/user?group_id=${groupId}`)
      .then((res) => setGroup(res.data[0]))
      .catch((err) => console.error(err));
  }

  return (
    <div className='flex h-screen overflow-y-clip'>
      <LeftBar setFilter={setFilter} filter={filter} user={props.user} />
      <div className='flex flex-col grow'>
        <TopNav
          setSearch={setSearch}
          search={search}
          user={props.user}
          setUser={props.setUser}
        />
        <div className='flex grow'>
          <div className='flex flex-col h-screen pb-12 overflow-y-scroll hide-scroll-bar'>
            <div className='w-screen sm:w-[600px] px-4 pt-4 mb-2 sm:mb-4'>
              {group.coordinates && <Map group={group} posts={filteredPosts} />}
            </div>
            {group?.userjoined?.indexOf(props.user.network_id) !== -1 && (
              <MakePost
                refresh={getData}
                user={props.user}
                currentLocation={props.currentLocation}
              />
            )}
            <Feed
              group={group}
              filteredPosts={filteredPosts}
              user={props.user}
              getPosts={getData}
              currentLocation={props.currentLocation}
            />
          </div>
          <RightBar user={props.user} />
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;
