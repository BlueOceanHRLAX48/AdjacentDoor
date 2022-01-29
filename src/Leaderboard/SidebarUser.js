import React from 'react';
import useTheme from '../components/useTheme';

function SidebarUser(props) {
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
  }

  return (
    <div className='flex w-full items-center px-4 py-2 gap-4 hover:bg-ghostWhite transition-all duration-150'>
      <div
        className='w-[8%] font-bold text-xl'
        style={{ color: getPlaceColor(props.place) }}
      >
        {props.place}
      </div>
      <div>
        <div className='text-sm font-semibold'>{props.user.name}</div>
        <div className='ml-auto text-xs text-neutral-500'>
          {props.user.location}
        </div>
      </div>
    </div>
  );
}

export default SidebarUser;
