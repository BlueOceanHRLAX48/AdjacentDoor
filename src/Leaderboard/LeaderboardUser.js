import { Avatar } from '@mui/material';
import React from 'react';

function LeaderboardUser(props) {
  function getPlaceColor(place) {
    if (place === 1) {
      return '#FFD700';
    }
    if (place === 2) {
      return '#C0C0C0';
    }
    if (place === 3) {
      return '#CD7F32';
    }
    return '#F8F7FF';
  }

  return (
    <div className='flex w-full items-center px-4 py-2 gap-4 hover:bg-ghostWhite transition-all duration-150'>
      <div className='flex w-[3%] font-bold'>{props.place}</div>
      <Avatar
        sx={{
          width: 35,
          height: 35,
          fontSize: 16,
          color: 'black',
          backgroundColor: getPlaceColor(props.place),
          border: '1px #B8B8FF solid',
        }}
      >
        {props.user.name.slice(0, 1)}
        {props.user.name.split(' ')[1].slice(0, 1)}
      </Avatar>
      {props.user.name}
      <div className='ml-auto text-xs text-gray-400'>{props.user.location}</div>
    </div>
  );
}

export default LeaderboardUser;
