import React from 'react';
import { Link } from 'react-router-dom';
import SidebarUser from './SidebarUser';

function SidebarLeaderboard() {
  const sampleData = [
    { name: 'John Smith', contribution: 45, location: 'Los Angeles, CA' },
    { name: 'Mike Lemon', contribution: 22, location: 'San Diego, CA' },
    { name: 'Elton Lemon', contribution: 169, location: 'Seattle, WA' },
    { name: 'Quinton Maki', contribution: 200, location: 'Las Vegas, NV' },
    { name: 'Ben Bernardy', contribution: 11, location: 'San Francisco, CA' },
  ];

  const leaderboardElements = sampleData
    .slice(0, 5)
    .map((user, i) => <SidebarUser user={user} place={i + 1} key={i} />);
  return (
    <div className='flex flex-col justify-center ml-4 mt-4 py-2 rounded-lg border border-primary cursor-default'>
      <div className='font-bold text-lg text-center py-2 decoration-secondary underline underline-offset-1'>
        Top Global Contibutors
      </div>
      {leaderboardElements}
      <div className='w-full flex justify-center py-4'>
        <Link to='/leaderboard'>
          <button className='hover:bg-primary rounded-full px-4 py-1 font-semibold ring-primary ring-1 transition-all duration-150 hover:text-white'>
            VIEW LEADERBOARD
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SidebarLeaderboard;
