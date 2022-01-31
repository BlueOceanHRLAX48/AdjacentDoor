import { Avatar } from '@mui/material';

function UserInfo() {
  return (
    <div className='transition-all duration-150 hover:bg-ghostWhite hover:rounded-full dark:hover:bg-gray-600'>
      <Avatar
        alt='Remy Sharp'
        src='/static/images/avatar/1.jpg'
        sx={{ width: 35, height: 35 }}
        className='mr-4'
      />
      {/* <div className='text-base'>
        <div className='font-semibold'>Full Name</div>
        <div className='text-sm font-light'>City, State</div>
      </div> */}
    </div>
  );
}

export default UserInfo;
