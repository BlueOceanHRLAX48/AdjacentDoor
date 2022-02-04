import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [privacy, setPrivacy] = React.useState(false);
  const [adminPanel, setAdminPanel] = React.useState(false);

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

  React.useEffect(() => {
    togglePrivacy();
  }, [privacy]);

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
      .then((res) => {
        setPrivacy(res.data[0].privacy);
        setGroup(res.data[0]);
      })
      .catch((err) => console.error(err));
  }

  function togglePrivacy() {
    setPrivacy((x) => !x);
    axios
      .put(`${process.env.REACT_APP_SERVER}/groups/user/${groupId}/privacy`)
      .catch((err) => {
        setPrivacy((x) => !x);
        console.error(err);
      });
  }

  function handlePending(networkId, response) {
    axios
      .put(
        `${process.env.REACT_APP_SERVER}/groups/user/${groupId}/accept?network_id=${networkId}&accepted=${response}`
      )
      .then((res) => getData())
      .catch((err) => console.error(err));
  }

  function handleLeave() {
    if (
      window.confirm(
        "Are you sure? If this group is private you'll have to request to join again"
      )
    ) {
      axios
        .delete(
          `${process.env.REACT_APP_SERVER}/groups/user/${groupId}/left?network_id=${props.user.network_id}`
        )
        .then(() => {
          props.getUserData();
          getData();
        })
        .catch((err) => console.error(err));
    }
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
            <div className='w-screen sm:w-[600px] px-4 mb-2 sm:mb-4 relative'>
              {group?.coordinates && (
                <Map group={group} posts={filteredPosts} />
              )}
              {group?.userjoined?.indexOf(props.user.network_id) !== -1 && (
                <button
                  className='absolute -bottom-8 right-4 px-2 rounded font-semibold bg-ghostWhite hover:bg-secondary border border-primary transition-all duration-150'
                  onClick={handleLeave}
                >
                  Leave Group
                </button>
              )}
            </div>
            <div className='text-center text-sm text-secondary'>
              {group.city}, {group.state}
            </div>
            <div className='text-center text-2xl font-semibold'>
              {group.name}
            </div>
            <div className='text-center pb-4 text-sm'>{group.description}</div>
            {(group?.admin_id === props.user.network_id ||
              props.user.admin) && (
              <div className='w-screen sm:w-[600px] px-4 pb-4'>
                <div className='flex font-semibold items-center'>
                  <button
                    className={`font-semibold ${
                      group?.userpenging?.length > 0 && 'animate-pulse'
                    }`}
                    onClick={() => setAdminPanel((x) => !x)}
                  >
                    {group?.userpenging?.length} Users Pending
                  </button>
                  <div className='ml-auto'>Private Group</div>
                  <input
                    type='checkbox'
                    checked={privacy}
                    onChange={() => setPrivacy((x) => !x)}
                    className='ml-2'
                  />
                </div>
                {adminPanel && (
                  <div className='py-2'>
                    {group?.userpenging.map((user, i) => (
                      <div
                        key={user}
                        className='w-full border rounded px-2 py-1 flex'
                      >
                        {user}
                        <div className='ml-auto'>
                          <button
                            className='rounded border border-primary hover:bg-secondary px-2 transition-all duration-150'
                            onClick={() => handlePending(user, true)}
                          >
                            Accept
                          </button>
                          <button
                            className='ml-2 rounded border border-red-400 hover:bg-red-300 px-2 transition-all duration-150'
                            onClick={() => handlePending(user, false)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
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
