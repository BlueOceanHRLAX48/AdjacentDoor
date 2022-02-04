import React from 'react';
import { MdSend } from 'react-icons/md';
import axios from 'axios';

function MakeComments({ getAllComments, post, user }) {
  const [commentValue, setCommentValue] = React.useState('');

  const handleCommentValue = (e) => {
    setCommentValue(e.target.value);
  };

  const submitComment = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/posts/${post?.post_id}/replies`, {
        user_id: user?.user_id,
        username: user?.username,
        reply: commentValue,
        latitude: 1,
        longitude: 1,
      })
      .then(() => {
        getAllComments();
        setCommentValue('');
      });
  };

  return (
    <div className='flex items-center justify-center w-full mt-4'>
      <input
        className='relative w-full p-1 pl-2 pr-8 text-sm transition-all duration-150 rounded-full outline-none focus:outline-primary dark:bg-gray-900'
        placeholder='Write a Comment..'
        value={commentValue}
        onChange={handleCommentValue}
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = 'Write a Comment..')}
      ></input>
      <MdSend
        className='absolute cursor-pointer right-6 text-slate-500'
        size='15'
        onClick={submitComment}
      />
    </div>
  );
}

export default MakeComments;
