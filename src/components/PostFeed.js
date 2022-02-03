import React from 'react';
import Post from './Post';
import moment from 'moment';

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
            post={post}
            key={post.post_id}
            avatar={post.user_info.profile_img}
            name={post.user_info.username}
            date={moment(post.time).fromNow()}
            postBody={post.body}
            report={post.report}
            likes={post.like}
          />
        ))}
      </div>
    </div>
  );
}

export default PostFeed;
