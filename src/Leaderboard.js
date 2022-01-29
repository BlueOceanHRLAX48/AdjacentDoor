import React from 'react';
import LeftBar from './LeftBar';
import LeaderboardUser from './components/LeaderboardUser';

function Leaderboard() {
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

  const groupUsers = sampleData.map((user, i) => (
    <LeaderboardUser user={user} key={i} place={i + 1} />
  ));

  return (
    <div className='flex h-screen'>
      <LeftBar />
      <div className='flex grow overflow-y-scroll justify-center gap-8 p-10'>
        <div className='w-1/2 h-fit flex flex-col bg-ghostWhite rounded border-secondary border'>
          <div className='text-center text-2xl font-bold decoration-wavy decoration-secondary underline underline-offset-2 py-2'>
            GLOBAL LEADERS
          </div>
          {globalUsers}
        </div>
        <div className='w-1/2 h-fit flex flex-col bg-ghostWhite rounded border-secondary border'>
          <div className='text-center text-2xl font-bold decoration-wavy decoration-secondary underline underline-offset-2 py-2'>
            GROUP LEADERS
          </div>
          {groupUsers}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
