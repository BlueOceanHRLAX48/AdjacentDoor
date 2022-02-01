import React from 'react';
import Post from './Post';

function PostFeed(props) {
  const [posts, setPosts] = React.useState(props.posts);

  React.useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  return (
    <div className='w-[600px] p-4'>
      <div className='hide-scroll-bar overflow-y-scroll'>
        {posts?.map((post, i) => (
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
