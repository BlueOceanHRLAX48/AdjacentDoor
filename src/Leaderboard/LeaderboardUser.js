import { Avatar } from '@mui/material';
import React from 'react';
import { IoMdStar } from 'react-icons/io';

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

  function randomColor() {
    let colors = [
      '#9400D3',
      '#4B0082',
      '#0000FF',
      '#00FF00',
      '#FFFF00',
      '#FF7F00',
      '#FF0000',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
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
        {props.user.firstname[0].toUpperCase()}
        {props.user.lastname[0].toUpperCase()}
      </Avatar>
      <div className='flex flex-col font-semibold'>
        {props.user.privacy ? 'Private Neighbor' : `${props.user.username}`}
        <div className='text-xs text-gray-400 font-normal'>
          {props.user.city}, {props.user.state}
        </div>
      </div>
      <div className='ml-auto font-bold'>{props.user.contribution}</div>
    </div>
  );
}

export default LeaderboardUser;
