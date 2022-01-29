import React from 'react';
import { Avatar } from '@mui/material';
import { MdChatBubbleOutline, MdMoreHoriz, MdFavoriteBorder, MdOutlineShare } from 'react-icons/md';

function Post({ avatar, name, date, postBody, reports, likes }) {
  return (
    <div className='p-4 border my-3 border-slate-100 shadow-sm rounded-xl'>
      <div className='flex'>
        <Avatar
          alt='Remy Sharp'
          src='/static/images/avatar/1.jpg'
          sx={{ width: 45, height: 45 }}
          className='mr-4'
        />
        <div>
          <div>{name}</div>
          <div className='text-xs font-light text-slate-500'>{date}</div>
          <div className='mt-2'>{postBody}</div>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <MdChatBubbleOutline size='15' />
        <MdFavoriteBorder size='15' />
        <MdOutlineShare size='15' />
        {/* <div>{reports}</div>
        <div>{likes}</div> */}
      </div>
    </div>
  );
}

export default Post;
