import React from 'react';
import Post from './Post';

function PostFeed(props) {
  const posts = [
    {
      avatar:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
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
      avatar:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
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
      avatar:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
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
      avatar:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
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
      avatar:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    },
  ];

  return (
    <div className='w-[600px] p-4'>
      <div className='hide-scroll-bar overflow-y-scroll'>
        {posts.map((post, i) => (
          <Post
            key={i}
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

export default PostFeed;
