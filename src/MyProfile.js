import { Avatar } from '@mui/material';
import LeftBar from './LeftBar/index';

function MyProfile({ user }) {
  return (
    <div className='flex dark:bg-gray-900 dark:text-white'>
      <div className='hidden sm:flex'>
        <LeftBar />
      </div>

      <div className='flex w-[500px] h-[300px] items-center justify-center p-4'>
        <Avatar
          alt='user data'
          src={
            user.profile_img ||
            'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'
          }
          sx={{ width: 100, height: 100 }}
          className='mr-8'
        />
        <div className='text-base'>
          <div>{'Name:  ' + user.username}</div>
          <div>{'Email:  ' + user.email}</div>
          <div>{'Location:  ' + user.city + ', ' + user.state + ', ' + user.zip}</div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
