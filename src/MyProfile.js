import { Avatar } from '@mui/material';
import LeftBar from './LeftBar/index';

function MyProfile({ user }) {
  console.log(user);
  return (
    <div className='flex dark:bg-gray-900 dark:text-white'>
      <div className='hidden sm:flex'>
        <LeftBar />
      </div>

      <div className='w-[600px] min-h-screen p-4 flex items-center justify-center'>
        <Avatar
          alt='Remy Sharp'
          src={user.profile_img || '/static/images/avatar/1.jpg'}
          sx={{ width: 100, height: 100 }}
          className='mr-8'
        />
        <div className='text-base'>
          <div className='font-semibold'>{user.username}</div>
          <div className='font-light'>{user.email}</div>
          <div className='font-light'>{user.city + ', ' + user.state + ', ' + user.zip}</div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
