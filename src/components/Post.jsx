import { Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useState } from 'react';
import { MdChatBubbleOutline, MdFavoriteBorder, MdMoreHoriz, MdOutlineShare } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Post({ photos, body, privacy, report, like, userInfo, coordinates, tag, id, time }) {
  const handleComment = () => 'q';
  const handleLike = () => {
    axios.put(`${process.env.REACT_APP_SERVER}/posts/like/${id}`);
  };
  const handleShare = () => 'q';
  const handleMore = () => 'dropdown';

  return (
    <div className='relative p-4 my-3 transition-all duration-150 border shadow-sm border-slate-100 rounded-xl hover:bg-ghostWhite dark:hover:bg-gray-900 dark:hover:border-secondary'>
      <div className='flex'>
        <Link to='/my-profile'>
          <Avatar
            alt='avatar'
            src={userInfo?.profile_img || '/static/images/avatar/1.jpg'}
            sx={{ width: 40, height: 40 }}
            className='mt-1 ml-1 mr-6 ring-2 ring-offset-2 ring-primary'
          />
        </Link>
        <div className='w-full'>
          <div className='font-medium w-min'>{userInfo?.username}</div>
          <div className='text-xs font-light text-slate-500'>{time}</div>
          <div className='mt-2'>{body}</div>
          <div className='flex items-center justify-between mt-2 mr-2'>
            {[
              ['comment', <MdChatBubbleOutline size='15' />, handleComment],
              [like, <MdFavoriteBorder size='15' />, handleLike],
              ['share', <MdOutlineShare size='15' />, handleShare],
            ].map(([title, icon, handleClick], i) => (
              <PostButton icon={icon} text={title} handleClick={handleClick} key={i} />
            ))}
          </div>
        </div>
      </div>

      <MdMoreHoriz
        className='absolute cursor-pointer top-4 right-6'
        size='20'
        onClick={handleMore}
      />
    </div>
  );
}

export default Post;

const PostButton = ({ icon, text = 'text', handleClick }) => (
  <div className={`flex items-center cursor-pointer`} onClick={handleClick}>
    <div className='mr-4 '>{icon}</div>
    <div>{text}</div>
  </div>
);
