import { Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useState } from 'react';
import { MdChatBubbleOutline, MdFavoriteBorder, MdMoreHoriz, MdOutlineShare } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Post({ avatar, name, date, postBody, reports, likes }) {
  const [like, toggleLike] = useState(false);
  const handleComment = () => 'q';
  const handleLike = () => toggleLike(!like);
  const handleShare = () => 'q';
  const handleMore = () => 'dropdown';

  return (
    <div className='flex-auto p-4 border my-3 border-slate-100 shadow-sm rounded-xl transition-all duration-150 relative hover:bg-ghostWhite dark:hover:bg-gray-900 dark:hover:border-secondary'>
      <div className='flex'>
        <Link to='/my-profile'>
          <Avatar
            alt='Remy Sharp'
            src='/static/images/avatar/1.jpg'
            sx={{ width: 40, height: 40 }}
            className='mr-6 ring-2 ring-offset-2 ring-primary'
          />
        </Link>
        <div>
          <Link to='/my-profile'>
            <div className='font-medium'>{name}</div>
          </Link>
          <div className='text-xs font-light text-slate-500'>{date}</div>
          <div className='mt-2'>{postBody}</div>
          <div className='flex items-center justify-between mt-2 mr-2'>
            {[
              ['comment', <MdChatBubbleOutline size='15' />, handleComment],
              ['212', <MdFavoriteBorder size='15' style={{ color: red[200] }} />, handleLike],
              ['share', <MdOutlineShare size='15' />, handleShare],
            ].map(([title, icon, handleClick], i) => (
              <PostButton icon={icon} text={title} onClick={handleClick} key={i} />
            ))}
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

const PostButton = ({ icon, text = 'text' }) => (
  <div className={`flex cursor-pointer`}>
    <div className='relative flex items-center justify-start mr-4'>{icon}</div>
    <div className={`relative flex items-center justify-start`}>{text}</div>
  </div>
);
