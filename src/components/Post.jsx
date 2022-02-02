import { Avatar } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { MdChatBubbleOutline, MdFavoriteBorder, MdOutlineShare } from 'react-icons/md';
import { Link } from 'react-router-dom';
import MoreMenu from '../MoreMenu';

function Post({ photos, postId, body, like, time, user }) {
  const handleComment = () => 'q';
  const handleLike = () => {
    axios.put(`${process.env.REACT_APP_SERVER}/posts/like/${postId}`);
  };
  const handleShare = () => 'q';

  return (
    <div className='relative p-4 my-3 transition-all duration-150 border shadow-sm border-slate-100 rounded-xl hover:bg-ghostWhite dark:hover:bg-gray-900 dark:hover:border-secondary'>
      <div className='flex'>
        <Link to='/my-profile'>
          <Avatar
            alt='avatar'
            src={user?.profile_img || '/static/images/avatar/1.jpg'}
            sx={{ width: 40, height: 40 }}
            className='mt-1 ml-1 mr-6 ring-2 ring-offset-2 ring-primary'
          />
        </Link>
        <div className='w-full'>
          <div className='font-medium w-min'>{user?.username}</div>
          <div className='text-xs font-light text-slate-500'>{time}</div>
          <div className='text-xs font-light text-slate-500'>{(user.city, user.state)}</div>
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
      <MoreMenu postId={postId} />
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
