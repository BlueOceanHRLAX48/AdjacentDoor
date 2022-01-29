import RightBar from './RightBar/index';
import LeftBar from './LeftBar/index';
import { Avatar } from '@mui/material';

function MyProfile() {
  return (
    <div className='w-screen flex dark:bg-gray-900 dark:text-white'>
      <div className='hidden sm:flex'>
        <LeftBar />
      </div>
      <div className='w-[600px] min-h-screen p-4 flex items-center justify-center'>
        <Avatar
          alt='Remy Sharp'
          src='/static/images/avatar/1.jpg'
          sx={{ width: 100, height: 100 }}
          className='mr-8'
        />
        <div className='text-base'>
          <div className='font-semibold'>Full Name</div>
          <div className='font-light'>Email</div>
          <div className='font-light'>Address</div>
        </div>
      </div>
      <div>
        <RightBar />
      </div>
    </div>
  );
}

export default MyProfile;
