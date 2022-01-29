import React from 'react';
import { Avatar } from '@mui/material';
import { MdChatBubbleOutline, MdMoreHoriz, MdFavoriteBorder, MdOutlineShare } from 'react-icons/md';

function Post({ avatar, name, date, postBody, reports, likes }) {
  const handleComment = () => 'q';
  const handleLike = () => 'q';
  const handleShare = () => 'q';
  const handleMore = () => 'dropdown';

  return (
    <div className='p-4 border my-3 border-slate-100 shadow-sm rounded-xl relative hover:bg-ghostWhite hover:rounded-xl'>
      <div className='flex'>
        <Avatar
          alt='Remy Sharp'
          src='/static/images/avatar/1.jpg'
          sx={{ width: 40, height: 40 }}
          className='mr-6 ring-2 ring-offset-2 ring-primary'
        />
        <div>
          <div className='font-medium'>{name}</div>
          <div className='text-xs font-light text-slate-500'>{date}</div>
          <div className='mt-2'>{postBody}</div>
          <div className='flex items-center justify-between mt-2 mr-2'>
            <MdChatBubbleOutline className='cursor-pointer' size='15' onClick={handleComment} />
            <MdFavoriteBorder className='cursor-pointer' size='15' onClick={handleLike} />
            <MdOutlineShare className='cursor-pointer' size='15' onClick={handleShare} />
            {/* <div>{reports}</div>
        <div>{likes}</div> */}
          </div>
        </div>
      </div>

      <MdMoreHoriz
        className='absolute top-4 right-6 cursor-pointer'
        size='20'
        onClick={handleMore}
      />
    </div>
  );
}

export default Post;
