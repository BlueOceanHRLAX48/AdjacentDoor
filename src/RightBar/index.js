import React from 'react';
import SidebarLeaderboard from '../Leaderboard/SidebarLeaderboard';
import AdminEditUsers from './AdminEditUsers';

function RightBar(props) {
  return (
    <div className='hidden sm:flex flex-col min-w-[250px] grow'>
      {window.location.pathname === '/admin' ? (
        <AdminEditUsers />
      ) : (
        <SidebarLeaderboard user={props.user} />
      )}
    </div>
  );
}

export default RightBar;
