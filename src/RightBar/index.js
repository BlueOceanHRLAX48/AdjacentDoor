import React from 'react';
import SidebarLeaderboard from '../Leaderboard/SidebarLeaderboard';
import AdminEditUsers from './AdminEditUsers';

function RightBar() {
  return (
    <div className='w-[250px] pt-11'>
      {window.location.pathname === '/admin' ? (
        <AdminEditUsers />
      ) : (
        <SidebarLeaderboard />
      )}
    </div>
  );
}

export default RightBar;
