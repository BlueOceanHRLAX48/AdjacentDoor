import { Avatar, Tooltip } from '@mui/material';
import axios from 'axios';
import React from 'react';
import LeftBar from './LeftBar/index';
import { MdEdit } from 'react-icons/md';

function MyProfile({ user, setUser }) {
  const [username, setUsername] = React.useState(user.username);
  const [edit, setEdit] = React.useState(false);

  function handleSave() {
    axios.put(
      `${process.env.REACT_APP_SERVER}/user/${user.network_id}/displayName`,
      { username }
    );
  }

  return (
    <div className='flex dark:bg-gray-900 dark:text-white'>
      <div className='hidden sm:flex'>
        <LeftBar user={user} />
      </div>
      <div className='grow flex flex-col items-center p-8'>
        <div className='flex w-[600px] items-center justify-center p-8 border rounded-lg relative'>
          <Tooltip placement='left' title='Edit Information' arrow='true'>
            <button
              className='absolute top-4 right-4 hover:text-primary transition-all duration-150'
              onClick={() => setEdit(true)}
            >
              <MdEdit size='20px' />
            </button>
          </Tooltip>
          <Avatar
            alt={user.username}
            src={
              user.profile_img ||
              'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'
            }
            sx={{ width: 100, height: 100 }}
            className='mr-8'
          />
          <div className='text-base'>
            <div>Name: {user.username}</div>
            <div>Email: {user.email}</div>
            <div>
              Location: {user.city}, {user.state}, {user.zip}
            </div>
          </div>
        </div>
        {edit && (
          <div className='flex flex-col w-[600px] items-center justify-center mt-8 p-8 border rounded-lg'>
            <div className='flex w-[500px]'>
              <div className='w-[100px]'>Name:</div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-[400px] outline-1 border border-secondary focus:outline-primary rounded px-2'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
