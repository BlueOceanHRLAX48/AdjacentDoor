import React from 'react';
import SearchBar from './SearchBar';
import Post from './Post';

function Feed(props) {
  const posts = [
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
    },
  ];

  return (
    <div className='w-[600px] min-h-screen p-4'>
      <div>
        <SearchBar />
      </div>

      <div className='feed h-screen overflow-y-scroll'>
        <div className='flex justify-center relative'>
          <input
            className='text-sm mt-3 p-1 px-3 w-full h-20 rounded-xl border border-slate-100 shadow-sm focus:outline-none focus:ring-secondary focus:ring-2'
            placeholder='Write something...'
          ></input>
          <button className='text-white font-medium text-xs px-2 rounded-full bg-primary absolute bottom-2 right-4'>
            submit
          </button>
        </div>
        {posts.map((post) => (
          <Post
            avatar={post.avatar}
            name={post.name}
            date={post.date}
            postBody={post.post_text}
            report={post.reports}
            likes={post.likes}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;
