import React from 'react';
import SearchBar from './SearchBar';
import Post from './Post';

function Feed(props) {
  const posts = [
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text: 'djsaodjwqoodjwqpo',
      report: 0,
      likes: 0,
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text: 'djsaodjwqoodjwqpo',
      report: 0,
      likes: 0,
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text: 'djsaodjwqoodjwqpo',
      report: 0,
      likes: 0,
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text: 'djsaodjwqoodjwqpo',
      report: 0,
      likes: 0,
    },
    {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: '1-2-2022',
      post_text: 'djsaodjwqoodjwqpo',
      report: 0,
      likes: 0,
    },
  ];

  return (
    <div className='w-[600px] min-h-screen p-4'>
      <div>
        <SearchBar />
      </div>
      <div>
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
