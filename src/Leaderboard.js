import React from 'react';
import LeftBar from './LeftBar';
import LeaderboardUser from './components/LeaderboardUser';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function Leaderboard() {
  const [groupFilter, setGroupFilter] = React.useState('');
  const [groupData, setGroupData] = React.useState([]);

  React.useEffect(() => {
    //axios call based on filter id to get users in that group
    //.then(res => setGroupData(res))
  });

  const sampleData = [
    { name: 'John Smith', contribution: 45, location: 'Los Angeles, CA' },
    { name: 'Mike Lemon', contribution: 22, location: 'San Diego, CA' },
    { name: 'Elton Lemon', contribution: 169, location: 'Seattle, WA' },
    { name: 'Quinton Maki', contribution: 200, location: 'Las Vegas, NV' },
    { name: 'Ben Bernardy', contribution: 11, location: 'San Francisco, CA' },
  ];

  const globalUsers = sampleData.map((user, i) => (
    <LeaderboardUser user={user} key={i} place={i + 1} />
  ));

  const groupUsers = groupData.map((user, i) => (
    <LeaderboardUser user={user} key={i} place={i + 1} />
  ));

  const groupOptions = [
    { name: 'Group One', id: 'v182391823' },
    { name: 'Group Two', id: 'asd19218923' },
    { name: 'Group Three', id: '19239lad' },
  ].map((option, i) => (
    <MenuItem key={i} value={option.id}>
      {option.name}
    </MenuItem>
  ));

  function handleChange(e) {
    setGroupFilter(e.target.value);
  }

  return (
    <div className='flex h-screen'>
      <LeftBar />
      <div className='flex grow overflow-y-scroll justify-center gap-8 p-10'>
        <div className='w-1/2 h-fit flex flex-col bg-ghostWhite rounded border-secondary border'>
          <div className='text-center text-2xl font-bold decoration-wavy decoration-secondary underline underline-offset-2 py-5'>
            Global
          </div>
          {globalUsers}
        </div>
        <div className='w-1/2 h-fit flex flex-col bg-ghostWhite rounded border-secondary border'>
          <div className='text-center text-2xl font-bold decoration-wavy decoration-secondary underline underline-offset-2 pb-2'>
            <FormControl variant='standard' sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id='groupSelect'>Group</InputLabel>
              <Select
                labelId='groupSelect'
                id='group'
                label='Group'
                onChange={handleChange}
                value={groupFilter}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {groupOptions}
              </Select>
            </FormControl>
          </div>
          {groupUsers}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
