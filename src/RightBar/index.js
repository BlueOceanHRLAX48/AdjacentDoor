import React from 'react';
import SidebarLeaderboard from '../Leaderboard/SidebarLeaderboard';
import AdminEditUsers from './AdminEditUsers';

function RightBar() {
  return (
    <div className='flex flex-col min-w-[250px] grow'>
      {window.location.pathname === '/admin' ? (
        <AdminEditUsers />
      ) : (
        <SidebarLeaderboard />
      )}
    </div>
  );
}

export default RightBar;
