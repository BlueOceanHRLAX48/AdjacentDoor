import React from 'react';
import SidebarLeaderboard from '../Leaderboard/SidebarLeaderboard';
import AdminEditUsers from './AdminEditUsers';

function RightBar() {
  return (
    <div className='flex flex-col min-w-[250px] grow'>
      {/* w-[250px] flex flex-col px-6 py-4 */}
      {window.location.pathname === '/admin' ? <AdminEditUsers /> : <SidebarLeaderboard />}
    </div>
  );
}

export default RightBar;
