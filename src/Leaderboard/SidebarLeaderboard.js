import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import SidebarUser from './SidebarUser';

function SidebarLeaderboard(props) {
  const [global, setGlobal] = React.useState([]);
  const [local, setLocal] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/leaderboard?count=5`)
      .then((res) => {
        setGlobal(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}/leaderboard/${props.user.zip}?count=5`
      )
      .then((res) => {
        setLocal(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const localUsers = local.map((user, i) => (
    <SidebarUser user={user} place={i + 1} key={i} />
  ));

  const globalUsers = global.map((user, i) => (
    <SidebarUser user={user} place={i + 1} key={i} />
  ));

  return (
    <>
      <div className='flex flex-col justify-center ml-4 mt-4 py-2 rounded-lg border cursor-default'>
        <div className='font-bold text-lg text-center py-2 decoration-secondary underline underline-offset-1'>
          Top Local Contributors
        </div>
        {localUsers}
        <div className='w-full flex justify-center py-4'>
          <Link to='/leaderboard'>
            <button className='hover:bg-primary rounded-full px-4 py-1 font-semibold ring-primary ring-1 transition-all duration-150 hover:text-white'>
              VIEW LEADERBOARD
            </button>
          </Link>
        </div>
      </div>
      <div className='flex flex-col justify-center ml-4 mt-4 py-2 rounded-lg border cursor-default'>
        <div className='font-bold text-lg text-center py-2 decoration-secondary underline underline-offset-1'>
          Top Global Contributors
        </div>
        {globalUsers}
        <div className='w-full flex justify-center py-4'>
          <Link to='/leaderboard'>
            <button className='hover:bg-primary rounded-full px-4 py-1 font-semibold ring-primary ring-1 transition-all duration-150 hover:text-white'>
              VIEW LEADERBOARD
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SidebarLeaderboard;
