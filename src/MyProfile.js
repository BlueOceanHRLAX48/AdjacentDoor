import React from 'react';
import RightBar from './RightBar/index';
import LeftBar from './LeftBar/index';
import { Avatar } from '@mui/material';

function MyProfile() {
  return (
    <div className='w-screen flex'>
      <div className='hidden sm:flex'>
        <LeftBar />
      </div>
      <div className='w-[600px] min-h-screen p-4'>
        <Avatar
          alt='Remy Sharp'
          src='/static/images/avatar/1.jpg'
          sx={{ width: 150, height: 150 }}
          className='mr-4'
        />
        <div className='text-base'>
          <div className='font-semibold'>Full Name</div>
          <div className='text-sm font-light'>City, State</div>
        </div>
      </div>
      <div>
        <RightBar />
      </div>
    </div>
  );
}

export default MyProfile;
