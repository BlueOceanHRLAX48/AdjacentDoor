import { Avatar } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import {
  MdChatBubbleOutline,
  MdFavoriteBorder,
  MdOutlineShare,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import MoreMenu from '../MoreMenu';

function Post({
  photos,
  postId,
  body,
  like,
  time,
  user,
  report,
  getPosts,
  post,
}) {
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(like);

  const handleComment = () => 'q';
  const handleLike = () => {
    if (!liked) {
      axios
        .put(`${process.env.REACT_APP_SERVER}/posts/like/${postId}`)
        .then((res) => {
          setLikeCount((x) => x + 1);
          setLiked(true);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleShare = () => 'q';

  return (
    <>
      {(report < 5 || user.admin) && (
        <div
          className='relative p-4 my-3 transition-all duration-150 border shadow-sm border-slate-100 rounded-xl hover:bg-ghostWhite dark:hover:bg-gray-900 dark:hover:border-secondary'
          style={{ backgroundColor: report > 5 && 'rgba(255, 142, 162, .3)' }}
        >
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
              <div className='flex font-medium align-top w-min'>
                {user?.username}
              </div>
              <div className='flex items-center'>
                <div className='text-xs font-light text-slate-500'>
                  {user?.city}
                </div>
                <div className='ml-2 mr-2'> • </div>
                <div className='text-xs font-light text-slate-500'>
                  {moment(time).format('LL')}
                </div>
              </div>

              <div className='mt-2'>{body}</div>
              <div className='flex gap-2 py-2'>
                {photos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo.image_url}
                    alt='upload'
                    width='75px'
                    className='border border-black'
                  />
                ))}
              </div>
              <div className='flex items-center justify-between mt-2 mr-2'>
                {[
                  ['comment', <MdChatBubbleOutline size='15' />, handleComment],
                  [likeCount, <MdFavoriteBorder size='15' />, handleLike],
                  ['share', <MdOutlineShare size='15' />, handleShare],
                ].map(([title, icon, handleClick], i) => (
                  <PostButton
                    icon={icon}
                    text={title}
                    handleClick={handleClick}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </div>
          <MoreMenu
            postId={postId}
            getPosts={getPosts}
            user={user}
            post={post}
          />
        </div>
      )}
    </>
  );
}

export default Post;

const PostButton = ({ icon, text = 'text', handleClick }) => (
  <div className={`flex items-center cursor-pointer`} onClick={handleClick}>
    <div className='mr-4 '>{icon}</div>
    <div>{text}</div>
  </div>
);
