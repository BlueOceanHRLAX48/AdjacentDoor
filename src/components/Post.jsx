<<<<<<< HEAD
import { Avatar, Modal, Box, Typography, Grid } from '@mui/material';
=======
import { Avatar, Box, Modal } from '@mui/material';
>>>>>>> 1170fdf (comment in progress)
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import {
  MdChatBubbleOutline,
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineShare,
  MdSend,
} from 'react-icons/md';
import MoreMenu from '../MoreMenu';
<<<<<<< HEAD
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  LineShareButton,
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  LineIcon,
} from 'react-share';
=======
import Comments from './Comments';
>>>>>>> c08a43b (post comments in progress)

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
  group,
}) {
  const [liked, setLiked] = React.useState(() =>
    JSON.parse(localStorage.getItem(`adLiked${user.network_id}${postId}`))
  );
  const [isEnlarged, setEnlarge] = React.useState(false);
  const [city, setCity] = React.useState('');
<<<<<<< HEAD
<<<<<<< HEAD
  const [share, setShare] = React.useState(false);
=======
  const [comment, setComment] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState('');

  const handleCommentValue = (e) => {
    console.log(e.target.value);
    setCommentValue(e.target.value);
  };
>>>>>>> 1170fdf (comment in progress)
=======
  const [toggleComment, setToggleComment] = React.useState(false);

  const [allComments, setAllComments] = React.useState([]);
>>>>>>> c08a43b (post comments in progress)

  React.useEffect(() => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${post.coordinates.longitude},${post.coordinates.latitude}.json?types=place&access_token=${process.env.REACT_APP_MAPBOX_APP_TOKEN}`
      )
      .then(({ data }) => {
        setCity(data.features[0].text);
      });
    getAllComments();
  }, []);

  const getAllComments = () => {
    axios.get(`${process.env.REACT_APP_SERVER}/posts/${postId}/replies`).then(({ data }) => {
      setAllComments(data.posts);
    });
  };

  const handleToggleComment = () => {
    setToggleComment(!toggleComment);
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      axios
        .put(`${process.env.REACT_APP_SERVER}/posts/like/${postId}`)
        .then((res) => {
          localStorage.setItem(`adLiked${user.network_id}${postId}`, 'true');
          getPosts();
          return;
        })
        .catch((err) => {
          setLiked(false);
          console.error(err);
        });
    } else {
      setLiked(false);
      axios
        .put(`${process.env.REACT_APP_SERVER}/posts/unlike/${postId}`)
        .then((res) => {
          localStorage.setItem(`adLiked${user.network_id}${postId}`, 'false');
          getPosts();
          return;
        })
        .catch((err) => {
          setLiked(true);
          console.error(err);
        });
    }
  };

  const handleShare = () => {
    setShare(!share);
  };

  function handleTime(timestamp) {
    return moment().isSame(timestamp, 'day')
      ? moment(timestamp).fromNow()
      : moment(timestamp).format('LL');
  }

  function handleModal() {
    setEnlarge(!isEnlarged);
  }

  function translateCategory(type) {
    if (type === 'forsale') {
      return 'For Sale';
    }
    if (type === 'general') {
      return 'General';
    }
    if (type === 'safety') {
      return 'Safety';
    }
  }

  return (
    <>
      {(report < 5 || user.admin || user.network_id === group.admin_id) && (
        <>
          {(!post.privacy ||
            user.admin ||
            group?.userjoined?.indexOf(user.network_id) !== -1) && (
            <div
              className='relative p-4 my-3 transition-all duration-150 border border-slate-100 rounded-xl hover:bg-ghostWhite dark:hover:bg-gray-900 dark:hover:border-secondary'
              style={{
                backgroundColor: report > 5 && 'rgba(255, 142, 162, .3)',
              }}
            >
              <div className='flex'>
                <Avatar
                  alt='avatar'
                  src={
                    post?.user_info?.profile_img ||
                    'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'
                  }
                  sx={{ width: 40, height: 40 }}
                  className='mt-1 ml-1 mr-6 ring-2 ring-offset-2 ring-primary'
                />
                <div className='w-full'>
                  <div className='flex font-medium align-top'>
                    {post.user_info.username}
                  </div>
                  <div className='flex items-center'>
                    <div className='mr-2 text-xs font-light text-slate-500'>
                      {translateCategory(post.tag)}
                    </div>
                    <> · </>
                    <div className='ml-2 mr-2 text-xs font-light text-slate-500'>
                      {city && city}
                    </div>
                    <> · </>
                    <div className='ml-2 text-xs font-light text-slate-500'>
                      {handleTime(time)}
                    </div>
                  </div>
                  <div className='mt-2'>{body}</div>
                  <div className='flex gap-2 py-2'>
                    {photos.map((photo, i) => (
                      <div key={i}>
                        <img
                          onClick={handleModal}
                          src={photo.image_url}
                          alt='upload'
                          width='75px'
                          className='border border-black'
                        />
                        <Modal
                          open={isEnlarged}
                          onClose={handleModal}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Box>
                            <img
                              key={i}
                              onClick={handleModal}
                              src={photo.image_url}
                              alt='upload'
                              width='800px'
                              className='border border-black'
                            />
                          </Box>
                        </Modal>
                      </div>
                    ))}
                  </div>
<<<<<<< HEAD
                  <div className='flex items-center justify-between mt-2 mr-2'>
                    {[
                      [
                        'comment',
                        <MdChatBubbleOutline size='15' />,
                        handleComment,
                      ],
                      [
                        like,
                        JSON.parse(localStorage.getItem(`adLiked${postId}`)) ? (
                          <MdFavorite size='15' color='red' />
                        ) : (
                          <MdFavoriteBorder size='15' />
                        ),
                        handleLike,
                      ],
                      ['share', <MdOutlineShare size='15' />, handleShare],
                    ].map(([title, icon, handleClick], i) => (
                      <PostButton
                        icon={icon}
                        text={title}
                        handleClick={handleClick}
                        key={i}
                      />
                    ))}
                    <Modal
                      open={share}
                      onClose={handleShare}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      aria-labelledby='modal-title'
                      aria-describedby='modal-description'
                    >
                      <Box
                        sx={{
                          width: 400,
                          height: 230,
                          backgroundColor: 'white',
                          align: 'center',
                        }}
                      >
                        <Typography
                          variant='h6'
                          component='h2'
                          align='center'
                          sx={{
                            mt: 2,
                            mb: 4,
                          }}
                        >
                          Share to...
                        </Typography>
                        <Grid
                          container
                          align='center'
                          sx={{
                            mt: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Grid item md={3} xs={5}>
                            <FacebookShareButton
                              url='http://facebook.com'
                              // url={window.location.href}
                              hashtag={'#hashtag'}
                              quote={`New post from ${post.user_info.username}: ${post.body}. Please check the latest posts at ${window.location.href}`}
                            >
                              <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <div>Facebook</div>
                          </Grid>
                          <Grid item md={3} xs={5}>
                            <TwitterShareButton
                              url={window.location.href}
                              hashtag={'#hashtag'}
                              title={`New post from ${post.user_info.username}: ${post.body}. Please check the latest posts at`}
                            >
                              <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <div>Twitter</div>
                          </Grid>
                          <Grid item md={3} xs={5}>
                            <PinterestShareButton
                              url={window.location.href}
                              hashtag={'#hashtag'}
                              media='https://picsum.photos/200/300'
                              description={`New post from ${post.user_info.username}: ${post.body}.`}
                            >
                              <PinterestIcon size={32} round />
                            </PinterestShareButton>
                            <div>Pinterest</div>
                          </Grid>
                          <Grid item md={3} xs={5}>
                            <LineShareButton
                              url={window.location.href}
                              hashtag={'#hashtag'}
                              title={`New post from ${post.user_info.username}: ${post.body}.`}
                            >
                              <LineIcon size={32} round />
                            </LineShareButton>
                            <div>Line</div>
                          </Grid>
                        </Grid>
                      </Box>
                    </Modal>
                  </div>
                </div>
=======
                ))}
              </div>
              <div className='flex items-center justify-between mt-2 mr-2'>
                {[
                  ['comment', <MdChatBubbleOutline size='15' />, handleToggleComment],
                  [
                    like,
                    JSON.parse(localStorage.getItem(`adLiked${postId}`)) ? (
                      <MdFavorite size='15' color='red' />
                    ) : (
                      <MdFavoriteBorder size='15' />
                    ),
                    handleLike,
                  ],
                  ['share', <MdOutlineShare size='15' />, handleShare],
                ].map(([title, icon, handleClick], i) => (
                  <PostButton icon={icon} text={title} handleClick={handleClick} key={i} />
                ))}
>>>>>>> 6af2c97 (post comments in progress)
              </div>
              <MoreMenu
                postId={postId}
                getPosts={getPosts}
                user={user}
                post={post}
                group={group}
              />
            </div>
          </div>
          <MoreMenu postId={postId} getPosts={getPosts} user={user} post={post} />
          {toggleComment && (
            <Comments
              setAllComments={setAllComments}
              allComments={allComments}
              getAllComments={getAllComments}
              post={post}
              user={user}
            />
          )}
          <div>
            {allComments?.map((comment) => (
              <div>{comment}</div>
            ))}
          </div>
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
