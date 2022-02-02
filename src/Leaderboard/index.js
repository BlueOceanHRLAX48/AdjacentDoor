import React from 'react';
import LeftBar from '../LeftBar';
import LeaderboardUser from './LeaderboardUser';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';

function Leaderboard(props) {
  const [localUserData, setLocalUserData] = React.useState([]);
  const [globalUserData, setGlobalUserData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/leaderboard?count=25`)
      .then((res) => {
        setGlobalUserData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}/${props.user.zip}/leaderboard?count=25`
      )
      .then((res) => {
        setLocalUserData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const globalUsers = globalUserData.map((user, i) => (
    <LeaderboardUser user={user} key={i} place={i + 1} />
  ));

  const localUsers = localUserData.map((user, i) => (
    <LeaderboardUser user={user} key={i} place={i + 1} />
  ));

  return (
    <div className='flex h-screen'>
      <LeftBar />
      <div className='flex grow overflow-y-scroll hide-scroll-bar justify-center gap-8 p-10'>
        <div className='w-1/2 h-fit flex flex-col rounded border'>
          <div className='font-bold text-2xl text-center py-2 decoration-secondary underline underline-offset-1'>
            Global
          </div>
          {globalUsers}
        </div>
        <div className='w-1/2 h-fit flex flex-col rounded border'>
          <div className='font-bold text-2xl text-center py-2 decoration-secondary underline underline-offset-1'>
            Local
          </div>
          {localUsers}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
