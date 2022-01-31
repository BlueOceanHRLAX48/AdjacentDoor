import Post from './Post';
import { useState } from 'react';
import moment from 'moment';

function Feed() {
  const [postContent, setPostContent] = useState({
    avatar: '',
    name: '',
    date: '',
    post_text: '',
    report: null,
    likes: null,
    latitude: '',
    longitude: '',
  });

  const [posts, setPosts] = useState([
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
  ]);

  const handlePost = (e) => {
    //send a post request to db, whenever new changes
    setPostContent({
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: moment().format('LL'),
      post_text: e.target.value,
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    });
  };

  const handleSubmit = (e) => {
    setPosts([postContent, ...posts]);
    setPostContent({});
    e.preventDefault();
  };

  return (
    <div className='w-full sm:w-[600px] min-h-screen p-4'>
      <div className='hide-scroll-bar h-screen overflow-y-scroll'>
        <div className='hidden sm:flex'>
          <form className='flex justify-center relative'>
            <textarea
              className='text-sm p-1 px-3 w-full h-10 rounded-xl border border-slate-100 shadow-sm focus:outline-none focus:ring-secondary focus:ring-2 focus:m-1 dark:bg-gray-900'
              placeholder='Write something...'
              onChange={handlePost}
            ></textarea>
            <button
              onClick={handleSubmit}
              className='text-white font-medium text-xs px-2 rounded-full bg-primary absolute bottom-2 right-4'
            >
              submit
            </button>
          </form>
        </div>
        {posts.map((post, i) => (
          <Post
            key={i}
            avatar={post.avatar}
            name={post.name}
            date={post.date}
            postBody={post.post_text}
            report={post.report}
            likes={post.likes}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;
