import React from 'react';

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
        <div className='text-sm font-semibold'>
          {props.user.privacy
            ? 'Private Neighbor'
            : `${props.user.firstname} ${props.user.lastname}`}
        </div>
        <div className='ml-auto text-xs text-neutral-500'>
          {props.user.city}, {props.user.state}
        </div>
      </div>
      <div className='ml-auto text-sm font-semibold'>
        {props.user.contribution}
      </div>
    </div>
  );
}

export default SidebarUser;
