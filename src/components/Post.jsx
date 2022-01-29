import React from 'react';
import { Avatar } from '@mui/material';
import { MdChatBubbleOutline, MdMoreHoriz, MdFavoriteBorder, MdOutlineShare } from 'react-icons/md';

function Post({ avatar, name, date, postBody, reports, likes }) {
  const handleComment = () => 'q';
  const handleLike = () => 'q';
  const handleShare = () => 'q';
  const handleMore = () => 'dropdown';

  return (
    <div className='p-3 border my-3 border-slate-100 shadow-sm rounded-xl relative'>
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

      <div className='flex items-center justify-between mt-2'>
        <MdChatBubbleOutline className='cursor-pointer' size='15' onClick={handleComment} />
        <MdFavoriteBorder className='cursor-pointer' size='15' onClick={handleLike} />
        <MdOutlineShare className='cursor-pointer' size='15' onClick={handleShare} />
        {/* <div>{reports}</div>
        <div>{likes}</div> */}
      </div>
      <MdMoreHoriz
        className='absolute top-2 right-4 cursor-pointer'
        size='20'
        onClick={handleMore}
      />
    </div>
  );
}

export default Post;
